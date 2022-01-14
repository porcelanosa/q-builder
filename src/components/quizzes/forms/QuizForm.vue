<template>
  <h2 v-if="quizId">Quiz id: {{ quizId }}</h2>
  <h2 v-else>New Quiz</h2>
  <el-form ref="formRef" :model="form" label-width="120px">
    <el-form-item label="Name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :disabled="isQuizUpdating||isQuizInserting">Save</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {computed, reactive} from 'vue';
import {useStore} from 'vuex';
import {useRouter, useRoute} from 'vue-router'; // import router
import {useQuery, useResult, useMutation} from '@vue/apollo-composable';
import {GET_QUIZ_BY_ID} from '@/queries/getQuizById';
import {UPDATE_QUIZ_BY_ID} from '@/queries/updateQuizById';
import {INSERT_QUIZ} from '@/queries/insertQuiz';

const router = useRouter();
const store = useStore();
const props = defineProps({
  quizId: {type: Number, default: null}
});
const form = reactive({
  id: null,
  name: null,
  title: null,
});

const userUid = computed(() => store.getters['GET_USER_UID']);

if (props.quizId) {
  const {result, loading, refetch, error, onResult} = useQuery(GET_QUIZ_BY_ID, {"quizId": props.quizId});

  onResult((queryResult) => {
    const quiz = queryResult.data.quiz_by_pk;
    form.id = quiz.id;
    form.name = quiz.name;
    form.title = quiz.title;
  });
}

const {mutate: insertQuiz, loading: isQuizInserting, onDone: quizInsertingFinished} = useMutation(INSERT_QUIZ);

quizInsertingFinished(() => {
  console.log('###', 'inserting Done');
})
const {mutate: updateQuiz, loading: isQuizUpdating, onDone: quizUpdatingFinished} = useMutation(UPDATE_QUIZ_BY_ID);

quizUpdatingFinished(() => {
  console.log('###', 'updating Done');
})

const onSubmit = () => {
  const quizInput = {name: form.name, title: form.title};
  if (props.quizId) {
    updateQuiz({
      id: props.quizId,
      quiz_input: quizInput
    });
  } else {
    const quizInput = {
      name: form.name,
      title: form.title,
      user_uid: userUid,
    };
    insertQuiz({name: form.name, title: form.title, user_uid: userUid.value});
  }
}
</script>
