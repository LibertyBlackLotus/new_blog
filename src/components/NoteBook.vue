<template>
    <div>
        <el-row>
            <el-col :span="4" class="nodeList">
                <el-menu @select="menuSelected"
                         :default-active="actived">
                    <el-menu-item index="0">
                        <span>新建文章</span>
                        <i class="el-icon-edit"></i>
                    </el-menu-item>
                    <el-menu-item v-for="(item, i) in articleList"
                                  :key="i"
                                  :index="'' + item.article_id">
                        {{ item.article_title }}
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <Editor v-if="reFresh"
                        :saveArticle="saveArticle"
                        :updateArticle="updateArticle"
                        :publishArticle="publishArticle"
                        :removeArticle="removeArticle"
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
				actived: '0',
				userId: getUserId(),
				articleId: 0,
				articleList: [],
				reFresh: true
			}
		},

		mounted: function () {
			this.getArticleList();  //获取文章列表
		},

		methods: {
			menuSelected(index){
				console.log('menuSelected-->', index );
				this.actived = index;
			    this.articleId = parseInt(this.actived);
				this.reFresh = false;
				this.$nextTick(() => {
					this.reFresh = true;
				});
			},

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

			//新建/保存文章
			saveArticle(data) {
				if(data.title == 0){
					this.$message({
						type: 'warning',
						message: '请填写文章标题！'
					});
					return;
				}
				if(data.content == null){
					this.$message({
						type: 'warning',
						message: '请填写文章内容！'
					});
					return;
                }
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
                let _this = this;
				this.$http.post('/api/articles', params)
					.then(res => {
						console.log('saveArticle res: ', res);
						_this.articleId = res.data.article.article_id;
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
			}
		},
	}
</script>

<style lang="stylus" scoped>
    .nodeList
        z-index 10000
        background-color #fff
    .nodeListRow
        width 150px !important
        margin-top 5px
    .el-menu-item
        border-bottom  1px solid #f1f1f1
        overflow hidden

</style>
