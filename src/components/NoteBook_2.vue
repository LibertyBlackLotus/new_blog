<template>
    <el-tabs :tab-position="tabPosition" @tab-click="tabClick">
        <el-tab-pane label="新建文章">
            <!--<Editor :saveArticle="saveArticle" :publishArticle="publishArticle">-->
            <!--</Editor>-->
            <el-card style="height: 610px;">
                <quill-editor
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @focus="onEditorFocus($event)"
                        @blur="onEditorBlur($event)"
                        @change="onEditorChange($event)">
                </quill-editor>
            </el-card>
        </el-tab-pane>
        <el-tab-pane v-for="(item) in articleList"
                     :key="item.article_id"
                     :label="item.article_title">
            <!--<Editor :saveArticle="saveArticle"-->
            <!--:updateArticle="updateArticle"-->
            <!--:publishArticle="publishArticle"-->
            <!--:removeArticle="removeArticle"-->
            <!--:article="item">-->
            <!--</Editor>-->
            <!--<el-card style="height: 610px;">-->
                <!--<quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">-->
                <!--</quill-editor>-->
            <!--</el-card>-->
        </el-tab-pane>
    </el-tabs>
</template>

<script>
	import {getUserInfo} from '../utils/common';
	//	import Editor from './NoteBookEditor.vue';
	//	import moment from 'moment';
	//	import {
	//		Quill,
	//		quillEditor
	//	} from 'vue-quill-editor';
	//	import 'quill/dist/quill.core.css';
	//	import 'quill/dist/quill.snow.css';
	//	import 'quill/dist/quill.bubble.css';
	//	import '../assets/font.css';

	import {quillEditor} from 'vue-quill-editor' // 调用富文本编辑器
	import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
	//import 'quill/dist/quill.core.css'
	//import 'quill/dist/quill.bubble.css'
	import * as Quill from 'quill'; // 富文本基于quill

	// 自定义字体大小
//	let Size = Quill.import('attributors/style/size');
//	Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];
//	Quill.register(Size, true);

	// 自定义字体类型
//	var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
//		'宋体', '黑体'
//	];
//	var Font = Quill.import('formats/font');
//	Font.whitelist = fonts;
//	Quill.register(Font, true);

	export default {
		components: {
//			Editor,
//            Ue,
			quillEditor
		},

		data() {
			return {
				tabPosition: 'left',
				userInfo: null,
				articleList: [],
				editor: null,   // 富文本编辑器对象
				content: `<p></p><p><br></p><ol></ol>`, // 富文本编辑器默认内容
				editorOption: { //  富文本编辑器配置
					modules: {
//						toolbar: '#toolbar'
					},
					theme: 'snow',
					placeholder: '请输入正文'
				},
			}
		},

		created: function () {
			this.userInfo = getUserInfo();
			this.getArticleList();  //获取文章列表
		},

		mounted: function () {
			this.editor = this.$refs.myQuillEditor.quill;
		},

		destroyed: function () {
			this.editor = null;
			delete this.editor;
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

			// 准备富文本编辑器
			onEditorReady(editor) {
			},

			// 富文本编辑器 失去焦点事件
			onEditorBlur(editor) {
			},

			// 富文本编辑器 获得焦点事件
			onEditorFocus(editor) {
			},

			// 富文本编辑器 内容改变事件
			onEditorChange(editor) {
			},

		},
	}
</script>

<style lang="stylus" scoped>
    .noteTab
        width 150px
        border 1px solid red

</style>
