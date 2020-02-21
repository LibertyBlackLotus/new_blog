<template>
    <div>
        <Header></Header>
        <div class="myInfo">
            <el-row>
                <span class="avatar">
                    <img :src="userInfo.photo" />
                </span>
                <span class="myName">{{userInfo.user_name}}</span>
                <el-button type="primary"
                           size="small"
                           v-if="!isFocus"
                           @click="focusUser">
                    关注
                </el-button>

                <el-button type="danger"
                           size="small"
                           v-if="isFocus"
                           @click="removeFocus">
                    已关注
                </el-button>
            </el-row>
        </div>
        <div class="myPageContent">
            <el-row>
                <el-col :span="17">
                    <el-tabs class="tabsContent"
                             v-model="activeName" >
                        <el-tab-pane v-for="item in myPageTabsList"
                                     :key="item.id"
                                     :label="item.tabItem"
                                     :name="item.name" >
                            <keep-alive>
                                <component v-bind:is="item.component" :userId="id"></component>
                            </keep-alive>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="6" :offset="1">
                    <ReadRecord :userId="id"></ReadRecord>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
	import Header from './Header.vue';
	import Article from './UserArticle.vue';
	import Collection from './UserCollection.vue';
	import ReadRecord from './ReadRecord.vue';
	import moment from 'moment';
	import {getUserId} from '../utils/common';

	export default {
		props: {
		    id: [Number, String]  //个人主页用户id
        },

		components: {
			Header,
            Article,
			Collection,
			ReadRecord
		},

		data() {
			return {
				activeIndex: '1',
				activeName: 'article',
				imageSave: '../assets/avatar.png',
				userInfo: {},
                isFocus: false,
				myPageTabsList: [
					{id: 1, name: 'article', tabItem: '文章', component: Article},
					{id: 2, name: 'collection', tabItem: '收藏', component: Collection}
				]
			}
		},

        mounted: function(){
            this.getUserInfo();  //获取用户信息
            this.checkFocus();   //检测是否关注
        },

		methods: {
        	//获取用户信息
            getUserInfo(){
				this.$http.get('/auth/user/' + this.id)
					.then((res) => {
						if (res.status == 200) {
							this.userInfo = res.data;
						}
					});
            },

            //关注用户
			focusUser(){
            	let data = {
                    user_id: getUserId(),      //当前登录用户id
                    user_friends_id: this.id,  //个人主页或文章博主id
                    focus_time: moment().format('YYYY-MM-DD HH:mm:ss')  //关注时间
                };
				this.$http.post('/api/friends', data)
					.then((res) => {
						if (res.status == 200) {
							this.$message({
								type: 'success',
								message: '关注成功！'
							});
							this.isFocus = true;
						}
					});
            },

			//取消关注
			removeFocus(){
				let data = {
					user_id: getUserId(),      //当前登录用户id
					user_friends_id: this.id,  //个人主页或文章博主id
				};
				this.$http.delete('/api/friends/removeFocus', {data: data})
					.then((res) => {
						if (res.status == 200) {
							this.$message({
								type: 'success',
								message: '已取消关注！'
							});
							this.isFocus = false;
						}
					});
			},

			//检测是否关注
			checkFocus(){
				let data = {
					user_id: getUserId(),      //当前登录用户id
					user_friends_id: this.id,  //个人主页或文章博主id
				};
				this.$http.post('/api/friends/checkFocus', data)
					.then((res) => {
                        console.log('checkFocus-->', res);
						if (res.status == 200) {
                            this.isFocus = res.data;
						}
					});
			}
		},
	}
</script>

<style lang="stylus" scoped>
    .myInfo
        width 1080px
        margin 0 auto
        margin-bottom 20px
        padding 10px
    .userInfo
        width 100px
        float right
    .avatar img
        width 80px
        border-radius 100%
    .myName
        font-size 24pt
    .myPageContent
        width 1080px
        margin 0 auto
</style>
