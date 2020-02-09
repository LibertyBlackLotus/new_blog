<template>
  <div>
    <Header></Header>
    <el-row>
      <el-tabs v-model="activeName" >
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.tabItem" :name="item.name">
          <!--{{item.component}}-->
          <Article></Article>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <el-button v-if="this.userInfo.id === 1" @click="toTodo">todolist</el-button>
  </div>
</template>


<script>
  import Header from '../components/Header.vue';
  import Article from '../components/UserArticle.vue';
  import Comments from '../components/UserComments.vue';
  import {getUserInfo} from '../utils/common';

  export default{
    components: {
      Header,Article, Comments
    },

    data(){
      return{
        userInfo: null,
        activeIndex: '1',
        activeName: 'article',
        tabList: [
          {name: 'article', tabItem: '文章', component: Article},
          {name: 'comments', tabItem: '评论', component: Comments},
        ]
      }
    },

    created: function(){
      this.userInfo = getUserInfo();
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      handleTabClick(tab, event) {
        console.log(tab, event);
      },

      toLogin(){
        this.$router.push('/');
      },

      toMyPage(){
        this.$router.push('/mypage');
      },

      toTodo(){
        this.$router.push('/todolist');
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .el-header
    background-color #B3C0D1
    color #333
    text-align center
    background url("../assets/my_page.png") no-repeat center
    background-size 100% 100%

  .el-footer
    background-color #B3C0D1
    color #333
    text-align center
    line-height 60px

  .el-main
    background-color #E9EEF3
    color #333
    text-align center
    line-height 160px
    width 1080px
    margin 0 auto

  .userInfo
    width 100px
    float right

</style>
