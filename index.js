// Import vue component
import MPage from './src/MPage/MPage.js';
import { preCode, mpPaginator } from './src/components';

// Export components
export { MPage, preCode, mpPaginator };

// Declare install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) return;

	install.installed = true;

  Vue.component('preCode', preCode);
  Vue.component('mpPaginator', mpPaginator);
}

const plugin = {
	install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}

if (GlobalVue) {
	GlobalVue.use(plugin);
}


// Export lib how plugin
export default { install: install }
