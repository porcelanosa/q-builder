<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email"/></p>
  <p><input type="password" placeholder="Password" v-model="password"/></p>
  <p>
    <button @click="register">Submit</button>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
// import { ProfileMutationTypes as MutationTypes } from '@/store/modules/profile/mutation-types'; // import router

const email = ref('');
const password = ref('');
const router = useRouter(); // get a reference to our vue router
const store = useStore();
const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log('Successfully registered!');

      // store.commit(MutationTypes.SET_USER_UID, null);
      router.push({ name: 'home' }); // redirect to the home
    })
    .catch(error => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>
