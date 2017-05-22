<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
	@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:100i,400,700');

	*{
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	  	font-family: 'Roboto Mono', monospace;
	}
	body{
		background-color: #F3F3F3;
	}
	.subtitle{
		font-size: 25px;
		color: #211934;
	}
	.detail{
		font-size: 13px;
		color: gray;
	}
	.bold{
		font-weight: 800;
	}
	.light{
		font-weight: 100;
	}
	.italic{
		font-style: italic;
	}
	.green{
		font-weight: bold;
		color: #00C853;
	}
	input, select, textarea, button{font-family:inherit;}
</style>
