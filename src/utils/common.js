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

const ImgServer = 'http://localhost:8889/uploads/';


module.exports = {
	getUserInfo,
	getUserId,
	ImgServer
}
