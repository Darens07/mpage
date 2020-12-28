import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var test = [];
for (var i = 0; i < 20; i++) {
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
  },
  actions: {
  },
  modules: {
  }
})
