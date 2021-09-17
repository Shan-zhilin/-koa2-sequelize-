const db = require("../config/db");
const User = db.Blog.import("../schema/user.js");

/**
 * @description: 用户登录
 * @param {*} username
 * @return {*} userInfo
 */
async function login(username) {
  const userInfo = await User.findOne({
    where: {
      username
    }
  });
  return userInfo;
}

/**
 * @description: 用户注册
 * @param {*}
 * @return {*}
 */
async function userRegister({ username, password, email }) {
  // 判断该用户是否已经注册过
  const isExit = await User.findOne({
    where: {
      username
    }
  });

  if (!isExit) {
    const userinfo = await User.create({
      username: username,
      password: password,
      email: email
    });
    return userinfo;
  } else {
    return "该用户已存在!";
  }
}

async function updateUserInfo({ username, password }) {
  const userinfo = await User.update(
    { username, password },
    {
      where: {
        username
      }
    }
  );
  return userinfo;
}
module.exports = {
  login,
  userRegister,
  updateUserInfo
};
