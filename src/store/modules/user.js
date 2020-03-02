import user from '../../api/user';
import {
	USER_INFO
} from '../mutations_type';

const state = {
	userInfo: {},   //用户信息
};

const getters = {};

const mutations = {
	//用户信息
	[USER_INFO](state, {info}) {
		state.userInfo = info;
	},
};

const actions = {
	//登录
	login({commit}, params) {
		return user.login(params).then(res => {
			return Promise.resolve(res);
		});
	},

	//注册
	signup({commit}, params) {
		return user.signup(params).then(res => {
			return Promise.resolve(res);
		});
	},

	/**
	 * 获取用户信息
	 * @param id 用户id
	 * @returns {Promise.<TResult>}
	 */
	getUserInfo({commit}, {id}) {
		user.getUserInfo(id).then(res => {
			commit(USER_INFO, {info: res});
		});
	},
};

export default {
	state,
	getters,
	mutations,
	actions
}