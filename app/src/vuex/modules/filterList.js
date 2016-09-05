import * as types from '../mutation-types'

const state = {
  filterList: [] // 筛选条件列表
}

const mutations = {
  [types.ADD_FILTER] (state, filter) {
  	state.filterList.push(filter)
  },
  [types.DEL_FILTER] (state, index) {
    state.filterList.splice(index, 1)
  }
}

export default {
  state,
  mutations
}
