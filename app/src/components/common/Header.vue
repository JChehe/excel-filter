<template>
	<header class="is-overlay">
		<nav class="nav">
		  <div class="nav-left">
		    <a class="nav-item is-brand" href="#">
		      <img src="./assets/o2logo.png" alt="Aotu logo}">
		    </a>
		  </div>

		  <span class="nav-toggle" @click="toggleNav">
		    <span></span>
		    <span></span>
		    <span></span>
		  </span>

		  <div class="nav-right nav-menu" :class = "{'show': isShowNav}">
		    <a class="nav-item" href="#">
		      Home
		    </a>
		    <a class="nav-item" href="#">
		      Documentation
		    </a>
		    <a class="nav-item" href="#">
		      Blog
		    </a>

		    <span class="nav-item">
		      <a class="button" >
		        <span class="icon">
		          <i class="fa fa-twitter"></i>
		        </span>
		        <span>Tweet</span>
		      </a>
		      <a class="button is-primary" href="#">
		        <span class="icon">
		          <i class="fa fa-download"></i>
		        </span>
		        <span>Download</span>
		      </a>
		    </span>
		  </div>
		</nav>
	</header>
</template>

<script>
	export default {
		data() {
			return {
				isShowNav: false
			}
		},
		methods: {
			toggleNav() {
				console.log(this.isShowNav)
				this.isShowNav = !this.isShowNav
			}
		}
	}
</script>

<style scoped>
	header{
		height: 52px;
	}
	.nav-menu.show{
		display: block;
	}
</style>