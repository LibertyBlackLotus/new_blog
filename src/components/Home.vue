<template>
    <div>
        <Header></Header>
        <div class="banner">
            <el-carousel>
                <el-carousel-item v-for="item in bannerList" :key="item.id">
                    <img :src="item.image" class="bannerImg"/>
                </el-carousel-item>
            </el-carousel>
        </div>
        <el-row class="homeContent">
            <el-col :span="17">
                <el-tabs class="tabsContent"
                         v-model="activeName"
                         @tab-click="handleTabClick">
                    <el-tab-pane v-for="item in tabList"
                                 :key="item.id"
                                 :label="item.tabItem"
                                 :name="item.name" >
                        <keep-alive>
                            <component v-bind:is="item.component" :userId="userId"></component>
                        </keep-alive>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="6" :offset="1">
                <Recommend :userId="userId"></Recommend>
            </el-col>
        </el-row>
    </div>
</template>

<script>
	import Header from './Header.vue';
	import Hot from './Hot.vue';
	import Latest from './Latest.vue';
	import Focus from './Focus.vue';
	import Recommend from './Recommend.vue';
	import {getUserId} from '../utils/common';

	export default {
		components: {
			Header,
			Hot,
			Latest,
			Focus,
			Recommend
		},

		data() {
			return {
				activeIndex: '1',
				activeName: 'hot',
                userId: getUserId(),
				bannerList: [
					{id: 1, image: require('../assets/banner1.jpg')}
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
