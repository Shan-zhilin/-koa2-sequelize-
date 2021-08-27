<template>
    <div class="login_box">
        <h2>百昧人生</h2>
        <el-input placeholder="请输入用户名" v-model="searchForm.username"/>
        <el-input placeholder="请输入密码" v-model="searchForm.password" type="password"/>
        <el-button type="primary" @click="this.login">登录</el-button>
    </div>
</template>

<script>
import {userLogin} from '../../api/user'
export default {
  data() {
      return {
          searchForm: {
              username: '',
              password: ''
          }
      }
  },
  methods: {
      login() {
          const userInfo = {
              username: this.searchForm.username,
              password: this.searchForm.password
          }
          userLogin(userInfo).then(res => {
              if (res.success) {console.log(res);}
          })
      }
  }
}
</script>

<style lang="less">
    .login_box {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 500px;
        height: 300px;
        padding: 0 20px;
        text-align: center;
        transform: translate(-50%,-50%);
        .el-input {
            margin-top: 20px;
        }

        .el-button {
            width: 100%;
            margin-top: 20px;
        }
    }
</style>