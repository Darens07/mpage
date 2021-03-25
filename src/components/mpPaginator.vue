<template>
  <div :class="['mp-paginator', 'mp-' + position]" v-if="(paginator && paginator.pages > 1)">
    <ul>
      <!-- Back button -->
      <li :style="paginatorStyles" :class="[{'mp-round-left': round}]" @click="changePage(page - 1)"> Back </li>

      <!-- Number page -->
      <template v-for="numberPage in paginator.pages">
        <li v-if="isPaginate(numberPage)" :style="[paginatorStyles, (page == numberPage) ? paginatorActive : '']" @click="changePage(numberPage)" :key="numberPage">
          {{numberPage}}
        </li>
      </template>

      <!-- Next button -->
      <li :style="paginatorStyles" :class="[{'mp-round-right': round}]" @click="changePage(page + 1)"> Next </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'mp-paginator',
  props: {
    value: {
      default: 1
    },
    paginator: {
      default: null
    },
    position: {
      type: String,
      default: 'center'
    },
    round: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    separation: {
      type: String,
      default: '0px 0px'
    },
    fontSize: {
      type: String,
      default: '15px'
    },
    size: {
      type: String,
      default: '35px'
    },
    bgColor: {
      type: String,
      default: '#41b883'
    },
    color: {
      type: String,
      default: '#35495e'
    },
  },
  computed:{
    page:{
      get(){ return this.value; },
      set(value){ this.$emit('input', value) }
    },
    paginatorStyles(){
      // Styles pages
      var data = {
        fontSize: this.fontSize,
        width: this.size,
        height: this.size,
        backgroundColor: this.bgColor,
        color: this.color
      };

      if(this.rounded) data.borderRadius = '50%';

      if(this.separation) data.margin = this.separation;

      return data;
    },
    paginatorActive(){
      // Styl page active
      var data = {
        backgroundColor: this.color,
        color: this.bgColor
      };
      return data;
    }
  },
  methods:{
    changePage(value){
      if(value > this.paginator.pages || value < 1) return false;
      // Change page
      this.page = value;
    },
    isPaginate(numberPage){
      if(numberPage == this.page || numberPage + 1 == this.page || numberPage - 1 == this.page){
        return true;
      }
      if(this.page == 1 && numberPage - 2 == this.page){
        return true;
      }
      if(this.page == this.paginator.pages && numberPage + 2 == this.page){
        return true;
      }

      return false;
    }
  }
}
</script>

<style lang="scss">
.mp-paginator{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px;
  transition: .3s all ease;
  ul{
    display: flex;
    flex-direction: row;
    list-style: none;
    margin: 0px;
    padding: 0px;
    transition: .3s all ease;
    li {
      font-weight: bold;
      cursor: pointer;
      padding: 7px;
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      transition: .3s all ease;
    }
    li:hover {
      opacity: 0.85;
    }
  }
}

// Position
.mp-start{
  justify-content: flex-start;
  text-align: left;
}
.mp-center{
  justify-content: center;
  text-align: center;
}
.mp-end{
  justify-content: flex-end;
  text-align: right;
}

// Round
.mp-round-left{
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}
.mp-round-right{
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}
</style>
