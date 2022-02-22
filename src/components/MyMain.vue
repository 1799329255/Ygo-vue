<template>
    <div class="myMain">
        <div v-if="isload" class="block">
            <el-carousel trigger="click" height="150px">
                <el-carousel-item v-for="(item,index) in articles.list" :key="index">
                    <el-image style="width:100%" :src="item.pic" fit="contain"></el-image>
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
                    order: 'update_time',
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