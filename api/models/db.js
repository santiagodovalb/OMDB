const Sequelize = require('sequelize')

sequelize = new Sequelize(process.env.DATABASE_URL, {
    database: "d7tpsqnm7urobp",
  username: "cugdkkfsokhvqe",
  password: "3a796aa16e18f9840c46683aeadd7402f3fabf18a98365f143b45c8a86e1df29",
  host: "ec2-52-7-159-155.compute-1.amazonaws.com",
  port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true,
        rejectUnauthorized: false
    }
});

module.exports = sequelize