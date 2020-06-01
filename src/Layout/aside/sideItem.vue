<style scoped lang="scss">

</style>

<template>
    <div v-if="!item.hidden">
        <template v-if="hasMenuItem(item.children, item)">
            <app-link :to="resolvePath(oneChildrenMenu.path)">
                <el-menu-item :index="resolvePath(oneChildrenMenu.path)">
                    <Item :icon="oneChildrenMenu.meta.icon || item.meta.icon" :title="oneChildrenMenu.meta.title || item.meta.title" />
                </el-menu-item>
            </app-link>
        </template>

        <el-submenu :index="resolvePath(item.path)" v-else>
            <template v-slot:title>
                <Item :icon="item.meta.icon" :title="item.meta.title" />
            </template>
            <side-item
                v-for="child in item.children"
                :key="child.path"
                :item="child"
                :base-url="resolvePath(child.path)"
            />
        </el-submenu>
    </div>
</template>

<script>
    import path from 'path'
    import setting from '@/setting'
    import AppLink from './Link'
	import Item from './Item'

	export default {
		name: "sideItem",
		components: {
			AppLink,
			Item
		},
        props: {
			item: {
				type: Object,
                default: () => ({})
            },
            baseUrl: String
        },
        data(){
			return {
				oneChildrenMenu: null
            }
        },
		methods: {
			hasMenuItem(child = [], parent){
                const showMenuItemLength = child.filter(item => {
                	if(item.hidden){
                		return false;
                    } else {
                        this.oneChildrenMenu = item;
                        return true;
                    }
                });

                if(showMenuItemLength.length === 1){
                	if(showMenuItemLength[0].path === '/'){
                		return true;
                    }
                    return setting.menuChildrenOne;
                }

                if(!showMenuItemLength.length){
                    this.oneChildrenMenu = { ...parent, path: '' };
                    return true;
                }

                return false;
            },
            resolvePath(dir){
				// if(this.baseUrl.includes(dir)){
				// 	return this.baseUrl;
                // }
				return path.resolve(this.baseUrl, dir);
            }
        }
	}
</script>
