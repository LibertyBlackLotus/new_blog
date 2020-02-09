<template>
  <div class="home">
    <Header></Header>
    <el-row class="content">
      <div class="banner">
        <el-carousel height="300px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.image" class="bannerImg"/>
          </el-carousel-item>
        </el-carousel>
      </div>

      <!--<el-tabs v-model="activeName" class="contentTabs">-->
        <!--<el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.tabItem" :name="item.name">-->
          <!--&lt;!&ndash;{{item.component}}&ndash;&gt;-->
          <!--<Hot></Hot>-->
        <!--</el-tab-pane>-->
      <!--</el-tabs>-->

      <Hot></Hot>
    </el-row>
  </div>
</template>

<script>
  import Header from '../components/Header.vue';
  import Hot from '../components/Hot.vue';
  import Recent from '../components/Recent.vue';

  export default{
    components: {
      Header, Hot, Recent
    },

    data(){
      return{
        activeIndex: '1',
        activeName: 'hot',
        bannerList: [
          {id: 1, tabItem: '最热', image: require('../assets/home.png')},
          {id: 2, tabItem: '最新', image: require('../assets/my_page.png')},
          {id: 3, tabItem: '最新', image: require('../assets/home.png')},
        ],
        navList: [
          {path: '/home', navItem: '首页'},
          {path: '/hot', navItem: '最热'},
          {path: '/recent', navItem: '最新'},
        ],
        tabList: [
          {name: 'hot', tabItem: '最热', component:  Hot},
          {name: 'recent', tabItem: '最新', component: Recent},
        ]
      }
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
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .home
    background linear-gradient(to right, #ffffff  ,   #e5e7e9 )
    padding-bottom 100px
  .el-header
    background-color #B3C0D1
    color #333
    text-align center
    height 450px !important
    background url("../assets/home.png") no-repeat center
    background-size 100% 100%
  .banner
  .bannerImg
    width 100%

  .content
    padding 0 50px
    margin 0 auto
  .contentTabs
    width 1080px

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
