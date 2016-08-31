<template>
	<div class="upload-btn">
		<button class="button is-primary is-outlined is-fullwidth file-mask">上传Excel文件</button>
		<input type="file" name="upload-excel-input">
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style scoped>
	.upload-btn{
		position: relative;
		height: 32px;
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