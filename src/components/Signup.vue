<template>
    <Row class="content">
        <i-col :xs="24" :sm="{span: 6, offset: 9}">
            <span class="title">
                欢迎注册
            </span>
            <Row>
                <Input class="el-input"
                        v-model="account"
                        placeholder="用户名"
                        type="text" />
                <Input
                        v-model="password"
                        placeholder="密码"
                        type="password"
                        @keyup.enter.native="signup" />
                <Button type="primary" @click="signupMethod">注册</Button>
            </Row>
            <Button type="success" @click="toLogin">登录</Button>
        </i-col>
    </Row>
</template>

<script>
    import moment from 'moment';
	import {mapState, mapActions} from 'vuex';

	export default {
		data() {
			return {
				account: '',
				password: ''
			}
		},
		methods: {
			...mapActions([
				'signup'     //注册
			]),

			//注册
			signupMethod() {
				let obj = {
					name: this.account,
					password: this.password,
                    register_time: moment().format('YYYY-MM-DD HH:mm:ss')
				};
				this.signup(obj).then( res => {
					if (res.data.success) {
							sessionStorage.setItem('myToken', res.data.token);
							sessionStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
							this.$Message.success({
								content: '注册成功！'
							});
							this.$router.push('/home');
						} else {
							this.$Message.error(res.data.info);
							sessionStorage.setItem('myToken', null);
						}
                });
			},

			toLogin(){
				this.$router.push('/login');
            }
		}
	}
</script>

<style lang="stylus" scoped>
    .content
        padding 16px

    .title
        font-size 28px

    .el-input
        margin 12px 0

    .el-button
        width 100%
        margin-top 12px
</style>
