import state from './state.js';

const pages = (key) => {
  return state[key+'Pages'];
}

export default{ pages };
