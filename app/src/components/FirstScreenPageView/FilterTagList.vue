<template>
	<div class="filter-list has-text-left">
		<filter-tag v-for="filterObj in filterTagList[activeSheet.name]" 
			:filter-obj="filterObj">
		</filter-tag>
	</div>
</template>

<script>
	import FilterTag from './FilterTag'
	import { getFilterTagList, getActiveSheet, getExcelData } from '../../vuex/getters'

	export default {
		components: {
			FilterTag
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