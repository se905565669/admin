<style scoped lang="scss">
    a {
        width: 100%;
        height: 100%;
        display: block;
    }
</style>

<template>
    <router-link :to="to">
        <slot />
    </router-link>
</template>

<script>
	export default {
		name: "AppLink",
        props: {
			to: [String, Object]
        }
	}
</script>
