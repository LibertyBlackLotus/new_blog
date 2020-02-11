<template>
  <el-row type="flex" justify="center" class="content">
    <div class="signup">
      <el-button type="primary" @click="signup">注册</el-button>
    </div>
    <el-col :xs="24" :sm="{span: 6, offset: 9}">
            <span class="title">
                欢迎登录
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
          @keyup.enter.native="loginToDo">
        </el-input>
        <el-button type="primary" @click="loginToDo">登录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        account: '',
        password: ''
      }
    },
    methods: {
      signup(){
        this.$router.push('/signup');
      },

      loginToDo () {
        let obj = {
          name: this.account,
          password: this.password
        };
        this.$http.post('/auth/userAuth', obj)
          .then((res) => {
            if (res.data.success) {
              sessionStorage.setItem('my-token', res.data.token);
              sessionStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
              this.$message({
                type: 'success',
                message: '登录成功！'
              });
              this.$router.push('/home');
            } else {
              this.$message.error(res.data.info);
              sessionStorage.setItem('my-token', null);
            }
          }, (err) => {
            this.$message.error('请求错误！');
            sessionStorage.setItem('my-token', null);
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .el-row.content
    background url(../assets/login.png) no-repeat
    background-size 100% 100%
    height 800px
    align-items center
    justify-content center

  .signup
     position fixed
     top 10px
     right 10px

  .title
    font-size 28px
    color #fff

  .el-input
    margin 12px 0

  .el-button
    width 100%
    margin-top 12px
</style>
