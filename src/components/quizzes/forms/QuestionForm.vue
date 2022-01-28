<template>
  <h2 v-if='questionId'>Question id: {{ questionId }}</h2>
  <h2 v-else>New Question</h2>
  <el-form ref='formRef' :model='form' label-width='120px'>
    <el-form-item label='Question'>
      <el-input v-model='form.title'></el-input>
    </el-form-item>
    <el-button type='primary' @click='onSubmit' :disabled='!isNewQuestion&&(isQuestionUpdating||isQuestionInserting)'>
      Add question
    </el-button>
    <el-form-item>
      <el-button type='primary' @click='onSubmit' :disabled='isQuestionUpdating||isQuestionInserting'>Save</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router'; // import router
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';
import { GET_QUESTION_BY_ID } from '@/queries/questions/getQuestionById';
import { UPDATE_QUESTION_BY_ID } from '@/queries/questions/updateQuestionById';
import { INSERT_QUESTION } from '@/queries/questions/insertQuestion';

const router = useRouter();
const store = useStore();
const props = defineProps({
  questionId: { type: Number, default: null },
  quizId: { type: Number, default: null }
});
const form = reactive({
  id: null,
  quiz_id: null,
  title: null
});

const userUid = computed(() => store.getters['GET_USER_UID']);
const isNewQuestion = computed(() => props.questionId === null);

if (props.questionId) {
  const {
    result,
    loading,
    refetch,
    error,
    onResult
  } = useQuery(GET_QUESTION_BY_ID, { 'questionId': props.questionId });

  onResult((queryResult) => {
    const question = queryResult.data.question_by_pk;
    form.id = question.id;
    form.title = question.title;
  });
}

const {
  mutate: insertQuestion,
  loading: isQuestionInserting,
  onDone: questionInsertingFinished
} = useMutation(INSERT_QUESTION);

questionInsertingFinished(() => {
  console.log('###', 'inserting Done');
});
const {
  mutate: updateQuestion,
  loading: isQuestionUpdating,
  onDone: questionUpdatingFinished
} = useMutation(UPDATE_QUESTION_BY_ID);

questionUpdatingFinished(() => {
  console.log('###', 'updating Done');
});

const onSubmit = () => {
  const questionInput = { name: form.name, title: form.title };
  if (props.questionId) {
    updateQuestion({
      id: props.questionId,
      question_input: questionInput
    });
  } else {
    const questionInput = {
      name: form.name,
      title: form.title,
      user_uid: userUid
    };
    insertQuestion({ name: form.name, title: form.title, user_uid: userUid.value });
  }
};
</script>
