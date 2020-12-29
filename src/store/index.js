import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var test = [];
for (var i = 0; i < 40; i++) {
  test.push({
    id: i,
    name: 'test__'+i,
    gmail: 'test@test.com',
    phone: '0414077556'+i,
  });
}

export default new Vuex.Store({
  state: {
    users: [
      ...test
    ]
  },
  mutations: {
    mp_save_store (state, params) {
      // Params
      const key = params.key;
      const data = params.data;
      const comparison_key = params.comparison_key;
      // Push items
      data.map((itemToSave) => {
        if(comparison_key){
          // put data
          var index_item = false;
          state[key].map((itemOfState, index) => {
            if(itemToSave[comparison_key] == itemOfState[comparison_key]) index_item = index;
          });

          if(index_item !== false){
            state[key][index_item] = itemToSave;
          }else{
            state[key].push(itemToSave);
          }

        }else{
          // post data
          state[key].push(itemToSave);
        }
      });
    }
  },
  actions: {
  }
})
