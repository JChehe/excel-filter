<!-- Excel -->
<template>
	<div class="excel-area">
		<div class="tabs is-boxed is-small excel-cheet-nav">
			<ul>
				<li v-for = "sheetTitle in excelData.SheetNames" :class="{'is-active': $index == curActive}" @click = "changeTab($index)">
					<a href="javascript:;">
						<span>sheetTitle</span>
					</a>
				</li>
			</ul>
		</div>
		<!-- 根据cheetTittle 动态切换数据 -->
		<sheet-of-excel :sheets = "excelData.Sheets"></sheet-of-excel>
	</div>
</template>


<script>

	import SheetOfExcel from './SheetOfExcel'

	export default {
		components: {
			SheetOfExcel
		},
		data() {
			return {
				excelData: {
			    SheetNames: ['sheet1', 'sheet2'],
			    Sheets: {
		        'sheet1': {
	            'A1': { val: 'sheet1_A1'},
	            'A2': { val: 'sheet1_A2'}
		        },
		        'sheet2': {
	            'A1': { val: 'sheet2_A1' },
	            'A2': { val: 'sheet2_A2' }
		        }
			    }
				},
				curActive: 0
			}
		},
	
		methods: {
			changeTab(index) {
				this.curActive = index
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