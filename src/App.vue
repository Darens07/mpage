<template>
  <div class="mp-main">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Welcome to Your Vue.js MPage</h1>
    <a @click="saveTest" href="#">Save Test</a>
    <div class="">
      <input v-model="filter" type="text">
    </div>
    <div class="">
      {{users}}
    </div>

  </div>
</template>

<script>
import MPage from './MPage/MPage.js';

export default {
  name: 'App',
  data(){
    return{
        mp_main: new MPage(this.$store, null, 10, ['id']),
        page: 1,
        filter: null
    }
  },
  components: {
  },
  computed:{
    users:{
      get(){ return this.mp_main.getItems('users', this.page, this.filter); },
      set(value){ this.mp_main.save(value, 'users') }
    }
  },
  methods:{
    saveTest(){
      var thing = [
        { id: 21, name: 'test__'+21, gmail: 'test@test.com', phone: '0414077556'+21 },
        { id: 22, name: 'test__'+22, gmail: 'test@test.com', phone: '0414077556'+22 }
      ];

      this.users = thing;
    },
  }
}
</script>

<style lang="scss">
.mp-main {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
