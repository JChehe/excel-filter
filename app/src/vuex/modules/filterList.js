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
      char: "notContain",
      words: "不包含"
    },{
  		char: "startsWith",
  		words: "开头字符"
  	},{
  		char: "endsWith",
  		words: "结束字符"
  	},{
  		char: "regexp",
  		words: "正则表达式"
  	},{
      char: "or",
      words: "或"
    },{
      char: "and",
      words: "与"
    }
  ]
}

// 疑问：修改filterTagList 却不会触发DOM更新。而依赖于 activeSheet
const mutations = {
  [types.ADD_FILTER] (state, filter) {
  	if(state.excelData.sheetNameList && state.excelData.sheetNameList.length > 0){
  		// 首先添加 filterTag
  		var curSheetName = state.excelData.sheetNameList[state.activeSheet.index]

  		var tempTagList = Object.assign({}, state.filterTagList)
  		tempTagList[curSheetName].push(filter)
	  	state.filterTagList = tempTagList

      var temp = Object.assign({}, state.excelData)
      // 然后进行具体的过滤操作

      for(var i = 0, len = state.filterTagList[curSheetName].length; i < len; i++){
        var curFilter = state.filterTagList[curSheetName][i]

        // 判断，选择筛选方法
        if(filterOpts.isSingleColFilterGroup(curFilter.operator)){
          var subFilters = curFilter.subFilters
          temp[curSheetName] = filterOpts.filterBySingleLogicGroup(temp[curSheetName], curFilter.operator, subFilters, curFilter.col - 1)
        }else{
          temp[curSheetName] = filterOpts.filteredData(temp[curSheetName], curFilter.col - 1, curFilter.operator, curFilter.value)
        }
        // 筛选结果赋值
        state.filteredData = temp
      }
	  	
	  	
  	}
  },
  [types.DEL_FILTER] (state, index) {
		var curSheetName = state.activeSheet.name
		
		var tempTagList = Object.assign({}, state.filterTagList)
    tempTagList[curSheetName].splice(index, 1)
  	state.filterTagList = tempTagList

    var temp = Object.assign({}, state.excelData)

  	// 然后进行具体的过滤操作
  	var len = state.filterTagList[curSheetName].length
  	if( len > 0){
  		for(var i = 0, len = state.filterTagList[curSheetName].length; i < len; i++){
	  		/*var curFilter = state.filterTagList[curSheetName][i]
	  		temp[curSheetName] = filterOpts.filteredData(temp[curSheetName], curFilter.col - 1, curFilter.operator, curFilter.value)
	  		state.filteredData = temp*/
        // 判断，选择筛选方法
        var curFilter = state.filterTagList[curSheetName][i]

        if(filterOpts.isSingleColFilterGroup(curFilter.operator)){
          var subFilters = curFilter.subFilters
          temp[curSheetName] = filterOpts.filterBySingleLogicGroup(temp[curSheetName], curFilter.operator, subFilters, curFilter.col - 1)
        }else{
          temp[curSheetName] = filterOpts.filteredData(temp[curSheetName], curFilter.col - 1, curFilter.operator, curFilter.value)
        }
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
  },
  [types.EXPORT_FILE] (state, val) {
    state.excelData.exportFileByWB(state.filteredData, "过滤后的Excel.xlsx")
  }
}

function initFilterState(state, sheetNames) {
	for(var i = 0, len = sheetNames.length; i < len; i++) {
		state.filterTagList[sheetNames[i]] = []
		state.filteredData[sheetNames[i]] = Object.assign([], state.excelData[sheetNames[i]])
	}
}

var filterOpts = {
  logicalArr: [">", "<", ">=", "<=", "="],
  conditionArr: ["contain", "notContain", "startsWith", "endsWith", "regexp"],

  filteredData(data, col, operator, target) {
    if(this.isSingleColFilterGroup(operator)){
      /*filterBySingleLogicGroup.filter(data, operator, )*/
    }else{
      return this.filterByOneOperator(data, col, operator, target)
    }
  },
  filterByOneOperator(data, col, operator, target){
    var sheetData = data
    var colKeys = Object.keys(data[0]) // 通过第一个数据 获取col表头
    var selectKey = colKeys[col]

    var result = sheetData.filter((row, index) => {
      // var curCol = parseInt(row[selectKey])
      var curCol = row[selectKey]
      return this.filterHandleUnit(operator, curCol, target)
    })
    return result
  },
  filterHandleUnit(operator, curVal, target){
    if(this.logicalArr.includes(operator)){
      curVal = +curVal
      target = +target
    }
    switch (operator) {
      case ">":
        if (curVal > target) return true; break;
      case "<":
        if (curVal < target) return true; break;
      case "<=":
        if (curVal <= target) return true; break;
      case ">=":
        if (curVal >= target) return true; break;
      case "=":
        if (curVal === target) return true; break;
      // 上面是逻辑操作符
      // 下面是字符串操作符
      case "contain":
        return curVal.includes(target); break;
      case "notContain":
        return !curVal.includes(target); break;
      case "startsWith":
        return curVal.startsWith(target); break;
      case "endsWith":
        return curVal.endsWith(target); break;
      case "regexp":
        var regexp = new RegExp(target, "ig")
        return curVal.match(regexp); break;
      default: 
        console.log("未匹配操作符")
        return true
    }
  },
  filterBySingleLogicGroup(data, operator, subFilters, col) {
    if(operator === "or") {
      return this.filterByOr(data, subFilters, col)
    }else if(operator === "and") {
      return this.filterByAnd(data, subFilters, col)
    }else{
      console.log("filterBySingleLogicGroup", "未匹配到operator")
    }
  },
  filterByOr(data, subFilters, col){
    var sheetData = data
    var colKeys = Object.keys(data[0])
    var selectKey = colKeys[col]

    var result = sheetData.filter((row, index) => {
      var curCol = row[selectKey]
      var isPassed = false
      subFilters.forEach((curSubFilter, index) => {
        if(filterOpts.filterHandleUnit(curSubFilter.operator, curCol, curSubFilter.val)){
          isPassed = true
          return true
        }
      })
      return isPassed
    })
    return result
  },
  filterByAnd(data, subFilters, col){
    var sheetData = data
    var colKeys = Object.keys(data[0])
    var selectKey = colKeys[col]

    var result = sheetData.filter((row, index) => {
      var curCol = row[selectKey]
      var isPassed = true // 用于提前结束 forEach
      subFilters.forEach((curSubFilter, index) => {
        if(!filterOpts.filterHandleUnit(curSubFilter.operator, curCol, curSubFilter.val)){
          isPassed = false
          return true // 用于提前结束 forEach
        }
      })
      return isPassed
    })
    return result
  },
  isSingleColFilterGroup(operator){
    if(operator === "or" || operator === "and")
      return true
  }
}

/*function emitChange(state, sheetName){
	state.activeSheet = {
		index: state.activeSheet.index,
		name: sheetName
	}
}*/



/*function isEmptyObject(obj) {
	return Object.getOwnPropertyNames(obj).length === 0
}*/

export default {
  state,
  mutations
}
