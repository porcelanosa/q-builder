<template>
  <div v-if="isQuizListLoading">Loading...</div>
  <div v-else-if="quizzes">
    <el-table
        v-loading="isQuizListLoading || isQuizDeleting"
        :data="quizzes"
        style="width: 100%">
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="title" label="Title" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">

          <router-link :to="{name: 'editQuiz', params: {id: scope.row.id}}">
            <el-button type="success" :icon="Edit" circle/>
          </router-link>
          <el-popconfirm
              confirm-button-text="OK"
              cancel-button-text="No, Thanks"
              :icon="InfoFilled"
              icon-color="red"
              title="Are you sure to delete this quiz?"
              @confirm="submitDeleteQuiz(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger" :icon="Delete" circle/>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-button @click="reloadQuizzes" type="success">Reload</el-button>

  <router-link :to="{name: 'createQuiz'}">
    <el-button type="success">Add new Quiz</el-button>
  </router-link>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router'; // import router
import {useStore} from 'vuex';
import {useQuery, useResult, useMutation} from '@vue/apollo-composable';
import { GET_QUIZZES } from '@/queries/getQuizzesList';
import { DELETE_QUIZ_BY_ID } from '@/queries/deleteQuizById';

import {
  Edit,
  Delete,
  InfoFilled,
  Location,
  Document,
  Menu as IconMenu,
  Setting, List
} from '@element-plus/icons-vue';

const router = useRouter();
const store = useStore();

const userUid = computed(() => store.getters['GET_USER_UID']);

const {result, loading: isQuizListLoading, refetch: fetchQuizzesList, error} = useQuery(GET_QUIZZES, {"userUid": userUid});
const quizzes = useResult(result);

const {mutate: deleteQuiz, loading: isQuizDeleting, onDone: quizDeletingFinished} = useMutation(DELETE_QUIZ_BY_ID);

quizDeletingFinished(()=> {
  reloadQuizzes();
})

onMounted(() => {
  fetchQuizzesList();
});

const reloadQuizzes = () => {
  fetchQuizzesList();
}

const submitDeleteQuiz = (quiz_id: Number) => {
  deleteQuiz({id: quiz_id})
}

</script>

<style scoped>

</style>
