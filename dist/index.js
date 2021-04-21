import alerts from './devAlert.js';
import store from './store';

//
// @MPage
//
//

export default class MPage {

  // Init Data of pages
  constructor(perpage = null, filters = null, orders = null){
    // Init data
    this.page = 1;
    this.pages = 1;
    this.perpage = perpage;
    this.filters = filters;
    this.orders = orders;
    this.items = [];
    this.status = ['success',true];

    // Init store
    this.state = store.state;
    this.mutations = store.mutations;
    this.getters = store.getters;
    this.timer = 0;

    return this;
  }

  // Init data of pages static
  static index(perpage = null, filters = null, orders = null){
    return new MPage(perpage, filters, orders);
  }

  // Save data
  save(key, data, pk = false){
    // Validations
    if(!this.undefinedData(data)) return false;
    if(!this.dataNull(data)) return false;
    if(!this.requiredKey(key)) return false;

    // If exist a "pages"
    if(data.pages){
      this.pages = data.pages;
      this.mutations.savePages(key, data.pages);
      data = data.items;
    }
    this.items = [];

    // Save data
    if(!this.validateState(key)) this.mutations.create(key, data);
    else this.mutations.update(key, data, pk);

    return this.get(key, this.page);
  }

  // Get pagination or filters
  get(key, page, filter = null){
    // Validation page
    if(page == this.page && this.items && this.items.length > 0) return this.myData();

    // Init data
    this.status = ['success',true];
    this.items = [];
    this.page = page;
    this.pages = this.getters.pages(key);

    // Validations
    if(!this.requiredKey(key)) return false;
    if(!this.validateState(key)) return this.myData();

    if(filter === null || this.filters === null){
      return this.paginator(key);
    }else{
      // Search item for filter
    }
  }

  // Get pagination
  paginator(key){
    // Data required
    let countItems = 0, init = null, end = null;
    if(this.state[key] && this.state[key].length > 0) countItems = this.state[key].length;

    if(!this.pages){
      // Calculate pages
      this.pages = countItems / this.perpage;
      if(!Number.isInteger(this.pages)) this.pages = parseInt(this.pages) + 1;
    }

    // Validation page active alredy exist
    if(this.pages < this.page) {
      this.status = [alerts.page_not_exist,false];
      this.page = this.pages;
    }else if(this.page < 1){
      this.status = [alerts.page_not_exist,false];
      this.page = 1;
    }


    if(countItems != 0){
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

  // Delete data only ARRAYS
  remove(key, data, pk = false){
    // Validations
    if(!this.undefinedData(pk)) return false;
    if(!this.dataNull(data)) return false;
    if(!this.validateState(key)) return false;

    // Reset items
    this.items = [];

    // Detele item
    this.mutations.remove(key, data, pk);

    // Get items
    return this.get(key, this.page);
  }

  // Other functions
    // My data
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

    // validations
    undefinedData(value){
      if(value == 'undefined'){
        alert(alerts.undefined);
        return false;
      }
      return true;
    }

    dataNull(value){
      if(value == null || (value.items && value.items.length == 0)){
        this.status = [alerts.elements_exist,false];
        return false;
      }
      return true;
    }

    requiredKey(value){
      if(!value || typeof value != 'string'){
        alert(alerts.key);
        return false;
      }
      return true;
    }

    validateState(prop){
      if(!this.state.hasOwnProperty(prop)){
        this.status = [alerts.elements_exist,false];
        return false;
      }
      return true;
    }

    //# Data for develop
      // Params for backend MPage
      params(key, page){
        let position = (page * this.perpage) - this.perpage;
        let numberItems = this.perpage;

        if(this.state[key] && this.state[key].length != position){
          position = 0;
          numberItems = this.perpage * page;
        }

        let params = '?position=' + position + '&perpage=' + numberItems + '&truePerpage=' + this.perpage;
        return params;
      }
      // Params for backend MPage refresh
      resetParams(key){
        // Reset and init timer
        this.timer = 0;
        setInterval(() => {this.timer++ }, 1000);

        // Get number items
        let items = this.perpage;
        if(this.state[key] && this.state[key].length > 0)
          items = this.state[key].length*this.getMultiple();

        return '?position=0&perpage=' + items + '&truePerpage=' + this.perpage;
      }

    // Get number items for timer
    getMultiple(){
      if(this.timer > 60*5) return 4;
      else if(this.timer > 60*10) return 6;
      else if(this.timer > 60*20) return 8;
      else if(this.timer > 60*30) return 10;
      else if(this.timer > 60*40) return 12;
      else if(this.timer > 60*50) return 14;
      else if(this.timer > 60*60) return 16;
      else return 2;
    }
}
