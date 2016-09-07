<!-- Excel -->
<template>
	<div class="excel-area">
		<div class="tabs is-boxed is-small excel-cheet-nav">
			<ul>
				<li v-for = "sheetName in excelData.sheetNameList" :class="{'is-active': $index == activeSheetIndex}" @click = "changeTab($index)">
					<a href="javascript:;">
						<span>{{ sheetName }}</span>
					</a>
				</li>
			</ul>
		</div>
		<!-- 根据cheetTittle 动态切换数据 -->

		<sheet-of-excel 
			v-for="sheetName in excelData.sheetNameList" 
			:sheet-data="excelData[sheetName]" v-if="$index === activeSheetIndex">
		</sheet-of-excel>
	</div>
</template>


<script>
	import { getExcelData, getActiveSheetIndex } from '../../vuex/getters'
	import { setActiveSheetIndex } from '../../vuex/actions'
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
				activeSheetIndex: getActiveSheetIndex
			},
			actions: {
				setActiveSheetIndex
			}
		},
		methods: {
			changeTab(index) {
				this.setActiveSheetIndex(index)
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