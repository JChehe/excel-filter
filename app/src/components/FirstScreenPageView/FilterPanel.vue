<template>
	<div class="filter-area">
		<div class="is-clearfix">
			<filter-form class="is-pulled-left"></filter-form>
			<div class="is-pulled-right">
				<button class="button" title="筛选完成，导出文件">导出</button>
			</div>
		</div>
		<div class="filter-list has-text-left">
			<filter-condition-tag></filter-condition-tag>
			<filter-condition-tag></filter-condition-tag>
			<filter-condition-tag></filter-condition-tag>
		</div>
	</div>
</template>

<script>
	import FilterConditionTag from './FilterConditionTag'
	import FilterForm from './FilterForm'
	export default{
		components: {
			FilterConditionTag,
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
	.filter-list>.tag{

	}

	.filter-area>div{
		position: relative;
	}
</style>