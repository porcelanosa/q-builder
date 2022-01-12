<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="quizzes">
    <el-table :data="quizzes" style="width: 100%">
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="title" label="Title" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button type="success" :icon="Edit" circle/>
          <el-button type="danger" :icon="Delete" circle/>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-button @click="reloadQuizzes" type="success">Reload</el-button>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router'; // import router
import {useStore} from 'vuex';
import {useQuery, useResult} from '@vue/apollo-composable';
import { GET_QUIZZES } from '@/queries/getQuizzesList';

import {
  Edit,
  Delete,
  Location,
  Document,
  Menu as IconMenu,
  Setting, List
} from '@element-plus/icons-vue';

const router = useRouter();
const store = useStore();

const userUid = computed(() => store.getters['GET_USER_UID']);

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
