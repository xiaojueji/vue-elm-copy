import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store'
import ajax from './config/ajax'
import fetch from './config/fetch'
import './style/common'
import './config/rem'


fetch('get', '/v2/index_entry', {
	geohash: 'wtw3630xg5e', 
	group_type: 1, 
	'flags[]': 'F',
}).then(res => {
	console.log(res)
}).catch(error => {
	console.log(error)
})

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

new Vue({
  router,
  store
})