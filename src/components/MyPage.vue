<template>
    <div>
        <Header></Header>
        <div class="myInfo">
            <el-row>
                <span class="avatar">
                    <img :src="userInfo.photo"/>
                </span>
                <span class="myName">{{userInfo.user_name}}</span>

                <!--<el-col :span="2">-->
                    <!--<div class="avatar">-->
                        <!--<img :src="userInfo.photo"/>-->
                    <!--</div>-->
                <!--</el-col>-->
                <!--<el-col :span="22">-->
                    <!--&lt;!&ndash;<el-row>&ndash;&gt;-->
                        <!--<span class="myName">{{userInfo.user_name}}</span>-->
                    <!--&lt;!&ndash;</el-row>&ndash;&gt;-->
                <!--</el-col>-->
            </el-row>
        </div>
        <Article></Article>
    </div>
</template>

<script>
	import Header from '../components/Header.vue';
	import Article from '../components/UserArticle.vue';
	import {getUserInfo} from '../utils/common';

	export default {
		components: {
			Header, Article
		},

		data() {
			return {
				activeIndex: '1',
				activeName: 'article',
				imageSave: '../assets/avatar.png',
				userInfo: getUserInfo() ? getUserInfo() : {},
			}
		},

		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},

			handleTabClick(tab, event) {
				console.log(tab, event);
			},

			toLogin() {
				this.$router.push('/');
			},

			toMyPage() {
				this.$router.push('/mypage');
			},

			toTodo() {
				this.$router.push('/todolist');
			},
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



</style>
