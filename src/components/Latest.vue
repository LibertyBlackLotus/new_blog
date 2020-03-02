<!-- 最新文章 -->
<template>
    <Row class="articleList">
        <i-col v-for="(item) in latestList" :key="item.article_id">
            <Card class="articleItem">
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
                        <span>{{ item.User.user_name }}</span>
                      </span>
                    <span class="articleItemInfo">
                        <Tag>
                           {{item.article_views}} 次阅读
                        </Tag>
                        &nbsp;&nbsp;
                        <span class="articleItemInfoImg">
                            <img src="../assets/heart.png"/>
                        </span>
                          <span>
                              {{ item.article_like_count }}
                          </span>
                      </span>
                    <Tag class="articleItemInfo" color="blue">
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
		computed: {
			...mapState({
				latestList: state => state.article.latestList
			})
		},

		mounted() {
			this.getLatestList();  // 最新文章列表
		},

		methods: {
			...mapActions([
				'getLatestList' // 获取最新文章列表
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
        height 20px
        line-height 20px

    .articleItemInfoUser img
        width 20px

    .articleItemInfoImg img
        width 10px


</style>
