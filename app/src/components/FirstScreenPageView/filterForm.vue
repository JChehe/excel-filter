<template>
	<form @submit.prevent="addFilterHandler" :class="{mL32: !sideBarStatus}">
		<table class="table">
			<!-- <caption>添加筛选条件：</caption> -->
			<thead>
				<tr>
					<th>选择列</th>
					<th>逻辑操作符</th>
					<th>逻辑操作的值</th>
					<th></th>
				</tr>
			</thead>
			<tbody >
				<tr>
					<td>
						<p class="select">
							<select v-model="operatorCol">
								<option v-if="colNum === 0" :value="1">空</option>
								<option v-else v-for="col in colNum" :value="$index+1">{{ getCharCol(col + 1) }}</option>
							</select>
						</p>
					</td>
					<td class="controls">
						<div class="select">
							<select class="select" v-model="operator">
								<option v-for="op in filterOptions" :value="op.char"> {{ op.words }} </option>
							</select>
						</div>
					</td>
					<td>
						<div class="">
							<input class="input" type="text" v-model="operatorVal">
						</div>
					</td>
					<td class="controls">
						<button class="button">确定</button>
					</td>
				</tr>
			</tbody>
		</table>
	</form>
</template>

<script>
	import { addFilter } from '../../vuex/actions'
	import { getSideBarStatus, getActiveSheet, getFilterOptions, getExcelData } from '../../vuex/getters'

	import { getCharCol } from '../../utils/excel'

	export default {
		data(){
			return {
				operatorVal: "",
				operatorCol: '1',
				operator: ">"
			}
		},
		vuex: {
			getters: {
				sideBarStatus: getSideBarStatus,
				activeSheet: getActiveSheet,
				filterOptions: getFilterOptions,
				excelData: getExcelData
			},
			actions: {
				addFilter
			}
		},
		computed: {
			colNum(){
				if(this.excelData[this.activeSheet.name])
					return this.excelData[this.activeSheet.name].length
				else
					return 0
			}
		},
		methods: {
			getCharCol,
			addFilterHandler(){
				var filterObj = {}
				var filterWords = ""
				var curCol = this.operatorCol
				var operator = this.operator
				var operatorChar = this.getOperatorWords(operator)
				var opVal = this.operatorVal.trim()
				console.log(operatorChar)
				if(opVal.length === 0) return

				var preStr = `第${curCol}列的值`
				// 判断是选择哪个操作符
				switch(operator){
					case 'startsWith': ;
					case 'ends': filterWords = preStr + `的${operatorChar}为“${opVal}”`;break;
					case 'regexp': filterWords = preStr + `应用了正则表达式"${opVal}"`;break;
					default: filterWords = preStr + `${operatorChar}"${opVal}"`;
				}

				filterObj = {
					col: curCol,
					operator: this.operator,
					value: opVal,
					filterWords: filterWords
				}

				this.operatorVal = ""
				
				// 触发 action：目前只做了表述文字，还需要进行筛选的value值
				this.addFilter(filterObj)
			},
			 getOperatorWords(operator){
			 	for(var i = 0, len = this.filterOptions.length; i < len; i++){
			 		var obj = this.filterOptions[i]
			 		if(obj.char === operator) return obj.words
			 	}
			}
		}
	}

</script>

<style scoped>
	form{
		transition: transform .6s;
	}
	table{
		margin-bottom: 0
	}
	.mL32{
		transform:translateX(32px)
	}
	caption{
		text-align: left;
	}
</style>