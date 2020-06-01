<style scoped lang="scss">
    @import "@/assets/styles/transitions.scss";
    @import "@/assets/styles/state.scss";
    @import "@/assets/styles/mixin.scss";
    /* 设置背景 */
    .comm-bg {
        width: 100%;
        height: 280px;
        background: url("../assets/image/index/indexbg.png") no-repeat right top;
        background-size: cover;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
    }
    /* 设置侧边菜单栏宽度 */
    .aside-menu {
        width: $asideMenuWidth;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        transition: width .3s linear;
        &.width {
            width: 70px;
        }
    }
    /* 设置内容区样式 */
    .selection {
        flex: 1;
        width: 0;
        overflow: hidden;
        padding: 0 20px;
        margin-left: $asideMenuWidth;
        transition: margin-left .3s linear;
        &.marginLeft {
            margin-left: 70px;
        }
        .header-wrap {
            width: 100%;
            display: block;
            background: url("../assets/image/index/indexbg.png") no-repeat right 0;
            .header-function {
                height: 60px;
                position: relative;
                &,
                .header-left {
                    @include flex(center, space-between);
                }
                .header-left {
                    .icon {
                        font-size: 26px;
                        color: #fff;
                        cursor: pointer;
                    }
                    .bread {
                        margin-left: 10px;
                    }
                }
            }
        }
        .el-main {
            overflow-x: hidden;
            position: relative;
            padding-left: 0;
            padding-right: 0;
        }
        /* 在内容区上添加固定头部样式 */
        &.fixed-head {
            &.top-100 {
                padding-top: 100px;
            }
            &.top-60 {
                padding-top: 60px;
            }
            .header-wrap {
                width: calc(100% - #{$asideMenuWidth});
                padding: 0 20px;
                position: fixed;
                top: 0;
                right: 0;
            }
        }
    }
</style>

<template>
    <el-container>
        <!-- 背景 -Start -->
        <div class="comm-bg"></div>
        <!-- 背景 -End -->

        <!-- 侧边菜单栏 -Start -->
        <div class="aside-menu" :class="{ 'width' : isCollapse }">
            <aside-menu :is-collapse="isCollapse" />
        </div>
        <!-- 侧边菜单栏 -End -->

        <!-- 内容区 -Start -->
        <div class="selection"
             :class="[
             	setting.fixedHeader ? 'fixed-head' : '',
             	setting.fixedHeader ? setting.tagViews ? 'top-100' : 'top-60' : '',
                isCollapse ? 'marginLeft' : ''
             ]">
            <!-- 头部 -Start -->
            <div class="header-wrap">
                <!-- 头部-面包屑 -Start -->
                <div class="header-function">
                    <div class="header-left">
                        <el-icon class="icon" :name="headerLeftIconName" @click.native="sideWidth" />
                        <header-bread class="bread" />
                    </div>
                    <header-user :title="userInfo.nikename" :avatar="userInfo.avatar" />
                </div>
                <!-- 头部-面包屑 -End -->

                <!-- 头部-标签栏 -Start -->
                <tag-views v-if="setting.tagViews" />
                <!-- 头部-标签栏 -End -->
            </div>
            <!-- 头部 -End -->

            <!-- 内容区 -Start -->
            <el-main>
                <transition name="fade-transform" mode="out-in">
                    <router-view />
                </transition>
            </el-main>
            <!-- 内容区 -End -->
        </div>
        <!-- 内容区 -End -->
    </el-container>
</template>

<script>
    import setting from '@/setting'
    import asideMenu from './aside/menu'
	import headerBread from './header/bread'
	import headerUser from './header/user'
    import tagViews from './tagViews'

	export default {
		name: "Layout",
        components: {
			asideMenu,
			headerBread,
			headerUser,
			tagViews
        },
        data(){
			return {
				setting,
				headerLeftIconName: 's-fold',
                isCollapse: false
            }
        },
        computed: {
		    userInfo(){
		        return this.$store.getters.userInfo
            }
        },
        methods: {
			sideWidth(){
				this.isCollapse = !this.isCollapse;
				this.headerLeftIconName = !this.isCollapse ? 's-fold' : 's-unfold';
            }
        }
	}
</script>
