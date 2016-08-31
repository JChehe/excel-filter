<template>
	<nav class="panel file-panel">
	  <p class="panel-heading">
	    Repositories
	  </p>
	  <p class="panel-tabs">
	    <a class="is-active" href="#">All</a>
	    <a href="#">xls</a>
	    <a href="#">xlsx</a>
	  </p>
	  <div class="list">
	  	<a class="panel-block is-active" href="#">
		    <span class="panel-icon">
		      <i class="fa fa-book"></i>
		    </span>
		    bulma-website
		  </a>
		  <a class="panel-block" href="#">
		    <span class="panel-icon">
		      <i class="fa fa-book"></i>
		    </span>
		    bulma
		  </a>
		  <a class="panel-block" href="#">
		    <span class="panel-icon">
		      <i class="fa fa-book"></i>
		    </span>
		    marksheet
		  </a>
		  <a class="panel-block" href="#">
		    <span class="panel-icon">
		      <i class="fa fa-code-fork"></i>
		    </span>
		    daniellowtw/infBoard
		  </a>
		  <a class="panel-block" href="#">
		    <span class="panel-icon">
		      <i class="fa fa-book"></i>
		    </span>
		    jgthms.github.io
		  </a>
		  <a class="panel-block" href="#">
		    <span class="panel-icon">
		      <i class="fa fa-code-fork"></i>
		    </span>
		    mojs
		  </a>
		  <a class="panel-block" href="#">
		    <span class="panel-icon">
		      <i class="fa fa-book"></i>
		    </span>
		    grumpy-cat
		  </a>
		  <a class="panel-block" href="#">
		    <span class="panel-icon">
		      <i class="fa fa-book"></i>
		    </span>
		    grumpy-cat
		  </a>
		  <a class="panel-block" href="#">
		    <span class="panel-icon">
		      <i class="fa fa-book"></i>
		    </span>
		    grumpy-cat
		  </a>
		  <a class="panel-block" href="#">
		    <span class="panel-icon">
		      <i class="fa fa-book"></i>
		    </span>
		    grumpy-cat
		  </a>
	  </div>
	</nav>
</template>


<script>
	export default {
		
	}


</script>

<style>
	.file-panel{
		position: relative;
	}
	.panel{
		text-align: left;
	}
	.list{
		display: block;
		height: calc(100vh - 285px);
		overflow: auto;
	}
	.list:after{
		content: "";
		height: 0px;
		display: block;
		width: 100%;
		background-color: black;
		position: absolute;
		bottom: -1px;
		box-shadow: 0 -5px 15px 1px rgba(0,0,0,.6)
	}
</style>