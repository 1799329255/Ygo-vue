<template>
    <div class="cards">
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="card" v-if="isload">
                    <ul class="cardUL">
                        <li v-for="(item,index) in cards.list" :key="index">
                            <el-image style="width:90px;" :src="item.pic" fit="contain"></el-image>
                            <div class="content">
                                <div class="top">
                                    <div>
                                        <router-link :to="{name: 'Card',query:{card:JSON.stringify(item)}}">
                                            {{item.name}}</router-link>
                                    </div>
                                    <div>
                                        <ul>
                                            <li>
                                                <el-link type="primary" style="font-size:1em;"
                                                    @click="toCards({typeF:item.typeF})">
                                                    {{item.typeF}}</el-link>
                                            </li>
                                            <li v-for="(type,index) in item.typeC.split(',')" :key="index">
                                                <el-link type="primary" style="font-size:1em;"
                                                    @click="toCards({typeC:type})">{{type}}
                                                </el-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="main" v-if="item.typeF==='怪兽'">
                                    <ul>
                                        <li>
                                            <el-link type="primary" style="font-size:1em;position: relative;bottom:1.5px;"
                                                @click="toCards({level:item.level})">
                                                {{item.level}}</el-link>星/阶
                                        </li>
                                        <li>AKT:<el-link type="primary" style="font-size:1em;position: relative;bottom:1.5px;"
                                                @click="toCards({atk:item.atk})">
                                                {{item.atk}}</el-link>
                                        </li>
                                        <li>DEF:<el-link type="primary" style="font-size:1em;position: relative;bottom:1.5px;"
                                                @click="toCards({def:item.def})">
                                                {{item.def}}</el-link>
                                        </li>
                                        <li>种族:<el-link type="primary" style="font-size:1em;position: relative;bottom:1.5px;"
                                                @click="toCards({race:item.race})">
                                                {{item.race}}</el-link>
                                        </li>
                                        <li>属性:<el-link type="primary" style="font-size:1em;position: relative;bottom:1.5px;"
                                                @click="toCards({attribute:item.attribute})">
                                                {{item.attribute}}</el-link>
                                        </li>
                                    </ul>
                                </div>
                                <div class="bottom">
                                    <div class="pendDesc" v-if="item.typeF==='怪兽'">
                                        灵摆效果:{{item.pendDesc?item.pendDesc:'无'}}</div>
                                    <div class="desc">{{item.desc}}</div>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <el-pagination background layout="prev, pager, next" :page-size="cards.pageSize"
                        :total="cards.total" @current-change="handleCurrentChange" @prev-click="handlePrevClick"
                        @next-click="handleNextClick">
                    </el-pagination>
                </div>
                <div v-else>
                    <el-empty description="暂无数据"></el-empty>
                </div>
            </el-col>
            <el-col :span="6">
                <hot-cards></hot-cards>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import HotCards from './card/HotCards.vue'
    export default {
        components: {
            HotCards
        },
        name: 'Cards',
        data() {
            return {
                cards: {},
                isload: false,
            }
        },
        computed: {
            card() {
                return this.$route.query.search ? JSON.parse(this.$route.query.search) : {}
            }
        },
        watch: {
            '$route.query.search'(newValue, oldValue) {
                this.getCards(1, 5)
            }
        },
        methods: {
            init() {
                this.getCards(1, 5)
            },
            getCards(pageNum, pageSize) {
                this.card.pageNum = pageNum
                this.card.pageSize = pageSize

                this.getRequest("/card/findCardInfoPage", this.card).then((res) => {
                    if (res) {
                        this.cards = res.data
                        this.isload = this.cards.list.length>0
                    }
                })
            },

            handleCurrentChange(pageNum) {
                this.getCards(pageNum, 5)
            },
            handlePrevClick() {
                if (this.users.hasPreviousPage) {
                    this.getCards(this.cards.prePage, 5)
                }

            },
            handleNextClick() {
                if (this.users.hasNextPage) {
                    this.getCards(this.cards.nextPage, 5)
                }

            },
            toCards(value) {
                // this.$route.query.search = value
                // value.pageNum = 1
                // value.pageSize = 5

                // this.getRequest("/card/findCardInfoPage", value).then((res) => {
                //     if (res) {
                //         this.cards = res.data
                //         this.isload = true
                //     }
                // })
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
    .cards {

        .card {
            .cardUL {
                >li {
                    display: flex;
                    padding: 10px;

                    .content {
                        flex: 1;
                        margin-left: 10px;

                        .top {
                            display: flex;
                            justify-content: space-between;

                            li {
                                display: inline;
                                margin-right: 10px;
                            }
                        }

                        .main {
                            li {
                                display: inline;
                                margin-right: 10px;
                            }
                        }
                    }
                }
            }
        }

    }
</style>