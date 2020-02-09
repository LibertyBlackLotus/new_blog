const db = require('../config/db.js');
const todoModel = '../schema/list.js';

const Todolist = db.import(todoModel);

/**
 *  获取某个用户的全部todolist
 * @param user_id 用户id
 * @returns {*}
 */
const getTodolistById = (user_id) => {
	const todolist = Todolist.findAll({
		where: {
			user_id
		},
    attributes: ['id', 'content', 'status']
	});
	return todolist;
};

/**
 * 添加一条todo
 * @param data  todo内容
 * @returns {boolean}
 */
const createTodolist = (data) => {
  Todolist.create({
    user_id: data.id,
    content: data.content,
    status: data.status
  });
  return true;
}

/**
 * 删除一条todo
 * @param id
 * @param user_id
 * @returns {boolean}
 */
const removeTodolist = (id, user_id) => {
  Todolist.destroy({
    where: {
      id, user_id
    }
  });
  return true;
}

/**
 * 修改todo
 * @param id
 * @param user_id
 * @param status
 * @returns {boolean}
 */
const updateTodolist = (id, user_id, status) => {
  Todolist.update(
    {
      status
    },
    {
      where: {
        id, user_id
      }
    }
  )
  return true;
}

module.exports = {
  getTodolistById,
  createTodolist,
  removeTodolist,
  updateTodolist
}
