<template>
    <div>
        <el-card style="min-height:700px;">
            <el-row class="noteTitle">
                <el-input v-model="title" placeholder="请输入标题" class="noteTitleInput"></el-input>
            </el-row>
            <el-row>
                <el-button type="success" size="small" icon="el-icon-upload" @click="noteBookSaveArticle">
                    保存
                </el-button>
                <el-button type="success" size="small" icon="el-icon-s-promotion" @click="noteBookPublishArticle">
                    发布
                </el-button>
            </el-row>
            <quill-editor style="min-height:600px !important;"
                          v-model="content"
                          :options="editorOption"
                          @focus="onEditorFocus($event)"
                          @blur="onEditorBlur($event)"
                          @change="onEditorChange($event)">
                <!-- 自定义toolar -->
                <div id="toolbar" slot="toolbar">
                    <!-- Add a bold button -->
                    <el-button class="ql-bold" title="加粗">Bold</el-button>
                    <button class="ql-italic" title="斜体">Italic</button>
                    <button class="ql-underline" title="下划线">underline</button>
                    <button class="ql-strike" title="删除线">strike</button>
                    <button class="ql-blockquote" title="引用"></button>
                    <button class="ql-code-block" title="代码"></button>
                    <button class="ql-header" value="1" title="标题1"></button>
                    <button class="ql-header" value="2" title="标题2"></button>
                    <!--Add list -->
                    <button class="ql-list" value="ordered" title="有序列表"></button>
                    <button class="ql-list" value="bullet" title="无序列表"></button>
                    <!-- 插入图片 -->
                    <button class="ql-image" title="图片" @click="insertImgClick($event)"></button>
                    <!-- Add font size dropdown -->
                    <select class="ql-header" title="段落格式">
                        <option selected>段落</option>
                        <option value="1">标题1</option>
                        <option value="2">标题2</option>
                        <option value="3">标题3</option>
                        <option value="4">标题4</option>
                        <option value="5">标题5</option>
                        <option value="6">标题6</option>
                    </select>
                    <select class="ql-size" title="字体大小">
                        <option value="10px">10px</option>
                        <option value="12px">12px</option>
                        <option value="14px">14px</option>
                        <option value="16px" selected>16px</option>
                        <option value="18px">18px</option>
                        <option value="20px">20px</option>
                    </select>
                    <select class="ql-font" title="字体">
                        <option value="SimSun">宋体</option>
                        <option value="SimHei">黑体</option>
                        <option value="Microsoft-YaHei">微软雅黑</option>
                        <option value="KaiTi">楷体</option>
                        <option value="FangSong">仿宋</option>
                        <option value="Arial">Arial</option>
                    </select>
                    <!-- Add subscript and superscript buttons -->
                    <select class="ql-color" value="color" title="字体颜色"></select>
                    <select class="ql-background" value="background" title="背景颜色"></select>
                    <select class="ql-align" value="align" title="对齐"></select>
                    <button class="ql-clean" title="还原"></button>
                    <!-- You can also add your own -->

                    <!-- 选择图片input -->
                    <!--<input style="display: none;" type="file" id="insert_image" @change="fileInsert($event)">-->
                </div>
            </quill-editor>        <!--<el-button type="danger" size="small" @click="noteBookRemoveArticle">-->
            <!--删除-->
            <!--</el-button>-->
        </el-card>
    </div>

</template>

<script>
	import {
		Quill,
		quillEditor
	} from 'vue-quill-editor';
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	import '../assets/font.css';

	// 自定义字体大小
	let Size = Quill.import('attributors/style/size');
	Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];
	Quill.register(Size, true);

	// 自定义字体类型
	var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
		'宋体', '黑体'
	];
	var Font = Quill.import('formats/font');
	Font.whitelist = fonts;
	Quill.register(Font, true);

	export default {
		props: {
			saveArticle: Function,    //创建文章
			updateArticle: Function,  //更新文章
			publishArticle: Function, //发布文章
			removeArticle: Function,  //发布文章
			articleId: Number,         //文章ID
		},
		components: {
			quillEditor
		},

		data() {
			return {
				article: {},
				title: '',
				content: null,
				saveStatus: '',
				editorOption: {
					placeholder: "请输入正文",
					theme: "snow",
					modules: {
						toolbar: {
							container: '#toolbar'
						}
					}
				}
			}
		},

		created: function () {
			if(this.articleId != 0){
				this.getArticleDetail();  //获取文章详情
            }
		},

		methods: {
			//填充内容
			setContent() {
				if(this.article){
					this.title = this.article.article_title;
				    this.content = this.article.article_content;
                }
			},

			//获取用户文章详情
			getArticleDetail() {
				let _this = this;
				this.$http.get('/api/articles/' + this.articleId)
					.then((res) => {
						console.log('getArticleDetail: ', res);
						if (res.status == 200) {
							this.article = res.data;
							_this.setContent();
						}
					});
			},

			tabClick(tab) {
				console.log('tabClick: ', tab);
			},

			// 准备富文本编辑器
			onEditorReady(editor) {
				console.log('onEditorReady----');
			},

			// 富文本编辑器 失去焦点事件
			onEditorBlur(editor) {
				console.log('onEditorBlur----');
			},

			// 富文本编辑器 获得焦点事件
			onEditorFocus(editor) {
				console.log('onEditorFocus----');
			},

			// 富文本编辑器 内容改变事件
			onEditorChange({ editor, html, text }) {
				this.content = html;
			},

			insertImgClick() {
				console.log('insertImgClick----');
			},

			// 富文本编辑器 点击插入图片或者视频上传并预览
			fileInsert(e) {
				var oFile = e.target.files[0];
				if (typeof (oFile) === 'undefined') {
					return;
				}
				let sExtensionName = oFile.name.substring(oFile.name.lastIndexOf('.') + 1).toLowerCase();   // 文件扩展名
				let sfileType = ''; // 上传文件类型
				if (e.target.id == 'insert_image') {
					sfileType = 'image'
					if (sExtensionName !== 'png' && sExtensionName !== 'jpg' && sExtensionName !== 'jpeg') {
						alert('不支持该类型图片');
						return;
					}
				}
				if (e.target.id == 'insert_video') {
					sfileType = 'video';
					if (sExtensionName !== 'mp4' && sExtensionName !== 'avi' && sExtensionName !== 'mov') {
						alert('不支持该类型视频');
						return;
					}
					let maxSize = 100 * 1024 * 1024;    // 100MB
					if (oFile.size > maxSize) {
						alert('上传视频大小不能超过100MB');
						return;
					}
				}
				var reader = new FileReader();
				reader.readAsDataURL(oFile);
				reader.onloadend = () => {
					let formData = new FormData(); // 通过formdata上传
					formData.append('file', oFile);
					let sUrl = '';
					if (sfileType == 'image') {
						sUrl = 'Pic';
					}
					if (sfileType == 'video') {
						sUrl = 'Vie';
					}
					var url = this.api_config + '/dealerIndex/upload' + sUrl + '.htm';
					this.axios.post(url, formData, {
						headers: {'Content-Type': 'multipart/form-data'}
					}).then((res) => {
						this.editor.insertEmbed(this.editor.selection.savedRange.index, sfileType, res.data.data);  // 这个方法用来手动插入dom到编辑器里
						let isAndroid = this.$is_android(); // 判断是ios还是android
						if (isAndroid) {
							$('video').removeAttr('controls');
							$('video').attr('x5-video-player-type', 'h5');
						}
						this.editor.setSelection(this.editor.selection.savedRange.index + 1);  // 这个方法可以获取光标位置
					}).catch((response) => {
						console.log('失败', response);
					})
				}
			},

			// 保存/创建文章
			noteBookSaveArticle() {
                if(this.articleId == 0){ 	//创建
					let data = {
						title: this.title,
						content: this.content
					};
					this.saveArticle(data);
				}else{//更新
					let data = {
						id: this.articleId,
						title: this.title,
						content: this.content
					};
					this.updateArticle(data);
                }
			},

//			noteBookRemoveArticle() {
//				let data = {article_id: this.article.article_id};
//				this.removeArticle(data);
//			},

			//发布文章
			noteBookPublishArticle() {
				let data = {
					article_id: this.articleId
				};
				this.publishArticle(data);
			}
		}
	}
</script>

<style lang="stylus" scoped>
    .noteTab
        width 150px
        border 1px solid red

</style>
