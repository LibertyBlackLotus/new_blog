const Comments = require('../models/comments.js');

/**
 * 获取文章评论列表
 * @param ctx
 * @returns {Promise.<void>}
 */
const getCommentsList = async (ctx) => {
	const article_id = ctx.params.id;
	let commentsList = await Comments.getCommentsList(article_id);
	for (let i = 0; i < commentsList.length; i++) {
		commentsList[i].reply = [];
	}
	ctx.body = commentsList;
}

/**
 * 创建评论
 * @param ctx
 * @returns {Promise.<void>}
 */
const createComment = async (ctx) => {
	const data = ctx.request.body;
	let result = await Comments.createComment(data);
	if (result.status == 'ok') {
		ctx.body = {
			status: true,
			result
		}
	} else {
		ctx.body = {
			status: false,
			message: result.message
		};
	}
}

/**
 *
 * @param ctx
 * @returns {Promise.<void>}
 */
const praiseComment = async (ctx) => {
	const data = ctx.request.body;
	let result = await Comments.praiseComment(data);
	if (result.status == 'error') {
		ctx.body = {
			status: false,
			message: result.message
		};
	} else {
		ctx.body = {
			status: true,
			result
		}
	}
}

/**
 *
 * @param ctx
 * @returns {Promise.<void>}
 */
const replyComment = async (ctx) => {
	const data = ctx.request.body;
	let result = await Comments.replyComment(data);
	if (result.status == 'error') {
		ctx.body = {
			status: false,
			message: result.message
		};
	} else {
		ctx.body = {
			status: true,
			result
		}
	}
}

module.exports = {
	getCommentsList,
	createComment,
	praiseComment,
	replyComment
}
