<template>
    <div v-if="loadNum>=1" class="userComment">
        <h3 class="title">最新评论</h3>
        <div class="content">
            <ul>
                <li class="top" v-for="(item,index) in comments.list" :key="index">
                    <div class="userInfo">
                        <div>
                            <el-image style="width:24px;" :src="item.user.pic" fit="contain">
                            </el-image>
                            <span>{{item.user.name}}</span>
                        </div>

                        <div class="time">{{item.updateTime | fomatTime}}</div>
                    </div>

                    <div>{{item.content}}</div>
                    <div>
                        <span>[文章]来自：</span>
                        <router-link :to="{name: 'Article',query:{article:JSON.stringify(item.article)}}">
                            <el-link>{{item.article.title}}</el-link>
                        </router-link>
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
        mapState
    } from 'vuex'
    export default {
        name: 'UserComment',
        data() {
            return {
                comments: null,
                loadNum: 0,
            }
        },
        computed: {
            ...mapState(['user', 'otherUser']),
            middleUser() {
                return this.otherUser ? this.otherUser : this.user
            }
        },
        methods: {
            init() {
                this.getRequest("/comment/findCommentInfoPage", {
                    order: 'update_time DESC',
                    pageNum: 1,
                    pageSize: 4,
                    userId: this.middleUser.id
                }).then((res) => {

                    if (res) {
                        this.comments = res.data
                        this.loadNum++

                    }

                })
            },
            handleCurrentChange(pageNum) {
                this.getRequest("/comment/findCommentInfoPage", {
                    order: 'update_time DESC',
                    pageNum: pageNum,
                    pageSize: 4,
                    userId: this.middleUser.id
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
                        userId: this.middleUser.id
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
                        userId: this.middleUser.id
                    }).then((res) => {
                        if (res) {
                            this.comments = res.data
                        }

                    })
                }

            },

        },
        created() {
            this.init()
        },
    }
</script>

<style scoped lang="less">
    .userComment {
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
    }
</style>