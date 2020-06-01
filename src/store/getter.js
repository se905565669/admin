const getters = {
	token: state => state.global.token,
	userInfo: state => state.global.userInfo,
	addRoutes: state => state.global.addRoutes,
	visitedTagView: state => state.tagViews.visitedTagView
};


export default getters
