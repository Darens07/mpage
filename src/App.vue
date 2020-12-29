<template>
  <div class="mp-main">
    <div class="mp-introduction">
      <img alt="Vue logo" src="./assets/logo.png">
      <h1>Welcome to Your Vue.js MPage</h1>
    </div>
    <div class="mp-data">
      <div class="mp-object">
        <div class="mp-pre">
          <h2>My Filters</h2>
          <pre>{{ users.filters }}</pre>
        </div>
        <div class="mp-pre">
          <h2>My Orders</h2>
          <pre>{{ users.orders }}</pre>
        </div>
        <div class="mp-pre">
          <h2>My Page active</h2>
          <pre>{{ users.page }}</pre>
        </div>
        <div class="mp-pre">
          <h2>My Pages</h2>
          <pre>{{ users.pages }}</pre>
        </div>
        <div class="mp-pre">
          <h2>My PerPage</h2>
          <pre>{{ users.perpage }}</pre>
        </div>
        <div class="mp-pre">
          <h2>Status</h2>
          <pre>{{ users.status }}</pre>
        </div>
      </div>
      <div class="mp-object">
        <div class="mp-pre">
          <h2>My Items</h2>
          <pre>{{ users.items }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MPage from './MPage/MPage.js';

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
    //
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
.mp-data{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.mp-object{
  flex: 0 0 50%;
  width: 50%;
  margin: 0px;
}
.mp-pre{
  background: #dedcdc;
  border-radius: 5px;
  padding: 1px 20px;
  margin: 10px 5px;
}

@media(max-width: 767px){
  .mp-object{
    flex: 0 0 100%;
    width: 100%;
  }
}
</style>
