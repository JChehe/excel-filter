<template>
	<div class="filter-list has-text-left">
		<filter-condition-tag v-for="filterObj in curFilterTagList" :filter-obj="filterObj">
		</filter-condition-tag>
	</div>
</template>

<script>
	import FilterConditionTag from './FilterConditionTag'
	import { getFilterTagList, getActiveSheetIndex, getExcelData } from '../../vuex/getters'

	export default {
		components: {
			FilterConditionTag
		},
		vuex: {
			getters: {
				filterTagList: getFilterTagList,
				activeSheetIndex: getActiveSheetIndex,
				excelData: getExcelData
			}
		},
		computed: {
			curFilterTagList: function(){
				console.log("1212")
				
				if(this.excelData && this.excelData.sheetNameList instanceof Array){
					var curSheetName = this.excelData.sheetNameList[this.activeSheetIndex]
					console.log(curSheetName)
					return this.filterTagList[curSheetName]
				}
			}
		}
	}
</script>

<style scoped>
	.filter-area>div{
		position: relative;
	}
</style>