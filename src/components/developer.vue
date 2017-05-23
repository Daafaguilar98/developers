<template>
	<div class="developer_screen">
		<div class="developer">
			<span class="actionClose bold" v-on:click="closeDeveloper"><i class="material-icons">close</i>close</span>
			<img class="developer_photo" :src="data.photoURL">
			<div class="developer_info">
				<p class="bold">{{data.name}}</p>
				<p class="text bold">{{data.company}}</p>
				<p class="detail">{{data.stack}}</p>
				<p>{{data.job}}</p>
				<p class="detail green">{{data.email}}</p>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	props: ['data'],
	methods: {
		closeDeveloper(){
			this.$emit('hidden')
		}
	}
}
</script>
<style scoped>
	.developer_screen{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0px;
		z-index: 8;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.developer{
		max-width: 500px;
		display: flex;
		align-items: center;
		position: relative;
		background-color: #FFF;
		border-radius: 10px;
		box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
	}
	.actionClose{
		position: absolute;
		display: flex;
		cursor: pointer;
		justify-content: center;
		color: #FFF;
		right: 5px;
		top: -27px;
	}
	.developer_photo{
		width: 180px;
		left: -20px;
		position: absolute;
		border-radius: 10px;
	    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
	    background: #FFF;
	}
	.developer_info{
		margin-left: 170px;
		padding: 15px;
	}
	@media(max-width: 560px){
		.developer{
			justify-content: center;
		}
		.actionClose{
			top: initial;
			bottom: -27px;
		}
		.developer_photo{
			left: initial;
			bottom: 90%;
			border: 5px solid #FFF;
			box-shadow: rgba(0, 0, 0, 0.2) 0px -7px 10px 0px;

		}
		.developer_info{
			margin-left: 0px;
		}
	}
</style>