<template>
  <h1>Login to Your Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signIn">Submit</button></p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const email = ref('');
const password = ref('');
const router = useRouter(); // get a reference to our vue router
const store = useStore();
const signIn = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(({ user }) => {
      const info = user.reloadUserInfo;
      console.log('Successfully Sign IN!', user);
      store.dispatch('SET_USER_UID_ACTION', { userUid: info.localId });
      store.dispatch('SET_USER_EMAIL_ACTION', { userEmail: info.email });
      router.push({ name: 'home' }); // redirect to the home
    })
    .catch(error => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>
