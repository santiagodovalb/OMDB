const Sequelize = require('sequelize')

sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true,
        rejectUnauthorized: false
    }
});

module.exports = sequelize