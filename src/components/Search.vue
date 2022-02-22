<template>
    <div class="search">
        <el-tabs type="border-card" v-model="tabName">
            <el-tab-pane label="文章" name="1">
                <el-form :model="articleForm" ref="articleForm" :inline="true" label-width="100px">
                    <el-form-item label="标题">
                        <el-input v-model="articleForm.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input v-model="articleForm.content" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="分类">
                        <el-select v-model.number="articleForm.category" placeholder="请选择">
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
                        <el-button type="primary" @click="submitForm('articleForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="用户" name="2">用户</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        data() {
            return {
                tabName: '1',
                search: this.$route.query.search ? this.$route.query.search : '',
                articleForm: {
                    title: '',
                    content: '',
                    category: null,
                    labels: [],
                },
                categoryOptions:[],
                labelOptions:[],


            }
        },
        methods: {
            init() {
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

                if (this.tabName=='1') {
                    this.articleForm.title = this.search
                }
            },

        },
        created() {
            this.init();
        },
    }
</script>

<style scoped lang="less">

</style>