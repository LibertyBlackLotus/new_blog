const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const logger = require('koa-logger');
const app = new Koa();
const router = new Router();
const path = require('path');
const cors = require('koa2-cors');

// const serve = require('koa-static'); //部署用

const historyApiFallback = require('koa-history-api-fallback');

const auth = require('./server/routes/auth.js');
const api = require('./server/routes/api.js');
const jwt = require('koa-jwt');
app.use(bodyParser());
app.use(json());
app.use(logger());
app.use(async (ctx, next) => {  //JWT 验证处理
  try{
    await next();
  }catch(err){
    console.log('err: ', err);
    if(401 == err.status){
      ctx.status = 401;
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      };
    }else{
      throw err;
    }
  }
});

app.on('error', (err, ctx) => {
	console.log('server error', err);
});

app.use(cors({
	origin: function (ctx) {
		if (ctx.url === '/test') {
			return "*";    // 允许来自所有域名请求
		}
		return 'http://localhost:8081'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
	},
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
	maxAge: 5,
	credentials: true,
	allowMethods: ['GET', 'POST', 'DELETE'],
	allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

router.use('/auth', auth.routes());
// router.use('/api', jwt({secret: 'lin'}), api.routes()); //jwt token验证
router.use('/api', api.routes());

app.use(router.routes());
app.use(historyApiFallback());        // 处理刷新页面404,一定要加在静态文件的serve之前，否则会失效。
// app.use(serve(path.resolve('dist'))); // 部署时将webpack打包好的项目目录作为Koa静态文件服务的目录

app.listen(8889, () => {
	console.log('Koa is listening in 8889');
});
module.exports = app;


