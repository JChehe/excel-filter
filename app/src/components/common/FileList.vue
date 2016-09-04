<template>
	<nav class="panel file-panel">
	  <p class="panel-tabs is-left">
	    <a href="#" 
	    	v-for="extension in fileExtensions" 
	    	:class="{'is-active': $index === curExtensionIndex}" 
	    	@click="changeExtensions($index, extension)">
	    	{{ extension }}
	    </a>
	  </p>
	  <div class="list">
	  	<a href="#" class="panel-block"
	  		v-for="file in filteredFileList">
		    <span class="panel-icon">
		      <i class="fa fa-book"></i>
		    </span>
		    {{ file }}
		  </a>
	  </div>
	</nav>
</template>


<script>
	export default {
		data(){
			return {
				fileExtensions: ["All", "xls", "xlsx"],
				fileList: ["1.xls", "2.xls", "3.xls", "4.xlsx", "5.xlsx"],
				curExtensionIndex: 0,
				curExtensionName: "all"
			}
		},
		created(){
			// test filterByFileExtension method
		},
		computed: {
			filteredFileList() {
				return this.filterByFileExtension(this.curExtensionName)
			}
		},
		methods: {
			changeExtensions(n, s){
				this.curExtensionIndex = n
				this.curExtensionName = s
			},
			filterByFileExtension(s){
				if( s.toUpperCase() === this.fileExtensions[0].toUpperCase()) return this.fileList // 此处返回值还是判断是否是搜索状态下
				var filterRegExp = new RegExp(( s + "$" ), "gi")

				return this.fileList.filter((fileName, index) => {
					if(fileName.match(filterRegExp)) return true
				})
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