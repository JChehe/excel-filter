<template>
	<div class="filter-list has-text-left">
		<filter-condition-tag track-by="$index" v-for="filter in getFilterList" :filter="filter">
		</filter-condition-tag>
	</div>
</template>

<script>
	import FilterConditionTag from './FilterConditionTag'
	import { getFilterList, mainCounter } from '../../vuex/getters'

	export default {
		components: {
			FilterConditionTag
		},
		vuex: {
			getters: {
				getFilterList,
				// mainCounter,
				mainCounter
			}
		}
	}
</script>

<style scoped>
	.filter-area>div{
		position: relative;
	}
</style>