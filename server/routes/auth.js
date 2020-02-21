const auth = require('../controllers/user.js');
const router = require('koa-router')();

router.get('/user/:id', auth.getUserInfo);   //获取用户信息
router.post('/user', auth.createUser);       //创建用户
router.post('/userAuth', auth.postUserAuth); //登录验证

module.exports = router;
