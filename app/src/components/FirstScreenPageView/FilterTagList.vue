<template>
	<div class="filter-list has-text-left">
		<filter-condition-tag v-for="filterObj in filterTagList[activeSheet.name]" :filter-obj="filterObj" @click="delFilter($index)">
		</filter-condition-tag>
	</div>
</template>

<script>
	import FilterConditionTag from './FilterConditionTag'
	import { getFilterTagList, getActiveSheet, getExcelData } from '../../vuex/getters'
	import { delFilter } from '../../vuex/actions'

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
			},
			actions: {
				delFilter
			}
		},
		computed: {
			curSheetName: {
				cache: false,
				get: function(){
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