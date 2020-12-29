// Import vue component
import MPage from './src/MPage/MPage.js';

// Export components
export { MPage };

// Declare install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) return;

	install.installed = true;

  // Vue.component('MPage', MPage);
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
