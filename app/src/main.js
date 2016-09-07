import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'

import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'
// import 'xlsx/dist/xlsx.full.min.js'

import App from './App'
import filters from "./filters"
import routes from './routes'


Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.config.debug = true

Object.keys(filters).forEach((k) => {
  Vue.filter(k, filters[k])
})

const router = new Router()

router.map(routes)
router.beforeEach(() => {
  window.scrollTo(0, 0)
})
router.redirect({
  '*': '/'
})

router.start(App, 'app')
