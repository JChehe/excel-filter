import * as types from '../mutation-types'
import * as utils from '../utils.filter'
import moment from "moment"
import zh from "moment/locale/zh-cn"

moment.locale("zh") // 设置时间格式为中文


const state = {
  filterTagList: {}, // 筛选条件列表
  excelData: {},
  filteredData: {},
  activeSheet: {
  	index: 0,
  	name: ""
  },
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

        var subFilters = curFilter.subFilters


        // 过滤操作
        temp[curSheetName] = filterOpts.filteredData({
          sheetData: temp[curSheetName],
          filterCol: curFilter.col,
          operator: curFilter.operator,
          target: curFilter.value,
          subFilters: subFilters,
          colOperator: curFilter.colOperator
        })
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
  		for(var i = 0; i < len; i++){
        var curFilter = state.filterTagList[curSheetName][i]

        var subFilters = curFilter.subFilters
        // 过滤操作
        temp[curSheetName] = filterOpts.filteredData({
          sheetData: temp[curSheetName],
          filterCol: curFilter.col,
          operator: curFilter.operator,
          target: curFilter.value,
          subFilters: subFilters,
          colOperator: curFilter.colOperator
        })
        // 筛选结果赋值
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

  filteredData(args) {
    var {sheetData, filterCol, operator, target, subFilters, colOperator} = args
    if(this.isSingleColFilterGroup(operator)) {
      console.log("第1.2种情况")
      return this.filterBySingleLogicGroup({sheetData, filterCol, operator, subFilters})
    }else{
      // 单列组合逻辑（多列运算）
      if(filterCol instanceof Array){
        console.log("第2种情况：单列组合逻辑（多列运算）")
        return this.filterBySingleLogic({sheetData, filterCol, colOperator, operator, target})
      }else{
        console.log("第1.1种情况")
        return this.filterByOneOperator({sheetData, filterCol, operator, target})
      }
    }
  },
  filterByOneOperator(args){
    var {sheetData, filterCol, operator, target} = args
    var colKeys = Object.keys(sheetData[0]) // 通过第一个数据 获取col表头
    var selectKey = colKeys[filterCol]

    var result = sheetData.filter((row, index) => {
      var curVal = row[selectKey]
      return this.filterHandleUnit({operator, curVal, target})
    })
    return result
  },
  // 单列组合逻辑
  filterBySingleLogic(args){
    // 此处 filterCol 是数组
    var { sheetData, filterCol, colOperator, operator, target } = args
    var colKeys = Object.keys(sheetData[0])
    console.log("sheetData===", sheetData)
    var result = sheetData.filter((row, index) => {
      console.log("row===", row)
      // 传递每行数据进来
      var rowCalcResult = this.multiColCal({
        row,
        colOperator,
        filterCol
      })

      return this.filterHandleUnit({
        operator,
        curVal: rowCalcResult,
        target
      })
    })
    console.log("filterBySingleLogic", result)
    return result
  },
  // 计算每行是否符合要求
  multiColCal(args){
    var { row, colOperator, filterCol } = args
    var calcResult = 0;
    var colKeys = Object.keys(row)

    if(!colOperator.includes("time")){
      for(var i = 0, len = filterCol.length; i < len; i++){
        var selectKey = colKeys[i]
        var curVal = +row[selectKey]
        switch(colOperator){
          case "+":
            calcResult += curVal
            break;
          case "-":
            calcResult -= curVal
            break;
          case "*":
            calcResult *= curVal
            break;
          case "/":
            calcResult /= curVal
            break;
          case "%":
            calcResult %= curVal
          default:
            console.log("multiColCal", "未匹配操作符")
        }
      }
    }else{
      var date0 = moment(row[colKeys[filterCol[0] - 1]], "m/d/y hh:mm")
      var date1 = moment(row[colKeys[filterCol[1] - 1]], "m/d/y hh:mm")
      var diff = date1.diff(date0, "seconds")
      // minutes
      calcResult = Math.floor(diff/60)
    }
    
    return calcResult
  },

  
  filterHandleUnit(args){
    var { operator, curVal, target } = args
    if(this.logicalArr.includes(operator)){
      curVal = +curVal
      target = +target
    }
    switch (operator) {
      case ">": return (curVal > target); break;
      case "<": return (curVal < target); break;
      case "<=": return (curVal <= target); break;
      case ">=": return (curVal >= target); break;
      case "=": return (curVal === target); break;
      // 上面是逻辑操作符
      // 下面是字符串操作符
      case "contain": return curVal.includes(target); break;
      case "notContain": return !curVal.includes(target); break;
      case "startsWith": return curVal.startsWith(target); break;
      case "endsWith": return curVal.endsWith(target); break;
      case "regexp":
        var regexp = new RegExp(target, "ig")
        return curVal.match(regexp); break;
      default: 
        console.log("未匹配操作符")
        return true
    }
  },
  filterBySingleLogicGroup( args ) {
    var { sheetData, filterCol, operator, subFilters } = args
    if(operator === "or") 
      return this.filterByOr({sheetData, subFilters, filterCol})
    else if(operator === "and")
      return this.filterByAnd({sheetData, subFilters, filterCol})
    else
      console.log("filterBySingleLogicGroup", "未匹配到operator")
  },
  filterByOr(args){
    var { sheetData, subFilters, filterCol } = args
    var colKeys = Object.keys(sheetData[0])
    var selectKey = colKeys[filterCol]

    var result = sheetData.filter((row, index) => {
      var curVal = row[selectKey]
      var isPassed = false
      subFilters.forEach((curSubFilter, index) => {
        if(filterOpts.filterHandleUnit({
            operator: curSubFilter.operator, 
            curVal: curVal, 
            target: curSubFilter.val})){

          isPassed = true
          return true
        }
      })
      return isPassed
    })
    return result
  },
  filterByAnd(args){
    var { sheetData, subFilters, filterCol } = args
    var colKeys = Object.keys(sheetData[0])
    var selectKey = colKeys[filterCol]

    var result = sheetData.filter((row, index) => {
      var curVal = row[selectKey]
      var isPassed = true // 用于提前结束 forEach
      subFilters.forEach((curSubFilter, index) => {

        if(!filterOpts.filterHandleUnit({
            operator: curSubFilter.operator, 
            curVal: curVal, 
            target: curSubFilter.val})){

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

export default {
  state,
  mutations
}
