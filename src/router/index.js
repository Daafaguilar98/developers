import Vue from 'vue'
import Router from 'vue-router'
import developers from '@/components/developers'

Vue.use(Router)

export default new Router({
    mode: 'history',
	routes: [
	    {
	      	path: '/',
	      	name: 'developers',
	      	component: developers
	    }
	]
})
