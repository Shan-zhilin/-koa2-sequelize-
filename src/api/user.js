import request from '../util/request'

//用户登录
export async function userLogin (data) {
    return await request('/login',{
        method:'post',
        data
    })
}
