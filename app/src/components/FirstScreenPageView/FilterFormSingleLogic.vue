<template>
	<form @submit.prevent="addFilterHandler">
		<table class="table">
			<thead>
				<tr>
					<th>选择列</th>
					<th>逻辑操作符</th>
					<th>逻辑操作的值</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<p class="select">
							<select v-model="operatorCol">
								<option v-if="colNum === 0" 
									:value="1">
									空
								</option>
								<option v-else v-for="col in colNum" 
									:value="$index+1">
									{{ getCharCol(col + 1) }}
								</option>
							</select>
						</p>
					</td>
					<td class="controls">
						<div class="select">
							<select v-model="operator">
								<option v-for="op in filterOptions" 
									:value="op.char">
									{{ op.words }}
								</option>
							</select>
						</div>
					</td>
					<td>
						<!-- 不是“或”和“与”的情况下 -->
						<div v-if="isNotSingleLogicGroupOperator">
							<input class="input" type="text" 
								v-model="operatorVal">
						</div>
						<!-- 是“或”和“与”的情况下 -->
						<div v-else>
							<!-- 已添加的“和”“或”筛选条件 -->
							<div v-for="(index, subFilter) in subFilters" 
								class="subFilter control has-addons has-addons-centered">
							  <span class="select">
							    <select>
							    	<option :value="subFilter.operator">
							    		{{subFilter.words}}
							    	</option>
							    </select>
							  </span>
							  <input type="text" 
							  	class="input is-expanded" 
							  	readonly="true" 
							  	:value="subFilter.val">
							  <a class="button is-danger"  
							    @click="removeSubFilter($index)">
							    删除
							  </a>
							</div>
							<!-- 新增“和或”的按钮 -->
							<div>
								<div class="control has-addons has-addons-centered">
									<span class="select">
										<select v-model="subFilterOperator">
								      <option v-for="op in singleLogicGroupOperators" 
								      	:value="op.char" 
								      	:selected="$index === 0"> 
								      	{{ op.words }} 
								      </option>
								    </select>
								  </span>
								  <input type="text" class="input is-expanded" 
								  	v-model="subFilterVal">
									<a class="button is-success" 
										@click="addSubFilter($index)">
								    添加
								  </a>
							</div>
						</div>
					</td>
					<td>
						<button class="button">确定</button>
					</td>
				</tr>
			</tbody>
		</table>
	</form>
</template>

<script>
	import { addFilter } from '../../vuex/actions'
	import { getActiveSheet, getFilterOptions, getExcelData } from '../../vuex/getters'
	import { getCharCol } from '../../utils/excel'

	export default {
		data(){
			return {
				operatorVal: "",
				operatorCol: '1',
				operator: ">",
				subFilters: [],
				subFilterOperator: "",
				subFilterVal: ""
			}
		},
		vuex: {
			getters: {
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
			},
			isNotSingleLogicGroupOperator(){
				return this.operator !== "or" && this.operator !== "and"
			},
			singleLogicGroupOperators(){
				return this.filterOptions.filter((opt, index) => {
					if(opt.char === "or" || opt.char === "and") {
						return false
					}else{
						return true
					}
				})
			}
		},
		methods: {
			getCharCol,
			addSubFilter(index) {
				var subFilterOperator = this.subFilterOperator
				var subFilterVal = this.subFilterVal
				var subFilterWords = ""
				
				this.filterOptions.forEach((opt, index) => {
					if(opt.char === subFilterOperator){
						subFilterWords = opt.words
						return true
					}
				})

				if(!this.isNotSingleLogicGroupOperator && subFilterVal.trim().length === 0){
					alert("第1.2种表格 未填写完整")
					return
				}

				if(!this.isNotSingleLogicGroupOperator){
					this.subFilters.push({
						operator: subFilterOperator,
						val: subFilterVal,
						words: subFilterWords
					})

					this.subFilterOperator = ">" 
					this.subFilterVal = ""
				}
			},
			removeSubFilter(index) {
				this.subFilters.splice(index, 1)
			},
			addFilterHandler() {

				var filterObj = {}
				var filterWords = ""
				var curCol = this.operatorCol
				var operator = this.operator
				var operatorWords = this.getOperatorWords(operator)
				var opVal = this.operatorVal.trim()
				var subFilters = this.subFilters

				if(this.isNotSingleLogicGroupOperator && opVal.length === 0 || 
					!this.isNotSingleLogicGroupOperator && this.subFilters.length === 0) {
					alert("请填写完整")
					return
				}
				var preStr = `第${curCol}列的值`

				if(!this.isNotSingleLogicGroupOperator) {
					var tempStr = ""
					for(var i = 0, len = subFilters.length; i < len; i++){
						var curFilter = this.subFilters[i]
						var primitiveFilterWords = this.getFilterWordPrimitive(curFilter.operator, curFilter.words, curFilter.val)
						tempStr += i !== len - 1 ? `${primitiveFilterWords} ${operatorWords} ` : `${primitiveFilterWords}`
					}
					filterWords = preStr + tempStr
				}else{
					filterWords = preStr + this.getFilterWordPrimitive(operator, operatorWords, opVal)
				}

				filterObj = {
					col: curCol - 1,
					operator: this.operator,
					value: opVal,
					filterWords: filterWords,
					subFilters: this.subFilters
				}

				// 触发 action：目前只做了表述文字，还需要进行筛选的value值
				this.addFilter(filterObj)
				this.operatorVal = ""
				this.subFilters = []
			},
			getFilterWordPrimitive(operator, operatorWords, val){
				var primitiveFilterWords = ""
				// 判断是选择哪个操作符
				switch(operator){
					case 'startsWith': ;
					case 'ends': primitiveFilterWords = `的${operatorWords}为“${val}”`;break;
					case 'regexp': primitiveFilterWords = `应用了正则表达式"${val}"`;break;
					default: primitiveFilterWords = `${operatorWords}"${val}"`;
				}
				return primitiveFilterWords
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
	table{
		margin-bottom: 0
	}
	caption{
		text-align: left;
	}
</style>