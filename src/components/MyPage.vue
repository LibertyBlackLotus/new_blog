<template>
    <div>
        <Header></Header>
        <div class="myInfo">
            <el-row>
                <el-col :span="4">
                    <div class="avatar">
                        <img src="../assets/avatar.png"/>
                    </div>
                </el-col>
                <el-col :span="20">
                    <el-row>
                        {{userInfo.user_name}}
                    </el-row>
                </el-col>
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
    .el-header
        background-color #B3C0D1
        color #333
        text-align center
        background-size 100% 100%

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
    .myInfo
        width 1080px
        margin 0 auto
        margin-bottom 20px
        padding 10px
    .userInfo
        width 100px
        float right
    .avatar
        width 80px
    .avatar img
        width 80px
        border-radius 100%

</style>
