<template>
    <div class="userOverView">
        <el-descriptions class="margin-top" title="用户信息" :column="3" border>
            <template slot="extra">
                <div v-if="otherUser">
                    <el-button v-if="isFollowed" type="primary" size="small" @click="unFollow">取消关注</el-button>
                    <el-button v-else type="primary" size="small" @click="follow">关注</el-button>
                </div>

            </template>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    用户名
                </template>
                {{middleUser.name}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-male"></i>
                    性别
                </template>
                {{middleUser.sex===0? '女': '男'}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    手机号
                </template>
                {{middleUser.phone}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-s-promotion"></i>
                    邮箱
                </template>
                {{middleUser.email}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user-solid"></i>
                    年龄
                </template>
                {{middleUser.age}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-date"></i>
                    入住日期
                </template>
                {{middleUser.createTime | fomatTime}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-office-building"></i>
                    联系地址
                </template>
                {{middleUser.address}}
            </el-descriptions-item>
        </el-descriptions>

        <div class="user-info-box-count">
            <el-row :gutter="20">
                <el-col :span="6">
                    <p>文章</p>
                    <p>{{middleUser.articles?middleUser.articles.length:0}}</p>
                </el-col>
                <el-col :span="6">
                    <p>评论</p>
                    <p>{{middleUser.comments?middleUser.comments.length:0}}</p>
                </el-col>
                <el-col :span="6">
                    <p>关注</p>
                    <p>{{middleUser.follows?middleUser.follows.length:0}}</p>
                </el-col>
                <el-col :span="6">
                    <p>粉丝</p>
                    <p>{{middleUser.fans?middleUser.fans.length:0}}</p>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    export default {
        name: 'UserOverView',
        computed: {
            ...mapState(['user', 'otherUser']),
            middleUser() {
                return this.otherUser ? this.otherUser : this.user
            }
        },
        data() {
            return {
                isFollowed: false
            }
        },
        methods: {
            ...mapActions(['updateUser', 'updateOtherUser']),
            init() {
                if (this.otherUser && this.user) {
                    this.isFollow()
                }
            },
            follow() {
                let formData = new FormData()
                formData.append('fanId', this.otherUser.id)
                formData.append('followId', this.user.id)
                this.postRequest("/user/follow", formData).then((res) => {
                    if (res) {
                        this.updateUser().then(res => {
                            if (res) {
                                this.updateOtherUser(this.otherUser.id).then(res => {
                                    if (res) {
                                        this.$message.success('已关注')
                                        this.isFollowed = true
                                    }

                                })
                            }

                        })
                    }
                })
            },
            unFollow() {
                let formData = new FormData()
                formData.append('fanId', this.otherUser.id)
                formData.append('followId', this.user.id)
                this.postRequest("/user/unFollow", formData).then((res) => {
                    if (res) {
                        this.updateUser().then(res => {
                            if (res) {
                                this.updateOtherUser(this.otherUser.id).then(res => {
                                    if (res) {
                                        this.$message.success('已取消关注')
                                        this.isFollowed = false
                                    }

                                })
                            }

                        })
                    }
                })

            },
            isFollow() {
                this.getRequest("/user/isFollow", {
                    fanId: this.otherUser.id,
                    followId: this.user.id
                }).then((res) => {
                    if (res) {
                        this.isFollowed = res.data
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
    .user-info-box-count {
        margin-top: 15px;
        text-align: center;

        p {
            height: 30px;
        }
    }
</style>