<!-- Excel 中的 Sheet -->
<template>
	<div class="table-responsive" 
		:class="{'isShowSideBar': !sideBarStatus}">
		<table class="table is-bordered">
			<thead>
				<tr>
					<th v-for="col in colNum">{{ getCharCol(col) }}</th>
				</tr>
			</thead>
			<tbody id="excelBody">
				<!-- <tr>
					<td>1</td>
					<td v-for="col in colKeys">
						{{ col }}
					</td>
				</tr> -->
				<!-- 
				<tr v-for="row in rawNum">
					<td v-for="col in colKeys.length"
						track-by="$index"
						v-if="col === 0">
						{{ row + 2 }}
					</td>
					<td v-for="(index, col) in colKeys" 
						track-by="$index"
						v-if="col!==0" 
						:title="(row+2) + `行` + getCharCol(index+1) + '列'">
						{{ sheetData[row][col] }}
					</td>
				</tr> -->

			</tbody>

		</table>
		<!-- {{generateHTMLString}} -->
	</div>
</template>

<script>
	import { getFilteredData, getSideBarStatus, getColKeys } from '../../vuex/getters'
	import { getCharCol, getNumCol } from '../../utils/ExcelSet'
	
	export default {
		vuex: {
			getters: {
				filteredData: getFilteredData,
				sideBarStatus: getSideBarStatus,
				colKeys: getColKeys
			}
		},
		props: {
			sheetData: {
				type: [Array],
				required: true,
				default() {
					return []
				}
			}
		},
		watch: {
			sheetData(){
				document.getElementById("excelBody").innerHTML = this.generateHTMLString
			}
		},
		created() {
			setTimeout(() => {
				document.getElementById("excelBody").innerHTML = this.generateHTMLString
				
			},1)
		},
		computed: {
			colNum (){
				// console.log("this.colKeys.length", this.colKeys.length)
				return this.colKeys.length + 1
			},
			rawNum (){
				console.log(this.colKeys.length * this.sheetData.length)
				return this.sheetData.length
			},
			generateHTMLString(){
				var sheetData = this.sheetData

				var resultHeadStr = "<tr><td>1</td>"
				this.colKeys.forEach((row, index) => {
					resultHeadStr += `<td>${row}</td>`
				})
				resultHeadStr += "</tr>"

				var resultBodyStr = ""

				for(var i = 0, len = this.rawNum; i < len; i++){
					var resultTrStr = "<tr>"
					this.colKeys.forEach((key, index) => {
						if(index === 0){
							resultTrStr += `<td>${i + 2}</td>`
						}
					})

					this.colKeys.forEach((col, index) => {
						var val = sheetData[i][col]
						if(val == undefined) val = ""
						resultTrStr += `<td title="${i + 2}行${this.getCharCol(index + 1)}列">${val}</td>`
					})
					resultTrStr += "</tr>"
					resultBodyStr += resultTrStr
				}
				// console.log((resultHeadStr + resultBodyStr))
				return (resultHeadStr + resultBodyStr)
			}
		},
		methods: {
			getCharCol,
			getNumCol
		}
	}

</script>

<style scoped>
	table {
		/* table不卡起决定性作用 */
		transform: translate3d(0,0,0);
	}
	.table-responsive table{
		width: 100%;
		max-width: 100%
	}
	table{
		margin-bottom: 0;
	}
	.first-col{
		background-color: #eee
	}
	table thead tr th, table thead th:hover,table tbody tr td:first-child, table tbody tr td:first-child:hover{
		background-color: #eee;
	}
	table tbody>tr:first-child td{
		white-space: nowrap;
	}
</style>