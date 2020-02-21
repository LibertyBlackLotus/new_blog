import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios';
import router from './router';
import moment from 'moment';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
// Axios.defaults.baseURL = 'http://39.100.152.216:80'; //配置axios请求url
Axios.defaults.baseURL = 'http://localhost:8889';      //配置axios请求url

Vue.filter('dateFormat', function (dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
	return moment(dateStr).format(pattern);
});
Vue.filter('dateFormatDay', function (dateStr, pattern = "YYYY-MM-DD") {
	return moment(dateStr).format(pattern);
});
Vue.use(ElementUI);

// 响应拦截器，统一处理响应
Axios.interceptors.response.use(res => {
	if (res.status == '200') {
		return Promise.resolve(res);
	}else{
		return Promise.reject(res);
	}
}, (error) => {
	if (error.response && error.response.status) {
		switch (error.response.status) {
			// 401: 未登录
			// 未登录则跳转登录页面，并携带当前页面的路径
			// 在登录成功后返回当前页面，这一步需要在登录页操作。
			case 401:
				router.replace({
					path: '/login'
				});
				break;

			// 403 token过期
			// 登录过期对用户进行提示
			// 清除本地token
			// 跳转登录页面
			case 403:
				// Toast({
				// 	message: '登录过期，请重新登录',
				// 	duration: 1000,
				// 	forbidClick: true
				// });
				// 清除token
				sessionStorage.setItem('myToken', null);
				// 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
				setTimeout(() => {
					router.replace({
						path: '/login',
						// query: {
						// 	redirect: router.currentRoute.fullPath
						// }
					});
				}, 500);
				break;

			// 404请求不存在
			case 404:
				// Toast({
				// 	message: '网络请求不存在',
				// 	duration: 1500,
				// 	forbidClick: true
				// });
				break;
			// 其他错误，直接抛出错误提示
			default:
				// Toast({
				// 	message: error.response.data.message,
				// 	duration: 1500,
				// 	forbidClick: true
				// });
		}
	}
	return Promise.reject(error.response);
});

//跳转路由统一处理
router.beforeEach((to, from, next) => {
	const token = sessionStorage.getItem('myToken');
	if (to.path == '/' || to.path == '/signup' || to.path == '/login') {
		next();
	} else {
		if (token == null) {
			next('/login');
		} else {
			Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // 全局设定header的token验证，注意Bearer后有个空格
			next();
		}
	}
});

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
