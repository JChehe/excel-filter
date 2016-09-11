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

		<div class="drop-area content" @drop="dropHandler" v-if="!excelData.sheetNameList">
			<p>拖拽一个Excel文件到这里即可完成上传</p>
		</div>
		<sheet-of-excel v-else
			v-for="sheetName in excelData.sheetNameList" 
			:sheet-data="filteredData[sheetName]" v-if="$index === activeSheet.index">
		</sheet-of-excel>
	</div>
</template>


<script>
	import { getExcelData, getActiveSheet, getFilteredData } from '../../vuex/getters'
	import { setActiveSheet, setExcelData } from '../../vuex/actions'
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
				setActiveSheet,
				setExcelData
			}
		},
		created(){
			setTimeout(() => {
				var dropArea = document.querySelector(".drop-area")
				console.log(dropArea)
				dropArea.addEventListener("dragenter", dragoverHandler, false)
				dropArea.addEventListener("dragover", dragoverHandler, false)
				function dragoverHandler(e){
					e.stopPropagation()
					e.preventDefault()
					e.dataTransfer.dropEffect = 'copy'
				}
			}, 0)
		},
		methods: {
			changeTab(index) {
				this.setActiveSheet(index)
			},
			dropHandler(e){
				e.stopPropagation()
				e.preventDefault()
				var files = e.dataTransfer.files
				var i, f
				for(var i = 0, f = files[i]; i != files.length; i++){
					var reader = new FileReader()
					var name = f.name
					reader.onload = (e) => {
						var data = e.target.result

						this.setExcelData(data)
						this.setActiveSheet(0)
					}
					reader.readAsBinaryString(f)
				}
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

	.drop-area{
		width: calc(100vw - 295px);
		display: block;
		overflow: auto;
		height:calc(100vh - 226px);
		border: 3px dashed #69707a;
		display: table-cell;
		font-size: 18px;
		vertical-align: middle;
	}
</style>