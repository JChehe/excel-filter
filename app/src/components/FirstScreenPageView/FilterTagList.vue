<template>
	<div class="filter-list has-text-left">
		<filter-condition-tag v-for="filterObj in filterTagList[activeSheet.name]" 
			:filter-obj="filterObj">
		</filter-condition-tag>
	</div>
</template>

<script>
	import FilterConditionTag from './FilterConditionTag'
	import { getFilterTagList, getActiveSheet, getExcelData } from '../../vuex/getters'

	export default {
		components: {
			FilterConditionTag
		},
		data(){
			return {
				curFilterTagList: []
			}
		},
		vuex: {
			getters: {
				filterTagList: getFilterTagList,
				activeSheet: getActiveSheet,
				excelData: getExcelData
			}
		},
		computed: {
			curSheetName: {
				cache: false,
				get() {
					if(this.excelData && this.excelData.sheetNameList instanceof Array){
						var curSheetName = this.activeSheet.name
						return curSheetName
					}
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