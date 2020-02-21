<!-- 文章详情 -->
<template>
    <div>
        <!-- 头部 -->
        <Header></Header>

        <div class="articleDetail">
            <!-- 文章详情 -->
            <el-card class="content">
                <!-- 文章标题 -->
                <el-row class="articleTitle">
                    {{article.article_title}}
                </el-row>

                <!-- 文章信息 -->
                <el-row class="articleContent">
                    <el-col :span="2" class="articleAvatar">
                        <img :src="article.User && article.User.photo" />
                    </el-col>
                    <el-col :span="12">
                        <div>
                            {{article.User && article.User.user_name}}
                        </div>
                        <div>
                            <span>{{article.article_date | dateFormat}}&nbsp;&nbsp;</span>
                            <span>阅读 {{article.article_views}}</span>
                        </div>
                    </el-col>
                </el-row>

                <!-- 文章内容 -->
                <div v-html="article.article_content">
                    {{article.article_content}}
                </div>

                <el-row>
                    <el-col :span="2">
                        <span v-if="!isLike">
                            <img src="../assets/heart.png" @click="like" class="articleLike"/>
                            <span>喜欢</span>
                        </span>
                        <span v-if="isLike">
                            <img src="../assets/heartHover.png" @click="removeLike" class="articleLike"/>
                            <span>已喜欢</span>
                        </span>
                    </el-col>
                    <el-col :span="2">
                        {{article && article.article_like_count}} 人喜欢
                    </el-col>
                    <el-col :span="2">
                        <span v-if="!isCollected">
                            <span class="collect"  @click="addCollection">收藏</span>
                        </span>
                        <span v-if="isCollected">
                            <el-tag>已收藏</el-tag>
                        </span>
                    </el-col>
                </el-row>
            </el-card>

            <!-- 评论 -->
            <el-card class="comments">
                <Comment
                        :comments="comments"
                        :commitReply="commitReply"
                        :getComments="getComments">
                </Comment>
            </el-card>
        </div>

        <!--  底部添加评论 -->
        <div class="commentsPanel">
            <div class="write-reply" v-if="!showBox">
                <span @click="showCommentBox"><el-input placeholder="添加新评论"></el-input></span>
            </div>
            <transition name="fade">
                <div class="input-wrapper" v-if="showBox">
                    <el-input class="gray-bg-input"
                              v-model="inputReply"
                              type="textarea"
                              :rows="3"
                              placeholder="写下你的评论">
                    </el-input>
                    <div class="btn-control">
                        <el-button size="small" @click="cancelCommentInput">取消</el-button>
                        <el-button size="small" type="danger" @click="commitComment(inputReply)">确定</el-button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
	import Header from './Header.vue';
	import Comment from './Comment.vue';
	import moment from 'moment';
	import {getUserId} from '../utils/common';
	import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

	export default {
		props: {
			id: [String, Number]  //文章id
		},

		components: {
			ElButton,
			Header, Comment
		},

		data() {
			return {
				article: {},          //文章对象
				comments: [],         //文章评论
				inputReply: '',       //回复内容
				userId: getUserId(),  //用户id
				showBox: false,       //是否显示评论框
				isLike: false,        //是否喜欢了文章
				isCollected: false,   //是否收藏了文章
			}
		},

		mounted: function () {
			this.getArticleDetail(); //获取文章详情
			this.getComments();      //获取评论
			this.consult();          //查阅文章
		},

        beforeDestroy: function(){
			this.addReadRecord();    //添加阅读记录
        },

		methods: {
			//获取文章详情
			getArticleDetail() {
				this.$http.get('/api/articles/' + this.id)
					.then(res => {
						if (res.status != 200 || !res.data || !res.data.status) {
							this.$message({
								type: 'error',
								message: '获取详情失败！'
							});
							return;
						}
						this.article = res.data;
						this.checkIsLike();       //判断用户是否喜欢文章
						this.checkIsCollected();  //判断用户是否喜欢文章
					});
			},

			//判断用户是否已喜欢文章
			checkIsLike() {
				let params = {
					user_id: this.userId,
					article_id: this.id
				};
				this.$http.post('/api/articles/isLike', params)
					.then(res => {
						if (res.status == 200) {
							this.isLike = res.data;
						}
					});
			},

			//喜欢文章
			like() {
				let params = {
					article_id: this.id,
					user_id: this.userId
				};
				this.$http.post('/api/articles/like', params)
					.then(res => {
						if (res.status == 200) {
							 this.isLike = true;
						}
						this.getArticleDetail();  //获取文章详情
					}).catch(e => {
                        this.$message({
                            type: 'error',
                            message: '喜欢失败！'
                        });
				});
			},

			//取消喜欢文章
			removeLike() {
				let params = {
					article_id: this.id,
					user_id: this.userId
				};
				this.$http.delete('/api/articles/like', {data: params})
					.then(res => {
						console.log('removeLike res: ', res);
						if (res.status == 200) {
							this.isLike = false;
						}
						this.getArticleDetail();  //获取文章详情
					});
			},

			//查阅文章
			consult() {
				let params = {
					article_id: this.id
				};
				this.$http.post('/api/articles/consult', params)
					.then(res => {
						if (res.status != 200 || !res.data || !res.data.status) {
							this.$message({
								type: 'error',
								message: '点赞失败！'
							});
							return;
						}
					})
			},

			//添加阅读记录
			addReadRecord() {
				let params = {
					user_id: this.userId,
                    article_id: this.id,
                    time: moment().format('YYYY-MM-DD HH:mm:ss')
				};
				this.$http.post('/api/readRecord', params)
					.then(res => {
						if (res.status != 200 || !res.data || !res.data.status) {
							this.$message({
								type: 'error',
								message: '添加失败！'
							});
							return;
						}
					})
			},

			//判断用户是否已收藏文章
			checkIsCollected() {
				let params = {
					user_id: this.userId,
					article_id: this.id
				};
				this.$http.post('/api/collection/user/isCollected', params)
					.then(res => {
						if (res.status == 200) {
							this.isCollected = res.data;
						}
					});
			},

			//添加收藏
			addCollection() {
				let params = {
					article_id: this.id,
					user_id: this.userId,
					time: moment().format('YYYY-MM-DD HH:mm:ss')
				};
				this.$http.post('/api/collection', params)
					.then(res => {
						if (res.status == 200) {
							this.isCollected = true;
						}
					})
			},

			//获取评论
			getComments() {
				this.$http.get('/api/comments/list/' + this.id)
					.then(res => {
						if (res.status != 200) {
							this.$message({
								type: 'error',
								message: '获取列表失败！'
							});
							return;
						}
						this.comments = res.data;
					}).catch(e => {
					console.log(e.message);
					this.$message({
						type: 'error',
						message: '获取列表失败！'
					});
				});
			},

			//提交评论
			commitComment(comment_content = '') {
				let params = {
					user_id: this.user_id,
					article_id: this.id,
					comment_content,
					comment_like_count: 0,
					comment_date: moment().format('YYYY-MM-DD HH:mm:ss')
				};

				this.$http.post('/api/comments', params)
					.then(res => {
						if (res.status != 200 || !res.data | !res.data.status) {
							this.$message({
								type: 'error',
								message: '提交失败！'
							});
							return;
						}
						this.$message({
							type: 'success',
							message: '评论成功！'
						});
						this.inputReply = '';
						this.getComments();   //获取文章回复列表
					});
			},

			//提交回复
			commitReply(comment_id = 0, content = '', parent_id = 0) {
				let params = {
					comment_id,
                    user_id: getUserId(),
					content,
					reply_date: moment().format('YYYY-MM-DD HH:mm:ss'),
					parent_id
				};

				this.$http.post('/api/comments/reply', params)
					.then(res => {
						if (res.status != 200 || !res.data | !res.data.status) {
							this.$message({
								type: 'error',
								message: '提交失败！'
							});
							return;
						}
						this.$message({
							type: 'success',
							message: '回复成功！'
						});
						this.showBox = false;
						this.inputReply = '';
						this.getComments();   //获取文章回复列表
					});
			},

			//显示评论框
			showCommentBox() {
				this.showBox = true;
			},

			//取消评论输入
			cancelCommentInput() {
				this.showBox = false;
			}

		}

	}
</script>

<style lang="stylus" scoped>
    .articleDetail
        width 1080px
        margin 0 auto

    .content
        margin-top 10px

    .articleContent
        margin-top 5px

    .articleTitle
        font-size 25px
        font-weight 700
        color #00b4ff

    .articleAvatar img
        width 50px

    .articleLike
        cursor pointer

    .comments
        width 910px
        margin-top 5px

    .commentsPanel
        position fixed
        bottom 0
        width 100%
        line-height 50px
        background-color #fff
        border-top 1px solid #d5d8dc
        padding-top 3px

    .write-reply
        width 30%
        margin 0 auto
    .input-wrapper
        width 30%
        margin 0 auto
    .collect
        cursor: pointer
    .collect:hover
        text-decoration underline

</style>
