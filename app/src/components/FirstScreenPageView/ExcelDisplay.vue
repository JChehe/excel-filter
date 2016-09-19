<!-- Excel -->
<template>
	<div class="excel-area">
		<div class="tabs is-boxed is-small excel-cheet-nav">
			<ul>
				<li v-for = "sheetName in excelData.sheetNameList" 
					:class="{'is-active': $index == activeSheet.index}"
					@click = "changeTab($index)">
					<a href="javascript:;">
						<span>{{ sheetName }}</span>
					</a>
				</li>
			</ul>
		</div>
		<!-- 根据cheetTittle 动态切换数据 -->
		<div :class="['tabs-body', {isShowSideBar: !sideBarStatus}]">
			<div class="drop-area content" 
				v-show="!excelData.sheetNameList"
				@drop.prevent.stop="dropHandler" 
				>
				<p>拖拽一个Excel文件到这里即可完成上传</p>
			</div>
			<sheet-of-excel v-for="sheetName in excelData.sheetNameList"
				:sheet-data="filteredData[activeSheet.name]"
				v-if="excelData.sheetNameList"
				v-show="activeSheet.index === $index"
				>
			</sheet-of-excel>
		</div>
	</div>
</template>


<script>
	import fs from 'fs-extra'
	import path from 'path'
	import { getExcelData, getActiveSheet, getFilteredData, getSideBarStatus } from '../../vuex/getters'
	import { setActiveSheet, setExcelData, setUploadFiles } from '../../vuex/actions'
	import SheetOfExcel from './SheetOfExcel'
	

	export default {
		components: {
			SheetOfExcel
		},
		vuex: {
			getters: {
				excelData: getExcelData,
				activeSheet: getActiveSheet,
				filteredData: getFilteredData,
				sideBarStatus: getSideBarStatus
			},
			actions: {
				setActiveSheet,
				setExcelData,
				setUploadFiles
			}
		},
		created(){
			setTimeout(() => {
				var dropArea = document.querySelector(".drop-area")
				if(dropArea) {
					dropArea.addEventListener("dragenter", dragoverHandler, false)
					dropArea.addEventListener("dragover", dragoverHandler, false)
				}
			}, 0)
			function dragoverHandler(e){
				e.stopPropagation()
				e.preventDefault()
				e.dataTransfer.dropEffect = 'copy'
			}
		},
		methods: {
			changeTab(index) {
				this.setActiveSheet(index)
			},
			dropHandler(e){
				
				var files = e.dataTransfer.files
				var i, f
				for(var i = 0, f = files[i]; i != files.length; i++){
					var curFile = files[i]

					this.setUploadFiles({
			      path: curFile.path,
			      name: curFile.name,
			      extname: path.extname(curFile.path)
			    })
					
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
	.tabs-body{
		width: calc(100vw - 295px);
		display: block;
		overflow: auto;
		height:calc(100vh - 226px);
	}

	.tabs-body.isShowSideBar{
		width: calc(100vw - 24px)
	}
	.drop-area{
		border: 3px dashed #69707a;
		font-size: 18px;
		position: relative;
		vertical-align: middle;
	}
	.drop-area>p{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.tabs-body>*{
		display: block;
		width: 100%;
		height: 100%;
	}
</style>