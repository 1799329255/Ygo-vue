<template>
    <div v-if="loadNum>=1" class="userFollow">
        <ul>
            <li v-for="(item,index) in follows.list" :key="index">
                <el-link :underline="false" @click="toUser(item.id)">
                    <div class="box">
                        <div class="img">
                            <el-image style="width:100px;" :src="item.pic?item.pic:'/system/avatar/avatar.jpg'" fit="contain">
                            </el-image>
                        </div>
                        <div class="describe">
                            <div>{{item.name}}</div>
                            <div style="height:24px;">
                                <div class="describe-content">
                                    <ul>
                                        <li>{{item.articles?item.articles.length:0}}文章</li>
                                        <li>{{item.follows?item.follows.length:0}}关注</li>
                                        <li>{{item.fans?item.fans.length:0}}粉丝</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-link>
            </li>
        </ul>

        <el-pagination background layout="prev, pager, next" :page-size="follows.pageSize" :total="follows.total"
            @current-change="handleCurrentChange" @prev-click="handlePrevClick" @next-click="handleNextClick">
        </el-pagination>
    </div>
    <el-empty description="暂无数据" v-else></el-empty>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    export default {
        name: 'UserFollow',
        data() {
            return {
                follows: null,
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
            ...mapActions(['updateOtherUser']),
            init() {
                this.getRequest("/user/findFollowsPageByUserId", {
                    pageNum: 1,
                    pageSize: 4,
                    id: this.middleUser.id
                }).then((res) => {

                    if (res.data) {
                        this.follows = res.data
                        this.loadNum++
                        this.follows.list.forEach(follow => {
                            this.getRequest("/article/findByUserId", {
                                userId: follow.id
                            }).then((res) => {

                                if (res) {
                                    this.$set(follow, 'articles', res.data)
                                    this.loadNum++

                                }

                            })

                            this.getRequest("/user/findFollowsByUserId", {
                                id: follow.id
                            }).then((res) => {

                                if (res) {
                                    this.$set(follow, 'follows', res.data)
                                    this.loadNum++

                                }

                            })

                            this.getRequest("/user/findFansByUserId", {
                                id: follow.id
                            }).then((res) => {

                                if (res) {
                                    this.$set(follow, 'fans', res.data)
                                    this.loadNum++

                                }

                            })
                        })


                    }

                })
            },

            getfollows(pageNum, pageSize) {
                this.getRequest("/user/findFollowsPageByUserId", {
                    pageNum: pageNum,
                    pageSize: pageSize,
                    id: this.middleUser.id
                }).then((res) => {

                    if (res) {
                        this.follows = res.data
                        this.follows.list.forEach(follow => {
                            this.getRequest("/article/findByUserId", {
                                userId: follow.id
                            }).then((res) => {

                                if (res) {
                                    this.$set(follow, 'articles', res.data)
                                }

                            })

                            this.getRequest("/user/findFollowsByUserId", {
                                id: follow.id
                            }).then((res) => {

                                if (res) {
                                    this.$set(follow, 'follows', res.data)
                                }

                            })

                            this.getRequest("/user/findFansByUserId", {
                                id: follow.id
                            }).then((res) => {

                                if (res) {
                                    this.$set(follow, 'fans', res.data)
                                }

                            })
                        })


                    }

                })
            },

            handleCurrentChange(pageNum) {
                getfollows(pageNum, 4)
            },
            handlePrevClick() {
                if (this.follows.hasPreviousPage) {
                    getfollows(this.follows.prePage, 4)
                }

            },
            handleNextClick() {
                if (this.follows.hasNextPage) {
                    getfollows(this.follows.nextPage, 4)
                }

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
    .userFollow {
       li {
            text-align: left;
            padding: 16px;
            
            .box{
                display: flex;
            }

            .img {

                margin-right: 20px;
            }

            .describe {
                flex: 1;

                .describe-content {
                    margin-top: 30px;

                    li {
                        display: inline;
                    }
                }
            }
        }
    }
</style>