const todolist = require('../models/todolist.js');

/**
 * 获取用户全部todolist
 * @param ctx
 * @returns {Promise.<void>}
 */
const getTodolist = async (ctx) => {
	const id = ctx.params.id;
	const result = await todolist.getTodolistById(id);
	ctx.body = result;
}

/**
 * 添加todo
 * @param ctx
 * @returns {Promise.<void>}
 */
const createTodolist = async (ctx) => {
	const data = ctx.request.body;
	const result = await todolist.createTodolist(data);
	ctx.body = {
	  success: true
  }
}

/**
 * 删除todo
 * @param ctx
 * @returns {Promise.<void>}
 */
const removeTodolist = async (ctx) => {
  let id = ctx.params.id;
  let user_id = ctx.params.userId;
  let result = await todolist.removeTodolist(id, user_id);
  ctx.body = {
    success: true
  };
}

/**
 * 更新todo
 * @param ctx
 * @returns {Promise.<void>}
 */
const updateTodolist = async (ctx) => {
  let id = ctx.params.id;
  let user_id = ctx.params.userId;
  let status = ctx.params.status;
  status == '0' ? status = true : status = false;
  let result = await todolist.updateTodolist(id, user_id, status);
  ctx.body = {
    success: true
  };
}

module.exports = {
  getTodolist,
  createTodolist,
  removeTodolist,
  updateTodolist
}
