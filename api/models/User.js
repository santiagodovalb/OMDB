const Sequelize = require('sequelize')
const db = require('./db')
const bcrypt = require('bcrypt')


// class User extends Sequelize.Model {}

// User.init ({
//     username: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     favorites: {
//         type: Sequelize.ARRAY(Sequelize.JSON)
//     }

// },{ sequelize: db, modelName: "users" })

const User = db.define('users', {

        username: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        salt: {
            type: Sequelize.TEXT
        },
        favorites: {
            type: Sequelize.ARRAY(Sequelize.JSON),
            defaultValue: []
        }
    
    } )

    User.prototype.hash = (plainPassword, salt) => {
        return bcrypt.hash(plainPassword, salt)
    }
    
    User.addHook('beforeCreate', function(user) {
        return bcrypt.genSalt(16)
        .then(salt => {
            user.salt = salt
            return user.hash(user.password, salt)
        })
        .then (hashed => {user.password = hashed})
    })

module.exports = User;