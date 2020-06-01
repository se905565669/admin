<style scoped lang="scss">
    @import "@/assets/styles/state.scss";
    .tagViews-wrap {
        height: 40px;
        padding-top: 2px;
        box-sizing: border-box;
        position: relative;
        .tagViews {
            width: 100%;
            height: 100%;
            white-space: nowrap;
            .tag {
                display: inline-block;
                height: 30px;
                line-height: 25px;
                padding: 0 8px;
                border-radius: 35px;
                font-size: 12px;
                position: relative;
                color: #b1b1b1;
                cursor: pointer;
                transition: color .2s linear;
                .close {
                    width: 14px;
                    height: 14px;
                    margin-left: 3px;
                    text-align: center;
                    line-height: 14px;
                    border-radius: 50%;
                    &:hover {
                        background: #fff;
                        color: $theme-color;
                    }
                }
                &:hover,
                &.active {
                    color: #fff;
                }
                &::before {
                    content:"";
                    width: 0;
                    height: 4px;
                    background: #fff;
                    border-radius: 15px;
                    overflow: hidden;
                    position:absolute;
                    bottom: 0;
                    left: 100%;
                    transition: .2s all linear;
                }
                &.active::before,
                &:hover::before {
                    width: 100%;
                    left: 0;
                }
                &:hover ~ .tag::before {
                    left:0;
                }
            }
            /deep/ {
                .el-scrollbar__bar {
                    bottom: 0px;
                }
                .el-scrollbar__wrap {
                    height: 60px;
                }
            }
        }
        .tagMenu {
            padding: 5px 0;
            background: #fff;
            box-shadow: 0 0 3px 2px rgba(0,0,0,.1);
            font-size: 14px;
            color: #333;
            position: fixed;
            z-index: 10;
            border-radius: 5px;
            line-height: 2;
            >li {
                width: 100px;
                text-align: center;
                &:hover {
                    cursor: pointer;
                    user-select: none;
                    color: $theme-color;
                    background: rgba($theme-color, .1);
                }
            }
        }
    }
</style>

<template>
    <div class="tagViews-wrap">
        <el-scrollbar class="tagViews" :vertical="false">
            <span
                class="tag"
                v-for="item in visitedTagViews"
                :key="item.path"
                :class="{ 'active' : isActive(item) }"
                @click="routerGo(item)"
                @contextmenu.prevent="tagMenu(item, $event)">
                {{ item.meta.title }}<el-icon name="close" class="close" v-if="!item.meta.nail" @click.native.stop="delTagViews(item)" />
            </span>
        </el-scrollbar>
        <el-collapse-transition>
            <ul class="tagMenu" v-show="tagMenuShow" :style="{ left, top }">
                <li @click="refreshView(selectedTag)">刷新页面</li>
                <li @click="delTagViews(selectedTag)">关闭页面</li>
                <li @click="removeNotThisTags(selectedTag)">关闭其他</li>
                <li @click="removeAllTags">关闭所有</li>
            </ul>
        </el-collapse-transition>
    </div>
</template>

<script>
	export default {
		name: "tagViews",
        data(){
			return {
				tagMenuShow: false,
                left: 0,
                top: 0,
                selectedTag: {}
            }
        },
        computed: {
			visitedTagViews(){
				return this.$store.getters.visitedTagView
            }
        },
        watch: {
			$route(route){
				if(route.meta && route.meta.title){
					this.addTagViews(route);
                }
            },
			tagMenuShow(val){
				if(val){
					document.body.addEventListener('click', this.closeTagMenu)
                } else {
					document.body.removeEventListener('click', this.closeTagMenu);
                }
            }
        },
        created() {
			this.initTagViews();
			this.addTagViews(this.$route)
		},
		methods: {
			// 初始化添加首页tag
			initTagViews(){
				if(this.$route.path !== '/'){
					const filterRoutes = routes => {
						return routes.filter(item => item.path === '' || item.path === '/');
					}
					this.addTagViews(filterRoutes(this.$router.options.routes)[0].children[0]);
				}
            },
            // 添加tag
			addTagViews(tag){
				this.$store.dispatch('tagViews/addTagViews', tag);
            },
            // 判断是否为当前页面添加样式
			isActive(route){
				return route.path === this.$route.path;
            },
            // 删除tag
            delTagViews(tag){
				if(tag.path === '' || tag.path === '/') return;
				this.$store.dispatch('tagViews/delTagViews', tag);
				if(tag.path === this.$route.path){
					this.routerGo(this.visitedTagViews[this.visitedTagViews.length - 1])
                }
            },
            // 跳转页面
            routerGo(tag){
				this.$router.replace(tag);
            },
            // 显示tagMenu并定位
			tagMenu(item, ev){
				this.selectedTag = item;
				this.left = ev.clientX + 'px';
				this.top  = ev.clientY + 'px';
				this.tagMenuShow = true;
            },
            // 隐藏tagMenu
            closeTagMenu(){
				this.tagMenuShow = false;
            },
            // 刷新页面
			refreshView(view){
				this.$nextTick(() => {
					this.$router.replace({ path: '/redirect' + view.fullPath });
                })
            },
            // 关闭其他页面
			removeNotThisTags(tag){
				const routes = this.visitedTagViews;
				for(let i = routes.length - 1; i >= 0; i--) {
                    if(routes[i].path !== tag.path){
						this.delTagViews(routes[i]);
                    }
                }
            },
            // 关闭所有页面
			removeAllTags(){
				const routes = this.visitedTagViews;
				for(let i = routes.length - 1; i >= 0; i--) {
                    this.delTagViews(routes[i]);
				}
            }
        }
	}
</script>
