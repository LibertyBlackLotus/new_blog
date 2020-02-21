<!-- 用户收藏的文章 -->
<template>
    <el-row class="articleList">
        <el-tag>共收藏 {{userCollectionList.length}} 篇文章</el-tag>
        <el-col v-for="(item) in userCollectionList" :key="item.id">
            <el-card class="articleItem">
                <span class="articleItemTitle"
                      @click="toDetail(item.article_id)">
                    {{item.article && item.article.article_title}}
                </span>
                <div class="articleItemContent"
                     v-html="item.article && item.article.article_content">
                    {{item.article && item.article_content}}
                </div>
                <div class="articleItemInfoContent">
                    <span class="articleItemInfo articleItemInfoUser">
                        <img :src="item.User && item.User.photo"/>
                      </span>
                    <span class="articleItemInfo articleItemInfoUser">
                        {{ item.User && item.User.user_name }}
                      </span>
                    <span class="articleItemInfo">
                        <span class="articleItemInfoImg">
                            <img src="../assets/heart.png"/>
                        </span>
                          <span>
                              {{ item.article && item.article.article_like_count }}
                          </span>
                        <span class="articleItemInfo">
                            {{ item.article && item.article.article_date | dateFormat }}
                        </span>
                    </span>
                    <el-button type="text" size="small" @click="removeCollection(item)">取消收藏</el-button>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
	export default {
		props: {
			userId: [Number, String]  //个人主页用户id
		},

		data() {
			return {
				userCollectionList: [],  //收藏列表
			}
		},

		created: function () {
			this.getUserCollectionList();   //获取用户收藏列表
		},

		methods: {
			//获取用户收藏列表
			getUserCollectionList() {
				this.$http.get('/api/collection/user/' + this.userId)
					.then((res) => {
						console.log('getUserCollectionList: ', res);
						if (res.status == 200) {
							this.userCollectionList = res.data;
						}
					});
			},

            //取消收藏
            removeCollection(item){
				this.$http.delete('/api/collection/' + item.id)
					.then((res) => {
						if (res.status == 200) {
							this.getUserCollectionList();
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
			}

		}

	}
</script>

<style lang="stylus" scoped>
    .articleList

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
