//创建数据库连接
const Sequelize = require('sequelize');

const Blog = new Sequelize('mysql://root:szl990203@localhost/blog',{
    difine: {
        timestamps: false 
    }
})

module.exports = {
    Blog
}