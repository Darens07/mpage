const alerts = require('./devAlert.json');

export default class {
  // Data of pages
  page = 1;
  pages = 1;
  perpage = 10;
  items = [];
  filters = [];
  orders = [];

  // VUEX
  store = null;
  state = null;
  commit = null;
  getters = null;
  actions = null;

  // Init MPage
  constructor(store = null, nameStore = null, perpage = null, filters = null, orders = null){
    console.log("---- MPage Init ----");

    // Init store
    if(store != null) this.saveStore(store, nameStore);

    // Init pagination
    if(perpage != null) this.perpage = perpage;
    if(filters != null) this.filters = filters;
    if(orders != null) this.orders = orders;
  }


  // Save data
  save(data, key = null){
    // Validations
    if(!this.validationExist(key, 'key')) return false;
    if(!this.validationUndefined(this.state[key], 'exist_data')) return false;
    if(!Array.isArray(this.state[key])) {
      alert(alerts.array_required)
      return false;
    }
  
    console.log("---- Save Data ----");

    // Convert data to an array
    if(!Array.isArray(data)) data = [data];

    if(this.state[key].length == 0){
      this.commit('mp_save_store', {key, data});
    }else{
      this.commit('mp_save_store', {key, data, comparison_key: this.filters[0]});
    }

  }

  // Filter data
  filterData(){
    console.log("---- Filter Data ----");
  }

  // Remove data
  deleteData(){
    console.log("---- Remove Data ----");
  }

  // Get object pagination
  getPage(){
    console.log("---- Get Page ----");
  }


  // Other functions
    // Save Store
    saveStore(store, nameStore){
      if(nameStore && nameStore != ''){
        this.store = store[nameStore];
        if(this.store){
          this.state = this.store.state;
          this.commit = this.store.commit;
          this.getters = this.store.getters;
          this.actions = this.store.dispatch;
        }else{
          alert(alerts.exist_store +' "'+ nameStore +'"');
        }
      }else{
        this.store = store;
        this.state = store.state;
        this.commit = store.commit;
        this.getters = store.getters;
        this.actions = store.dispatch;
      }
    }

    // validations
    validationExist(value, typeError){
      if(!value || value == null || value == '' || value == ' '){
        alert(alerts[typeError]);
        return false;
      }
      return true;
    }
    validationUndefined(value, typeError){
      if(value == undefined) {
        alert(alerts[typeError]);
        return false;
      }
      return true;
    }
}
