<style scoped lang="scss">
    #index {
        background: #fff;
        .index-head {

        }
    }
</style>

<template>
    <div id="index">
        <el-row :gutter="10" class="index-head">
            <el-col :xs="24" :sm="12" :md="6" :lg="6">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="6">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="6">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="6">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
            </el-col>
        </el-row>
    </div>
</template>

<script>
	export default {
		name: "index"
	}
</script>
