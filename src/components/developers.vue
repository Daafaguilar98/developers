<template>
  <div class="developers">
    <developer :data="developerContent" v-on:hidden="toggleDeveloper" v-show="showDeveloper"></developer>
    <console v-on:hidden="toggleConsole" v-show="showConsole" v-bind:database="database" 
    														  v-bind:storage="storage"></console>
    <h1>Desarrolladores Villavicencio</h1>
    <p class="subtitle light italic">{[(Si se puede <strong>imaginar</strong>, se puede <strong>programar</strong>)]}</p>
    <div v-on:click="toggleConsole" class="actionConsole">
        <img src="../assets/console.png">
        <p class="bold">createUser()</p>
    </div>
    <div class="developers_items">
	    <div class="developer" v-for="user in users" v-on:click="updateData(user)">
	    	<div class="developer_image">
	    		<div class="img">
	    			<img :src="user.photoURL">
	    		</div>
	    	</div>
	    	<div class="developer_info">
	    		<p class="text">{{user.name}}</p>
	    		<p class="detail">{{user.job}}</p>
	    	</div>
	    </div>
    </div>
  </div>
</template>

<script>
import console from './console.vue'
import developer from './developer.vue'

import Vue from 'vue'
import Firebase from 'firebase'
import VueFire from 'vuefire'
const config = {
	apiKey: "AIzaSyA-8aj7ZwdhE4qO3YZhoC66oum_UhGzrlU",
    authDomain: "developers-6cfb7.firebaseapp.com",
    databaseURL: "https://developers-6cfb7.firebaseio.com",
    projectId: "developers-6cfb7",
    storageBucket: "developers-6cfb7.appspot.com",
    messagingSenderId: "1091339986953" 
}
Firebase.initializeApp(config);
window.document.firebase = Firebase;
let db = Firebase.database();
let storage = Firebase.storage();

Vue.use(VueFire)

export default {
  components: { console, developer },
  name: 'developers',
  data () {
    return {
      showConsole: false,
      database: db,
      storage,
      showDeveloper: false,
      developerContent: {},
    }
  },
  firebase: {
  	usersOriginal: db.ref('/users')
  },
  computed: {
    users() {
      let usersOriginal = this.usersOriginal;
      let size = usersOriginal.length;
      let newOrderUsers = [];
      for (var i = 0; i < size; i++) {
        let positionRandom = Math.round(Math.random());
        if(positionRandom == 1){
          newOrderUsers.push(usersOriginal[i]);
        }else{
          newOrderUsers.unshift(usersOriginal[i]);
        }
      }
      return newOrderUsers
    }
  },
  methods: {
    toggleConsole(){
      this.showConsole = !this.showConsole;
    },
    toggleDeveloper(){
      this.showDeveloper = !this.showDeveloper;
    },
    updateData(data){
      this.developerContent = data;
      this.toggleDeveloper();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .developers{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .developers > h1, .developers > p{
    text-align: center;
  }
  h1{
    margin-top: 50px;
    color: #211934;
  }
  .actionConsole{
  	margin-top: 40px;
  	display: flex;
  	align-items: center;
  	color: #211934;
  	cursor: pointer;
  }
  .actionConsole p{
  	margin-left: 10px;
  }
  .developers_items{
  	margin-top: 20px;
  	width: 100%;
  	display: flex;
  	justify-content: space-around;
  	flex-wrap: wrap;
  }
  .developer{
  	width: 250px;
  	height: 80px;
  	background-color: #FFF;
  	border-radius: 12px;
  	display: flex;
  	margin-bottom: 10px;
    cursor: pointer;
  }
  .developer_image{
  	width: 80px;
  	height: 100%;
  	display: flex;
  	justify-content: center;
  	align-items: center;
  }
  .developer_image .img{
  	width: 60px;
  	height: 60px;
  	display: flex;
  	justify-content: center;
  	align-items: center;
  	position: relative;
  	overflow: hidden;
  	border-radius: 50%;
  }
  .developer_image .img img{
  	position: absolute;
  	max-width: 100%;
  	max-height: 100%;
  }
  .developer_info{
  	width: 170px;
  	height: 100%;
  	display: flex;
  	flex-direction: column;
  	justify-content: center;
  }
</style>
