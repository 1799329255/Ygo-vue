<template>
    <div class="card" v-if="card">
        <el-row :gutter="20">
            <el-col :span="18" class="cardEL">
                <div class="detail">
                    <el-row :gutter="20">
                        <el-col :span="4" style="background: #ccc;">名字</el-col>
                        <el-col :span="20">{{card.name}}</el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="4" style="background: #ccc;">密码</el-col>
                        <el-col :span="20">{{card.password}}</el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="4" style="background: #ccc;">类型</el-col>
                        <el-col :span="20">{{card.typeF}}</el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="4" style="background: #ccc;">子类型</el-col>
                        <el-col :span="20">{{card.typeC}}</el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="4" style="background: #ccc;">限制</el-col>
                        <el-col :span="20">{{card.ban?card.ban:'无'}}</el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="4" style="background: #ccc;">标签</el-col>
                        <el-col :span="20">{{card.locale}}</el-col>
                    </el-row>
                    <template v-if="card.typeF==='怪兽'">
                        <el-row :gutter="20" v-if="!card.linkArrow">
                            <el-col :span="4" style="background: #ccc;">种族</el-col>
                            <el-col :span="4">{{card.race}}</el-col>
                            <el-col :span="4" style="background: #ccc;">属性</el-col>
                            <el-col :span="4">{{card.attribute}}</el-col>
                            <el-col :span="4" style="background: #ccc;">星/阶</el-col>
                            <el-col :span="4">{{card.level}}</el-col>
                        </el-row>
                        <el-row :gutter="20" v-if="!card.linkArrow">
                            <el-col :span="4" style="background: #ccc;">攻击力</el-col>
                            <el-col :span="8">{{card.atk}}</el-col>
                            <el-col :span="4" style="background: #ccc;">防御力</el-col>
                            <el-col :span="8">{{card.def}}</el-col>
                        </el-row>
                        <el-row :gutter="20" v-if="card.linkArrow">
                            <el-col :span="4" style="background: #ccc;">种族</el-col>
                            <el-col :span="8">{{card.race}}</el-col>
                            <el-col :span="4" style="background: #ccc;">属性</el-col>
                            <el-col :span="8">{{card.attribute}}</el-col>
                        </el-row>
                        <el-row :gutter="20" v-if="card.linkArrow">
                            <el-col :span="4" style="background: #ccc;">攻击力</el-col>
                            <el-col :span="8">{{card.atk}}</el-col>
                            <el-col :span="4" style="background: #ccc;">连接数</el-col>
                            <el-col :span="8">{{card.link}}</el-col>
                        </el-row>
                    </template>
                    <el-row :gutter="20">
                        <el-col :span="4" style="background: #ccc;">罕贵度</el-col>
                        <el-col :span="20">{{card.rare}}</el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="4" style="background: #ccc;">卡包</el-col>
                        <el-col :span="20">{{packageNames.length>0?packageNames.toString():'无'}}</el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24" style="background: #ccc;">效果</el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24" style="height: 100%; padding: 10px;">
                            <div style="line-height: 1.3em; word-wrap:break-word;">
                                灵摆效果：{{card.pendDesc?card.pendDesc:'无'}}
                            </div>
                            <div style="line-height: 1.3em; word-wrap:break-word;">效果文本：{{card.desc}}</div>
                        </el-col>
                    </el-row>

                    <div class="img">
                        <el-image style="width:120px;" :src="card.pic" fit="contain">
                        </el-image>
                    </div>
                    <div class="linkMark" v-if="card.linkArrow">
                        <i :class="item" v-for="(item,index) in showLinks" :key="index"></i>
                    </div>
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
        name: 'Card',
        data() {
            return {
                showLinks: [
                    'mark mark-linkmarker_1_off',
                    'mark mark-linkmarker_2_off',
                    'mark mark-linkmarker_3_off',
                    'mark mark-linkmarker_4_off',
                    'mark mark-linkmarker_5_off',
                    'mark mark-linkmarker_6_off',
                    'mark mark-linkmarker_7_off',
                    'mark mark-linkmarker_8_off',
                ]
            }
        },
        computed: {
            card() {
                return this.$route.query.card ? JSON.parse(this.$route.query.card) : null
            },
            packageNames() {
                let list = []
                if (this.card.packages) {
                    this.card.packages.forEach(item => {
                        list.push(item.name)
                    })
                }
                return list
            }
        },
        methods: {
            init() {
                this.setlinkMark()
            },
            setlinkMark() {
                if (this.card.linkArrow) {
                    this.card.linkArrow.split(',').forEach(link => {
                        this.showLinks[link - 1] = 'mark mark-linkmarker_' + link + '_on'
                    })
                }

            }
        },
        created() {
            this.init();
        },
    }
</script>

<style scoped lang="less">
    .card {
        .cardEL {
            border-top: 1px solid #909399;
            border-left: 1px solid #909399;
            border-right: 1px solid #909399;
        }

        .detail {
            position: relative;

            .el-row {

                border-bottom: 1px solid #909399;

                .el-col {
                    height: 40px;
                    line-height: 40px;
                }


            }

            .img {
                position: absolute;
                top: 0;
                right: -10px;
                padding: 10px 10px;
                background-color: #fff;
            }
        }

        .linkMark {
            position: absolute;
            top: 250px;
            right: 25px;
            padding-right: 70px;
            padding-bottom: 70px;
            background-color: #fff;

            .mark {
                position: absolute;
                background-repeat: no-repeat;
                display: block;
                background-image: url('http://127.0.0.1:9000/system/linkmarker/linkmarker.png');
            }

            .mark-linkmarker_1_off {
                width: 20px;
                height: 20px;
                top: 2px;
                left: 2px;
                background-position: -65px -75px;
            }

            .mark-linkmarker_1_on {
                width: 20px;
                height: 20px;
                top: 2px;
                left: 2px;
                background-position: -95px -75px;
            }

            .mark-linkmarker_2_off {
                width: 30px;
                height: 20px;
                top: 2px;
                left: 20px;
                background-position: -65px -105px;
            }

            .mark-linkmarker_2_on {
                width: 30px;
                height: 20px;
                top: 2px;
                left: 20px;
                background-position: -135px -5px;
            }

            .mark-linkmarker_3_off {
                width: 20px;
                height: 20px;
                top: 2px;
                left: 48px;
                background-position: -135px -35px;
            }

            .mark-linkmarker_3_on {
                width: 20px;
                height: 20px;
                top: 2px;
                left: 48px;
                background-position: -135px -65px;
            }

            .mark-linkmarker_4_off {
                width: 20px;
                height: 30px;
                top: 20px;
                left: 48px;
                background-position: -5px -75px;
            }

            .mark-linkmarker_4_on {
                width: 20px;
                height: 30px;
                top: 20px;
                left: 48px;
                background-position: -35px -75px;
            }

            .mark-linkmarker_5_off {
                width: 20px;
                height: 20px;
                top: 48px;
                left: 48px;
                background-position: -105px -5px;
            }

            .mark-linkmarker_5_on {
                width: 20px;
                height: 20px;
                top: 48px;
                left: 48px;
                background-position: -45px -35px;
            }

            .mark-linkmarker_6_off {
                width: 30px;
                height: 20px;
                top: 48px;
                left: 20px;
                background-position: -65px -5px;
            }

            .mark-linkmarker_6_on {
                width: 30px;
                height: 20px;
                top: 48px;
                left: 20px;
                background-position: -5px -35px;
            }

            .mark-linkmarker_7_off {
                width: 20px;
                height: 20px;
                top: 48px;
                left: 0;
                background-position: -5px -5px;
            }

            .mark-linkmarker_7_on {
                width: 20px;
                height: 20px;
                top: 48px;
                left: 0;
                background-position: -35px -5px;
            }

            .mark-linkmarker_8_off {
                width: 20px;
                height: 30px;
                top: 20px;
                left: 0;
                background-position: -75px -35px;
            }

            .mark-linkmarker_8_on {
                width: 20px;
                height: 30px;
                top: 20px;
                left: 0;
                background-position: -105px -35px;
            }


        }




    }
</style>