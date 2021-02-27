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
  actions = null;

  // Init MPage
  constructor(store = null, nameStore = null, perpage = null, filters = null, orders = null){
    // Validation store
    if(!this.validationExist(store, 'store_required')) return false;

    // Init store
    this.saveStore(store, nameStore);

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
    // Validation page
    if(page == this.page && this.items.length > 0) return this.myData();

    // Init data
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

  // Get pagination
  getPage(key, page){
    // Data required
    var total_items = this.state[key].length, init = null, end = null;

    // Calculate pages
    this.pages = total_items / this.perpage;
    if(!Number.isInteger(this.pages)) this.pages = parseInt(this.pages) + 1;

    // Validation page active alredy exist
    if(this.pages < page) {
      this.status = [alerts.page_not_exist,false];
      this.page = this.pages;
    }else if(page < 1){
      this.status = [alerts.page_not_found,false];
      this.page = 1;
    }else{
      this.page = page;
    }

    if(total_items != 0){
      // Calculate "init" and "end"
      end = this.perpage * this.page;
      init = end - this.perpage;
      // Inserting data to paginate
      for (var i = init; i < end; i++) if(this.state[key][i]) this.items.push(this.state[key][i]);
    }else{
      this.status = [alerts.elements_exist,false];
    }

    // Return data
    return this.myData();
  }

  // Filter data
  filterData(key, filter){
    this.state[key].map((item) => {
      this.filters.map((filterData) => {
        // Data required
        var success = false;

        // Validation type search
        if(typeof item[filterData] == 'number'){
          if(item[filterData] == filter) success = true;
        }else{
          for (var i = 0; i < item[filterData].length; i++) {
            if(item[filterData].toLowerCase().startsWith(filter.toLowerCase(), i)) success = true;
          }
        }

        if(success){
          // Validation exits item in array items
          var existInItems = false;
          this.items.map((itemToView) => {
            if(itemToView[filterData] == item[filterData]) existInItems = true;
          });

          // Push to item
          if(!existInItems) this.items.push(item);
        }

      });
    });

    // Return data
    return this.myData();
  }

  // Other functions
    // Return data
    myData(){
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
      if(nameStore && nameStore != '') this.store = store._modulesNamespaceMap[nameStore+'/'].context;
      else this.store = store;

      if(this.store){
        this.state = this.store.state;
        this.commit = this.store.commit;
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
