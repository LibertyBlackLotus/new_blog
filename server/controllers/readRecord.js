const ReadRecord = require('../models/readRecord.js');

/**
 * 添加一条阅读记录
 * @param ctx
 * @returns {Promise.<void>}
 */
const createReadRecord = async (ctx) => {
	const data = ctx.request.body;
	const result = await ReadRecord.createReadRecord(data);
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
 * 获取一条阅读记录
 * @param ctx
 * @returns {Promise.<void>}
 */
const getReadRecord = async (ctx) => {
	const record_id = ctx.params.record_id;
	let records = await ReadRecord.getReadRecord(record_id);
	ctx.body = records;
};

/**
 * 获取用户所有阅读记录
 * @param ctx
 * @returns {Promise.<void>}
 */
const getUserReadRecord = async (ctx) => {
	const user_id = ctx.params.user_id;
	let records = await ReadRecord.getUserReadRecord(user_id);
	ctx.body = records;
};

/**
 * 删除一条阅读记录
 * @param ctx
 * @returns {Promise.<void>}
 */
const removeReadRecord = async (ctx) => {
	let record_id = ctx.params.record_id;
	let result = await ReadRecord.removeReadRecord(record_id);
	ctx.body = result;
};

/**
 * 清空用户阅读记录
 * @param ctx
 * @returns {Promise.<void>}
 */
const removeReadRecordAll = async (ctx) => {
	let data = ctx.request.body;
	let result = await ReadRecord.removeReadRecordAll(data.user_id);
	ctx.body = result;
};

module.exports = {
	createReadRecord,
	getReadRecord,
	getUserReadRecord,
	removeReadRecord,
	removeReadRecordAll
};
