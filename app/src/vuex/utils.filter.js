import { getCharCol, getNumCol} from '../utils/excel'
export function FilterObj() {
  this.workbook = null,
  this.sheetNameList = null
}
var xlsx = XLSX

FilterObj.prototype = {
  constructor: FilterObj,

  init(data) {
    // console.log(typeof data)
    if(typeof data === 'string'){
      this.readByData(data)
    }else if(typeof data === 'object'){
      this.workbook = data
    }
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

    // 获取表头
    this.sheetNameList.forEach((curSheetName, index) => {
      var curSheetData = this.workbook.Sheets[curSheetName]
      this[curSheetName + '_headers'] = []
      var scope = this.workbook.Sheets[curSheetName]["!ref"].split(":") // A1 F5
      var startIndex = getNumCol(extractLetters(scope[0])) // 从 1 开始
      var endIndex = getNumCol(extractLetters(scope[1]))      
      for(var i = startIndex; i <= endIndex; i++){
        this[curSheetName + '_headers'].push(curSheetData[getCharCol(i) + '1'].v)
      }
    })
  },
  initColKeys(data){
    this.colKeys = [];
    data.forEach((item, index) => {
      this.colKeys.push(item.h)
    })
    console.log(this.colKeys)


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
  }
}

// 提取字母
function extractLetters(str) {
  return str.replace(/[^a-zA-Z]+/g, '')
}

    
function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
