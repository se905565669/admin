<script>
	export default {
		name: "redirect",
        created() {
			const { query, params: { path } } = this.$route;
			console.log({ path: '/' + path, query });
			this.$router.replace({ path: '/' + path, query });
		},
		render(h) {
			return h()
		}
	}
</script>
