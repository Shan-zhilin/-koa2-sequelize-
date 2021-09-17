<!--
 * @Author: shanzhilin
 * @Date: 2021-08-27 21:37:35
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-08-28 16:07:46
-->
<template>
  <div class="login_box">
    <h2>百昧人生</h2>
    <el-input
      placeholder="请输入用户名"
      v-model="searchForm.username"
      @keyup.enter="this.login"
    />
    <el-input
      placeholder="请输入密码"
      v-model="searchForm.password"
      type="password"
      @keyup.enter="this.login"
    />
    <el-button type="primary" @click="this.login">登录</el-button>
    <div class="regester_btn">
      <span @click="this.openDialogHandler('忘记密码')">忘记密码</span>
      <span @click="this.openDialogHandler('立即注册')">立即注册</span>
    </div>
  </div>
  <el-dialog :title="dialogType" v-model="dialogVisiable" width="30%" center>
    <div class="register_box">
      <el-input
        placeholder="请输入用户名"
        v-model="searchForm.username"
        @keyup.enter="this.registerOrUpdateHandler"
      />
      <el-input
        placeholder="请输入密码"
        v-model="searchForm.password"
        type="password"
        @keyup.enter="this.registerOrUpdateHandler"
      />
      <el-input
        placeholder="请输入邮箱"
        v-model="searchForm.email"
        v-if="dialogType === '立即注册'"
        @keyup.enter="this.registerOrUpdateHandler"
      />
      <div class="confirm_box">
        <el-button type="info" @click="this.closeDialog" size="small"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="this.registerOrUpdateHandler"
          size="small"
          >确认</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { userLogin, userRegister, updateUserInfo } from "../../api/user";
export default {
  data() {
    return {
      searchForm: {
        username: "",
        password: "",
        email: "",
      },
      dialogVisiable: false, // 注册/修改密码弹窗显示控制
      dialogType: "", // 弹框类型
    };
  },
  methods: {
    /**
     * 登录函数
     * @param {*}
     */
    login() {
      if (!this.searchForm.username || !this.searchForm.password) {
        this.$message.error("用户名或密码不能为空");
        return;
      }
      userLogin(this.searchForm).then((res) => {
        if (!res.success) {
          this.$message.error(res.message);
          return;
        } else {
          this.$message.success("查找成功");
        }
      });
    },
    /**
     * 对话框弹出修改函数
     * @param {*} dialogType
     */
    openDialogHandler(dialogType) {
      this.dialogVisiable = !this.dialogVisiable;
      this.dialogType = dialogType;
    },
    // 关闭注册弹框
    closeDialog() {
      this.dialogVisiable = false;
      this.dialogType = "";
      this.searchForm = {
        username: "",
        password: "",
        email: "",
      };
    },
    /**
     * @description: 用户注册/修改密码统一处理函数
     * @return {*}
     */
    registerOrUpdateHandler() {
      if (!this.searchForm.username || !this.searchForm.password) {
        this.$message.error("用户名或密码不能为空");
        return;
      }
      const userInfo = {
        username: this.searchForm.username,
        password: this.searchForm.password,
        email: this.searchForm.email,
      };
      if (this.dialogType === "立即注册") {
        userRegister(userInfo).then((res) => {
          if (!res.success) {
            this.$message.error(res.message);
          } else {
            if (res.message === "该用户已存在!") {
              this.$message.error(res.message);
              return;
            } else {
              this.$message.success(res.message);
              this.closeDialog();
            }
          }
        });
      } else {
        updateUserInfo(userInfo).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.closeDialog();
          }else {
            this.$message.error(res.message);
          }
        });
      }
    },
  },
};
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
  transform: translate(-50%, -50%);
  .el-input {
    margin-top: 20px;
  }

  .el-button {
    width: 100%;
    margin-top: 20px;
  }
  .regester_btn {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    span {
      color: #409eff;
      cursor: pointer;
    }
  }
}
.register_box {
  .el-input {
    margin-top: 20px;
  }
  .confirm_box {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
}
</style>
