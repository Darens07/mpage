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
    if(!this.requiredKey(key)) return false;
    // If exist a "pages"
    if(data.pages){
      this.pages = data.pages;
      this.mutations.savePages(key ,data.pages);
      data = data.items;
    }
    // Save data
    if(!this.validateState(key)) this.mutations.create(key, data);
    else this.mutations.update(key, data, pk);

    return this.get(key, this.page);
  }

  // Get pagination or filters
  get(key, page, filter = null){
    // Validation page
    if(page == this.page && this.items.length > 0) return this.myData();

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
    undefinedData(value, keyError = false){
      if(value == 'undefined'){
        alert(alerts.undefined);
        return false;
      }
      return true;
    }

    requiredKey(value, keyError = false){
      if(!value || typeof value != 'string'){
        alert(alerts.key);
        return false;
      }
      return true;
    }

    validateState(prop, keyError = false){
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
}
