<template>
	<span class="tag is-warning">
		{{ filter }}
		<button class="delete" @click="delFilter($index)"></button>
	</span>
</template>

<script>
	import {delFilter} from '../../vuex/actions'
	export default {
		props: {
			filter: {
				type: [Object, String],
				required: true
			}
		},
		vuex: {
			actions: {
				delFilter: delFilter
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