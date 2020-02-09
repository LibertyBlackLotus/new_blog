const auth = require('../controllers/user.js');
const router = require('koa-router')();

router.get('/user/:id', auth.getUserInfo);
router.post('/user', auth.createUser);
router.post('/userAuth', auth.postUserAuth);

module.exports = router;
