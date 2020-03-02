import Vue from 'vue';
import Router from 'vue-router';
const Login = () => import('../components/Login.vue');
const Signup = () => import('../components/Signup.vue');
const Home = () => import('../components/Home.vue');
const MyPage = () => import('../components/MyPage.vue');
const Settings = () => import('../components/Settings.vue');
const Hot = () => import('../components/Hot.vue');
const Focus = () => import('../components/Focus.vue');
const Recent = () => import('../components/Recent.vue');
const NoteBook = () => import('../components/NoteBook.vue');
const ArticleDetail = () => import('../components/ArticleDetail.vue');
const SearchResult = () => import('../components/SearchResult.vue');

Vue.use(Router);

const routes = [
	{
		path: '/',
		name: 'login',
		title: '昆朋首页',
		component: Login
	},
	{
		path: '/signup',
		name: 'signup',
		title: '昆朋首页',
		component: Signup
	},
	{
		path: '/home',
		name: 'home',
		title: '昆朋首页',
		component: Home
	},
	{
		path: '/mypage/:id',
		name: 'mypage',
		title: '个人主页',
		props: true,
		component: MyPage
	},
	{
		path: '/settings',
		name: 'settings',
		title: '设置',
		component: Settings
	},
	{
		path: '/notebook',
		name: 'notebook',
		title: '发表文章',
		component: NoteBook
	},
	{
		path: '/hot',
		name: 'hot',
		title: '最热',
		component: Hot
	},
	{
		path: '/focus/:id',
		name: 'focus',
		title: '关注',
		props: true,
		component: Focus
	},
	{
		path: '/article_detail/:id/:title',
		name: 'article_detail',
		title: '文章详情',
		props: true,
		component: ArticleDetail
	},
	{
		path: '/searchResult/:keywords',
		name: 'searchResult',
		title: '搜索结果',
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
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {x: 0, y: 0}
		}
	},
	base: __dirname,
	routes
});
