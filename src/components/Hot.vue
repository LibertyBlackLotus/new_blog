<!-- 最热文章 -->
<template>
    <el-row class="articleList">
        <el-col v-for="(item) in publishArticleList" :key="item.article_id">
            <el-card class="articleItem">
                <el-tag effect="dark" type="danger">hot</el-tag>
                <span class="articleItemTitle"
                      @click="toDetail(item.article_id)">
                    {{item.article_title}}
                </span>
                <div class="articleItemContent"
                     v-html="item.article_content"  >
                    {{item.article_content}}
                </div>
                <div class="articleItemInfoContent">
                    <span class="articleItemInfo articleItemInfoUser"
                          @click="toUserMainPage(item.User.id)">
                        <img :src="item.User.photo" />
                      </span>
                      <span class="articleItemInfo articleItemInfoUser"
                            @click="toUserMainPage(item.User.id)">
                        {{ item.User.user_name }}
                      </span>
                    <span class="articleItemInfo">
                        <span class="articleItemInfoImg">
                            <img src="../assets/heart.png"/>
                        </span>
                          <span>
                              {{ item.article_like_count }}
                          </span>
                      </span>
                    <span class="articleItemInfo">
                        {{ item.article_date | dateFormat }}
                      </span>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
	export default {
		data() {
			return {
				publishArticleList: [],
			}
		},

		created: function () {
			this.getPublishArticleList();  // 获取文章列表
		},

		methods: {
			getPublishArticleList() {
				this.$http.get('/api/articles/hot')
					.then((res) => {
						console.log('getPublishArticleList: ', res);
						if (res.status == 200) {
							this.publishArticleList = res.data;
						}
					});
			},

			//跳转至详情
			toDetail(id) {
				const {href} = this.$router.resolve({
					name: 'article_detail',
					params: {id}
				});
				window.open(href, '_blank');
			},

			//跳转至用户主页
			toUserMainPage(id) {
				const {href} = this.$router.resolve({
					name: 'mypage',
					params: {id}
				});
				window.open(href, '_blank');
			},

		}

	}
</script>

<style lang="stylus" scoped>
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
