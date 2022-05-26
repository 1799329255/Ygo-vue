<template>
    <div v-if="isload" class="comment">
        <h3 class="title">{{comments.list?comments.list.length:0}}条评论</h3>
        <div class="content" v-if="user">
            <div class="textarea">
                <el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请输入内容" v-model="textarea">
                </el-input>
                <el-button type="primary" @click="addComment">回复</el-button>
            </div>

            <ul>
                <li class="top" v-for="(item,index) in comments.list" :key="index">
                    <div class="userInfo">
                        <el-link :underline="false" @click="toUser(item.user.id)">
                            <div style="display: flex;justify-content:space-between;align-items: center;">
                                <el-image style="width:24px; margin-right:5px;" :src="item.user.pic?item.user.pic:'/system/avatar/avatar.jpg'" fit="cover">
                                </el-image>
                                <span>{{item.user.name}}</span>
                            </div>
                        </el-link>
                        <div style="display: flex;justify-content:space-between;align-items: center;">
                            <div class="time" style="margin-right:10px;">{{item.updateTime | fomatTime}}</div>
                            <div>
                                <i class="el-icon-star-on"></i>{{item.likeNum}}
                            </div>
                        </div>
                        
                    </div>

                    <div>{{item.content}}</div>
                    
                </li>

            </ul>

            <el-pagination background layout="prev, pager, next" :page-size="comments.pageSize" :total="comments.total"
                @current-change="handleCurrentChange" @prev-click="handlePrevClick" @next-click="handleNextClick">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'

    export default {
        name: 'comment',
        data() {
            return {
                comments: null,
                isload: false,
                textarea: '',
            }
        },
        computed: {
            ...mapState(['user'])
        },
        props: {
            articleId: {
                type: Number,
            },
        },
        methods: {
            ...mapActions(['updateUser','updateOtherUser']),
            init() {
                this.getRequest("/comment/findCommentInfoPage", {
                    order: 'update_time DESC',
                    pageNum: 1,
                    pageSize: 4,
                    articleId: this.articleId
                }).then((res) => {

                    if (res) {
                        this.comments = res.data
                        this.isload = true

                    }

                })
            },
            handleCurrentChange(pageNum) {
                this.getRequest("/comment/findCommentInfoPage", {
                    order: 'update_time DESC',
                    pageNum: pageNum,
                    pageSize: 4,
                    articleId: this.articleId
                }).then((res) => {
                    if (res) {
                        this.comments = res.data
                    }

                })
            },
            handlePrevClick() {
                if (this.comments.hasPreviousPage) {
                    this.getRequest("/comment/findCommentInfoPage", {
                        order: 'update_time DESC',
                        pageNum: this.comments.prePage,
                        pageSize: 4,
                        articleId: this.articleId
                    }).then((res) => {
                        if (res) {
                            this.comments = res.data
                        }

                    })
                }

            },
            handleNextClick() {
                if (this.comments.hasNextPage) {
                    this.getRequest("/comment/findCommentInfoPage", {
                        order: 'update_time DESC',
                        pageNum: this.comments.nextPage,
                        pageSize: 4,
                        articleId: this.articleId
                    }).then((res) => {
                        if (res) {
                            this.comments = res.data
                        }

                    })
                }

            },
            addComment() {
                this.postRequest("/comment/addComment", {
                    articleId: this.articleId,
                    userId: this.user.id,
                    content: this.textarea
                }).then(res => {
                    if (res) {
                        this.updateUser()
                        this.init()
                        this.$message.success('回复成功')
                    }
                })
            },
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
    .content {
        .top {
            margin-top: 20px;
            >div {
                margin-top: 10px;
            }

            .userInfo {
                display: flex;
                justify-content: space-between;
            }


        }
    }
</style>