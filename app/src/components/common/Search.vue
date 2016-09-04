<template>
	<p class="control has-addons file-search">
	  <span class="select">
	    <select v-model="extension">
	      <option v-for="extension in fileExtensions">
	      	{{ extension }}
	      </option>
	    </select>
	  </span>
	  <input class="input is-expanded" type="text" placeholder="搜的一下，奔溃了..." v-model="queryCondition">
	  <a class="button is-success">
	    <i class="fa fa-search is-small"></i>
	  </a>
	</p>
</template>

<script>

	export default {
		/* 与文件列表的共同数据
		fileExtensions
		curExtensionIndex
		curExtensionName*/
		data(){
			return {
				fileExtensions: ["All", "xls", "xlsx"],
				curExtensionIndex: 0,
				curExtensionName: "all",
				queryCondition: "",
				extension: "All"
			}
		},
		pros: {

		},
		methods: {
			submit(){
				if(this.queryCondition.trim().length === 0) return false

				// 传递给 FileList 组件，进行过滤
			}
		}
	}
</script>


<style scoped>
	.file-search{
		padding: 5px 3px;
		margin-bottom: 0px;
	}
</style>