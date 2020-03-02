<!-- 关注的用户发表的文章 -->
<template>
    <Row class="articleList">
        <i-col v-for="(item) in focusArticleList" :key="item.article_id">
            <Card class="articleItem">
                <span class="articleItemTitle"
                      @click="toDetail(item.article_id, item.article_title)">
                    {{item.article_title}}
                </span>
                <div class="articleItemContent"
                     v-html="item.article_content"  >
                    {{item.article_content}}
                </div>
                <div class="articleItemInfoContent">
                    <span class="articleItemInfo articleItemInfoUser"
                          @click="toUserMainPage(item.User.id)">
                        <img :src="item.User && item.User.photo ? item.User.photo: require('../assets/avatar.png')" />
                        {{ item.User && item.User.user_name }}
                      </span>
                    <span class="articleItemInfo">
                        <Tag>
                           {{item.article_views}} 次阅读
                        </Tag>
                        <Tag color="gold">
                            <span class="articleItemInfoImg">
                                <img src="../assets/heart.png"/>
                            </span>
                            <span>
                              {{ item.article_like_count }}
                            </span>
                        </Tag>
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
        </i-col>
    </Row>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
	import {openBlank} from '../utils/common';

	export default {
		props: {
			userId: [Number, String]  //用户id
        },

        computed: {
            ...mapState({
				focusArticleList: state => state.article.focusArticleList  //关注的用户文章列表
            })
        },

		created: function () {
			this.getFocusUserArticleList({id: this.userId});  // 获取关注文章列表
		},

		methods: {
            ...mapActions([
            	'getFocusUserArticleList' //获取关注文章列表
            ]),

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
    .articleList
        margin 0 auto
    .articleItem
        margin-top 1px
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
