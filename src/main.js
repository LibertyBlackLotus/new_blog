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
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
	const token = sessionStorage.getItem('my-token');
	if (to.path == '/') {
		if (token != 'null' && token != null) {
			next('/home');
		}
		next();
	} else if (to.path == '/home') {
		next();
	}
	else if (to.path == '/signup') {
		next();
	} else {
		if (token != 'null' && token != null) {
			Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // 全局设定header的token验证，注意Bearer后有个空格
			next();
		} else {
			next('/');
		}
	}
});

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
