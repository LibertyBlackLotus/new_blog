/**
 * 获取用户信息
 * @returns {null}
 */
const getUserInfo = () => {
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  console.log('userInfo: ', userInfo);
  return userInfo != null ? userInfo : null;
}

module.exports = {
  getUserInfo
}
