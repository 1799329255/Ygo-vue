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
                                        <el-image style="width:190px; height:140px;" :src="item.pic" fit="cover">
                                        </el-image>
                                    </router-link>
                                </div>
                                <div class="describe">
                                    <div>
                                        <div style="margin-bottom:10px;">
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
                                    </div>

                                    <div
                                        style="height:24px;display: flex;justify-content:space-between;align-items: center;">
                                        <div class="describe-userInfo">
                                            <el-link :underline="false" @click="toUser(item.user.id)">
                                                <div
                                                    style="display: flex;justify-content:space-between;align-items: center;">
                                                    <el-image style="width:24px; margin-right:5px;" :src="item.user.pic?item.user.pic:'/system/avatar/avatar.jpg'"
                                                        fit="cover">
                                                    </el-image>
                                                    <span>{{item.user.name}}</span>
                                                </div>
                                            </el-link>
                                        </div>
                                        <div class="describe-content">
                                            <ul>
                                                <li>{{item.updateTime | fomatTime}}</li>
                                                <li>
                                                    <el-image class="myImg"
                                                        src="/system/like/like.png">
                                                    </el-image>{{item.likeNum}}
                                                </li>
                                                <li>
                                                    <el-image class="myImg"
                                                        src="/system/view/view.png">
                                                    </el-image>{{item.viewNum}}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <el-button style="margin-left:16px;" @click="loadnewArticles">点击加载</el-button>
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
                                            <el-image style="width:84px; height:48px;" :src="item.pic" fit="cover">
                                            </el-image>
                                        </router-link>
                                    </div>
                                    <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
                                        class="describe">
                                        <router-link :to="{name: 'Article',query:{article:JSON.stringify(item)}}">
                                            <a>{{item.title}}</a>
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
                                            <div
                                                style="display: flex;justify-content:space-between;align-items: center;">
                                                <el-image style="width:24px; margin-right:5px;" :src="item.user.pic?item.user.pic:'/system/avatar/avatar.jpg'"
                                                    fit="cover">
                                                </el-image>
                                                <span>{{item.user.name}}</span>
                                            </div>
                                        </el-link>
                                        <div class="time">{{item.updateTime | fomatTime}}</div>
                                    </div>

                                    <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                        {{item.content}}
                                    </div>

                                    <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                        <span>[文章]来自：</span>
                                        <router-link
                                            :to="{name: 'Article',query:{article:JSON.stringify(item.article)}}">
                                            <a>{{item.article.title}}</a>
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
                } else {
                    this.$message.warning('没有数据了')
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
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .describe-content {
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
                        flex: 0;
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
                    margin-top: 15px;
                    .userInfo {
                        display: flex;
                        justify-content: space-between;
                    }

                }
            }
        }

    }
</style>