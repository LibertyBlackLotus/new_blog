<!-- 最热文章 -->
<template>
    <div class="articleList">
        <Row v-for="(item) in hotList" :key="item.article_id">
            <Card class="articleItem">
                <Tag color="red">hot</Tag>
                <span class="articleItemTitle"
                      @click="toDetail(item.article_id, item.article_title)">
                    {{item.article_title}}
                </span>
                <div class="articleItemContent"
                     v-html="item.article_content">
                    {{item.article_content}}
                </div>
                <div class="articleItemInfoContent">
                    <span class="articleItemInfo articleItemInfoUser"
                          @click="toUserMainPage(item.User.id)">
                        <img :src="item.User.photo? item.User.photo: require('../assets/avatar.png')"/>
                        {{ item.User.user_name }}
                      </span>
                    <span class="articleItemInfo">
                         <Tag color="red">
                           {{item.article_views}} 次阅读
                        </Tag>
                        <span class="articleItemInfoImg">
                            <img src="../assets/heart.png"/>
                        </span>
                          <span>
                              {{ item.article_like_count }}
                          </span>
                      </span>
                    <Tag class="articleItemInfo">
                        发表于<Time :time="item.article_date"/>
                        {{ item.article_date | dateFormat }}
                      </Tag>
                    <span class="articleItemInfo">
                        共{{ item.article_comment_count }}条评论
                      </span>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
	import {mapState, mapActions} from 'vuex';
	import {openBlank} from '../utils/common';

	export default {
		computed: {
			...mapState({
				hotList: state => state.article.hotList  //文章列表
			})
		},

		mounted: function () {
			this.getHotList();    //获取文章列表
		},

		methods: {
			...mapActions({
				getHotList: 'getHotList',  //获取文章列表
			}),

			//跳转至详情
			toDetail(id, title) {
				openBlank(this.$router, 'article_detail', {id, title});
			},

			//跳转至用户主页
			toUserMainPage(id) {
				openBlank(this.$router, 'mypage', {id});
			}
		}
	}
</script>

<style lang="stylus" scoped>
    .articleItem
        margin-top 5px

    .articleItemTitle
        font-size 16px
        font-weight 600
        color #00b4ff
        cursor pointer

    .articleItemTitle:hover
        text-decoration underline

    .articleItemContent
        max-height 200px
        overflow hidden

    .articleItemInfoContent
        margin-top 10px

    .articleItemInfo
        margin-left 20px
        font-size 12px
        color #b4b4b4

    .articleItemInfoUser
        cursor pointer

    .articleItemInfoUser img
        width 30px

    .articleItemInfoImg img
        width 10px

</style>
