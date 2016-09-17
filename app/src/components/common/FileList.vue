<template>
	<nav class="panel file-panel">
	  <p class="panel-tabs is-left">
	    <a href="#" 
	    	v-for="fileType in allFileType" 
	    	:class="{'is-active': $index === curTypeIndex}" 
	    	@click="tabFileType($index, fileType)">
	    	{{ fileType }}
	    </a>
	  </p>
	  <div class="list">
	  	<a href="#" class="panel-block"
	  		v-for="file in fileList | filterByQuery curSearchVal | filterByType curTypeName">
		    <span class="panel-icon">
		      <i class="fa fa-book"></i>
		    </span>
		    {{ file.name }}
		  </a>
	  </div>
	</nav>
</template>


<script>
	import { changeFileType } from '../../vuex/actions'
	import { getCurSearchVal, getAllFileType, getUploadFiles} from '../../vuex/getters'

	export default {
		data(){
			return {
				curTypeIndex: 0,
				curTypeName: "all",
				filterFileList: []
			}
		},
		vuex: {
			getters: {
				fileList: getUploadFiles,
				allFileType: getAllFileType,
				curSearchVal: getCurSearchVal
			},
			actions: {
				changeFileType
			}
		},
		methods: {
			tabFileType(n, s){
				this.curTypeIndex = n
				this.curTypeName = s
			}
		}
	}


</script>

<style>
	.panel-tabs.is-left{
		-webkit-box-pack: start;
      -ms-flex-pack: start;
        justify-content: flex-start;
	}
	.file-panel{
		position: relative;
		border: 0;
		margin-bottom: 0!important;
	}
	.panel{
		text-align: left;
	}
	.list{
		display: block;
		height: calc(100vh - 226px);
		overflow: auto;
	}
	.list{
		box-shadow: inset 0 -6px 20px -12px rgba(0,0,0,.7)
	}
</style>