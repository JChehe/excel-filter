// 脚手架自带的 getter
export function mainCounter (state) {
  return state.counters.main
}

// sidebar 的搜索框getter
export function getCurSearchVal(state) {
	return state.fileList.curSearchVal
}	

// sidebar
export function getSideBarStatus(state) {
	return state.fileList.isShowSideBar
}
export function getUploadFiles(state) {
	return state.fileList.fileList
}
// 筛选的 getter
export function getFilterTagList(state) {
	return state.filterList.filterTagList
}
export function getAllFileType(state) {
	return state.fileList.allFileType
}


export function getExcelData(state) {
	return state.filterList.excelData
}


export function getActiveSheet(state) {
	return state.filterList.activeSheet
}

export function getFilteredData(state) {
	return state.filterList.filteredData
}

export function getFilterOptions(state) {
	return state.filterList.filterOptions
}

