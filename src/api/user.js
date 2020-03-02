import {
	USER_LOGIN,
	USER
} from './apiUrl';
const axios = require('axios');

export default {
	//登录
	login(params) {
		return axios.post(USER_LOGIN, params)
			.then((res) => {
				if (res.status == 200) {
					return res;
				}
			});
	},

	//注册
	signup(params) {
		return axios.post(USER, params)
			.then((res) => {
				if (res.status == 200) {
					return res;
				}
			});
	},


	//获取用户信息
	getUserInfo(id) {
		return axios.get(USER + `/${id}`)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},

}