const db = require('../config/db');
const User = db.Blog.import('../schema/user.js')

//用户登录
async function login (username) {
    const userInfo = await User.findOne({
        where: {
            username,
        }
    })
    return userInfo
}

module.exports = {
    login
}