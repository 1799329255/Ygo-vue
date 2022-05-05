<template>
    <div class="myMain">
        <div v-if="isload" class="block">
            <el-carousel trigger="click" height="300px">
                <el-carousel-item v-for="(item,index) in articles.list" :key="index">
                    <router-link :to="{name: 'Article',query:{article:JSON.stringify(item)}}">
                        <el-image style="width:100%" :src="item.pic" fit="cover"></el-image>
                    </router-link>
                </el-carousel-item>
            </el-carousel>
        </div>

        <wrapper></wrapper>
    </div>
</template>

<script>
    import Wrapper from './Wrapper.vue'
    export default {
        name: 'MyMain',
        data() {
            return {
                articles: null,
                isload: false,
            }
        },
        components: {
            Wrapper
        },
        methods: {
            init() {
                this.getRequest("/article/findArticleInfoPage", {
                    order: 'id',
                    pageNum: 1,
                    pageSize: 4
                }).then((res) => {

                    if (res) {
                        this.articles = res.data
                        this.isload = true

                    }

                })
            }
        },
        created() {
            this.init();
        },

    }
</script>

<style>

</style>