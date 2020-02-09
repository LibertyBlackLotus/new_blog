const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * 获取用户信息
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
const getUserInfo = async (ctx) => {
	const id = ctx.params.id;    // 获取url里传过来的参数里的id
	const result = await User.getUserById(id);
	ctx.body = {
	  result
  };         // 将请求的结果放到response的body里返回
}

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
    id: userInfo.id
  }
  const secret = 'lin';
  const token = jwt.sign(userToken, secret); //签名
  ctx.body = {
    success: true,
    token,     //返回token
    userInfo,  //用户信息
  }
}

/**
 * 用户验证
 * @param ctx
 * @returns {Promise.<void>}
 */
const postUserAuth = async (ctx) => {
	const data = ctx.request.body;
	const userInfo = await User.getUserByName(data.name);
	if(userInfo != null){
		if(!bcrypt.compareSync(data.password, userInfo.password)){
			ctx.body = {
				success: false,
				info: '密码错误'
			}
		}else{
			const userToken = {
				name: userInfo.user_name,
				id: userInfo.id
			}
			const secret = 'lin';
			const token = jwt.sign(userToken, secret); //签名
			ctx.body = {
				success: true,
				token,     //返回token
        userInfo,  //用户信息
			}
		}
	}else{
		ctx.body = {
			success: false,
			info: '用户不存在!'
		}
	}
}

module.exports = {
	getUserInfo,   // 把获取用户信息
	postUserAuth,
  createUser
}
