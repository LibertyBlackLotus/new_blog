<template>
    <div>
        <el-row>
            <el-col :span="4" class="nodeList">
                <el-button type="primary"
                        @click="titleClick(0)"
                           class="nodeListButton">
                    新建文章
                </el-button>
                <el-row v-for="(item) in articleList"
                        :key="item.article_id"
                        class="nodeListRow">
                    <el-button @click="titleClick(item.article_id)"
                               class="nodeListButton"
                               size="small"
                                >
                        <span>{{item.article_title}}</span>
                    </el-button>
                </el-row>
            </el-col>
            <el-col :span="20">
                <Editor v-if="reFresh"
                        :saveArticle="saveArticle"
                        :updateArticle="updateArticle"
                        :publishArticle="publishArticle"
                        :articleId="articleId">
                </Editor>
            </el-col>
        </el-row>
    </div>
</template>

<script>
	import {getUserId} from '../utils/common';
	import Editor from './NoteBookEditor.vue';
	import moment from 'moment';

	export default {
		components: {
			Editor
		},

		data() {
			return {
				tabPosition: 'left',
				userId: getUserId(),
				articleId: 0,
				articleList: [],
				currentComponent: 'Editor',
				reFresh: true
			}
		},

		mounted: function () {
			this.getArticleList();  //获取文章列表
		},

		methods: {
			//获取用户文章列表
			getArticleList() {
				this.$http.get('/api/articles/list/' + this.userId)
					.then((res) => {
						console.log('getArticleList: ', res);
						if (res.status == 200) {
							this.articleList = res.data;
						}
					});
			},

			titleClick(articleId) {
				this.articleId = articleId;
				this.reFresh = false;
				this.$nextTick(() => {
					this.reFresh = true;
				});
			},

			//新建/保存文章
			saveArticle(data) {
				let params = {
					user_id: this.userId,
					article_title: data.title,
					article_content: data.content,
					status: 0,
					article_date: moment().format('YYYY-MM-DD HH:mm:ss'),
					article_views: 0,
					article_comment_count: 0,
					article_like_count: 0,
				};
				//console.log( 'params: ', params );
				this.$http.post('/api/articles', params)
					.then(res => {
						console.log('saveArticle res: ', res);
						if (res.status != 200 || !res.data || !res.data.status) {
							this.$message({
								type: 'error',
								message: '保存失败！'
							});
							return;
						}
						this.$message({
							type: 'success',
							message: '保存成功！'
						});
						this.getArticleList();  //获取文章列表
					});
			},

			//发布文章
			publishArticle(data) {
				let params = {
					article_id: data.article_id
				};
				this.$http.put('/api/articles/publish', params)
					.then(res => {
						console.log('publishArticle res: ', res);
						if (res.status != 200 || !res.data) {
							this.$message({
								type: 'error',
								message: '发布失败！'
							});
							return;
						}
						this.$message({
							type: 'success',
							message: '发布成功！'
						});
						this.getArticleList();  //获取文章列表
					}).catch(e => {
					console.log('error: ', e.message);
					this.$message({
						type: 'error',
						message: '发布失败！'
					});
				});
			},

			//删除文章
			removeArticle(data) {
				this.$http.delete('/api/articles', {data: data})
					.then(res => {
						console.log('saveArticle res: ', res);
						if (res.status != 200 || !res.data || !res.data.status) {
							this.$message({
								type: 'error',
								message: '删除失败！'
							});
							return;
						}
						this.$message({
							type: 'success',
							message: '删除成功！'
						});
						this.getArticleList();  //获取文章列表
					});
			},

			//更新文章
			updateArticle(data) {
				let params = {
					article_id: data.id,
					article_title: data.title,
					article_content: data.content,
				};
				this.$http.put('/api/articles', params)
					.then(res => {
						if (res.status != 200 || !res.data) {
							this.$message({
								type: 'error',
								message: '保存失败！'
							});
							return;
						}
						this.$message({
							type: 'success',
							message: '保存成功！'
						});
						this.getArticleList();  //获取文章列表
					});
			},

			tabClick(tab) {
				console.log('tabClick: ', tab);
			},
		},
	}
</script>

<style lang="stylus" scoped>
    .nodeList
        width 150px
        z-index 10000
        background-color #fff
    .nodeListRow
        width 150px !important
        margin-top 5px
    .nodeListButton
        width 150px !important
        overflow hidden
    .nodeListButton span
        width 100px !important

</style>
