<template>
	<form @submit.prevent="searchHandler">
		<div class="control has-addons file-search">
		  <input class="input is-expanded" type="text" placeholder="搜的一下，奔溃了..." v-model="queryStr">
		  <button type="submit" class="button is-success">
		    <i class="fa fa-search is-small"></i>
		  </button>
		</div>
	</form>
</template>

<script>
	import { changeFileType, changeSearchVal } from '../../vuex/actions'
	import { getCurSearchVal } from '../../vuex/getters'
	export default {
		/* 与文件列表的共同数据
		fileExtensions
		curExtensionIndex
		curExtensionName*/
		data(){
			return {
				queryStr: "",
			}
		},
		vuex: {
			actions: {
				changeSearchVal
			}
		},
		methods: {
			searchHandler(){
				var queryStr = this.queryStr.trim()
				// if(queryStr.length === 0) return false

				this.changeSearchVal(queryStr)
			this.queryStr = ""
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