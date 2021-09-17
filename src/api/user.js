import request from '../util/request'

//用户登录
export async function userLogin (data) {
    return await request('/login',{
        method:'post',
        data
    })
}

// 用户注册
export async function userRegister(data) {
    return await request('/register',{
        method:'post',
        data
    })
}

// 更新用户信息
export async function updateUserInfo(data) {
    return await request('/updateuserinfo',{
        method:'post',
        data
    })
}