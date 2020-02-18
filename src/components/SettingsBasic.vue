<template>
    <div class="settingBasic">
        <el-row>
            <el-col :span="4">
                <div class="avatar">
                    <img :src="imageSave"/>
                </div>
            </el-col>
            <el-col :span="20">
                <el-button>更换头像
                    <input accept="image/png,image/jpeg,image/jpg"
                           class="idimg"
                           type="file"
                           multiple
                           v-on:change="selectedImg($event)"/>
                </el-button>

            </el-col>
        </el-row>

        <el-row>
            <el-col :span="4">
                <span>
                    昵称
                </span>
            </el-col>
            <el-col :span="20">
                {{userInfo.user_name}}
            </el-col>
        </el-row>
    </div>
</template>


<script>
	import {getUserInfo} from '../utils/common';

	export default {
		components: {},

		data() {
			return {
				imageSave: '../assets/avatar.png',
				userInfo: getUserInfo() ? getUserInfo() : {},
			}
		},

		mounted: function () {
			console.log('mounted -->', this.userInfo);
			if (this.userInfo) {
				this.imageSave = this.userInfo.photo;
			}
		},

		methods: {
			//提示消息
			notify(message = '', type = '') {
				this.$message({message, type});
			},

			selectedImg(e) {
//				this.notify('正在解析图片');
				let files = e.target.files || e.dataTransfer.files;
				if (!files.length) return;
				this.picavalue = files[0];
                //console.log(this.picavalue.size / 1024)
				if (this.picavalue.size / 1024 > 10240) {
					this.notify('图片过大，请重新上传', '温馨提示', 'warning');
				} else {
//					this.notify('正在获取图片');
					this.imgPreview(this.picavalue);
				}
			},
			//获取图片
			imgPreview(file) {
//				this.notify('正在压缩图片');
				let self = this
				//判断支不支持FileReader
				if (!file || !window.FileReader) return false;
				if (/^image/.test(file.type)) {
					//创建一个reader
					let reader = new FileReader();
					//将图片转成base64格式
					reader.readAsDataURL(file);
					//读取成功后的回调
					reader.onloadend = function () {
						let result = this.result;
						let img = new Image();
						img.src = result;
                        //console.log('********未压缩前的图片大小********');
                        //console.log(result.length / 1024)
						img.onload = function () {
							let data = self.compress(img, 0.3);
							self.uploadImg(data);
						}
					}
				}
			},
			// 压缩图片
			compress(img, size) {
				let canvas = document.createElement('canvas');
				let ctx = canvas.getContext('2d')
				let width = img.width
				let height = img.height
				canvas.width = width
				canvas.height = height
				// 铺底色
				ctx.fillStyle = '#fff'
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0, width, height);
				//进行最小压缩
				let ndata = canvas.toDataURL('image/jpeg', size);
				//console.log('*******压缩后的图片大小*******')
				//console.log(ndata)
				//console.log(ndata.length / 1024)
				return ndata;
			},

			//上传图片
			uploadImg(base64) {
//				this.notify('正在上传图片');
				let body = {
					'id': this.userInfo.id,
					'picBase64': base64
				};
				this.$http.post('/api/uploadAvatar', body).then(res => {
					console.log(' res-->', res);
					if (res.status == '200') {
						this.notify('更换成功！');
						let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
						userInfo.photo = res.data.url;
						this.imageSave = userInfo.photo;
						sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
						console.log('userInfo after: ', userInfo);
					}
				});
			}
		},
	}
</script>

<style lang="stylus" scoped>
    .settingBasic
        padding 30px
    .avatar
        width 80px
    .avatar img
        width 80px
        border-radius 100%
</style>
