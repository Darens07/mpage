const alerts = require('./devAlert.json');

export default class {
  // Data of pages
  page = 1;
  pages = 1;
  perpage = 10;
  items = [];
  filters = [];
  orders = [];
  status = ['success',true];

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
    console.log("---- Save Data ----");

    // Validations
    if(!this.validationExist(key, 'key')) return false;
    if(!this.validationUndefined(this.state[key], 'exist_data')) return false;
    if(!Array.isArray(this.state[key])) {
      alert(alerts.array_required);
      return false;
    }

    // Convert data to an array
    if(!Array.isArray(data)) data = [data];

    if(this.state[key].length == 0){
      this.commit('mp_save_store', {key, data});
    }else{
      this.commit('mp_save_store', {key, data, comparison_key: this.filters[0]});
    }
  }

  // Get pagination and filters
  getItems(key, page, filter = null){
    console.log("---- Get Items ----");

    // Init
    this.status = ['success',true];
    this.items = [];

    // Validations
    if(!this.validationExist(key, 'key')) return false;

    if(!filter || filter == null || filter == ''){
      return this.getPage(key, page);
    }else{
      return this.filterData(key, filter);
    }
  }

  // Filter data
  filterData(key, filter){
    console.log(key, filter);
    
    // Return data
    return this.returnData();
  }

  // Get pagination
  getPage(key, page){
    // Data required
    var total_items = this.state[key].length, init = null, end = null;

    // Calculate pages
    this.pages = total_items / this.perpage;
    if(!Number.isInteger(this.pages)) this.pages = parseInt(this.pages) + 1;

    // Validation page active alredy exist
    if(!page || this.pages < page) {
      this.page = 1;
      this.status = [alerts.page_not_found,false];
    }else {
      this.page = page;
    }

    if(total_items != 0){
      // Calculate "init" and "end"
      end = this.perpage * this.page;
      init = end - this.perpage;

      // Inserting data to paginate
      for (var i = init; i < end; i++) this.items.push(this.state[key][i]);
    }else{
      this.status = [alerts.elements_exist,false];
    }

    // Return data
    return this.returnData();
  }

  // Remove data
  // removeData(){
  //   console.log("---- Remove Data ----");
  // }

  // Other functions
    // Return data
    returnData(){
      return {
        filters: this.filters,
        items: this.items,
        orders: this.orders,
        page: this.page,
        pages: this.pages,
        perpage: this.perpage,
        status: this.status
      };
    }

    // Save Store
    saveStore(store, nameStore){
      if(nameStore && nameStore != '') this.store = store[nameStore];
      else this.store = store;

      if(this.store){
        this.state = this.store.state;
        this.commit = this.store.commit;
        this.getters = this.store.getters;
        this.actions = this.store.dispatch;
      }else{
        alert(alerts.exist_store +' "'+ nameStore +'"');
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
