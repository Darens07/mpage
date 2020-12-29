<template>
  <div class="mp-data">
    <div class="mp-object">
      <div class="mp-pre">
        <h2>My Filters</h2>
        <pre>{{ object.filters }}</pre>
      </div>
      <div class="mp-pre">
        <h2>My Orders</h2>
        <pre>{{ object.orders }}</pre>
      </div>
      <div class="mp-pre">
        <h2>My Page active</h2>
        <pre>{{ object.page }}</pre>
      </div>
      <div class="mp-pre">
        <h2>My Pages</h2>
        <pre>{{ object.pages }}</pre>
      </div>
      <div class="mp-pre">
        <h2>My PerPage</h2>
        <pre>{{ object.perpage }}</pre>
      </div>
      <div class="mp-pre">
        <h2>Status</h2>
        <pre>{{ object.status }}</pre>
      </div>
    </div>
    <div class="mp-object">
      <div class="mp-pre">
        <h2>My Items</h2>
        <pre>{{ object.items }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'preCode',
  props: ['object']
}
</script>

<style lang="scss">
pre{
  font-size: 15px;
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
