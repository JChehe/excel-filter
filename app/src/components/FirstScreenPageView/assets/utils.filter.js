export function FilterObj() {
  this.workbook = null,
  this.sheetNameList = null
}
var xlsx = XLSX
FilterObj.prototype = {
  constructor: FilterObj,

  init(data) {
    this.readFile(data)
    return this
  },
  readFile(data) {
    this.workbook = XLSX.read(data, { type: 'binary' })
      // this.workbook = xlsx.readFile(fileName) // workbook 是整个Excel文档
    this.sheetNameList = this.workbook.SheetNames // 表名列表
      // 插入每个sheet的数据（json格式）
    this.sheetNameList.forEach((curSheetName, index) => {
      this[curSheetName] = xlsx.utils.sheet_to_json(this.workbook.Sheets[curSheetName])
    })
  },
  /*	exportFileByJSON(json ,fileName, writeOpts){
  		xlsx.writeFile(this.jsonToWBForOneSheet(json), fileName)
  	},*/
  exportFileByWB(fileName, writeOpts) {
    var finalWB = {
      SheetNames: [],
      Sheets: {}
    }
    this.sheetNameList.forEach((sheetName, i) => {
      var wbTem = this.jsonToWBForOneSheet(allFilterResult[i], sheetName)
      finalWB.SheetNames.push(wbTem.SheetNames[0])
      Object.assign(finalWB.Sheets, {
        [sheetName]: wbTem["Sheets"][sheetName]
      })
    })

    xlsx.writeFile(finalWB, fileName)
  },

  jsonToWBForOneSheet(json, sheetName) {
    var _headers = Object.keys(json[0]) // 获取表头
    var headers = _headers
      .map((v, i) => Object.assign({}, { v: v, position: String.fromCharCode(65 + i) + 1 }))
      .reduce((prev, next) => Object.assign({}, prev, {
        [next.position]: { v: next.v }
      }), {})

    var data = json
      .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65 + j) + (i + 2) })))
      .reduce((prev, next) => prev.concat(next))
      .reduce((prev, next) => Object.assign({}, prev, {
        [next.position]: { v: next.v }
      }), {});

    var output = Object.assign({}, headers, data)
    var outputPos = Object.keys(output)

    var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1]
    var wb = {
      SheetNames: [sheetName],
      Sheets: {
        [sheetName]: Object.assign({}, output, { '!ref': ref })
      }
    }
    return wb
  },
  filterByLogicalOperator(sheetName, col, operator, targetNumer) {
    var sheetData = this[sheetName]
    var colKeys = Object.keys(this[sheetName][0]) // 通过第一个数据 获取col表头
    var selectKey = colKeys[col]

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
        case "regExp":
          return curCol.match(regExp)
          break;
        default:
          return true
      }
    })
  }
}
