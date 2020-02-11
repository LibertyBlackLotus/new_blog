const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const logger = require('koa-logger');
const app = new Koa();
// const fs = require('fs');
// const os = require('os');
const router = new Router();
const path = require('path');
const cors = require('koa2-cors');
const serve = require('koa-static'); //部署用
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

app.use(serve(path.join(__dirname, '/public')));
// app.use(async function (ctx, next) {
// 	if ('POST' != ctx.method) return await next();
// 	// 获取图片源
// 	//  <input type="file" name="file" multiple>
// 	let data = ctx.request.body;
// 	let file = data.picBase64;
// 	console.log('file--->', file);
// 	// 接收读出流
// 	const reader = fs.createReadStream(file)
// 	// 创建写入流
// 	// 3. 指定图片路径文件名（即上传图片存储目录）
// 	const stream = fs.createWriteStream(path.join('public/images', file.name))
// 	// 用管道将读出流 "倒给" 输入流
// 	reader.pipe(stream)
// 	// 4.打印上传文件在服器上存储的相对路径
// 	console.log('uploading %s -> %s', file.name, stream.path)
// 	// 5.重定向到基于根目录下的静态资源web访问路径，展示图片
// 	ctx.redirect(stream.path.substr(6).replace(/\\/g,'/'))
// })

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


