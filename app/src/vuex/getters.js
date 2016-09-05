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
export function getFileList(state) {
	return state.fileList.fileList
}
// 筛选的 getter
export function getFilterList(state) {
	return state.filterList.filterList
}
export function getAllFileType(state) {
	return state.fileList.allFileType
}
