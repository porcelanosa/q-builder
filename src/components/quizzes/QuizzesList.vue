<template>
  <div v-if="loading">Loading...</div>

  <ul v-else-if="result && result.quiz">
    <li v-for="quiz of result.quiz" :key="quiz.id">
      {{ quiz.name }} {{ quiz.title }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'; // import router
import { useStore } from 'vuex';
import { useQuery } from '@vue/apollo-composable';
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

const quizzes = ref([])

onMounted(() => {
  const {result, loading} = loadQuizzes();
})

function loadQuizzes() {
  const { result, loading } = useQuery(gql`
      query GetGuizesListQuery ($userUid: String!) {
        quiz(where: {user_uid: {_eq: $userUid}}) {
            id
            name
            title
        }}`,
      {
        "userUid": userUid
      });
  return { result, loading };
}

</script>

<style scoped>

</style>
