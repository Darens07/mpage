<template>
  <div class="mp-main">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Welcome to Your Vue.js MPage</h1>
  </div>
</template>

<script>
import MPage from './MPage/MPage.js';

export default {
  name: 'App',
  data(){
    return{
        mp_users: null,
    }
  },
  mounted(){
    this.mp_users = new MPage(this.$store);
  },
  components: {
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
  margin-top: 60px;
}
</style>
