<template>
  <div>
    <el-form :model="loginForm" :rules="loginRules" class="loginContainer" ref="loginForm" v-loading="loading"
      element-loading-text="正在登录..." element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <h2 class="loginTitle">欢迎登录YGO</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="loginForm.code" placeholder="请输入验证码" autocomplete="off" style="width: 75%"></el-input>
        <img :src="captchaUrl" @click="updateCaptcha" style="margin: 0 10px; text-align: center; float: right" />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="isChecked">记住我</el-checkbox>
        <el-button type="primary" @click="submitLogin" style="width: 100%">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {setCookie} from '../utils/cookie'

  export default {
    name: "Login",
    data() {
      return {
        //验证码Url
        captchaUrl: "/captcha?time=" + new Date(),
        //用户信息
        loginForm: {
          username: "",
          password: "",
          code: "",
        },
        //是否下次自动登录
        isChecked: true,
        //是否加载
        loading: false,
        //用户信息表单规则
        loginRules: {
          username: [{
              required: true,
              message: "请输入用户名",
              trigger: "blur"
            },
            {
              min: 2,
              max: 20,
              message: "长度在 2 到 20 个字符",
              trigger: "blur"
            },
          ],
          password: [{
              required: true,
              message: "请输入密码",
              trigger: "blur"
            },
            {
              min: 3,
              max: 20,
              message: "长度在 3 到 20 个字符",
              trigger: "blur"
            },
          ],
          code: [{
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }],
        },
        
      };
    },
    methods: {
      //提交用户表单
      submitLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.postRequest("/user/login", this.loginForm).then((res) => {
              this.loading = true;
              if (res.data) {
                // 将token拼接并存入sessionStorage
                const tokenStr = res.data.tokenHead + " " + res.data.token;

                if(this.isChecked){
                  setCookie("tokenStr",tokenStr)
                }
                window.sessionStorage.setItem("tokenStr", tokenStr);
                this.loading = false
                this.$router.replace("/");
                this.$message.success('登录成功')
              }
              this.loading = false;
            });
          } else {
            this.loading = false;
            this.$message.error("格式不正确，请重新输入");
            return false;
          }
        });
      },
      //更新验证码
      updateCaptcha() {
        this.captchaUrl = "/captcha?time=" + new Date();
      },
    },
  };
</script>

<style scoped lang="less">
  .loginContainer {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 50%;
    padding: 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .loginTitle {
    margin: 10px auto 40px auto;
    text-align: center;
  }

  .el-form-item__content {
    display: flex;
    align-items: center;
  }
</style>