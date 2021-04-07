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

const savePages = (key, pages) => {
  state[key+'Pages'] = pages;
}

export default{ create, update, savePagesOfBackend };
