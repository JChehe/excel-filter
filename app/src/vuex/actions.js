import * as types from './mutation-types'

// 脚手架自带 actions
export const decrementMain = ({ dispatch }) => {
  dispatch(types.DECREMENT_MAIN_COUNTER)
}

export const incrementMain = ({ dispatch }) => {
  dispatch(types.INCREMENT_MAIN_COUNTER)
}

// sidebar的显示与否
export const toggleSideBar = ({ dispatch }) => {
	dispatch(types.TOGGLE_SIDEBAR)
}
// sidebar中的搜索框涉及的 actions
export const changeSearchVal = ({ dispatch }, val) => {
	dispatch(types.CHANGE_SEARCH_VALUE, val)
}

export const changeFileType = ({ dispatch }, val) => {
	dispatch(types.SELECT_SEARCH_TYPE, val)
}

export const searchHandler = ({ dispatch }, val) => {
	dispatch(types.CHANGE_SEARCH_VALUE, val)
}
// 过滤框中涉及的 actions

export const addFilter = ({ dispatch }, val) => {
	dispatch(types.ADD_FILTER, val)
}

export const delFilter = ({ dispatch }, val) => {
	dispatch(types.DEL_FILTER, val)
}

export const setExcelData = ({ dispatch }, val) => {
	dispatch(types.SET_EXCEL_DATA, val)
}

export const setActiveSheet = ({ dispatch }, val) => {
	dispatch(types.SET_ACTIVE_SHEET, val)
}

export const setFilteredData = ({ dispatch }, val) => {
	dispatch(types.SET_FILTERED_DATA, val)
}

export const exportFile = ({ dispatch }, val) => {
	dispatch(types.EXPORT_FILE, val)
}