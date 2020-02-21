<!-- 阅读记录 -->
<template>
    <div>
        <el-button @click="clearReadRecord"
                   type="text"
                   size="small">
            清空
        </el-button>
        <el-table
                :data="readRecords"
                @row-click="rowClick"
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="article.article_title"
                    label="阅读记录"
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
			userId: [Number, String]   //用户id
		},

		data() {
			return {
				readRecords: []   //最近阅读记录
            }
		},

		created: function () {
			this.getReadRecords();  //获取用户阅读记录
		},

		methods: {
			//获取用户阅读记录
			getReadRecords() {
				this.$http.get('/api/readRecord/user/' + this.userId)
					.then((res) => {
						console.log('getReadRecords: ', res);
						if (res.status == 200) {
							this.readRecords = res.data;
						}
					});
			},

            //删除一条阅读记录
            deleteRecord(item){
				this.$http.delete('/api/readRecord/' + item.id)
					.then((res) => {
						console.log('deleteRecord: ', res);
						if (res.status == 200) {
							this.getReadRecords();
						}
					});
            },

			//清空用户阅读记录
			clearReadRecord(){
				let params = {
					user_id: this.userId
				};
				this.$http.delete('/api/readRecord', {data: params})
					.then((res) => {
						console.log('clearReadRecord: ', res);
						if (res.status == 200) {
							this.getReadRecords()
						}
					});
			},

			rowClick(row){
                let id = row.article.article_id;
                let {href} = this.$router.resolve({
                    name: 'article_detail',
                    params: {id}
                });
                window.open(href, '_blank');
            }
		}

	}
</script>

<style lang="stylus" scoped>

</style>
