<template>
	<nav id="sidebar" class="panel" v-show="getSideBarStatus" transition="horizontalMove">
		<div class="panel-heading has-text-left">
			文件列表
			<span class="icon is-pulled-right toggle-button" title="点击收缩侧栏边" @click="toggleSideBar">
				<i class="fa fa-angle-left"></i>
			</span>
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
	import { getSideBarStatus } from '../../vuex/getters'
	import { toggleSideBar } from '../../vuex/actions'

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
		vuex: {
			getters: {
				getSideBarStatus
			},
			actions: {
				toggleSideBar
			}
		}

	}
</script>


<style scoped>
	#sidebar{
		background: #fff;
		height: calc(100vh - 50px);
		position: relative;
		overflow: hidden;
	}

	.panel-heading{
		position: relative;
	}

	#sidebar.enter .toggle-button{
		background-color: rgba(255,255,255,.9);
		position: absolute;
		right: 0;
		-webkit-transform: translateX(100%);
		transform: translateX(100%);
	}

	.toggle-button{
		cursor: pointer;
	}

	.horizontalMove-transition{
		-webkit-transition: all .6s;
		transition: all .6s;
	}

	.horizontalMove-enter{
		transform: translateX(0);
		width: 0px;
		opacity: 0;
	}
	.horizontalMove-leave{
		transform: translateX(-100%);
		opacity: 0;
		width: 0;
	}

	
</style>