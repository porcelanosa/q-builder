<template>
  <h2 v-if='quizId'>Quiz id: {{ quizId }}</h2>
  <h2 v-else>New Quiz</h2>
  <el-form ref='formRef' :model='form' label-width='120px' v-loading='isLoading || isMutating'>
    <el-form-item label='Name'>
      <el-input v-model='form.name'></el-input>
    </el-form-item>
    <el-form-item label='Title'>
      <el-input v-model='form.title'></el-input>
    </el-form-item>
    <el-button type='primary' @click='addQuestion' :disabled='isNewQuiz|| isLoading || isMutating'>Add
      question
    </el-button>
    <div v-for='(question, idx) in form.questions' :key='idx'>
      <el-form-item label='Title'>
        <el-input v-model='question.title' :name='`questions[${idx}][title]`'></el-input>
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type='primary' @click='onSubmit' :disabled='isLoading || isMutating'>Save</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router'; // import router
import { useQuery, useResult, useMutation, useQueryLoading, useMutationLoading } from '@vue/apollo-composable';
import { successMsg, warningMsg } from '@/utils/messages';

import { GET_QUIZ_BY_ID, UPDATE_QUIZ_BY_ID, INSERT_QUIZ, INSERT_QUESTION, UPDATE_QUESTION_BY_ID } from '@/queries';

const router = useRouter();
const store = useStore();
const isLoading = useQueryLoading();
const isMutating = useMutationLoading();
const props = defineProps({
  quizId: { type: Number, default: null }
});
const newQuestion = {
  id: null,
  title: ''
};
const quiz = ref(null);
const form = reactive({
  id: null,
  name: null,
  title: null,
  questions: []
});

onMounted(() => {
  refetch();
});
const userUid = computed(() => store.getters['GET_USER_UID']);
const isNewQuiz = computed(() => props.quizId === null);

const {
  result: queryQuizResult,
  loading: isQuizLoading,
  refetch,
  onError,
  onResult
} = useQuery(GET_QUIZ_BY_ID, { 'quizId': props.quizId });

type Question = {
  id: Number,
  quiz_id: Number,
  title: String,
  sort: Number
  answers: []
}

const setQuizData = (quiz: any) => {
  form.id = quiz.id;
  form.name = quiz.name;
  form.title = quiz.title;
  quiz.questions.map((question: Question | never) => form.questions
    .push({
      id: question.id,
      title: question.title,
      sort: question.sort,
      quiz_id: question.quiz_id,
      answers: question.answers
    })
  );
  form.questions.sort((a, b) => a.sort > b.sort ? 1 : -1);
};

const { mutate: insertQuiz, loading: isQuizInserting, onDone: quizInsertingFinished } = useMutation(INSERT_QUIZ);

quizInsertingFinished(() => {
  successMsg({ msg: `Success. Inserting Done` });
});
const { mutate: updateQuiz, loading: isQuizUpdating, onDone: quizUpdatingFinished } = useMutation(UPDATE_QUIZ_BY_ID);

quizUpdatingFinished(() => {
  successMsg({ msg: `Success. Updating Done` });
});

const onSubmit = async () => {
  const quizInput = { name: form.name, title: form.title };
  console.log('### is NEW ?', isNewQuiz.value);
  if (isNewQuiz.value) {
    console.log('insert quiz');
    const quizInput = {
      name: form.name,
      title: form.title,
      user_uid: userUid.value
    };
    await insertQuiz(quizInput).then((result) => {
      if (result) {
        const id = result.data.insert_quiz_one.id;
        successMsg({ msg: `Success. ` });
        router.push({ name: 'editQuiz', params: { id } });
      } else {
        warningMsg({ msg: `Error.` });
      }
    }).catch(reason => {
      warningMsg({ msg: `Error. ${reason}` });
    });
  } else {
    console.log('Update quiz');
    await updateQuiz({
      id: props.quizId,
      quiz_input: quizInput
    });
    await saveQuestions();
  }
};
const {
  mutate: updateQuestion,
  loading: isQuestionUpdated,
  onDone: questionUpdatingFinished
} = useMutation(INSERT_QUESTION);
questionUpdatingFinished(() => {
  successMsg({ msg: `Success. Updating Question Done` });
});
const {
  mutate: insertQuestion,
  loading: isQuestionInserting,
  onDone: questionInsertingFinished
} = useMutation(INSERT_QUESTION);
questionInsertingFinished(() => {
  successMsg({ msg: `Success. Inserting Question Done` });
});
const addQuestion = () => {
  form.questions.push({ id: null, title: '' });
};
const saveQuestions = () => {
  console.log('###', filterQuestionsForUpdate());
  filterQuestionsForInsert().map((question) => {
    const questionInput = {
      quiz_id: props.quizId,
      title: question.title,
      sort: question.sort
    };

    console.log('INSERT Questions', questionInput);
    insertQuestion(questionInput);
  });
  filterQuestionsForUpdate().map((question) => {
    const questionInput = {
      quiz_id: props.quizId,
      id: question.id,
      title: question.title,
      sort: question.sort
    };

    console.log('UPDATE Questions', questionInput);
    updateQuestion(questionInput);
  });

};
const filterQuestionsForInsert = () => {
  return form.questions.filter((question) => question.id === null);
};
const filterQuestionsForUpdate = () => {
  console.log('###', form);
  console.log('###', form.name);
  console.log('###', form.questions);
  return form.questions.filter((question) => question.id === null);
};

watch(() => isQuizUpdating, (first, second) => {
  console.log(
    'Watch props.selected function called with args:',
    first,
    second
  );
}, { deep: true });
watch(() => queryQuizResult, (first, second) => {
  console.log('###', queryQuizResult.value);
  const quiz = queryQuizResult.value.quiz_by_pk;
  setQuizData(quiz);
  console.log(
    'Watch props.selected function called with args:',
    first.value,
    second.value
  );
}, { deep: true });
</script>
