export function FilterObj() {
  this.workbook = null,
  this.sheetNameList = null
}
var xlsx = XLSX

FilterObj.prototype = {
  constructor: FilterObj,

  init(data) {
    this.readByData(data)
    this.initData()
    return this
  },
  readByData(data) {
    this.workbook = xlsx.read(data, { type: 'binary' })
  },
  readByFileName(filename){
    this.workbook = xlsx.readFile(filename)
  },
  initData(){
    this.sheetNameList = this.workbook.SheetNames // 表名列表
      // 插入每个sheet的数据（json格式）
    this.sheetNameList.forEach((curSheetName, index) => {
      this[curSheetName] = xlsx.utils.sheet_to_json(this.workbook.Sheets[curSheetName])
    })
  },
  /*	exportFileByJSON(json ,fileName, writeOpts){
  		xlsx.writeFile(this.jsonToWBForOneSheet(json), fileName)
  	},*/
  exportFileByWB(data, fileName, writeOpts) {
    var finalWB = {
      SheetNames: [],
      Sheets: {}
    }
    var sheetNameList = data.sheetNameList
    console.log("sheetNameList", sheetNameList)
    sheetNameList.forEach((sheetName, i) => {
      var wbTem = this.jsonToWBForOneSheet(data[sheetName], sheetName)
      finalWB.SheetNames.push(wbTem.SheetNames[0])
      Object.assign(finalWB.Sheets, {
        [sheetName]: wbTem["Sheets"][sheetName]
      })
    })
    console.log("finalWB", finalWB)
    var wbout = XLSX.write(finalWB, {bookType:'xlsx', bookSST:false, type: 'binary'});

saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), fileName)
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

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
