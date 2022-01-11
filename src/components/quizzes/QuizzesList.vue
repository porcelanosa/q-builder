<template>
  <div v-if="loading">Loading...</div>
  <ul v-else-if="quizzes && quizzes">
    <li v-for="quiz of quizzes" :key="quiz.id">
      {{ quiz.name }} {{ quiz.title }}
    </li>
  </ul>
  <el-button @click="reloadQuizzes" type="success">Reload</el-button>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router'; // import router
import {useStore} from 'vuex';
import {useQuery, useResult} from '@vue/apollo-composable';
import gql from 'graphql-tag';
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting, List
} from '@element-plus/icons-vue';

const router = useRouter();
const store = useStore();

const userUid = computed(() => store.getters['GET_USER_UID']);
const GET_QUIZZES = gql`
      query GetGuizesListQuery ($userUid: String!) {
        quiz(where: {user_uid: {_eq: $userUid}}) {
            id
            name
            title
        }}`;

const {result, loading, refetch, error} = useQuery(GET_QUIZZES, {"userUid": userUid});
const quizzes = useResult(result);

onMounted(() => {
  refetch();
});

const reloadQuizzes = () => {
  refetch();
}

</script>

<style scoped>

</style>
