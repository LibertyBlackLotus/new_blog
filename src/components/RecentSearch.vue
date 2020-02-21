<!-- 最近搜索组件 -->
<template>
    <div>
        <el-button @click="clearRecord"
                   type="text"
                   size="small">
            清空
        </el-button>
        <el-table
                :data="recentSearch"
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="content"
                    label="最近搜索"
                    width="150">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="deleteRecord(scope.row)"
                               type="text"
                               size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
	export default {
		props: {
			userId: Number  //用户id
		},

		data() {
			return {
				recentSearch: []   //最近搜索记录
            }
		},

		created: function () {
			this.getRecentSearch();  //获取用户最近搜索记录
		},

		methods: {
			//获取用户最近搜索记录
			getRecentSearch() {
				this.$http.get('/api/record/searchRecord/user/' + this.userId)
					.then((res) => {
						if (res.status == 200) {
							this.recentSearch = res.data;
						}
					});
			},

            //删除搜索记录
            deleteRecord(item){
				this.$http.delete('/api/record/searchRecord/' + item.id)
					.then((res) => {
						console.log('deleteRecord: ', res);
						if (res.status == 200) {
							this.getRecentSearch();
						}
					});
            },

			//清空用户搜索记录
			clearRecord(){
				let params = {
					user_id: this.userId
				};
				this.$http.delete('/api/record/searchRecord', {data: params})
					.then((res) => {
						console.log('clearRecord: ', res);
						if (res.status == 200) {
							this.getRecentSearch()
						}
					});
			}
		}

	}
</script>

<style lang="stylus" scoped>

</style>
