<!-- Excel 中的 Sheet -->
<template>
	<div class="table-responsive" :class="{isShowSideBar: !sideBarStatus}">
		<table class="table is-bordered">
			<thead>
				<tr>
					<th v-for="col in colNum">{{ getCharCol(col) }}</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td v-for="col in colKeys">
						{{ col }}
					</td>
				</tr>
				<tr v-for="row in rawNum">

					<td v-for="col in colKeys.length" v-if="col === 0">{{ row + 2 }}</td>
					<td v-for="(index, col) in colKeys" v-if="col!==0" :title="(row+2) + `行` + getCharCol(index+1) + '列'">
						{{ sheetData[row][col] }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import { getSideBarStatus, getFilteredData } from '../../vuex/getters'
	import { getCharCol, getNumCol } from '../../utils/excel'
	
	export default {
		data() {
			return {
			}
		},
		vuex: {
			getters: {
				sideBarStatus: getSideBarStatus,
				filteredData: getFilteredData
			}
		},
		props: {
			sheetData: {
				type: [Array, Object],
				required: true,
				default() {
					return []
				}
			}
		},
		computed: {
			colNum: function(){
				return this.colKeys.length + 1
			},
			rawNum: function(){
				return Math.max(this.sheetData.length) 
			},
			colKeys: function(){
				return Object.keys(this.sheetData[0])
			}
		},
		methods: {
			getCharCol,
			getNumCol
		}
	}

</script>

<style scoped>
	.table-responsive{
		width: calc(100vw - 295px);
		display: block;
		overflow: auto;
		height:calc(100vh - 226px);
	}
	.table-responsive.isShowSideBar{
		width: calc(100vw - 24px)
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
</style>