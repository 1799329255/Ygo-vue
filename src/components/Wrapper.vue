<template>
    <div class="wrapper">
        <el-row :gutter="20" v-if="loadNum>=3">
            <el-col :span="18">
                <div class="main">
                    <div class="article_category">

                        <div class="title">最新文章</div>

                        <div class="tap">
                            <el-row :gutter="20">
                                <el-col :span="2.4">
                                    <el-button @click="getCategoryIdNewArticles()" round size="mini">全部</el-button>
                                </el-col>
                                <el-col :span="4.8">
                                    <el-button @click="getCategoryIdNewArticles(1)" round size="mini">官方新闻</el-button>
                                </el-col>
                                <el-col :span="4.8">
                                    <el-button @click="getCategoryIdNewArticles(2)" round size="mini">精选看点</el-button>
                                </el-col>
                                <el-col :span="4.8">
                                    <el-button @click="getCategoryIdNewArticles(3)" round size="mini">活动资讯</el-button>
                                </el-col>
                                <el-col :span="4.8">
                                    <el-button @click="getCategoryIdNewArticles(4)" round size="mini">禁卡表</el-button>
                                </el-col>
                                <el-col :span="2.4">
                                    <router-link :to="{name:'Search'}">
                                        <el-button round size="mini">更多</el-button>
                                    </router-link>
                                </el-col>
                            </el-row>
                        </div>


                    </div>

                    <div class="tap_content">
                        <ul>
                            <li v-for="(item,index) in newArticles.list" :key="index">
                                <div class="img">
                                    <router-link :to="{name: 'Article',query:{article:JSON.stringify(item)}}">
                                        <el-image style="width:190px;" :src="item.pic" fit="contain"></el-image>
                                    </router-link>
                                </div>
                                <div class="describe">
                                    <div>
                                        <router-link
                                            :to="{name: 'Search',query:{search: JSON.stringify({categoryId:item.categoryId}), tabName: '1'}}">
                                            {{item.categoryName}}
                                        </router-link>
                                    </div>

                                    <router-link :to="{name: 'Article',query:{article:JSON.stringify(item)}}">
                                        <el-link>
                                            <h3>{{item.title}}</h3>
                                        </el-link>
                                    </router-link>

                                    <!-- <div>{{item.content}}</div> -->
                                    <div style="height:24px;">
                                        <div class="describe-userInfo">
                                            <el-link :underline="false" @click="toUser(item.user.id)">
                                                <el-image style="width:24px;" :src="item.user.pic" fit="contain">
                                                </el-image>
                                                <span>{{item.user.name}}</span>
                                            </el-link>
                                        </div>
                                        <div class="describe-content">
                                            <ul>
                                                <li>{{item.updateTime | fomatTime}}</li>
                                                <li>
                                                    <el-image class="myImg"
                                                        src="http://127.0.0.1:9000/system/like/like.png">
                                                    </el-image>{{item.likeNum}}
                                                </li>
                                                <li>
                                                    <el-image class="myImg"
                                                        src="http://127.0.0.1:9000/system/view/view.png">
                                                    </el-image>{{item.viewNum}}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <el-button @click="loadnewArticles">点击加载</el-button>
                    </div>


                </div>
            </el-col>
            <el-col :span="6">
                <div class="sidebar">

                    <div class="hot">
                        <h3 class="title">7日热门</h3>
                        <div class="content">
                            <ul>
                                <li v-for="(item,index) in hotArticles.list" :key="index">
                                    <div class="img">
                                        <router-link :to="{name: 'Article',query:{article:JSON.stringify(item)}}">
                                            <el-image style="width:84px;" :src="item.pic" fit="contain"></el-image>
                                        </router-link>
                                    </div>
                                    <div class="describe">
                                        <router-link :to="{name: 'Article',query:{article:JSON.stringify(item)}}">
                                            <el-link>{{item.title}}</el-link>
                                        </router-link>
                                        <div>{{item.updateTime | fomatTime}}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="comment">
                        <div class="comment-top">
                            <h3 class="title">最新评论</h3>
                            <div>
                                <el-button size="mini" icon="el-icon-caret-left" @click="getPreComments"></el-button>
                                <el-button size="mini" icon="el-icon-caret-right" @click="getNextComments"></el-button>
                            </div>
                        </div>

                        <div class="content">
                            <ul>
                                <li class="top" v-for="(item,index) in comments.list" :key="index">
                                    <div class="userInfo">
                                        <el-link :underline="false" @click="toUser(item.user.id)">
                                            <el-image style="width:25px;" :src="item.user.pic" fit="contain"></el-image>
                                            <span>{{item.user.name}}</span>
                                        </el-link>
                                        <div class="time">{{item.updateTime | fomatTime}}</div>
                                    </div>

                                    <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                        {{item.content}}</div>
                                    <div>
                                        <span>[文章]来自：</span>
                                        <router-link
                                            :to="{name: 'Article',query:{article:JSON.stringify(item.article)}}">
                                            <el-link>{{item.article.title}}</el-link>
                                        </router-link>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex'
    export default {
        name: 'Wrapper',
        data() {
            return {
                loadNum: 0,
                newArticles: null,
                hotArticles: null,
                comments: null,
                categoryId: null,
            }
        },
        methods: {
            ...mapActions(['updateOtherUser']),
            init() {
                this.getRequest("/article/findArticleInfoPage", {
                    order: 'update_time DESC',
                    pageNum: 1,
                    pageSize: 4
                }).then((res) => {

                    if (res) {
                        this.newArticles = res.data
                        this.loadNum++

                    }

                })

                this.getRequest("/article/findArticleInfoPage", {
                    order: 'view_num',
                    pageNum: 1,
                    pageSize: 4
                }).then((res) => {
                    if (res) {
                        this.hotArticles = res.data
                        this.loadNum++
                    }
                })

                this.getRequest("/comment/findCommentInfoPage", {
                    order: 'create_time DESC',
                    pageNum: 1,
                    pageSize: 4
                }).then((res) => {
                    if (res) {
                        this.comments = res.data
                        this.loadNum++

                    }
                })

            },

            loadnewArticles() {
                if (this.newArticles.hasNextPage) {
                    this.getRequest("/article/findArticleInfoPage", {
                        order: 'update_time DESC',
                        pageNum: this.newArticles.nextPage,
                        pageSize: 4,
                        categoryId: this.categoryId
                    }).then((res) => {
                        if (res) {
                            let list = this.newArticles.list.concat(res.data.list)
                            this.newArticles = res.data
                            this.newArticles.list = list
                        }
                    })
                }

            },

            getCategoryIdNewArticles(categoryId) {
                this.getRequest("/article/findArticleInfoPage", {
                    order: 'update_time DESC',
                    pageNum: 1,
                    pageSize: 4,
                    categoryId: categoryId
                }).then((res) => {
                    if (res) {
                        this.newArticles = res.data
                        this.categoryId = categoryId
                    }
                })
            },

            getPreComments() {
                if (this.comments.hasPreviousPage) {
                    this.getRequest("/comment/findCommentInfoPage", {
                        order: 'create_time DESC',
                        pageNum: this.comments.prePage,
                        pageSize: 4
                    }).then((res) => {
                        if (res) {
                            this.comments = res.data
                        }
                    })
                }

            },

            getNextComments() {
                if (this.comments.hasNextPage) {
                    this.getRequest("/comment/findCommentInfoPage", {
                        order: 'create_time DESC',
                        pageNum: this.comments.nextPage,
                        pageSize: 4
                    }).then((res) => {
                        if (res) {
                            this.comments = res.data
                        }
                    })
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
    .article_category {
        height: 40px;
        padding: 0 20px;
        text-align: center;

        .title {
            height: 40px;
            line-height: 40px;
            float: left;
        }

        .tap {
            height: 40px;
            line-height: 40px;
            float: right;
        }

    }

    .tap_content {
        padding-top: 40px;

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

    .sidebar {
        .hot {
            .content {
                li {
                    display: flex;

                    .img {
                        margin-right: 10px;
                    }

                    .describe {
                        flex: 1;
                    }
                }

            }
        }

        .comment {
            .comment-top {
                display: flex;
                justify-content: space-between;
            }

            .content {
                .top {
                    .userInfo {
                        display: flex;
                        justify-content: space-between;
                    }

                }
            }
        }

    }
</style>