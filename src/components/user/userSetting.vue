<template>
    <div class="userSetting">
        <ul>
            <li>
                <div>昵称</div>
                <div v-show="shows[0]">{{user.name}}
                    <!-- <el-link type="primary" icon="el-icon-edit"
                        @click="handleShows(0,false)">编辑</el-link> -->
                </div>
                <div v-show="!shows[0]">
                    <el-form :model="forms[0]" :rules="rules" ref="form0">
                        <el-form-item prop="username">
                            <el-input v-model="forms[0].username" placeholder="请输入昵称" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="handleShows(0,true)">取消</el-button>
                            <el-button @click="submit({name:forms[0].username},0)" type="primary">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </li>
            <li>
                <div>性别</div>
                <div v-show="shows[1]">{{user.sex===0? '女':'男'}}<el-link type="primary" icon="el-icon-edit"
                        @click="handleShows(1,false)">编辑</el-link>
                </div>
                <div v-show="!shows[1]">
                    <el-form :model="forms[1]" :rules="rules" ref="form1">
                        <el-form-item>
                            <el-radio-group v-model="forms[1].sex">
                                <el-radio :label="0">女</el-radio>
                                <el-radio :label="1">男</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="handleShows(1,true)">取消</el-button>
                            <el-button @click="submit({sex:forms[1].sex},1)" type="primary">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </li>
            <li>
                <div>年龄</div>
                <div v-show="shows[2]">{{user.age}}<el-link type="primary" icon="el-icon-edit"
                        @click="handleShows(2,false)">编辑</el-link>
                </div>
                <div v-show="!shows[2]">
                    <el-form :model="forms[2]" :rules="rules" ref="form2">
                        <el-form-item prop="age">
                            <el-input v-model.number="forms[2].age" placeholder="请输入年龄" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="handleShows(2,true)">取消</el-button>
                            <el-button @click="submit({age:forms[2].age},2)" type="primary">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </li>
            <li>
                <div>密码</div>
                <div v-show="shows[3]">
                    <el-link type="primary" icon="el-icon-edit" @click="handleShows(3,false)">编辑</el-link>
                </div>
                <div v-show="!shows[3]">
                    <el-form :model="forms[3]" :rules="rules" ref="form3">
                        <el-form-item prop="password">
                            <el-input type="password" v-model="forms[3].password" placeholder="请输入密码"
                                autocomplete="off">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="checkPass">
                            <el-input type="password" v-model="forms[3].checkPass" placeholder="请再次输入密码"
                                autocomplete="off">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-input v-model="forms[3].code" placeholder="请输入验证码" autocomplete="off"
                                style="width: 75%">
                            </el-input>
                            <el-button v-show="isClickCode" @click="getCode">获取验证码</el-button>
                            <el-button v-show="!isClickCode" disabled>{{count}}秒后重试</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="handleShows(3,true)">取消</el-button>
                            <el-button
                                @click="submit({password:forms[3].password,code:forms[3].code},3,'/user/updatePassword')"
                                type="primary">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </li>
            <li>
                <div>手机</div>
                <div v-show="shows[4]">{{user.phone}}<el-link type="primary" icon="el-icon-edit"
                        @click="handleShows(4,false)">编辑</el-link>
                </div>
                <div v-show="!shows[4]">
                    <el-form :model="forms[4]" :rules="rules" ref="form4">
                        <el-form-item prop="phone">
                            <el-input v-model.number="forms[4].phone" placeholder="请输入手机" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-input v-model="forms[4].code" placeholder="请输入验证码" autocomplete="off"
                                style="width: 75%">
                            </el-input>
                            <el-button v-show="isClickCode" @click="getCode">获取验证码</el-button>
                            <el-button v-show="!isClickCode" disabled>{{count}}秒后重试</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="handleShows(4,true)">取消</el-button>
                            <el-button @click="submit({phone:forms[4].phone,code:forms[4].code},4,'/user/updatePhone')"
                                type="primary">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </li>
            <li>
                <div>邮箱</div>
                <div v-show="shows[5]">{{user.email}}<el-link type="primary" icon="el-icon-edit"
                        @click="handleShows(5,false)">编辑</el-link>
                </div>
                <div v-show="!shows[5]">
                    <el-form :model="forms[5]" :rules="rules" ref="form5">
                        <el-form-item prop="email">
                            <el-input v-model="forms[5].email" placeholder="请输入邮箱" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-input v-model="forms[5].code" placeholder="请输入验证码" autocomplete="off"
                                style="width: 75%">
                            </el-input>
                            <el-button v-show="isClickCode" @click="getCodeWithEmail(forms[5].email)">获取验证码</el-button>
                            <el-button v-show="!isClickCode" disabled>{{count}}秒后重试</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="handleShows(5,true)">取消</el-button>
                            <el-button @click="submit({email:forms[5].email,code:forms[5].code},5,'/user/updateEmail')"
                                type="primary">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </li>
            <li>
                <div>地址</div>
                <div v-show="shows[6]">{{user.address}}<el-link type="primary" icon="el-icon-edit"
                        @click="handleShows(6,false)">编辑</el-link>
                </div>
                <div v-show="!shows[6]">
                    <el-form :model="forms[6]" :rules="rules" ref="form6">
                        <el-form-item prop="address">
                            <el-input v-model="forms[6].address" placeholder="请输入地址" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="handleShows(6,true)">取消</el-button>
                            <el-button @click="submit({address:forms[6].address},6)" type="primary">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </li>
            <li>
                <div style="line-height: 178px;">头像</div>
                <div>
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                        :http-request="uploadAvatar">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>

            </li>

        </ul>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    export default {
        name: 'UserSetting',
        data() {
            // 密码验证
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.forms[3].checkPass !== '') {
                        this.$refs.form3.validateField('checkPass');
                    }
                    callback();
                }
            }
            // 二次密码验证
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.forms[3].password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            // 手机号验证
            const validatePhone = (rule, value, callback) => {
                if (value === "") {
                    return callback(new Error("请输入手机号"));
                } else {
                    if (!/^1[3456789]\d{9}$/.test(value)) {
                        return callback(new Error("请输入正确的手机号"));
                    } else {
                        callback();
                    }
                }
            }
            // 邮箱验证
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
                shows: [true, true, true, true, true, true, true],
                isClickCode: true,
                count: '',
                imageUrl: '',
                //用户信息
                forms: [{
                        username: "",
                    },
                    {
                        sex: 0,
                    },
                    {
                        age: 0,
                    },
                    {
                        password: "",
                        checkPass: "",
                        code: "",
                    },
                    {
                        phone: 0,
                        code: "",
                    },
                    {
                        email: "",
                        code: "",
                    },
                    {
                        address: "",
                        code: "",
                    },
                ],

                //用户信息表单规则
                rules: {
                    username: [{
                            required: true,
                            message: "请输入昵称",
                            trigger: "blur"
                        },
                        {
                            min: 2,
                            max: 20,
                            message: "长度在 2 到 20 个字符",
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
                    age: [{
                            required: true,
                            message: '年龄不能为空',
                            trigger: "blur"
                        },
                        {
                            type: 'number',
                            message: '年龄必须为数字值',
                        }
                    ],
                    phone: [{
                        validator: validatePhone,
                        trigger: "blur"
                    }],
                    address: [{
                            required: true,
                            message: '手机不能为空',
                            trigger: "blur"
                        },
                        {
                            max: 250,
                            message: "长度最多为250个字符",
                        },
                    ],
                    code: [{
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur"
                    }],
                },
            }
        },
        computed: {
            ...mapState(['user'])
        },
        methods: {
            init() {
                this.forms[0].username = this.user.name
                this.forms[1].sex = this.user.sex
                this.forms[2].age = this.user.age
                this.forms[4].phone = this.user.phone
                this.forms[5].email = this.user.email
                this.forms[6].address = this.user.address
                this.imageUrl = this.user.pic
            },

            ...mapActions(['updateUser']),

            handleShows(index, value) {
                this.$set(this.shows, index, value)
            },
            submit(value, index, url) {
                console.log(this.$refs)
                this.$refs[`form${index}`].validate((valid) => {
                    value.id = this.user.id
                    if (valid) {
                        let postUrl = url ? url : "/user/update"
                        this.postRequest(postUrl, value).then((res) => {

                            if (res.data) {
                                this.updateUser().then(res => {
                                    if (res) {
                                        this.handleShows(index, true)
                                        this.$message.success('成功')
                                    }
                                })
                            }

                        })
                    } else {

                        this.$message.error("error submit!!");
                        return false;
                    }
                })
            },
            getCode() {
                this.getRequest("/email", {
                    email: this.user.email
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
            },
            getCodeWithEmail(value) {
                //单独邮箱验证
                this.$refs.forms[5].validateField('email', emailError => {
                    if (!emailError) {
                        console.log('邮箱验证通过')
                        let email = value ? value : this.form.email
                        this.getRequest("/email", {
                            email: email
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

                        })
                    }
                })

            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = res.data.fileUrl
                this.updateUser()
            },
            beforeAvatarUpload(file) {
                console.log(file)
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            uploadAvatar(option){
                console.log(option)
                const file = option.file
                let formData = new FormData()
                formData.append('id',this.user.id)
                formData.append('file',file)
                return this.postRequest('/user/updatePic',formData,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })

            }

        },
        created() {
            this.init()
        },

    }
</script>

<style scoped lang="less">
    .userSetting {
        li {
            margin: 10px 0;
            display: flex;

            div {
                font-size: 1.3em;
            }

            >div:first-child {
                width: 200px;
                font-weight: bold;
                margin: 0 20px;
            }

            >div:last-child {
                flex: 1;
            }
        }

        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

    }
</style>