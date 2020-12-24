import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'
import ajax from '../config/ajax'


Vue.use(Vuex)

const state = {
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})
