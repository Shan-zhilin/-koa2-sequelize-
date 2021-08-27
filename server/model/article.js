const db = require('../config/db');

const Article = db.Blog.import('../schema/article.js')

async function getUserById (id) {
    const userInfo = await Article.findOne({
        where: {
            id: id
        }
    })
    return userInfo
}

module.exports = {
    getUserById
}