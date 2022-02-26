<template>
    <div class="hotCards" v-if="isload">
        <div class="title">热门卡牌</div>
        <div class="hotCard">
            <ul class="hotCardUL">
                <li v-for="(item,index) in hotCards.list" :key="index">
                    <el-image style="width:50px;" :src="item.pic" fit="contain"></el-image>
                    <div class="content">
                        <router-link :to="{name: 'Card',query:{card:JSON.stringify(item)}}">
                            {{item.name}}</router-link>
                        <div>
                            <ul>
                                <li>
                                    <el-link type="primary" style="font-size:1em;" @click="toCards({typeF:item.typeF})">
                                        {{item.typeF}}</el-link>
                                </li>
                                <li v-for="(type,index) in item.typeC.split(',')" :key="index">
                                    <el-link type="primary" style="font-size:1em;" @click="toCards({typeC:type})">
                                        {{type}}
                                    </el-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HotCards',
        data() {
            return {
                hotCards: {},
                isload: false,
            }
        },
        methods: {
            init() {
                this.getHotCards(1, 5)
            },
            getHotCards(pageNum, pageSize) {
                this.getRequest("/card/findCardInfoPage", {
                    order: 'view_num DESC',
                    pageNum: pageNum,
                    pageSize: pageSize,
                }).then((res) => {
                    if (res) {
                        this.hotCards = res.data
                        this.isload = true
                    }
                })
            },
            toCards(value) {
                this.$router.push({
                    name: 'Cards',
                    query: {
                        search: JSON.stringify(value)
                    }
                })
            }
        },
        created() {
            this.init();
        },
    }
</script>

<style scoped lang="less">
    .hotCards {
        .title {
            padding: 10px;
        }

        .hotCardUL {
            >li {
                display: flex;
                padding: 10px;

                .content {
                    flex: 1;
                    margin-left: 10px;

                    li {
                        display: inline;
                        margin-right: 5px;
                    }
                }
            }
        }
    }
</style>