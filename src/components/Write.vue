<template>
    <div class="write">
        <el-row :gutter="20">
            <el-col :span="18">
                <el-form ref="form" :model="form" :rules="rules">
                    <el-form-item prop="imageUrl">
                        <div class="cover">
                            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false" :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload" :http-request="uploadAvatar">
                                <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <div class="tip">请上传封面</div>
                            </el-upload>
                        </div>
                    </el-form-item>
                    <el-form-item label="文章分类" prop="category">
                        <div class="category">
                            <el-select v-model.number="form.category" placeholder="请选择">
                                <el-option v-for="(item,index) in categoryOptions" :key="index" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="文章标签" prop="labels">
                        <div class="label">
                            <el-select v-model="form.labels" multiple default-first-option :multiple-limit="4"
                                placeholder="请选择文章标签">
                                <el-option v-for="(item,index) in labelOptions" :key="index" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="文章标题" prop="title">
                        <div class="title">
                            <el-input v-model="form.title"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div class="textEditor">
                            <div id="text">
                                <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
                            </div>
                        </div>
                    </el-form-item>
                    <el-button type="primary" @click="submitForm('form')">立即{{article?'更新':'创建'}}</el-button>
                </el-form>



            </el-col>
            <el-col :span="6">
                <div class="information">
                    <ul>
                        <li>
                            <p>尊重原创</p>
                            <div>请不要发布任何盗版下载链接，包括软件、音乐、电影等等。我们尊重原创。</div>
                        </li>
                        <li>
                            <p>友好互助</p>
                            <div>您的文章将会有成千上万人阅读，保持对陌生人的友善，用知识去帮助别人也是一种快乐。</div>
                        </li>
                        <li>
                            <p>处罚</p>
                            <div>禁止发布垃圾广告，发现垃圾广告，本站会立刻封停您的账户</div>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import wangeditor from 'wangeditor'
    export default {
        name: 'Write',
        data() {
            // 标签验证
            var checkLabels = (rule, value, callback) => {
                console.log(value)
                if (value.length > 4) {
                    callback(new Error("标签最多四个！"));
                } else {
                    callback();
                }
            }

            return {
                article: this.$route.query.article ? JSON.parse(this.$route.query.article) : null,
                form: {
                    title: '',
                    imageUrl: '',
                    imageFile: null,
                    editor: null,
                    labels: [],
                    category: null,

                },
                labelOptions: [],
                categoryOptions: [],
                rules: {
                    title: [{
                        required: true,
                        message: '标题不能为空',
                        trigger: 'blur'
                    }, ],
                    imageUrl: [{
                        required: true,
                        message: '请上传封面',
                        trigger: 'blur'
                    }, ],
                    category: [{
                        required: true,
                        message: '请选择分类',
                        trigger: 'blur'
                    }, {
                        type: 'number',
                        message: '必须为数字值'
                    }],
                    labels: [{
                        validator: checkLabels,
                        trigger: "blur"
                    }, ],
                }
            }
        },
        computed: {
            ...mapState(['user']),
        },
        methods: {
            init() {
                this.getRequest("/articlelabel/findAll").then(res => {
                    if (res.data) {
                        res.data.forEach(category => {
                            this.labelOptions.push({
                                value: category.id,
                                label: category.name
                            })
                        })
                    }
                })

                this.getRequest("/articlecategory/findAll").then(res => {
                    if (res.data) {
                        res.data.forEach(category => {
                            this.categoryOptions.push({
                                value: category.id,
                                label: category.name
                            })
                        })
                    }
                })

                if (this.article) {
                    this.form.imageUrl = this.article.pic
                    this.form.category = this.article.categoryId
                    this.article.articlelabels.forEach(label => {
                        this.form.labels.push(label.id)
                    })
                    this.form.title = this.article.title
                }

            },
            initEditor() {
                const editor = new wangeditor('#text')
                editor.config.zIndex = 1
                editor.create()
                this.form.editor = editor
                if (this.article) {
                    this.form.editor.txt.html(this.article.content)
                }
            },
            handleAvatarSuccess(res, file) {
                this.form.imageUrl = res.data.fileUrl
            },
            beforeAvatarUpload(file) {
                console.log(file)
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            uploadAvatar(option) {
                console.log(option)
                this.form.imageFile = option.file
                const file = option.file
                let formData = new FormData()
                formData.append('file', file)
                return this.postRequest('/upload/cacheFile', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let article = {
                            title: this.form.title,
                            categoryId: this.form.category,
                            content: this.form.editor.txt.html()
                        }

                        if (this.article) {
                            //更新文章
                            article.id = this.article.id
                            this.postRequest('/article/updateArticle', article).then(res => {
                                if (res) {
                                    if (this.form.labels) {
                                        //更新文章和标签的联系
                                        this.postRequest('/articlelabel/updateArticlelabel', {
                                            articleId: this.article.id,
                                            labels: this.form.labels
                                        }).then(res => {
                                            if (res) {
                                                this.$message.success('更新成功')
                                            }
                                        })
                                    }
                                    if (this.form.imageFile) {

                                        let formData = new FormData()
                                        formData.append('id', this.article.id)
                                        formData.append('file', this.form.imageFile)
                                        //更新文章封面
                                        this.postRequest('/article/updatePic', formData).then(res => {
                                            if (res) {
                                                this.form.imageUrl = res.data.fileUrl
                                                this.$message.success('封面上传成功')
                                            }
                                        })
                                    }
                                }
                            })
                        } else {
                            //添加文章
                            this.postRequest('/article/addArticle', article).then(res => {
                                if (res) {
                                    //查询已经刚才添加的文章
                                    this.getRequest("/article/findArticleInfo", {
                                        order: 'update_time DESC',
                                        userId: this.user.id,
                                    }).then((res) => {
                                        console.log(res.data)
                                        if (res) {
                                            let articleId = res.data[0].id
                                            if (this.form.labels) {
                                                //添加文章和标签的联系
                                                this.postRequest(
                                                    '/articlelabel/addArticlelabel', {
                                                        articleId: articleId,
                                                        labels: this.form.labels
                                                    }).then(res => {
                                                    if (res) {
                                                        this.$message.success('创建成功')
                                                    }
                                                })
                                            }

                                            let formData = new FormData()
                                            formData.append('id', articleId)
                                            formData.append('file', this.form.imageFile)
                                            //更新文章封面
                                            this.postRequest('/article/updatePic', formData)
                                                .then(
                                                    res => {
                                                        if (res) {
                                                            this.form.imageUrl = res.data
                                                                .fileUrl
                                                            this.$message.success('封面上传成功')
                                                        }
                                                    })
                                        }

                                    })

                                }
                            })
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        created() {
            this.init()
        },
        mounted() {
            this.initEditor()
        },
    }
</script>

<style scoped lang="less">
    .write {
        .el-form-item {
            display: flex;

            .el-form-item__content {
                flex: 1 !important;

                .el-select {
                    width: 100%;
                }
            }
        }

        .cover {
            position: relative;

            .tip {
                position: absolute;
                bottom: 50px;
                left: 46%;
            }
        }

        .information {
            li {
                padding: 15px;

                p {
                    font-weight: bold;
                    font-size: 1.2em;
                }
            }
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
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        height: 178px;
        display: block;
    }
</style>