<style scoped lang="scss">
    .content {
        background: #fff;
        border-radius: 5px;
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
        &.head-form {
            padding: 22px 10px 0;
        }
        &.selection {
            padding: 10px;
        }
    }
</style>

<template>
    <div class="content" :class="[ isForm ? 'head-form' : 'selection' ]" >
        <slot />
    </div>
</template>

<script>
	export default {
		name: "view-content",
        props: {
			isForm: {
				type: Boolean,
                default: false
            }
        }
	}
</script>
