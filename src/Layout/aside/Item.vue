<script>
	export default {
		name: "Item",
        functional: true,
        props: {
			icon: String,
            title: String
        },
        render(h, context) {
			const { icon, title } = context.props;
			let Vnode = [];

			if(icon) {
				Vnode.push(<el-icon name={ icon } />)
            }

			if(title){
				Vnode.push(<span slot="title">{ title }</span>)
            }

			return Vnode;
		}
	}
</script>
