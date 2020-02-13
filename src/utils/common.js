/**
 * 获取用户信息
 * @returns {null}
 */
const getUserInfo = () => {
	let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
	return userInfo != null ? userInfo : null;
}

/**
 *
 * @returns string id
 */
const getUserId = () => {
	let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
	return userInfo != null ? userInfo.id : '';
}


module.exports = {
	getUserInfo,
	getUserId
}
