<style scoped lang="scss">

</style>

<template>
    <div id="goods">
        <view-content is-form>
            <el-form inline>
                <el-form-item label="商品ID">
                    <el-input placeholder="请输入商品ID" />
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input placeholder="请输入商品名称" />
                </el-form-item>
                <el-form-item label="精选商品">
                    <el-select>
                        <el-option>否</el-option>
                        <el-option>是</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" round>搜索</el-button>
                </el-form-item>
                <br />
                <el-form-item>
                    <el-button type="primary">添加</el-button>
                    <el-button type="primary">批量删除</el-button>
                </el-form-item>
            </el-form>
        </view-content>

        <view-content>
            <el-table>
                <el-table-column
                    fixed="left"
                    type="selection"
                    width="55">
                </el-table-column>
            </el-table>
        </view-content>
    </div>
</template>

<script>
	export default {
		name: "goods"
	}
</script>
