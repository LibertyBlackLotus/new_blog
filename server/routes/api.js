const Todolist = require('../controllers/todolist.js');
const Articles = require('../controllers/articles.js');
const Comments = require('../controllers/comments.js');
const User = require('../controllers/user');
const router = require('koa-router')();

router.get('/todolist/:id', Todolist.getTodolist);
router.post('/todolist', Todolist.createTodolist);
router.delete('/todolist/:userId/:id', Todolist.removeTodolist);
router.put('/todolist/:userId/:id/:status', Todolist.updateTodolist);

router.get('/articles/list/:user_id', Articles.getArticleList);   //获取个人文章列表
router.get('/articles/publish', Articles.getPublishArticleList);  //获取全部已发布文章列表
router.get('/articles/:id', Articles.readArticle);                //读取文章
router.post('/articles', Articles.createArticle);                 //创建/保存文章
router.delete('/articles', Articles.removeArticle);               //删除文章
router.put('/articles', Articles.updateArticle);                  //更新文章
router.put('/articles/publish', Articles.publishArticle);        //发布文章
router.post('/articles/like', Articles.likeArticle);              //点赞
router.post('/articles/consult', Articles.consultArticle);        //查阅文章

router.get('/comments/list/:id', Comments.getCommentsList);      //获取文章评论列表
router.post('/comments', Comments.createComment);                 //添加评论

router.post('/uploadAvatar', User.saveAvatar);


module.exports = router;
