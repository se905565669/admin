import router from './router'
import NProgress from 'nprogress'
import '@/assets/styles/nprogress.scss'
import cookie from 'js-cookie'
import store from './store'

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
	NProgress.start();
	const token = cookie.get('token');

	if(token){
		if(to.path === '/login'){
			cookie.remove('token');
			next({ ...to, query: { redirect: from.path } });
		} else {
			if(!('rules' in store.getters.userInfo)) {
				store.dispatch('global/getUser', { token }).then(res => {
					let rules = res.userInfo.rules;
					store.dispatch('global/getRoutes', { rules }).then(routes => {
						router.addRoutes(routes);
						next({ ...to, replace: true })
					})
				}).catch(err => {
					store.dispatch('global/logOut').then(() => {
						next({ path: '/' })
					})
				})
			} else {
				next();
			}
		}
	} else {
		if(to.path === '/login'){
			next();
		} else {
			next({ path: '/login', replace: true, query: { redirect: from.path } })
		}
	}
})

router.afterEach((to, from) => {
	NProgress.done();
});


export default router

