<template>
  <div class="mp-main">
    <div class="mp-introduction">
      <img alt="Vue logo" src="./assets/logo.png">
      <h1>Welcome to Your Vue.js MPage</h1>
    </div>
    <mp-paginator v-model="page" :paginator="users"/>

    <pre-code :object="users" />
  </div>
</template>

<script>
// Helpers
import MPage from './MPage/MPage.js';
// components
import { preCode, mpPaginator } from './components';

export default {
  name: 'App',
  components: { preCode, mpPaginator },
  data(){
    return{
      mp_main: new MPage(this.$store, null, 10, ['id', 'name']),
      page: 1,
      filter: null
    }
  },
  computed:{
    users:{
      get(){
        console.log("Get...");
        return this.mp_main.getItems('users', this.page, this.filter);
      },
      set(value){
        this.mp_main.save(value, 'users');
        return this.mp_main.getItems('users', this.page, this.filter);
      }
    }
  },
  methods:{
    //
  }
}
</script>

<style lang="scss">
.mp-main {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #35495e;
}
.mp-introduction{
  text-align: center;
}
</style>
