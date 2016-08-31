<template>
	<p class="control has-addons file-search">
	  <span class="select">
	    <select>
	      <option>all</option>
	      <option>xls</option>
	      <option>xlsx</option>
	    </select>
	  </span>
	  <input class="input is-expanded" type="text" placeholder="搜的一下，奔溃了...">
	  <a class="button is-success">
	    <i class="fa fa-search is-small"></i>
	  </a>
	</p>
</template>

<script>

	export default {
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
	.file-search{
		padding: 5px 3px;
	}
</style>