import Vue from 'vue'

export default {
  /*'/': {
    component: Vue.component('index', require('./components/FirstScreenPageView')),
    name: 'index'
  }*/
  '/': {
  	component: function(resolve){
  		require(['./components/FirstScreenPageView'], resolve)
  	},
  	name: 'index'
  },
  '*': {
      component: function(resolve){
          require(['./components/FirstScreenPageView'], resolve);
      }
  },
  '/instructions': {
		component: function(resolve){
  		require(['./components/InstructionsPageView'], resolve)
  	},
  	name: 'instructions'
  }
}
