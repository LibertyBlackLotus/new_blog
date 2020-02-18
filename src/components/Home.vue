<template>
  <div>
    <Header></Header>
    <el-row class="content">
      <div class="banner">
        <!--<el-carousel height="300px">-->
          <!--<el-carousel-item v-for="item in bannerList" :key="item.id">-->
            <!--<img :src="item.image" class="bannerImg"/>-->
          <!--</el-carousel-item>-->
        <!--</el-carousel>-->
      </div>
      <Hot></Hot>
    </el-row>
  </div>
</template>

<script>
  import Header from '../components/Header.vue';
  import Hot from '../components/Hot.vue';

  export default{
    components: {
      Header, Hot
    },

    data(){
      return{
        activeIndex: '1',
        activeName: 'hot',
        navList: [
          {path: '/home', navItem: '首页'},
          {path: '/hot', navItem: '最热'},
        ],
        tabList: [
          {name: 'hot', tabItem: '最热', component:  Hot}
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
  .el-header
    background-color #B3C0D1
    color #333
    text-align center
    height 450px !important
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
