<template>
	<v-header class="is-overlay"></v-header>
	<main class="is-fullwidth">
		<div class="columns is-mobile is-overlay">
			<div class="column is-narrow">
				<side-bar style=""></side-bar>
			</div>
			<div class="column is-9">
				<v-main></v-main>
			</div>
		</div>
	</main>
</template>

<script>
	import SideBar from './common/SideBar'
	import vHeader from './common/Header'
	import vMain from './FirstScreenPageView/vMain'
	
	export default {
		components: {
			vHeader,
			SideBar,
			vMain
		},
		name: 'first-screen'
	}
</script>

<style scoped>
	main{
		width: 100%;
		margin-top: 52px;
		position: relative;
		height: calc(100vh - 52px);
	}
</style>