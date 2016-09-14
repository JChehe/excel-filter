<template>
	<v-header class="is-overlay"></v-header>
	<main class="is-fullwidth">
		<instructions>
			
		</instructions>
	</main>
</template>

<script>
	import vHeader from './common/Header'
	import Instructions from './InstructionsPageView/instructions'
	export default {
		components: {
			vHeader,
			Instructions
		},
		name: "instructions",
	}
</script>

<style scoped>
	
</style>