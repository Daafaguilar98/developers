<template>
	<div class="console_screen">
		<p class="bold closeMethod">use close()</p>
		<div id="console" class="console">
			<div class="console_textInitial text">
				<i class="material-icons">navigate_next</i>
				<p><span class="green">https://github.com/Daafaguilar98/developers.git</span>, if you need help use help()</p>
			</div>
			<div class="text" v-for="comand in comands">
				<i class="material-icons">navigate_next</i>
				<p class="console_output">{{comand}}</p>
			</div>
			<div class="console_input text">
				<i class="material-icons">navigate_next</i>
				<input id="uploadPhoto" v-on:change="savePhoto" type="file" name="">
				<p v-show="labelInput != ''" class="console_labelInput green">{{labelInput}}</p>
				<input type="text" id="consoleInput" v-model="comand" v-on:keyup.enter="addComand">
			</div>
		</div>
	</div>
</template>
<script>
export default {
	mounted() {
		let consoleScreen = document.getElementById('console')
		let consoleInput = document.getElementById('consoleInput')
		consoleInput.focus()
		consoleScreen.addEventListener("click", () => consoleInput.focus())
	},
	props: ['database', 'storage'],
	data(){
		return{
			comand: '',
			comands: [],
			labelInput: '',
			comandForm: false,
			indexLabel: 0,
			image: null,
			user: {},
		}
	},
	methods: {
		addComand() {
			if(!this.comandForm){
				let methodExist = false;
				let methods = ['clear', 'close', 'help', 'createUser']
				let method = this.comand.replace("()", "")
				for (let i = 0; i < methods.length; i++) {
					if(methods[i] == method){
						let comandToMethod = eval(`this.${method}`);
						comandToMethod();
						methodExist = true;
						break;
					}
				}
				if(!methodExist){
					this.comands.push(`'${this.comand}' is not recognized as an internal or external command, operable program or batch file.`)
					methodExist = false;
				}
			}else{
				if(this.labelInput == "upload photo(y/n):"){
					if(this.comand == "y" || this.comand == "Y" || this.comand == "YES" || this.comand == "yes" || this.comand == "si" || this.comand == "SI" || this.comand == "Yes"){
						this.uploadPhoto();
					}else{
						this.labelInput = "";
					}
				}
				this.comands.push(`${this.labelInput} ${this.comand}`)
				let labelInput = this.labelInput.replace(":", "")
				this.user[labelInput] = this.comand
				if(this.labelInput != "upload photo(y/n):"){
					this.indexLabel++;
					this.labels();
				}
			}
			this.comand = "";
		},
		clear(){
			this.comands = [];
		},
		close(){
			this.$emit('hidden');
			this.comand = "";
			this.comands = [];
		},
		createUser() {
			this.comands.push(this.comand)
			this.comands.push("a continuacion tendras que llenar la informacion para tu registrar")
			this.comandForm = true;
			this.labels();
		},
		labels(){
			let labels = ['name:', 'email:', 'company:', 'job:', 'stack:','upload photo(y/n):','finish']
			if(labels[this.indexLabel] != 'finish'){
				this.labelInput = labels[this.indexLabel];
			}else{
				this.comandForm = false;
				this.indexLabel = 0;
				this.labelInput = '';
				this.saveUser();
			}
		},
		uploadPhoto(){
			document.getElementById('uploadPhoto').click();
		},
		savePhoto(e){
			this.labelInput = 'upload photo...'
			let files = e.target.files || e.dataTransfer.files;
			if (!files.length)
        		return;
      		this.createImage(files[0]);
      		let user = this.user;
      		let vm = this;
		    var uploadImage = this.storage.ref().child('images/' + user.email).put(e.target.files[0]);
				uploadImage.on('state_changed', function(snapshot){

				}, function(error) {
				  // Handle unsuccessful uploads
				}, function() {
				  // Handle successful uploads on complete
				  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
				  vm.photoURL = uploadImage.snapshot.downloadURL;
				  vm.indexLabel++;
				  vm.labels();
				});
		},
		createImage(file) {
	      var image = new Image();
	      var reader = new FileReader();
	      var vm = this;

	      reader.onload = (e) => {
	        vm.image = e.target.result;
	      };
	      reader.readAsDataURL(file);
    	},
		saveUser() {
			this.database.ref('/users').push({
		        name: this.user.name,
		        email: this.user.email,
		        job: this.user.job,
		        stack: this.user.stack,
		        photoURL: this.photoURL,
		    })
		    this.comands.push('User saved successfully')
		},
		help(){
			this.comands.push('~~ these are comands that you can use')
			this.comands.push('~ clear(): clear all the console')
			this.comands.push('~ close(): close the door')
			this.comands.push('~ createUser(): create an user')
			this.comands.push(this.comand)
		}

	}
}
</script>
<style scoped>
	.console_screen{
		width: 100%;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 9;
	}
	.closeMethod{
		max-width: 800px;
		width: 100%;
		padding: 5px 0px;
		padding-right: 5px;
		display: flex;
		justify-content: flex-end;
		color: #FFF;
	}
	.console{
		max-width: 800px;
		width: 100%;
		max-height: 400px;
		height: 100%;
		padding: 20px;
		background-color: #14121A;
		border-radius: 10px;
		color: #FFF;
		font-size: 13px;
		overflow-y: overlay;
		overflow-x: hidden;
	}
	#uploadPhoto{
		display: none;
	}
	.console .text{
		display: flex;
		align-items: center;
	}
	.console_textInitial{
	}
	.console_output{
	}
	.console_labelInput{
		margin-right: 10px;
	}
	.console_input{
	}
	.console_input input{
		width: 75%;
		background: transparent;
		border-style: none;
		outline: none;
		color: #FFF;
	}
</style>