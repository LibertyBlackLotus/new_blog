<template>
    <el-tabs :tab-position="tabPosition" @tab-click="tabClick">
        <el-tab-pane label="新建文章">
            <Editor :saveArticle="saveArticle" :publishArticle="publishArticle">
            </Editor>
        </el-tab-pane>
        <el-tab-pane v-for="(item, index) in articleList"
                     :key="item.article_id"
                     :label="item.article_title">
            <Editor :saveArticle="saveArticle"
                    :updateArticle="updateArticle"
                    :publishArticle="publishArticle"
                    :removeArticle="removeArticle"
                    :article="item">
            </Editor>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
	import {getUserInfo} from '../utils/common';
	import Editor from './NoteBookEditor.vue';
	import moment from 'moment';

	export default {
		components: {
			Editor
		},

		data() {
			return {
				tabPosition: 'left',
				userInfo: null,
				articleList: [],
			}
		},

		created: function () {
			this.userInfo = getUserInfo();
			this.getArticleList();  //获取文章列表
		},

		methods: {
			//获取用户文章列表
			getArticleList() {
				this.$http.get('/api/articles/list/' + this.userInfo.id)
					.then((res) => {
						console.log('getArticleList: ', res);
						if (res.status == 200) {
							this.articleList = res.data;
						}
					});
			},

			//新建/保存文章
			saveArticle(data) {
				let params = {
					user_id: this.userInfo.id,
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
						if (res.status != 200 || !res.data || !res.data.status) {
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
						if (res.status != 200 || !res.data | !res.data.status) {
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

</style>
