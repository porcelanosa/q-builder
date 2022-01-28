<template>
  <QuizForm :quiz-id='id' />
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import QuizForm from '@/components/quizzes/forms/QuizForm.vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = route.params.id ? parseInt(route.params.id) : null;
console.log('###', id);
</script>
