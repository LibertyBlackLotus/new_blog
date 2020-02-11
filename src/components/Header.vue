<template>
    <el-row class="header" type="flex">
        <el-col :span="4" :offset="1" class="logo">
            <img src="../assets/logo1.png" @click="toHome" alt="昆朋"/>
            <span>昆朋</span>
        </el-col>
        <el-col :span="4" :offset="14" v-if="userInfo" class="userInfo">
            <el-row>
                <el-dropdown @command="handleCommand">
                      <span class="el-dropdown-link">
                        <span class="avatar"><img :src="userInfo.photo"/></span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="toMyPage">我的主页</el-dropdown-item>
                        <el-dropdown-item command="toSettings">设置</el-dropdown-item>
                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-row>
        </el-col>
        <el-col :span="4" v-else>
            <el-button @click="toLogin">
                login
            </el-button>
        </el-col>
        <el-col :span="4" :offset="1" v-if="userInfo">
            <el-button @click="toNotebook">写文章</el-button>
        </el-col>
    </el-row>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: null,
			}
		},

		created: function () {
			this.userInfo = this.getUserInfo();
		},

		methods: {
			//获取用户信息
			getUserInfo() {
				let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
				return userInfo != null ? userInfo : '';
			},

			handleCommand(command) {
				switch (command) {
					case 'toMyPage':
						this.toMyPage();
						break;
					case 'toSettings':
						this.toSettings();
						break;
					case 'logout':
						this.logout();
						break;
					default:
						this.toMyPage();
				}
			},

			//跳转至我的页
			toMyPage() {
				this.$router.push('/mypage');
			},

			//跳转至设置
			toSettings() {
				this.$router.push('/settings');
			},

			//登出
			logout() {
				sessionStorage.setItem('my-token', null);
				sessionStorage.setItem('userInfo', null);
				this.toLogin();
			},

			//跳转至发布文章页
			toNotebook() {
				const {href} = this.$router.resolve({
					path: '/notebook',
				});
				window.open(href, '_blank');
			},

			//跳转至首页
			toHome() {
				this.$router.push('/home');
			},

			//跳转至登录页
			toLogin() {
				this.$router.push('/login');
			}
		}
	}
</script>

<style lang="stylus" scoped>
    .header
        height 60px !important
        line-height 60px !important
        border-bottom 1px solid #f1f1f1
        background #ffffff

    .logo img
        height 40px
        vertical-align middle
        cursor pointer

    .avatar
        float left
        cursor: pointer

    .avatar img
        height 40px
        vertical-align middle

    .userInfo
        width 100px
        float right

    .userInfoName
        cursor pointer

</style>
