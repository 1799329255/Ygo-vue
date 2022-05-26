<template>
    <div class="userSearch">
        <div class="search">
            <el-form :model="userForm" ref="userForm" :inline="true" label-width="100px">
                <el-form-item label="用户名">
                    <el-input v-model="userForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model.number="userForm.sex">
                        <el-radio :label="0">女</el-radio>
                        <el-radio :label="1">男</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" circle type="primary" @click="submitForm('userForm')">
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content" v-if="isload">
            <ul>
                <li v-for="(item,index) in users.list" :key="index">
                    <el-link :underline="false" @click="toUser(item.id)">
                        <div class="box">
                            <div class="img">
                                <el-image style="width:100px;height:100px;" :src="item.pic?item.pic:'/system/avatar/avatar.jpg'" fit="cover">
                                </el-image>
                            </div>
                            <div>{{item.name}}</div>
                            <div class="describe">
                                <ul>
                                    <li>{{item.articles?item.articles.length:0}}文章</li>
                                    <li>{{item.follows?item.follows.length:0}}关注</li>
                                    <li>{{item.fans?item.fans.length:0}}粉丝</li>
                                </ul>
                            </div>
                        </div>
                    </el-link>
                </li>
            </ul>
            <div style="width:1150px;margin:0 auto;">
                <el-button @click="getNextUsers(8)">点击加载</el-button>
            </div>
            
        </div>
        <el-empty description="暂无数据" v-else></el-empty>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex'
    export default {
        name: 'UserSearch',
        data() {
            return {
                userForm: {
                    name: '',
                    sex: null,
                },
                users: null,
            }
        },
        computed: {
            isload() {
                if (this.users) {
                    if (this.users.list) {
                        if (this.users.list.length > 0) {
                            return true
                        }
                    }
                }
                return false
            },
            user() {
                return this.search ? JSON.parse(this.search) : {
                    name: '',
                    sex: null,
                }
            }
        },
        props: {
            search: {
                type: String,
                default: ''
            },
        },
        watch: {
            search(newValue, oldValue) {
                this.setUserForm()
                this.getUsers(1, 8)
            }
        },
        methods: {
            init() {
                this.setUserForm()
                this.getUsers(1, 8)
            },
            setUserForm() {
                this.userForm.name = this.user.name
            },
            getUsers(pageNum, pageSize) {
                let user = {
                    order: 'update_time DESC',
                    pageNum: pageNum,
                    pageSize: pageSize,
                }
                if (this.userForm.name) {
                    user.name = this.userForm.name
                }
                if (this.userForm.sex === 0 || this.userForm.sex === 1) {
                    user.sex = this.userForm.sex
                }

                this.getRequest("/user/findUserInfoPage", user).then((res) => {
                    if (res) {
                        this.users = res.data
                    }
                })
            },

            getNextUsers(pageSize) {
                if (this.users.hasNextPage) {
                    let user = {
                        order: 'update_time DESC',
                        pageNum: this.users.nextPage,
                        pageSize: pageSize,
                    }
                    if (this.userForm.name) {
                        user.name = this.userForm.name
                    }
                    if (this.userForm.sex === 0 || this.userForm.sex === 1) {
                        user.sex = this.userForm.sex
                    }

                    this.getRequest("/user/findUserInfoPage", user).then((res) => {
                        if (res) {
                            let list = this.users.list.concat(res.data.list)
                            this.users = res.data
                            this.users.list = list
                        }
                    })
                } else {
                    this.$message.warning('没有数据了')
                }

            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getUsers(1, 8)
                    }
                })
            },

            ...mapActions(['updateOtherUser']),
            toUser(id) {
                this.updateOtherUser(id).then(res => {
                    if (res) {
                        this.$router.push({
                            name: 'User'
                        })
                    }
                })
            },

        },
        created() {
            this.init();
        },
    }
</script>

<style scoped lang="less">
    .userSearch {
        .search {
            text-align: center;
        }

        .content {
            >ul {
                width: 1150px;
                margin: 0 auto;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;

                >li {
                    margin: 0 20px;
                }
            }
            .box{
                text-align:center;
            }

            .describe {
                display: flex;
                justify-content: space-between;

                li {
                    display: inline;
                }
            }
        }


    }
</style>