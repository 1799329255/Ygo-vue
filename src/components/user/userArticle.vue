<template>
    <div v-if="loadNum>=1" class="userArticle">
        <ul>
            <li v-for="(item,index) in articles.list" :key="index">
                <div class="img">
                    <router-link :to="{name: 'Article',query:{article:JSON.stringify(item)}}" v-if="otherUser">
                        <el-image style="width:190px; height:140px;" :src="item.pic" fit="cover"></el-image>
                    </router-link>

                    <router-link :to="{name: 'Write',query:{article:JSON.stringify(item)}}" v-else>
                        <el-image style="width:190px; height:140px;" :src="item.pic" fit="cover"></el-image>
                    </router-link>
                </div>
                <div class="describe">
                    <div>
                        <router-link
                            :to="{name: 'Search',query:{search: JSON.stringify({categoryId:item.categoryId}), tabName: '1'}}"
                            v-if="otherUser">
                            {{item.categoryName}}
                        </router-link>
                        <router-link :to="{name: 'Write',query:{article:JSON.stringify(item)}}" v-else>
                            {{item.categoryName}}
                        </router-link>
                    </div>
                    <router-link :to="{name: 'Article',query:{article:JSON.stringify(item)}}" v-if="otherUser">
                        <el-link>
                            <h3>{{item.title}}</h3>
                        </el-link>
                    </router-link>
                    <router-link :to="{name: 'Write',query:{article:JSON.stringify(item)}}" v-else>
                        <h3>{{item.title}}</h3>
                    </router-link>
                    <!-- <div>{{item.content}}</div> -->
                    <div style="height:24px;">
                        <div class="describe-userInfo">
                            <div>
                                <div style="display: flex;justify-content:space-between;align-items: center;">
                                    <el-image style="width:24px; margin-right:5px;" :src="item.user.pic" fit="cover">
                                    </el-image>
                                    <span>{{item.user.name}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="describe-content">
                            <ul>
                                <li>{{item.updateTime | fomatTime}}</li>
                                <li>
                                    <el-image class="myImg" src="http://127.0.0.1:9000/system/like/like.png">
                                    </el-image>{{item.likeNum}}
                                </li>
                                <li>
                                    <el-image class="myImg" src="http://127.0.0.1:9000/system/view/view.png">
                                    </el-image>{{item.viewNum}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

        <el-pagination background layout="prev, pager, next" :page-size="articles.pageSize" :total="articles.total"
            @current-change="handleCurrentChange" @prev-click="handlePrevClick" @next-click="handleNextClick">
        </el-pagination>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    export default {
        name: 'UserArticle',
        data() {
            return {
                articles: null,
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
                this.getRequest("/article/findArticleInfoPage", {
                    order: 'update_time DESC',
                    pageNum: 1,
                    pageSize: 4,
                    userId: this.middleUser.id
                }).then((res) => {

                    if (res) {
                        this.articles = res.data
                        this.loadNum++

                    }

                })
            },
            handleCurrentChange(pageNum) {
                this.getRequest("/article/findArticleInfoPage", {
                    order: 'update_time DESC',
                    pageNum: pageNum,
                    pageSize: 4,
                    userId: this.middleUser.id
                }).then((res) => {
                    if (res) {
                        this.articles = res.data
                    }

                })
            },
            handlePrevClick() {
                if (this.articles.hasPreviousPage) {
                    this.getRequest("/article/findArticleInfoPage", {
                        order: 'update_time DESC',
                        pageNum: this.articles.prePage,
                        pageSize: 4,
                        userId: this.middleUser.id
                    }).then((res) => {
                        if (res) {
                            this.articles = res.data
                        }

                    })
                }

            },
            handleNextClick() {
                if (this.articles.hasNextPage) {
                    this.getRequest("/article/findArticleInfoPage", {
                        order: 'update_time DESC',
                        pageNum: this.articles.nextPage,
                        pageSize: 4,
                        userId: this.middleUser.id
                    }).then((res) => {
                        if (res) {
                            this.articles = res.data
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
    .userArticle {

        li {
            text-align: left;
            padding: 16px;
            display: flex;

            .img {
                height: 140px;
                width: 190px;
                margin-right: 20px;
            }

            .describe {
                flex: 1;

                div,
                h3 {
                    margin: 5px 0;
                }

                .describe-userInfo {
                    float: left;
                }

                .describe-content {
                    float: right;

                    li {
                        display: inline;
                    }
                }
            }
        }
    }
</style>