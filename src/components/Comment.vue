<template>
    <div v-if="isload" class="comment">
        <h3 class="title">{{comments.list?comments.list.length:0}}条评论</h3>
        <div class="content">
            <div class="textarea">
                <el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请输入内容" v-model="textarea">
                </el-input>
                <el-button type="primary" @click="addComment">回复</el-button>
            </div>

            <ul>
                <li class="top" v-for="(item,index) in comments.list" :key="index">
                    <div class="userInfo">
                        <a href="">
                            <img class="b2-radius"
                                src="https://ygodl.com/wp-content/uploads/thumb/2022/02/fill_w192_h192_g0_mark_449226209d44e3c602_1_avatar.jpg"
                                style="width:25px;">
                            <span>{{item.user.name}}</span>
                        </a>

                        <div class="time">21分钟前</div>
                    </div>

                    <div>{{item.content}}</div>
                    <div>
                        <i class="el-icon-star-on"></i>{{item.likeNum}}
                    </div>
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
            ...mapActions(['updateUser']),
            init() {
                this.getRequest("/comment/findCommentInfoPage", {
                    order: 'update_time',
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
                    order: 'update_time',
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
                        order: 'update_time',
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
                        order: 'update_time',
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