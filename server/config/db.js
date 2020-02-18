const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:@localhost/myblog', {
	define: {
		timestamps: false
	},
	dialectOptions: {
		useUTC: false //for reading from database
	},
	timezone: '+08:00' //for writing to database
});

module.exports = sequelize;
