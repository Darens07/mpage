<template>
  <div class="mp-main">
    <div class="mp-introduction">
      <img alt="Vue logo" src="./assets/logo.png">
      <h1>Welcome to Your Vue.js MPage</h1>
    </div>
    
    <pre-code :object="users" />
  </div>
</template>

<script>
import MPage from './MPage/MPage.js';
import preCode from './components/preCode';

export default {
  name: 'App',
  data(){
    return{
      mp_main: new MPage(this.$store, null, 10, ['id', 'name']),
      page: 1,
      filter: null
    }
  },
  computed:{
    users:{
      get(){ return this.mp_main.getItems('users', this.page, this.filter); },
      set(value){
        this.mp_main.save(value, 'users');
        return this.mp_main.getItems('users', this.page, this.filter);
      }
    }
  },
  components: {
    preCode
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
  color: #2c3e50;
}
.mp-introduction{
  text-align: center;
}
</style>
