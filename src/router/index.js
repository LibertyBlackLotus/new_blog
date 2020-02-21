import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import Home from '../components/Home.vue';
import MyPage from '../components/MyPage.vue';
import Settings from '../components/Settings.vue';
import Hot from '../components/Hot.vue';
import Focus from '../components/Focus.vue';
import Recent from '../components/Recent.vue';
import NoteBook from '../components/NoteBook.vue';
import ArticleDetail from '../components/ArticleDetail.vue';
import SearchResult from '../components/SearchResult.vue';

Vue.use(Router);

const routes = [
	{
		path: '/',
		name: 'login',
		component: Login
	},
	{
		path: '/signup',
		name: 'signup',
		component: Signup
	},
	{
		path: '/home',
		name: 'home',
		component: Home
	},
	{
		path: '/mypage/:id',
		name: 'mypage',
		props: true,
		component: MyPage
	},
	{
		path: '/settings',
		name: 'settings',
		component: Settings
	},
	{
		path: '/notebook',
		name: 'notebook',
		component: NoteBook
	},
	{
		path: '/hot',
		name: 'hot',
		component: Hot
	},
	{
		path: '/focus/:id',
		name: 'focus',
		props: true,
		component: Focus
	},
	{
		path: '/article_detail/:id',
		name: 'article_detail',
		props: true,
		component: ArticleDetail
	},
	{
		path: '/searchResult/:keywords',
		name: 'searchResult',
		props: true,
		component: SearchResult
	},
	{
		path: '/recent',
		name: 'recent',
		component: Recent
	},
	{
		path: '*',
		redirect: '/'
	},
];

export default new Router({
	mode: 'history',
	base: __dirname,
	routes
});
