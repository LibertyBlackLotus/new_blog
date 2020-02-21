const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

/**
 * 获取用户信息
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
const getUserInfo = async (ctx) => {
	const id = ctx.params.id;
	const result = await User.getUserById(id);
	ctx.body = result;
};

/**
 * 创建用户
 * @param ctx
 * @returns {Promise.<void>}
 */
const createUser = async (ctx) => {
	let data = ctx.request.body;
	let userInfo = await User.createUser(data);
	const userToken = {
		name: userInfo.user_name,
		id: userInfo.id,
		time: moment().format('YYYY-MM-DD HH:mm:ss')
	};
	const secret = 'lin';
	const token = jwt.sign(userToken, secret); //签名
	ctx.body = {
		success: true,
		token,     //返回token
		userInfo,  //用户信息
	}
};

/**
 * 用户验证
 * @param ctx
 * @returns {Promise.<void>}
 */
const postUserAuth = async (ctx) => {
	const data = ctx.request.body;
	const userInfo = await User.getUserByName(data.name);
	if (userInfo != null) {
		if (!bcrypt.compareSync(data.password, userInfo.password)) {
			ctx.body = {
				success: false,
				info: '密码错误'
			}
		} else {
			const userToken = {
				name: userInfo.user_name,
				id: userInfo.id,
				time: moment().format('YYYY-MM-DD HH:mm:ss')
			};
			const secret = 'lin';
			const token = jwt.sign(userToken, secret); //签名
			ctx.body = {
				success: true,
				token,     //返回token
				userInfo,  //用户信息
			}
		}
	} else {
		ctx.body = {
			success: false,
			info: '用户不存在!'
		}
	}
};

/**
 * 保存用户头像
 * @param ctx
 * @returns {Promise.<void>}
 */
const saveAvatar = async (ctx) => {
	// try {
	let data = ctx.request.body;
	let base64Data = data.picBase64;
	let base64DataImg = base64Data.replace(/^data:image\/\w+;base64,/, "");
	let dataBuffer = new Buffer(base64DataImg, 'base64');
	let avatarName = Date.now() + Math.random();
	let result = "fail";
	fs.writeFileSync(path.join('public/uploads', avatarName + '.png'), dataBuffer);
	// console.log('--saveResult--->', saveResult);
	let pathUrl = 'http://localhost:8889/uploads/' + avatarName + '.png';
	const userInfo = await User.saveUserAvatarUrl(data.id, pathUrl); //头像地址入库
	ctx.body = {
		success: true,
		url: pathUrl
	};
	// } catch (ex) {
	// 	res.send(ex);
	// }
}

module.exports = {
	getUserInfo,   // 获取用户信息
	postUserAuth,
	createUser,
	saveAvatar
}
