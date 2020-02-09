<template>
  <el-row class="header" type="flex">
   <el-col :span="4" :offset="1" class="logo">
     <img src="../assets/logo1.png" @click="toHome" alt="昆朋" />
       <div>昆朋</div>
   </el-col>
   <el-col :span="4" :offset="14" v-if="userInfo" class="userInfo">
     <el-row>
       <el-col :span="12" class="avatar">
         <img src="../assets/avatar.png" />
       </el-col>
       <el-col :span="10" :offset="2">
         <el-tag @click="toMyPage" class="userInfoName">{{userInfo.user_name}}</el-tag>
       </el-col>
     </el-row>
   </el-col>
   <el-col :span="4" v-else>
     <el-button @click="toLogin">
       login
     </el-button>
   </el-col>
    <el-col :span="4" :offset="1">
      <el-button @click="toNotebook">写文章</el-button>
    </el-col>
  </el-row>
</template>

<script>
  export default{
    data(){
      return{
        userInfo: null,
      }
    },

    created: function(){
      this.userInfo = this.getUserInfo();
    },

    methods: {
      //获取用户信息
      getUserInfo() {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        return userInfo != null ? userInfo : '';
      },

      //跳转至我的页
      toMyPage(){
        this.$router.push('/mypage');
      },

      //跳转至发布文章页
      toNotebook(){
        const {href} = this.$router.resolve({
          path: '/notebook',
        });
        window.open(href, '_blank');
      },

      //跳转至首页
      toHome(){
        this.$router.push('/home');
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
  .avatar img
    height 40px
    vertical-align middle
    cursor pointer

  .userInfo
    width 100px
    float right
  .userInfoName
    cursor pointer

</style>
