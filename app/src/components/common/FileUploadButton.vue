<template>
	<div class="upload-btn">
		<button class="button is-primary is-outlined is-fullwidth file-mask">上传Excel文件</button>
		<input type="file" name="upload-excel-input" 
			@change="handleFile">
	</div>
</template>

<script>
	import fs from 'fs-extra'
	import path from 'path'
	import { setExcelData, setActiveSheet, setUploadFiles } from '../../vuex/actions'
	
	export default {
		vuex: {
			actions: {
				setExcelData,
				setActiveSheet,
				setUploadFiles
			}
		},
		methods: {
			handleFile(e) {
				var files = e.target.files
				var i,f

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
	.upload-btn{
		position: relative;
		height: 32px;
		overflow: hidden;
	}
	.file-mask{
	}
	.file-mask, input[name="upload-excel-input"]{
		position: absolute;
		left: 0;right: 0;
		top: 0;bottom: 0;
		cursor: pointer;
	}
	input[name="upload-excel-input"]{
		opacity: 0;
	}
</style>