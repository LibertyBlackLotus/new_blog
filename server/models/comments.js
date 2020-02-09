const db = require('../config/db.js');
const comments = '../schema/comments.js';

const Comments = db.import(comments);

/**
 * 获取文章评论列表
 * @param article_id
 * @returns {Promise<Model[]> | Promise.<Array.<Model>>}
 */
const getCommentsList = (article_id) => {
	const result = Comments.findAll({
		where: {
      article_id
		},
    order: [
      ['comment_date', 'DESC']
    ]
	});
	return result;
};

/**
 * 创建评论
 * @param data
 * @returns {Q.Promise<{status: string, message: any}>}
 */
const createComment = (data) => {
  let comment = Comments.create({
    ...data
  }).then(comment => ({status: 'ok', comment　}) )
    .catch(e => ({status: 'error', message: e}));
  return comment;
}

module.exports = {
  getCommentsList,
  createComment,
}
