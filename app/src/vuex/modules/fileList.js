import * as types from '../mutation-types'

const state = {
  fileList: ["1.xls", "2.xls", "3.xls", "4.xlsx", "5.xlsx"], // 最近的excel文件列表（sidebar）
  allFileType: ["all", "xls", "xlsx"], 
  curSearchVal: "", // 搜索值
  isShowSideBar: true
}

const mutations = {
  [types.CHANGE_SEARCH_VALUE] (state, val) {
  	state.curSearchType = val
  },
  [types.TOGGLE_SIDEBAR] (state) {
	  state.isShowSideBar = !state.isShowSideBar
	},
  [types.CHANGE_SEARCH_VALUE] (state, val) {
    state.curSearchVal = val
  }
}

export default {
  state,
  mutations
}
