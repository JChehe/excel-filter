<!-- Excel -->
<template>
	<div class="excel-area">
		<div class="tabs is-boxed is-small excel-cheet-nav">
			<ul>
				<li v-for = "sheetName in excelData.sheetNameList" :class="{'is-active': $index == activeSheet.index}" @click = "changeTab($index)">
					<a href="javascript:;">
						<span>{{ sheetName }}</span>
					</a>
				</li>
			</ul>
		</div>
		<!-- 根据cheetTittle 动态切换数据 -->

		<sheet-of-excel 
			v-for="sheetName in excelData.sheetNameList" 
			:sheet-data="filteredData[sheetName]" v-if="$index === activeSheet.index">
		</sheet-of-excel>
	</div>
</template>


<script>
	import { getExcelData, getActiveSheet, getFilteredData } from '../../vuex/getters'
	import { setActiveSheet } from '../../vuex/actions'
	import SheetOfExcel from './SheetOfExcel'

	export default {
		components: {
			SheetOfExcel
		},
		data() {
			return {
			}
		},
		vuex: {
			getters: {
				excelData: getExcelData,
				activeSheet: getActiveSheet,
				filteredData: getFilteredData
			},
			actions: {
				setActiveSheet
			}
		},
		methods: {
			changeTab(index) {
				this.setActiveSheet(index)
			},
			sidebarStatus: function() {
				return this.getSideBarStatus ? "enter" : "leave"
			}
		}
	}

</script>

<style scoped>
	.excel-area{
		max-width: 100%;
		width: 100%;
		height: calc(100% - 86px);
	}
	.excel-area{
		padding: 5px;
	}
	.excel-cheet-nav {
		margin-bottom: 5px;
	}
	.excel-cheet-nav ul{
		padding-left: 5px;
	}
</style>