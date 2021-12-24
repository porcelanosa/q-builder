<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
  >
    <el-menu-item index="2">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <span><router-link :to="{name: 'home'}"> Home</router-link></span>
    </el-menu-item>
    <el-menu-item index="6">
      <el-icon>
        <icon-menu><List/></icon-menu>
      </el-icon>
      <span><router-link :to="{name: 'quizzes'}"> Quizzes</router-link></span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon>
        <Document/>
      </el-icon>
      <router-link :to="{name: 'register'}"> Register</router-link>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <Location/>
      </el-icon>
      <router-link :to="{name: 'signin'}"> Login</router-link>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon>
        <Setting/>
      </el-icon>
      <span @click="logout">Logout</span>
    </el-menu-item>
  </el-menu>
  <div>
    {{ userEmail }}
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router'; // import router
import { useStore } from 'vuex';

import {
  Location,
  Document,
  Menu as IconMenu,
  Setting, List
} from '@element-plus/icons-vue';

const router = useRouter();
const store = useStore();

const userUid = computed(() => store.getters['GET_USER_UID']);
const userEmail = computed(() => store.getters['GET_USER_EMAIL']);
const logout = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Successfully Sign Out!');
    store.dispatch('SET_USER_UID_ACTION', { userUid: null });
    store.dispatch('SET_USER_EMAIL_ACTION', { userEmail: null });
    router.push({ name: 'home' });
  }).catch((error) => {
    // An error happened.
    console.log(error.code);
    alert(error.message);
  });
};
const handleOpen = (key: String, keyPath: String) => {
  console.log(key, keyPath);
};
const handleClose = (key: String, keyPath: String) => {
  console.log(key, keyPath);
};
</script>

<style scoped>

</style>
