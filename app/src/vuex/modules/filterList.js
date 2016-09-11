import * as types from '../mutation-types'
import * as utils from '../utils.filter'


const state = {
  filterTagList: {}, // 筛选条件列表
  excelData: {},
  activeSheet: {
  	index: 0,
  	name: ""
  },
  filteredData: {},
  filterOptions: [{
  		char: ">",
  		words: "大于"
  	},{
  		char: "<",
  		words: "小于"
  	},{
  		char: ">=",
  		words: "大于或等于"
  	},{
  		char: "<=",
  		words: "小于或等于"
  	},{
  		char: "=",
  		words: "等于"
  	},{
  		char: "contain",
  		words: "包含"
  	},{
  		char: "startsWith",
  		words: "开头字符"
  	},{
  		char: "endsWith",
  		words: "结束字符"
  	},{
  		char: "regexp",
  		words: "正则表达式"
  	}
  ]
}

// 疑问：修改filterTagList 却不会触发DOM更新。而依赖于 activeSheet
const mutations = {
  [types.ADD_FILTER] (state, filter) {
  	if(state.excelData.sheetNameList && state.excelData.sheetNameList.length > 0){
  		// 首先添加 filterTag
  		var curSheetName = state.excelData.sheetNameList[state.activeSheet.index]
  		// emitChange(state, curSheetName)

  		var tempTagList = Object.assign({}, state.filterTagList)
  		tempTagList[curSheetName].push(filter)
	  	state.filterTagList = tempTagList

	  	// 然后进行具体的过滤操作
	  	for(var i = 0, len = state.filterTagList[curSheetName].length; i < len; i++){
	  		var temp = Object.assign({}, state.excelData)
	  		var curFilter = state.filterTagList[curSheetName][i]
	  		console.log(curFilter)
	  		temp[curSheetName] = filterOpts.filterByLogicalOperator(state.filteredData[curSheetName], curSheetName, curFilter.col - 1, curFilter.operator, curFilter.value)
	  		state.filteredData = temp
	  		console.log(state.filteredData)
	  	}
  	}
  },
  [types.DEL_FILTER] (state, index) {
		var curSheetName = state.activeSheet.name
  	// emitChange(state, curSheetName)
		
		var tempTagList = Object.assign({}, state.filterTagList)
    tempTagList[curSheetName].splice(index, 1)
  	state.filterTagList = tempTagList

  	// 然后进行具体的过滤操作
  	var len = state.filterTagList[curSheetName].length
  	if( len > 0){
  		for(var i = 0, len = state.filterTagList[curSheetName].length; i < len; i++){
	  		var temp = Object.assign({}, state.excelData)
	  		var curFilter = state.filterTagList[curSheetName][i]
	  		temp[curSheetName] = filterOpts.filterByLogicalOperator(state.filteredData[curSheetName], curSheetName, curFilter.col - 1, curFilter.operator, curFilter.value)
	  		state.filteredData = temp
	  	}
  	}else{
  		state.filteredData = Object.assign({}, state.excelData)
  	}
  	
  },
  [types.SET_EXCEL_DATA] (state, data) {

  	state.excelData = new utils.FilterObj().init(data)

  	initFilterState(state, state.excelData.sheetNameList)
  },
  [types.SET_ACTIVE_SHEET] (state, index) {
  	state.activeSheet = {
  		index: index,
  		name: state.excelData.sheetNameList[index]
  	}
  }
}

function initFilterState(state, sheetNames) {
	for(var i = 0, len = sheetNames.length; i < len; i++) {
		state.filterTagList[sheetNames[i]] = []
		state.filteredData[sheetNames[i]] = Object.assign([], state.excelData[sheetNames[i]])
	}
}


var filterOpts = {
	filterByLogicalOperator(data, sheetName, col, operator, targetNumer) {
		console.log(data, sheetName, col, operator, targetNumer)
    var sheetData = data
    var colKeys = Object.keys(data[0]) // 通过第一个数据 获取col表头
    var selectKey = colKeys[col]
    console.log(selectKey)
    return sheetData.filter((row, index) => {
      var curCol = parseInt(row[selectKey])

      switch (operator) {
        case ">":
          if (curCol > targetNumer) return true
          break;
        case "<":
          if (curCol < targetNumer) return true
          break;
        case "<=":
          if (curCol <= targetNumer) return true
          break;
        case ">=":
          if (curCol >= targetNumer) return true
          break;
        case "=":
          if (curCol === targetNumer) return true
          break;
        default:
          return true
      }
    })
  },
  // 包含、以*开头、以*结尾、正则表达式
  filterByCondition(sheetName, col, operator, targetString) {
    var sheetData = this[sheetName]
    var colKeys = Object.keys(this[sheetName][0])
    var selectKey = colKeys[col]
    var regExp = ""
    if (operator === "regExp") regExp = new RegExp(targetString, "ig")
    return sheetData.filter((row, index) => {
      var curCol = row[selectKey]

      switch (operator) {
        case "contain":
          return curCol.includes(targetString);
          break;
        case "startsWith":
          return curCol.startsWith(targetString);
          break;
        case "endsWith":
          return curCol.endsWith(targetString);
          break;
        case "regexp":
          return curCol.match(regExp)
          break;
        default:
          return true
      }
    })
  }
}

function emitChange(state, sheetName){
	state.activeSheet = {
			index: state.activeSheet.index,
			name: sheetName
		}
}


function isEmptyObject(obj) {
	return Object.getOwnPropertyNames(obj).length === 0
}

export default {
  state,
  mutations
}
