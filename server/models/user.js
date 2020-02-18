const db = require('../config/db.js');
const bcrypt = require('bcryptjs');
const userModel = '../schema/user.js';

const User = db.import(userModel);

/**
 * 通过id获取用户信息
 * @param id
 * @returns {*}
 */
const getUserById = (id) => {
	const userInfo = User.findOne({
		where: {
			id
		}
	});
	return userInfo;
};

/**
 * 通过名字获取用户信息
 * @param name
 * @returns {*}
 */
const getUserByName = (name) => {
	const userInfo = User.findOne({
		where: {
			user_name: name
		}
	});
	return userInfo;
}

/**
 * 创建用户
 * @param data
 */
const createUser = (data) => {
	let salt = bcrypt.genSaltSync(10);
	let password = bcrypt.hashSync(data.password, salt);  //密码加密
	const userInfo = User.create({
		user_name: data.name,
		password
	});
	return userInfo;
};

/**
 *
 * @param id 用户id
 * @param url 头像url
 */
const saveUserAvatarUrl = (id, url) => {
	let result = User.update(
		{
			photo: url,
		},
		{
			where: {
				id
			}
		}
	);
	return result;
};

module.exports = {
	getUserById,
	getUserByName,
	createUser,
	saveUserAvatarUrl
}
