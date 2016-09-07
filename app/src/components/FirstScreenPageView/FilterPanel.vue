<template>
	<div class="filter-area">
		<div class="is-clearfix">
			<filter-form class="is-pulled-left"></filter-form>
			<div class="is-pulled-right">
				<button class="button" title="筛选完成，导出文件">导出</button>
			</div>
		</div>
		<filter-tag-list></filter-tag-list>
	</div>
</template>

<script>
	import FilterTagList from './FilterTagList'
	import FilterForm from './FilterForm'
	import { getFilterList } from '../../vuex/getters'

	export default{
		components: {
			FilterTagList,
			FilterForm
		},
		data() {
			return {
				curCol: 1,
				filterVal: "",
				colOfSheet: 1
			}
		},
		methods: {
			submit(){
				if(filterVal.tirm().length === 0) return false
			}
		}
	}
</script>

<style scoped>
	.filter-area>*{
		padding: 5px;
	}
	#filter-form{
		margin-bottom: 0
	}
	#filter-form input{
		border-radius: 3px 0 0 3px;
	}
	#filter-form .label{
		/*vertical-align: middle;*/
		line-height: 32px;
	}
	.filter-area.isShowSideBar{
		padding-left: 28px;
	}
</style>