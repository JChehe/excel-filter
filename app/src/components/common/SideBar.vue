<template>
	<nav id="sidebar" class="panel">
		<div class="panel-heading has-text-left">
			文件列表
		</div>
		<div>

			<search></search>
			<file-list></file-list>
			<fixed-side-bar-bottom></fixed-side-bar-bottom>
		</div>
	</nav>
</template>

<script>
	import Search from './Search'
	import FileList from './FileList'
	import FixedSideBarBottom from './FixedSideBarBottom'

	export default {
		components: {
			Search,
			FileList,
			FixedSideBarBottom
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
	#sidebar{
		background: #fff;
		height: calc(100vh - 52px);
		position: relative;
	}
</style>