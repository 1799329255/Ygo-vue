<template>
    <div class="register">
        <el-form :model="registerForm" :rules="registerRules" class="registerContainer" ref="registerForm"
            v-loading="loading" element-loading-text="正在注册..." element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <h2 class="registerTitle">欢迎注册YGO</h2>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="registerForm.username" placeholder="请输入用户名" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="registerForm.email" placeholder="请输入邮箱" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-input v-model="registerForm.code" placeholder="请输入验证码" autocomplete="off" style="width: 75%">
                </el-input>
                <el-button v-show="isClickCode" @click="getCode">获取验证码</el-button>
                <el-button v-show="!isClickCode" disabled>{{count}}秒后重试</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitregister" style="width: 100%">立即注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.registerForm.checkPass !== '') {
                        this.$refs.registerForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var checkEmail = (rule, value, callback) => {
                const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                if (!value) {
                    return callback(new Error('邮箱不能为空'))
                }
                setTimeout(() => {
                    if (mailReg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('请输入正确的邮箱格式'))
                    }
                }, 100)
            }
            return {
                isClickCode: true,
                count: '',
                timer: null,

                registerForm: {
                    username: "admin",
                    password: "123",
                    checkPass: "",
                    email: "1799329255@qq.com",
                    code: "",
                },
                registerRules: {
                    username: [{
                            required: true,
                            message: "请输入用户名",
                            trigger: "blur"
                        },
                        {
                            min: 3,
                            max: 5,
                            message: "长度在 2 到 20 个字符",
                            trigger: "blur"
                        },
                    ],
                    password: [{
                        validator: validatePass,
                        trigger: "blur"
                    }],
                    checkPass: [{
                        validator: validatePass2,
                        trigger: "blur"
                    }],
                    email: [{
                        validator: checkEmail,
                        trigger: "blur"
                    }],
                    code: [{
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur"
                    }],
                },
                loading: false,
            };
        },
        methods: {
            submitregister() {
                this.$refs.registerForm.validate((valid) => {
                    if (valid) {
                        this.postRequest("/user/register", this.registerForm).then((res) => {
                            this.loading = true;
                            if (res.data) {
                                this.loading = false;
                                this.$router.replace("/login");
                            }
                            this.loading = false;
                        });
                    } else {
                        this.loading = false;
                        this.$message.error("error submit!!");
                        return false;
                    }
                });
            },

            getCode() {
                //单独邮箱验证
                this.$refs.registerForm.validateField('email', emailError => {
                    if (!emailError) {
                        console.log('邮箱验证通过')

                        this.getRequest("/emailRegister", {
                            email: this.registerForm.email
                        }).then((res) => {
                            if (res.code === '200') {
                                const TIME_COUNT = 60; //60秒后重试
                                if (!this.timer) {
                                    this.count = TIME_COUNT;
                                    this.isClickCode = false;
                                    this.timer = setInterval(() => {
                                        if (this.count > 0 && this.count <= TIME_COUNT) {
                                            this.count--;
                                        } else {
                                            this.isClickCode = true;
                                            clearInterval(this.timer);
                                            this.timer = null;
                                        }
                                    }, 1000)
                                }
                            }

                        });




                    }
                });



            },
        }

    }
</script>

<style scoped lang="less">
    .registerContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 100px auto;
        width: 50%;
        padding: 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .registerTitle {
        margin: 10px auto 40px auto;
        text-align: center;
    }

    .el-form-item__content {
        display: flex;
        align-items: center;
    }
</style>