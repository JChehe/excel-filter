<template>
	<div class="upload-btn">
		<button class="button is-primary is-outlined is-fullwidth file-mask">上传Excel文件</button>
		<input type="file" name="upload-excel-input" @change="handleFile">
	</div>
</template>

<script>
	// import xlsx from './assets/xlsx.full.min.js'
	export default {
		data(){
			return {

			}
		},
		vuex: {
			getters: {

			},
			actions: {

			}
		},
		methods: {
			handleFile(e) {
				var files = e.target.files
				var i,f
				/*for(var i = 0, f = files[i]; i != files.length; i++){
					var reader = new FileReader()
					var name = f.name
					reader.onload = function(e){
						var data = e.target.result

						var workbook = XLSX.read(data, {type: 'binary'})
						console.log(workbook)
					}

					reader.readAsBinaryString(f)
				}*/
			}
		}
	}
</script>
<!-- <script src="./assets/xlsx.full.min.js"></script> -->
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
		/*pointer-events: none;*/
	}
</style>