import state from './state.js';

const create = (key, data) => {
  state[key] = data;
}

const update = (key, data, pk) => {
  data.map((itemToSave) => {
    let put_state = null;

    // Search to data for PK
    if(pk){
      state[key].map((itemOfState, index) => {
        if(itemToSave[pk] === itemOfState[pk]){
          put_state = index;
          return;
        }
      });
    }

    // Save to data
    if(put_state === null) state[key].push(itemToSave);
    else state[key][put_state] = itemToSave;
  });
}

const remove = (key, data, pk) => {
  state[key].map((item, index) => {
    if(data.hasOwnProperty(pk) && item[pk] == data[pk]) return state[key].splice(index, 1);
    else if(item[pk] == data) return state[key].splice(index, 1);
  });
}

const reset = (key) => {
  state[key] = null;
}



const savePages = (key, pages) => {
  state[key+'Pages'] = pages;
}

export default{ create, update, remove, reset, savePages };
