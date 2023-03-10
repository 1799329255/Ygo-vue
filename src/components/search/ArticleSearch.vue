<template>
    <div class="articleSearch">
        <div class="search">
            <el-form :model="articleForm" ref="articleForm" :inline="true" label-width="50px">
                <el-form-item label="标题">
                    <el-input v-model="articleForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model.number="articleForm.category" placeholder="请选择" clearable>
                        <el-option v-for="(item,index) in categoryOptions" :key="index" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签">
                    <el-select v-model="articleForm.labels" multiple default-first-option :multiple-limit="4"
                        placeholder="请选择文章标签">
                        <el-option v-for="(item,index) in labelOptions" :key="index" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" circle type="primary" @click="submitForm('articleForm')">
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content" v-if="isload">
            <ul>
                <li v-for="(item,index) in articles.list" :key="index">
                    <div class="img">
                        <router-link :to="{name: 'Article',query:{article:JSON.stringify(item)}}">
                            <el-image style="width:190px; height:120px;" :src="item.pic" fit="cover"></el-image>
                        </router-link>
                    </div>
                    <div class="describe" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">

                        <router-link :to="{name: 'Article',query:{article:JSON.stringify(item)}}">
                            <a style="font-size:1.1em;">
                                {{item.title}}
                            </a>
                        </router-link>

                        <div class="describe-content">
                            <div>
                                <router-link
                                    :to="{name: 'Search',query:{search: JSON.stringify({categoryId:item.categoryId}), tabName: '1'}}">
                                    {{item.categoryName}}
                                </router-link>
                            </div>
                            <ul>
                                <li>
                                    <el-image class="myImg" src="/system/like/like.png">
                                    </el-image>{{item.likeNum}}
                                </li>
                                <li>
                                    <el-image class="myImg" src="/system/view/view.png">
                                    </el-image>{{item.viewNum}}
                                </li>
                            </ul>
                        </div>

                        <div class="describe-userInfo">
                            <el-link :underline="false" @click="toUser(item.user.id)">
                                <div style="display: flex;justify-content:space-between;align-items: center;">
                                    <el-image style="width:24px; margin-right:5px;" :src="item.user.pic?item.user.pic:'/system/avatar/avatar.jpg'" fit="cover">
                                    </el-image>
                                    <span>{{item.user.name}}</span>
                                </div>
                            </el-link>
                            <span>{{item.updateTime | fomatTime}}</span>
                        </div>

                    </div>
                </li>
            </ul>
            <div style="width:1150px;margin:0 auto;">
                <el-button @click="getNextArticles(5)">点击加载</el-button>
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
        name: 'ArticleSearch',
        data() {
            return {
                articleForm: {
                    title: '',
                    category: null,
                    labels: [],
                },
                categoryOptions: [],
                labelOptions: [],
                articles: null,
            }
        },
        computed: {
            isload() {
                if (this.articles) {
                    if (this.articles.list) {
                        if (this.articles.list.length > 0) {
                            return true
                        }
                    }
                }
                return false
            },
            article() {
                return this.search ? JSON.parse(this.search) : {
                    title: '',
                    category: null,
                    labels: [],
                }

            }
        },
        props: {
            search: {
                type: String,
                default: JSON.stringify({
                    title: '',
                    category: null,
                    labels: [],
                })
            },
        },
        watch: {
            search(newValue, oldValue) {
                this.setArticleForm()
                this.getArticles(1, 5)
            }
        },
        methods: {
            init() {
                this.setArticleForm()

                this.getRequest("/articlelabel/findAll").then(res => {
                    if (res.data) {
                        res.data.forEach(category => {
                            this.labelOptions.push({
                                value: category.id,
                                label: category.name
                            })
                        })
                    }
                })

                this.getRequest("/articlecategory/findAll").then(res => {
                    if (res.data) {
                        res.data.forEach(category => {
                            this.categoryOptions.push({
                                value: category.id,
                                label: category.name
                            })
                        })
                    }
                })

                this.getArticles(1, 5)
            },
            setArticleForm() {
                this.articleForm.title = this.article.title

                if (this.article.categoryId) {
                    this.articleForm.category = this.article.categoryId
                }
                if (this.article.labelIds) {
                    this.articleForm.labels = this.article.labelIds.toString()
                }
            },
            getArticles(pageNum, pageSize) {
                let article = {
                    order: 'update_time DESC',
                    pageNum: pageNum,
                    pageSize: pageSize,
                }
                if (this.articleForm.title) {
                    article.title = this.articleForm.title
                }
                if (this.articleForm.category) {
                    article.categoryId = this.articleForm.category
                }
                if (this.articleForm.labels.length > 0) {
                    article.labelIds = this.articleForm.labels.toString()
                }

                this.getRequest("/article/findArticleInfoPage", article).then((res) => {
                    if (res) {
                        this.articles = res.data
                    }
                })
            },

            getNextArticles(pageSize) {
                if (this.articles.hasNextPage) {
                    let article = {
                        order: 'update_time DESC',
                        pageNum: this.articles.nextPage,
                        pageSize: pageSize,
                    }
                    if (this.articleForm.title) {
                        article.title = this.articleForm.title
                    }
                    if (this.articleForm.category) {
                        article.categoryId = this.articleForm.category
                    }
                    if (this.articleForm.labels.length > 0) {
                        article.labelIds = this.articleForm.labels.toString()
                    }

                    this.getRequest("/article/findArticleInfoPage", article).then((res) => {
                        if (res) {
                            let list = this.articles.list.concat(res.data.list)
                            this.articles = res.data
                            this.articles.list = list
                        }
                    })
                } else {
                    this.$message.warning('没有数据了')
                }

            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getArticles(1, 5)
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
    .articleSearch {

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
                    margin: 10px 20px;
                }
            }


            .describe {
                width: 190px;

                .describe-content {
                    display: flex;
                    justify-content: space-between;

                    li {
                        display: inline;
                    }
                }

                .describe-userInfo {
                    display: flex;
                    justify-content: space-between;
                }
            }
        }


    }
</style>