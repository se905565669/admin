<style scoped lang="scss">
    .logo {
        height: 60px;
        position: relative;
        a {
            width: 100%;
            height: 100%;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            letter-spacing: 15px;
            white-space: nowrap;
        }
        img {
            width: 35px;
            height: 35px;
            margin-right: 8px;
        }
    }

    .sidebarLogoFade-enter-active {
        transition: opacity 1.5s;
    }

    .sidebarLogoFade-enter,
    .sidebarLogoFade-leave-to {
        opacity: 0;
    }


    .el-scrollbar {
        background: #fff url("../../assets/image/index/side.png") no-repeat left bottom;
        background-size: contain;
        height: calc(100vh - 60px);
        /deep/ .scroll-wrap {
            overflow-x: hidden;
        }
        .el-menu {
            width: 100%;
            border-right: 0;
            background: transparent;
            padding: 5px;
            &.el-menu--collapse {
                li,
                /deep/ .el-tooltip {
                    padding: 0 !important;
                }
                /deep/ .el-tooltip {
                    text-align: center;
                    i {
                        margin-right: 0;
                    }
                }
            }
        }
    }
</style>

<template>
    <div>
        <div class="logo">
            <transition name="sidebarLogoFade">
                <router-link v-if="!isCollapse" key="collapse" to="/">
                    <img src="../../assets/image/logo.png" alt="" />
                    <h3>{{ setting.title }}</h3>
                </router-link>
                <router-link v-else key="expand" to="/">
                    <img src="../../assets/image/logo.png" alt="" />
                </router-link>
            </transition>
        </div>
        <el-scrollbar wrap-class="scroll-wrap">
            <el-menu
                :default-active="$route.path"
                unique-opened
                :collapse-transition="false"
                :collapse="isCollapse">
                <side-item v-for="item in routes" :item="item" :key="item.path" :base-url="item.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import setting from '@/setting'
    import SideItem from './sideItem'

	export default {
		name: "asideMenu",
        components: {
			SideItem
        },
        props: {
			isCollapse: {
				type: Boolean,
                default: false
            }
        },
        data: () => ({
			setting
        }),
        computed: {
		    routes(){
		        return this.$store.getters.addRoutes
            }
        }
	}
</script>
