import ViewContent from './ViewContent'


let Components = [
	ViewContent
]

const install = function(Vue) {
	Components.forEach(component => {
		if (install.installed) return;
		Vue.component(component.name, component);
	})
}

if(typeof window !== 'undefined' && window.Vue){
	install(window.Vue);
}


export default {
	v: '1.0.0',
	install,
	ViewContent
}
