import Vue from 'vue'

export default {
/*  '/': {
    component: Vue.component('landing-page', require('./components/LandingPageView')),
    name: 'landing-page'
  }*/
  '/': {
  	component: Vue.component('first-screen',require('./components/FirstScreenPageView')),
  	name: 'first-screen'
  }
}
