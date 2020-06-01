export default {
	namespaced: true,
	state: {
		visitedTagView: []
	},
	mutations: {
		ADD_TAG_VIEWS(state, tag){
			if(!state.visitedTagView.some(item => item.path === tag.path)){
				state.visitedTagView.push(tag);
			}
		},
		DEL_TAG_VIEWS(state, tag){
			for (let [i, v] of state.visitedTagView.entries()) {
				if(v.path === tag.path){
					state.visitedTagView.splice(i, 1);
					break;
				}
			}
		}
	},
	actions: {
		addTagViews({ commit }, tag){
			commit('ADD_TAG_VIEWS', tag);
		},
		delTagViews({ commit }, tag){
			commit('DEL_TAG_VIEWS', tag);
		}
	}
}
