<template>
	<span class="tag is-warning" :title="filterObj.operator + filterObj.value">
		{{ filterObj.filterWords }}
		<button class="delete" @click="delFilter($index)"></button>
	</span>
</template>

<script>
	import { delFilter } from '../../vuex/actions'

	export default {
		props: {
			filterObj: {
				type: Object,
				required: true
			}
		},
		vuex: {
			actions: {
				delFilter
			}
		},
		methods: {

		}
	}
</script>


<style scoped>
	.tag{
		margin:0 5px 5px 0;
	}
</style>