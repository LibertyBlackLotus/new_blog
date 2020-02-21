const SearchRecord = require('../models/searchRecord.js');

/**
 * 创建用户搜索记录
 * @param ctx
 * @returns {Promise.<void>}
 */
const createSearchRecord = async (ctx) => {
	const data = ctx.request.body;
	const result = await SearchRecord.createSearchRecord(data);
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
};

/**
 * 获取一条搜索记录
 * @param ctx
 * @returns {Promise.<void>}
 */
const getSearchRecord = async (ctx) => {
	const user_id = ctx.params.user_id;
	let records = await SearchRecord.getSearchRecord(user_id);
	ctx.body = records;
};

/**
 * 获取用户搜索记录
 * @param ctx
 * @returns {Promise.<void>}
 */
const getUserSearchRecord = async (ctx) => {
	const user_id = ctx.params.user_id;
	let records = await SearchRecord.getUserSearchRecord(user_id);
	ctx.body = records;
};

/**
 * 删除一条搜索记录
 * @param ctx
 * @returns {Promise.<void>}
 */
const removeRecord = async (ctx) => {
	// let data = ctx.request.body;
	let record_id = ctx.params.record_id;
	let result = await SearchRecord.removeRecord(record_id);
	ctx.body = result;
};

/**
 * 清空用户搜索记录
 * @param ctx
 * @returns {Promise.<void>}
 */
const removeRecordAll = async (ctx) => {
	let data = ctx.request.body;
	let result = await SearchRecord.removeRecordAll(data.user_id);
	ctx.body = result;
};

module.exports = {
	createSearchRecord,
	getSearchRecord,
	removeRecord,
	removeRecordAll,
	getUserSearchRecord
};
