<template>
    <div class="search">
        <el-tabs type="border-card" v-model="tabName">
            <el-tab-pane label="文章" name="1">
                <article-search :search="tabName=='1'?search:null"></article-search>
            </el-tab-pane>
            <el-tab-pane label="用户" name="2">
                <user-search :search="tabName=='2'?search:null"></user-search>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import ArticleSearch from './search/ArticleSearch'
    import UserSearch from './search/UserSearch.vue'
    export default {
        components: {
            ArticleSearch,
            UserSearch
        },
        name: 'Search',
        data() {
            return {
                tabName: this.$route.query.tabName ? this.$route.query.tabName : '1',
                search: this.$route.query.search ? this.$route.query.search : '',
            }
        },
        watch: {
            '$route.query.tabName'(newValue, oldValue) {
                this.tabName = newValue
            },
            '$route.query.search'(newValue, oldValue) {
                this.search = newValue
            },
        },
        methods: {
            init() {

            },
        },
        created() {
            this.init();
        },
    }
</script>

<style scoped lang="less">

</style>