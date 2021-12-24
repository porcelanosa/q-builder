<template>
  <el-container>
    <el-aside width="200px">
      <NavBar/>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

import NavBar from './components/NavBar.vue';

// Apollo settings
const HasuraURL = import.meta.env.VITE_HASURA_URL;
const HasuraToken = import.meta.env.VITE_HASURA_TOKEN;
console.log('###', HasuraToken);
const httpLink = new HttpLink({
  uri: HasuraURL,
  headers: {
    "x-hasura-admin-secret": HasuraToken
  }
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});


export default defineComponent({
  name: 'App',
  setup () {
    provide(DefaultApolloClient, apolloClient);
  },
  components: {
    NavBar
  }
});
</script>

<style lang="scss">
</style>
