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
  save(){
    console.log("---- Save Data ----");

  }
  // Filter data
  filterData(){
    console.log("---- Filter Data ----");

  }

  // CRUD Functions
    // Create data
    postData(){
      console.log("---- Post Data ----");
    }
    // Edit data
    putData(){
      console.log("---- Put Data ----");
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
          alert("The store with the "+ nameStore +" name does not exist...");
        }
      }else{
        this.store = store;
        this.state = store.state;
        this.commit = store.commit;
        this.getters = store.getters;
        this.actions = store.dispatch;
      }
    }

}
