<template>
	<span class="tag is-warning" :title="filterObj.operator + filterObj.value">
		{{ filterObj.filterWords }}
		<button class="delete"></button>
	</span>
</template>

<script>
	export default {
		props: {
			filterObj: {
				type: Object,
				required: true
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