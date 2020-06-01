<style scoped lang="scss">
    @import "@/assets/styles/mixin.scss";
    .user-dropdown {
        display: flex;
        align-items: center;
        cursor: pointer;
        color: #fff;
        span {
            margin: 0 5px;
        }
    }
</style>

<template>
    <el-dropdown trigger="click">
        <div class="user-dropdown">
            <el-avatar :size="avatarSize" :src="headerAvatar"></el-avatar>
            <span>{{ title }}</span><el-icon name="arrow-down" />
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-remove-outline">注销</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
	export default {
		name: "user",
        props: {
			title: {
				type: String,
                default: 'admin'
            },
			avatarSize: {
				type: Number,
                default: 38
            },
            avatar: {
				type: String,
                default: ''
            }
        },
        data(){
			return {
			    headerAvatar: this.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            }
        }
	}
</script>
