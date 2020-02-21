<!-- 搜索结果组件 -->
<template>
    <div>
        <Header></Header>
        <div class="articleList">
            <el-tag>{{seachResult.length}}个结果</el-tag>
            <el-row class="articleList">
                <!-- 搜索结果 -->
                <el-col :span="18">
                    <el-card class="articleItem"
                             v-for="item in seachResult"
                             :key="item.article_id">
                        <!-- 作者 -->
                        <div class="articleItemInfoContent">
                        <span class="articleItemInfo articleItemInfoUser">
                            <img :src="item.User.photo"/>
                        </span>
                            <span class="articleItemInfo articleItemInfoUser">
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
                        <!-- 标题 -->
                        <span class="articleItemTitle"
                              @click="toDetail(item.article_id)">
                        {{item.article_title}}
                    </span>
                        <!-- 内容 -->
                        <div class="articleItemContent"
                             v-html="item.article_content">
                            {{item.article_content}}
                        </div>
                    </el-card>
                </el-col>

                <!-- 最近搜索 -->
                <el-col :span="6">
                    <RecentSearch :userId="userId"></RecentSearch>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
	import Header from './Header.vue';
	import RecentSearch from './RecentSearch.vue';
	import moment from 'moment';
	import {getUserId} from '../utils/common';

	export default {
		props: {
			keywords: String  //关键字
		},

		components: {
			Header,
			RecentSearch
		},

		data() {
			return {
				seachResult: [],    //搜索结果
				seachRecord: [],    //搜索记录
                userId: getUserId() //用户id
			}
		},

		created: function () {
			this.saveSearchRecord(); //记录搜索内容
			this.getSearchItem();    //获取搜索结果
		},

		methods: {
			//记录搜索内容
            saveSearchRecord(){
                let params = {
                    user_id: this.userId,
                    content: this.keywords,
                    time: moment().format('YYYY-MM-DD HH:mm:ss'),
                };
				this.$http.post('/api/record/searchRecord', params)
					.then((res) => {
						console.log('saveSearchRecord: ', res);
						if (res.status == 200) {
							this.seachRecord = res.data;
						}
					});
            },

			//获取搜索结果
			getSearchItem() {
				this.$http.get('/api/articles/search/' + this.keywords)
					.then((res) => {
						console.log('getSearchItem: ', res);
						if (res.status == 200) {
							this.seachResult = res.data;
						} else {
							this.$message({
								type: 'error',
								message: '获取搜索结果失败！'
							});
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
        width 1080px
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
        margin-top 5px
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
