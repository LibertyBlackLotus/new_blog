const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:@localhost/myblog', {
	define: {
		timestamps: false
	}
});

module.exports = sequelize;
