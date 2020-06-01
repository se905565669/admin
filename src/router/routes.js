const Layout = () => import('@/Layout')

const routes = [
	{
		path: '/login',
		name: 'login',
		hidden: true,
		component: () => import('@/views/login')
	}, {
		path: '',
		component: Layout,
		redirect: '/',
		children: [
			{
				path: '/',
				name: 'index',
				component: () => import('@/views/index'),
				meta: { icon: 's-home', title: '首页', nail: true }
			}
		]
	}, {
		path: '/redirect',
		component: Layout,
		hidden: true,
		children: [
			{
				path: '/redirect/:path(.*)',
				name: 'redirect',
				component: () => import('@/views/redirect')
			}
		]
	}, {
		path: '/404',
		hidden: true,
		component: () => import('@/views/404')
	}
]

export default routes
