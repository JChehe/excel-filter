import * as types from '../mutation-types'
import * as ExcelSet from '../../utils/ExcelSet'
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
  filterOptions: [
    {
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
      char: "!=",
      words: "不等于"
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
      words: "且"
    }
  ]
}


// 疑问：修改filterTagList 却不会触发DOM更新。而依赖于 activeSheet
const mutations = {
  [types.SET_EXCEL_DATA] (state, data) {
    state.excelData = new ExcelSet.Excel().init(data)
    initFilterState(state, state.excelData.sheetNameList)
    console.log("第4阶段")
  },

  [types.ADD_FILTER] (state, filter) {
    var curSheetName = state.activeSheet.name
  	if(state.excelData.sheetNameList && state.excelData.sheetNameList.length > 0){
  		var tempTagList = Object.assign({}, state.filterTagList)
  		tempTagList[curSheetName].push(filter)
	  	state.filterTagList = tempTagList
      
      // 筛选结果赋值
      state.filteredData = addDelHandler()
  	}else{
      alert("您还没上传相应的Excel文件。")
    }
  },

  [types.DEL_FILTER] (state, index) {
    var curSheetName = state.activeSheet.name
		var tempTagList = Object.assign({}, state.filterTagList)
    tempTagList[curSheetName].splice(index, 1)
  	state.filterTagList = tempTagList

  	// 然后进行具体的过滤操作
  	var len = state.filterTagList[curSheetName].length
  	if( len > 0){
      // 筛选结果赋值
      state.filteredData = addDelHandler()
  	}else{
  		state.filteredData = Object.assign({}, state.excelData)
  	}
  },
  
  [types.SET_ACTIVE_SHEET] (state, index) {
  	state.activeSheet = {
  		index,
  		name: state.excelData.sheetNameList[index]
  	}
  },

  [types.EXPORT_FILE] (state, val) {
    state.excelData.exportFileByWB({
      filteredData: state.filteredData, 
      excelData: state.excelData, 
      fileName: "过滤后的Excel.xlsx"
    })
  }
}

export default {
  state,
  mutations
}


function initFilterState(state, sheetNames) {
  for(var i = 0, len = sheetNames.length; i < len; i++) {
    state.filterTagList[sheetNames[i]] = []
    state.filteredData[sheetNames[i]] = Object.assign([], state.excelData[sheetNames[i]])
  }
}

function addDelHandler(){
  var curSheetName = state.activeSheet.name
  var tempFilteredData = Object.assign({}, state.excelData)
  
  for(var i = 0, len = state.filterTagList[curSheetName].length; i < len; i++){
    var curFilter = state.filterTagList[curSheetName][i]
    var subFilters = curFilter.subFilters

    // 过滤操作
    tempFilteredData[curSheetName] = filterSet.filterDataHandler({
      sheetData: tempFilteredData[curSheetName],
      filterCol: curFilter.col,
      operator: curFilter.operator,
      target: curFilter.value,
      subFilters,
      colOperator: curFilter.colOperator
    })
  }
  return tempFilteredData
}

var filterSet = {
  mathOperaArr: [">", "<", ">=", "<="],
  conditionArr: ["=", "!=", "contain", "notContain", "startsWith", "endsWith", "regexp"],

  filterDataHandler(args) {
    var { sheetData, filterCol, operator, target, subFilters, colOperator} = args
    
    if(this.operatorIsAndOr(operator)) {
      if(filterCol instanceof Array){
        console.log("第3.2种情况：双列范围逻辑的【or与and】")
        return this.filterByAndOrForDoubleColsRange({sheetData, filterCol, operator, subFilters})
      }else{
        console.log("第1.2种情况：单列（组合）逻辑的【or与and】")
        return this.filterByAndOrForSingleCol({sheetData, filterCol, operator, subFilters})
      }
    }else{
      // 单列组合逻辑（多列运算）
      if(filterCol instanceof Array){
        if(colOperator.length === 0){
          console.log("第3.1种情况：双列范围逻辑的【非or与and】")
          return this.filterForDoubleColsRange({sheetData, filterCol, operator, target})
        }else{
          console.log("第2种情况：多列运算逻辑")
          return this.filterByMultiColCalc({sheetData, filterCol, colOperator, operator, target})
        }
      }else{
        console.log("第1.1种情况：单列（组合）逻辑的【非or与and】")
        return this.filterByOneOperator({sheetData, filterCol, operator, target})
      }
    }
  },
  filterByAndOrForDoubleColsRange(args) {
    var {sheetData, filterCols: filterCol, operator, subFilters} = args
    if(operator === "or")
      return this.filterByOrForDoubleColsRange({sheetData, subFilters, filterCols})
    else if(operator === "and")
      return this.filterByAndForDoubleColsRange({sheetData, subFilters, filterCols})
    else
      console.log("filterByAndOrForDoubleColsRange", "未匹配到operator")
  },
  filterByOrForDoubleColsRange(args) {
    var { sheetData, filterCols, subFilters } = args
    var colKeys = state.excelData[state.activeSheet.name + '_headers']
    var result = sheetData.filter((rowData, index) => {
      var isRowPassed = false
      // 判断每列是否符合【单列的或逻辑】，即3.2
      for(var i = 0, len = filterCols.length; i < len; i++) {
        var filterCol = filterCols[i]

        var isCurColPassed = this.filterByOrForRow({ 
          rowData,
          subFilters,
          filterCol
        })
        if(isCurColPassed) {
          isRowPassed = true
          break
        }
      }
      return isRowPassed
    })
    return result
  },
  filterByAndForDoubleColsRange(args) {
    var { sheetData, filterCols, subFilters } = args
    var colKeys = state.excelData[state.activeSheet.name + '_headers']
    var result = sheetData.filter((rowData, index) => {
      var isRowPassed = false

      // 判断每列是否符合【单列的和逻辑】，即3.2
      for(var i = 0, len = filterCols.length; i < len; i++) {
        var filterCol = filterCols[i]

        var isCurColPassed = this.filterByAndForRow({
          rowData,
          subFilters,
          filterCol
        })
        console.log("isCurColPassed", isCurColPassed)
        if(isCurColPassed) {
          isRowPassed = true
          break
        }
      }
      return isRowPassed
    })

    return result
  },
  
  filterByOneOperator(args){
    var {sheetData, filterCol, operator, target} = args
    var colKeys = state.excelData[state.activeSheet.name + '_headers']
    var selectKey = colKeys[filterCol]

    var result = sheetData.filter((row, index) => {
      var curVal = row[selectKey]
      console.log("curVal", row[selectKey])
      // 过滤掉空表格
      if(curVal == undefined)
        return false
      else
        return this.filterUnit({operator, curVal, target})
    })
    return result
  },
  // 多列逻辑运算逻辑，即表单3.1
  filterForDoubleColsRange(args) {
    var { sheetData, filterCol, operator, target } = args
    var colKeys = state.excelData[state.activeSheet.name + '_headers']
   
    var result = sheetData.filter( (rowData, index) => {
      var isRowPassed = false
      // 判断每列中是否有一列符合单一逻辑，即3.1
      for(var i = 0, len = filterCol.length; i < len; i++) {
        var selectKey = filterCol[i]
        var curKey = colKeys[selectKey]
        var isCurColPassed = this.filterUnit({
          operator,
          curVal: rowData[curKey],
          target: target
        })
        if(isCurColPassed) {
          isRowPassed = true
          break
        }
      }
      return isRowPassed
    })

    console.log("Result", result)
    return result
  },
  // 单列组合逻辑
  filterByMultiColCalc(args){
    // 此处 filterCol 是数组
    var { sheetData, filterCol, colOperator, operator, target } = args
    var colKeys = state.excelData[state.activeSheet.name + '_headers']
    var result = sheetData.filter((row, index) => {
      // 传递每行数据进来
      var rowCalcResult = this.calcMultiCol({
        row,
        colOperator,
        filterCol
      })

      return this.filterUnit({
        operator,
        curVal: rowCalcResult,
        target
      })
    })
    console.log("filterByMultiColCalc", result)
    return result
  },
  // 计算每行是否符合要求
  calcMultiCol(args){
    var { row, colOperator, filterCol } = args
    var calcResult
    var colKeys = state.excelData[ state.activeSheet.name + "_headers"]
    if(!colOperator.includes("time")){
      // 根据第一个值能否转为数字，初始化calcResult为相应类型
      var calcResult = !isNaN(+row[colKeys[filterCol[0]]]) ? 0 : ""
      for(var i = 0, len = filterCol.length; i < len; i++){
        var selectKey = colKeys[filterCol[i]]
        var curVal
        if(row[selectKey] == undefined){
          curVal = calcResult instanceof String ? "" : 0
        }else{
          curVal = !isNaN(+row[selectKey]) ? +row[selectKey] : row[selectKey]
        }
        
        switch(colOperator){
          case "+": calcResult += curVal; break;
          case "-": calcResult -= curVal; break;
          case "*": calcResult *= curVal; break;
          case "/": calcResult /= curVal; break;
          case "%": calcResult %= curVal; break;
          default: console.log("calcMultiCol", "未匹配操作符")
        }
      }
    }else{
      var date0 = moment(row[colKeys[filterCol[0] - 1]], "m/d/y hh:mm")
      var date1 = moment(row[colKeys[filterCol[1] - 1]], "m/d/y hh:mm")
      var diff = date1.diff(date0, "seconds")
      // minutes
      calcResult = Math.floor(diff/60)
    }
    console.log("calcResult", calcResult)
    return calcResult
  },
  
  filterUnit(args){
    var { operator, curVal, target } = args
    if(this.mathOperaArr.includes(operator) && !isNaN(+curVal)){ // +"a" 是 NaN
      curVal = +curVal
      target = +target
    }
    switch (operator) {
      case ">": return (curVal > target); break;
      case "<": return (curVal < target); break;
      case "<=": return (curVal <= target); break;
      case ">=": return (curVal >= target); break;
      case "=": return (curVal == target); break;
      // 上面是逻辑操作符
      // 下面是字符串操作符
      // 因为= !=可用于字符串的对比，因此不放在逻辑操作符内
      case "!=": console.log(curVal); return (curVal != target); break; 
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
  filterByAndOrForSingleCol( args ) {
    var { sheetData, filterCol, operator, subFilters } = args
    if(operator === "or") 
      return sheetData.filter((rowData, index) => {
        return this.filterByOrForRow({rowData, subFilters, filterCol})
      })
    else if(operator === "and")
      return sheetData.filter((rowData, index) => {
        return this.filterByAndForRow({rowData, subFilters, filterCol})
      })
    else
      console.log("filterByAndOrForSingleCol", "未匹配到operator")
  },
  filterByOrForRow(args){
    var { rowData, subFilters, filterCol } = args
    var colKeys = state.excelData[state.activeSheet.name + '_headers']
    var selectKey = colKeys[filterCol]

    var curVal = rowData[selectKey]
    var isPassed = false
    subFilters.forEach((curSubFilter, index) => {
      if(filterSet.filterUnit({
          operator: curSubFilter.operator, 
          curVal: curVal, 
          target: curSubFilter.val})){

        isPassed = true
        return true
      }
    })
    return isPassed
  },
  filterByAndForRow(args){
    var { rowData, subFilters, filterCol } = args
    var colKeys = state.excelData[state.activeSheet.name + '_headers']
    var selectKey = colKeys[filterCol]

    var curVal = rowData[selectKey]
    var isPassed = true // 用于提前结束 forEach
    subFilters.forEach((curSubFilter, index) => {
      if(!filterSet.filterUnit({
          operator: curSubFilter.operator, 
          curVal: curVal, 
          target: curSubFilter.val})){

        isPassed = false
        return true // 用于提前结束 forEach
      }
    })
    return isPassed
  },
  operatorIsAndOr(operator){
    if(operator === "or" || operator === "and")
      return true
  }
}
