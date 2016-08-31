<template>
	<div class="fixedBottom is-fullwidth panel-block">
		<file-upload-button></file-upload-button>
	</div>
</template>

<script>
	import FileUploadButton from './FileUploadButton'

	export default {
		components: {
			FileUploadButton
		},
		data(){
			return {

			}
		},
		pros: {

		},
		methods: {
			
		}

	}
</script>


<style scoped>
	

	.fixed-bottom{
		position: absolute;
		bottom: 0;
	}
</style>