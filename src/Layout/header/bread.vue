<style scoped lang="scss">
    @import "@/assets/styles/transitions.scss";
    .el-breadcrumb {
        line-height: 1.15;
        .el-breadcrumb__item /deep/ span {
            color: #efefee !important;
        }
    }
</style>

<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <transition-group name="breadcrumb">
            <template v-for="item in levelList">
                <el-breadcrumb-item v-if="item.path === '/'" :key="item.path" :to="item.path">{{ item.meta.title }}</el-breadcrumb-item>
                <el-breadcrumb-item v-else :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
            </template>
        </transition-group>
    </el-breadcrumb>
</template>

<script>
    import setting from '@/setting'
	export default {
		name: "header-bread",
        data(){
			return {
				levelList: null
            }
        },
		watch: {
			$route(route){
                this.getBreadcrumb()
            }
        },
        created() {
			this.getBreadcrumb()
		},
        methods: {
			getBreadcrumb(){
				let matched = this.$route.matched.filter(item => item.meta && item.path && item.path !== '/');
				let first = matched[matched.length - 1] || null;
                let home = [{ path: '/', meta: { title: '首页' } }];
                this.levelList = first && setting.menuChildrenOne ? home.concat(first) : home.concat(matched);
            }
        }
	}
</script>
