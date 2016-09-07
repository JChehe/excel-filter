import * as types from '../mutation-types'
import * as utils from '../utils.filter'


const state = {
  filterTagList: {}, // 筛选条件列表
  excelData: {},
  activeSheetIndex: 0

}

const mutations = {
  [types.ADD_FILTER] (state, filter) {
  	if(state.excelData.sheetNameList && state.excelData.sheetNameList.length > 0){
  		var curSheetName = state.excelData.sheetNameList[state.activeSheetIndex]
	  	state.filterTagList[curSheetName].push(filter)
  	}
  	
  },
  [types.DEL_FILTER] (state, index) {
		var curSheetName = state.excelData.sheetNameList[state.activeSheetIndex]
    state.filterTagList[curSheetName].splice(index, 1)
  },
  [types.SET_EXCEL_DATA] (state, data) {
  	state.excelData = new utils.FilterObj().init(data)
  	initFilterTagList(state, state.excelData.sheetNameList)
  },
  [types.SET_ACTIVE_SHEET_INDEX] (state, index) {
  	state.activeSheetIndex = index
  }
}

function initFilterTagList(state, sheetNames) {
	for(var i = 0, len = sheetNames.length; i < len; i++) {
		state.filterTagList[sheetNames[i]] = []
	}
}

function isEmptyObject(obj) {
	return Object.getOwnPropertyNames(obj).length === 0
}

export default {
  state,
  mutations
}
