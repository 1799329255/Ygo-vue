<template>
    <div class="article">
        <div class="title">{{article.title}}</div>

        <div class="content">
            <el-row :gutter="20" v-if="isload">
                <el-col :span="18" style="padding: 30px;">
                    <div v-html="article.content"></div>
                    <comment :articleId="article.id"></comment>
                </el-col>
                <el-col :span="6">
                    <div class="userInfo">
                        <div class="top">
                            <h3>关于作者</h3>
                            <!-- <el-link type="primary">关注</el-link> -->
                        </div>
                        <div class="main">
                            <el-link :underline="false" @click="toUser(user.id)">
                                <div style="display: flex;justify-content:space-between;align-items: center;">
                                    <el-image style="width:50px; margin-right:5px;" :src="user.pic" fit="cover">
                                    </el-image>
                                    <span>{{user.name}}</span>
                                </div>
                            </el-link>
                        </div>
                        <div>
                            <el-row :gutter="20">
                                <el-col :span="6">
                                    <p>文章</p>
                                    <p>{{user.articles?user.articles.length:0}}</p>
                                </el-col>
                                <el-col :span="6">
                                    <p>评论</p>
                                    <p>{{user.comments?user.comments.length:0}}</p>
                                </el-col>
                                <el-col :span="6">
                                    <p>关注</p>
                                    <p>{{user.follows?user.follows.length:0}}</p>
                                </el-col>
                                <el-col :span="6">
                                    <p>粉丝</p>
                                    <p>{{user.fans?user.fans.length:0}}</p>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="bottom">
                            <ul v-for="(item,index) in user.articles" :key="index">
                                <li style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                    <span>[文章]</span>
                                    <a href="javascript:;" @click="toArticle(item)">{{item.title}}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
            </el-row>


        </div>

    </div>
</template>

<script>
    import Comment from './Comment.vue'
    import {
        mapActions
    } from 'vuex'

    export default {
        name: 'Article',
        components: {
            Comment,
        },
        data() {
            return {
                article: JSON.parse(this.$route.query.article),
                user: null,
                isload: false,
            }
        },
        methods: {
            ...mapActions(['updateOtherUser']),
            init() {
                this.getRequest('/user/findById', {
                    id: this.article.userId
                }).then(res => {
                    if (res.data) {
                        this.user = res.data
                        this.isload = true
                    }
                })
            },
            toArticle(article) {
                let newUrl = this.$router.resolve({
                    name: 'Article',
                    query: {
                        article: JSON.stringify(article)
                    }
                })

                window.open(newUrl.href, "_blank")
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
    .article {
        img {
            max-width: 100%;
        }

        .title {
            font-size: 1.5em;
            font-weight: bold;
            text-align: center;
        }

        .content {
            .userInfo {
                .top {
                    display: flex;
                    justify-content: space-between;
                }

                .main {
                    display: flex;
                    justify-content: flex-start;
                }
            }
        }
    }
</style>