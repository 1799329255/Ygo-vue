<template>
    <div v-if="loadNum>=1" class="userFan">
        <ul>
            <li v-for="(item,index) in fans.list" :key="index">
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

        <el-pagination background layout="prev, pager, next" :page-size="fans.pageSize" :total="fans.total"
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
        name: 'UserFan',
        data() {
            return {
                fans: null,
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
                this.getRequest("/user/findFansPageByUserId", {
                    pageNum: 1,
                    pageSize: 4,
                    id: this.middleUser.id
                }).then((res) => {

                    if (res.data) {
                        this.fans = res.data
                        this.loadNum++
                        this.fans.list.forEach(fan => {
                            this.getRequest("/article/findByUserId", {
                                userId: fan.id
                            }).then((res) => {

                                if (res) {
                                    this.$set(fan, 'articles', res.data)
                                    this.loadNum++

                                }

                            })

                            this.getRequest("/user/findFollowsByUserId", {
                                id: fan.id
                            }).then((res) => {

                                if (res) {
                                    this.$set(fan, 'follows', res.data)
                                    this.loadNum++

                                }

                            })

                            this.getRequest("/user/findFansByUserId", {
                                id: fan.id
                            }).then((res) => {

                                if (res) {
                                    this.$set(fan, 'fans', res.data)
                                    this.loadNum++

                                }

                            })
                        })


                    }

                })
            },

            getfans(pageNum, pageSize) {
                this.getRequest("/user/findFansPageByUserId", {
                    pageNum: pageNum,
                    pageSize: pageSize,
                    id: this.middleUser.id
                }).then((res) => {

                    if (res) {
                        this.fans = res.data
                        this.fans.list.forEach(fan => {
                            this.getRequest("/article/findByUserId", {
                                userId: fan.id
                            }).then((res) => {

                                if (res) {
                                    this.$set(fan, 'articles', res.data)
                                }

                            })

                            this.getRequest("/user/findFollowsByUserId", {
                                id: fan.id
                            }).then((res) => {

                                if (res) {
                                    this.$set(fan, 'follows', res.data)
                                }

                            })

                            this.getRequest("/user/findFansByUserId", {
                                id: fan.id
                            }).then((res) => {

                                if (res) {
                                    this.$set(fan, 'fans', res.data)

                                }

                            })
                        })


                    }

                })
            },

            handleCurrentChange(pageNum) {
                getfans(pageNum, 4)
            },
            handlePrevClick() {
                if (this.fans.hasPreviousPage) {
                    getfans(this.fans.prePage, 4)
                }

            },
            handleNextClick() {
                if (this.fans.hasNextPage) {
                    getfans(this.fans.nextPage, 4)
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
    .userFan {
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