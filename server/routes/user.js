const router = require('koa-router')()
const User = require('../model/user.js')
router.post('/login', async (ctx) => {
    const data = ctx.request.body;
    const result = await User.login(data.username);
    if (result != null) {
        const {
            username,
            password
        } = result.dataValues;
        

        if (username === data.username && password === data.password) {
            ctx.response.body = {
                value: result.dataValues,
                message: '',
                success: true
            }
        } else if (username != data.username ) {
            ctx.response.body = {
                message: '用户名错误',
                success: false
            }
        }else if (password != data.password) {
            ctx.response.body = {
                message: '密码错误',
                success: false
            }
        }
    }else {
        ctx.response.body = {
          success: false,
          message: '用户不存在！' // 如果用户不存在返回用户不存在
        }
      }

})

router.post('/register',async (ctx) => {
    const data = ctx.request.body;
    const result = await User.userRegister(data);
    if (result !== null) {
        ctx.response.body = {
            code: 200,  //强制将响应状态码改成200，否则因为异步原因会报404
            success: true,
            message: result === '该用户已存在!' ? '该用户已存在!' : '注册成功' // 如果用户不存在返回用户不存在
        }
    }else {
        ctx.response.body = {
          code: 200,  //强制将响应状态码改成200，否则因为异步原因会报404
          success: false,
          message: '注册失败' // 如果用户不存在返回用户不存在
        }
      }
})

router.post('/updateuserinfo',async (ctx) => {
    const date = ctx.request.body;
    const result = await User.updateUserInfo(date);
    if (result[0]) {
        ctx.response.body = {
            code: 200,  //强制将响应状态码改成200，否则因为异步原因会报404
            success: true,
            message: '修改成功'
        }
    }else {
        ctx.response.body = {
            code: 200,  //强制将响应状态码改成200，否则因为异步原因会报404
            success: false,
            message: '该用户不存在'
        }
    }
})

module.exports = router