<template>
    <el-row class="content">
        <el-col :xs="24" :sm="{span: 6, offset: 9}">
            <span class="title">
                欢迎注册
            </span>
            <el-row>
                <el-input
                        v-model="account"
                        placeholder="用户名"
                        type="text">
                </el-input>
                <el-input
                        v-model="password"
                        placeholder="密码"
                        type="password"
                        @keyup.enter.native="signup">
                </el-input>
                <el-button type="primary" @click="signup">注册</el-button>
            </el-row>
            <el-button type="success" @click="toLogin">登录</el-button>
        </el-col>
    </el-row>
</template>

<script>
    import moment from 'moment';

	export default {
		data() {
			return {
				account: '',
				password: ''
			}
		},
		methods: {
			//注册
			signup() {
				let obj = {
					name: this.account,
					password: this.password,
                    register_time: moment().format('YYYY-MM-DD HH:mm:ss')
				};
				this.$http.post('/auth/user', obj)
					.then(res => {
						if (res.data.success) {
							sessionStorage.setItem('myToken', res.data.token);
							sessionStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
							this.$message({
								type: 'success',
								message: '注册成功！'
							});
							this.$router.push('/home');
						} else {
							this.$message.error(res.data.info);
							sessionStorage.setItem('myToken', null);
						}
					}, () => {
						this.$message.error('请求错误！');
						sessionStorage.setItem('myToken', null);
					})
			},

			toLogin(){
				this.$router.push('/login');
            }
		}
	}
</script>

<style lang="stylus" scoped>
    .el-row.content
        padding 16px

    .title
        font-size 28px

    .el-input
        margin 12px 0

    .el-button
        width 100%
        margin-top 12px
</style>
