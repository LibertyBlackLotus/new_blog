<template>
    <div>
        <BackToTop></BackToTop>
        <Header></Header>
        <!--<div class="banner">-->
            <!--<el-carousel>-->
                <!--<el-carousel-item v-for="item in bannerList" :key="item.id">-->
                    <!--<img :src="item.image" class="bannerImg"/>-->
                <!--</el-carousel-item>-->
            <!--</el-carousel>-->
        <!--</div>-->
        <Row class="homeContent">
            <i-col span="16">
                <Tabs class="tabsContent"
                         v-model="activeName" >
                    <TabPane v-for="item in tabList"
                                 :key="item.id"
                                 :label="item.tabItem"
                                 :name="item.name" >
                        <keep-alive>
                            <component v-bind:is="item.component" :userId="userId"></component>
                        </keep-alive>
                    </TabPane>
                </Tabs>
            </i-col>
            <i-col span="7" offset="1">
                <Recommend :userId="userId"></Recommend>
            </i-col>
        </Row>

        <Footer></Footer>
    </div>
</template>

<script>
	import Vue from 'vue';
    import {getUserId} from '../utils/common';
	const Header = () => import('./Header.vue');
	const Footer = () => import('./Footer.vue');
	const Hot = () => import('./Hot.vue');

	const Latest = Vue.component('Latest', function (resolve) {
		setTimeout(function () {
			require(['./Latest.vue'], resolve)
		}, 1000);
	});
	const BackToTop = Vue.component('BackToTop', function (resolve) {
		setTimeout(function () {
			require(['./BackToTop.vue'], resolve)
		}, 1000);
	});
	const Focus = Vue.component('Focus', function (resolve) {
		setTimeout(function () {
			require(['./Focus.vue'], resolve)
		}, 1000);
	});
	const Recommend = Vue.component('Recommend', function (resolve) {
		setTimeout(function () {
			require(['./Recommend.vue'], resolve)
		}, 1000);
	});

	export default {
		components: {
			Header,
			Hot,
			Latest,
			Focus,
			Recommend,
			Footer
		},

		data() {
			return {
				activeIndex: '1',
				activeName: 'hot',
                userId: getUserId(),
				bannerList: [
//					{id: 1, image: require('../assets/banner1.jpg')}
                ],
				tabList: [
					{id: 1, name: 'hot', tabItem: '最热', component: Hot},
					{id: 2, name: 'latest', tabItem: '最新', component: Latest},
					{id: 3, name: 'focus', tabItem: '关注', component: Focus},
				]
			}
		},

		methods: {
			//点击tab
			handleTabClick(tab, event) {
//				console.log(tab, event);
			},
		},
	}
</script>

<style lang="stylus" scoped>
    .homeContent
        width 1080px
        margin 0 auto
    .bannerImg
        width 100%


</style>
