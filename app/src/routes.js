import Vue from 'vue'

export default {
/*  '/': {
    component: Vue.component('landing-page', require('./components/LandingPageView')),
    name: 'landing-page'
  }*/
  '/': {
  	component: function(resolve){
  		require(['./components/FirstScreenPageView'], resolve)
  	},
  	name: 'first-screent'
  },
  '/instructions': {
		component: function(resolve){
  		require(['./components/InstructionsPageView'], resolve)
  	},
  	name: 'instructions'
  }
}
