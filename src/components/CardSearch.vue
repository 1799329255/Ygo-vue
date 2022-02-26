<template>
    <div class="cardSearch">
        <el-form :model="from" ref="from" :inline="true" label-width="90px">
            <el-form-item label="名字" v-if="shows.name">
                <el-input v-model="from.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型" v-if="shows.typeF">
                <el-select v-model="from.typeF" placeholder="请选择" clearable @clear="handleClear">
                    <el-option v-for="(item,index) in typeF_options" :key="index" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="限制" v-if="shows.ban">
                <el-select v-model="from.ban" placeholder="请选择" clearable>
                    <el-option v-for="(item,index) in ban_options" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签" v-if="shows.locale">
                <el-select v-model="locales" multiple default-first-option placeholder="请选择标签">
                    <el-option v-for="(item,index) in locale_options" :key="index" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="子类型" v-if="shows.typeC">
                <el-select v-model="typeCs" multiple default-first-option placeholder="请选择" v-show="from.typeF=='怪兽'">
                    <el-option v-for="(item,index) in typeC_options" :key="index" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="from.typeC" placeholder="请选择" clearable v-show="from.typeF!='怪兽'">
                    <el-option v-for="(item,index) in typeC_options" :key="index" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="星/阶" v-if="shows.level">
                <el-input v-model.number="from.level" autocomplete="off" placeholder="星/阶:0~13"></el-input>
            </el-form-item>
            <el-form-item label="属性" v-if="shows.attribute">
                <el-select v-model="from.attribute" placeholder="请选择" clearable>
                    <el-option v-for="(item,index) in attribute_options" :key="index" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="种族" v-if="shows.race">
                <el-select v-model="from.race" placeholder="请选择" clearable>
                    <el-option v-for="(item,index) in race_options" :key="index" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="攻击力" v-if="shows.atk">
                <el-input v-model="from.atk" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="防御力" v-if="shows.def">
                <el-input v-model="from.def" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="灵摆数" v-if="shows.pend">
                <el-input v-model.number="from.pend" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="连接数" v-if="shows.link">
                <el-input v-model.number="from.link" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="连接箭头" v-if="shows.linkArrow">
                <el-select v-model="linkArrows" multiple default-first-option placeholder="请选择">
                    <el-option v-for="(item,index) in linkArrow_options" :key="index" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="灵摆效果" v-if="shows.pendDesc">
                <el-input v-model="from.pendDesc" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="效果文本" v-if="shows.desc">
                <el-input v-model="from.desc" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="罕贵度" v-if="shows.rare">
                <el-select v-model="rares" multiple default-first-option placeholder="请选择">
                    <el-option v-for="(item,index) in rare_options" :key="index" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序" v-if="shows.order">
                <el-select v-model="from.order" placeholder="请选择" clearable>
                    <el-option v-for="(item,index) in order_options" :key="index" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitForm('form')">搜索</el-button>

    </div>
</template>

<script>
    export default {
        name: 'CardSearch',
        data() {
            return {
                shows: {
                    name: true,
                    typeF: true,
                    ban: true,
                    locale: true,
                    typeC: false,
                    level: false,
                    attribute: false,
                    race: false,
                    atk: false,
                    def: false,
                    pend: false,
                    link: false,
                    linkArrow: false,
                    pendDesc: false,
                    desc: true,
                    rare: true,
                    order: true,
                },
                from: {
                    name: '', //卡牌名字
                    password: '', //卡牌密码
                    ban: '', //禁止/限制/准限制
                    locale: '', //OCG ，TCG，MD，DL
                    typeF: '', //类型：怪兽/魔法/陷阱
                    typeC: '', //效果，融合，反击
                    pic: '', //图片
                    level: null, //星/阶：0~13
                    attribute: '', //属性：光、地、暗、水、炎、神、风
                    race: '', //种族
                    atk: '', //攻击力
                    def: '', //防御力
                    pend: null, //灵摆数：0~12
                    link: null, //连接数：1~6
                    linkArrow: '', //连接箭头：1~8
                    pendDesc: '', //灵摆效果
                    desc: '', //效果文本
                    rare: '', //罕贵度
                    href: '', //卡牌详细页面
                    order: 'id', //排序
                },
                locales: null, //OCG ，TCG，MD，DL数组
                typeCs: null, //怪兽子类型数组
                linkArrows: null, //连接箭头数组
                rares: null, //罕贵度数组

                typeF_options: [{
                    value: '怪兽',
                    label: '怪兽'
                }, {
                    value: '魔法',
                    label: '魔法'
                }, {
                    value: '陷阱',
                    label: '陷阱'
                }],

                ban_options: [{
                    value: '准限制',
                    label: '准限制'
                }, {
                    value: '限制',
                    label: '限制'
                }, {
                    value: '禁止',
                    label: '禁止'
                }],

                locale_options: [{
                    value: 'OCG',
                    label: 'OCG'
                }, {
                    value: 'TCG',
                    label: 'TCG'
                }, {
                    value: 'MD',
                    label: 'MD'
                }, {
                    value: 'DL',
                    label: 'DL'
                }],

                typeC_options: [],

                attribute_options: [{
                    value: '光',
                    label: '光'
                }, {
                    value: '暗',
                    label: '暗'
                }, {
                    value: '地',
                    label: '地'
                }, {
                    value: '水',
                    label: '水'
                }, {
                    value: '风',
                    label: '风'
                }, {
                    value: '火',
                    label: '火'
                }, {
                    value: '神',
                    label: '神'
                }],

                race_options: [{
                    value: '水',
                    label: '水'
                }, {
                    value: '兽',
                    label: '兽'
                }, {
                    value: '兽战士',
                    label: '兽战士'
                }, {
                    value: '创造神',
                    label: '创造神'
                }, {
                    value: '恐龙',
                    label: '恐龙'
                }, {
                    value: '幻神兽',
                    label: '幻神兽'
                }, {
                    value: '龙',
                    label: '龙'
                }, {
                    value: '天使',
                    label: '天使'
                }, {
                    value: '恶魔',
                    label: '恶魔'
                }, {
                    value: '鱼',
                    label: '鱼'
                }, {
                    value: '昆虫',
                    label: '昆虫'
                }, {
                    value: '机械',
                    label: '机械'
                }, {
                    value: '植物',
                    label: '植物'
                }, {
                    value: '念动力',
                    label: '念动力'
                }, {
                    value: '炎',
                    label: '炎'
                }, {
                    value: '爬虫类',
                    label: '爬虫类'
                }, {
                    value: '岩石',
                    label: '岩石'
                }, {
                    value: '海龙',
                    label: '海龙'
                }, {
                    value: '魔法师',
                    label: '魔法师'
                }, {
                    value: '雷',
                    label: '雷'
                }, {
                    value: '战士',
                    label: '战士'
                }, {
                    value: '鸟兽',
                    label: '鸟兽'
                }, {
                    value: '不死',
                    label: '不死'
                }, {
                    value: '幻龙',
                    label: '幻龙'
                }, {
                    value: '电子界',
                    label: '电子界'
                }],

                linkArrow_options: [{
                    value: '1',
                    label: '↖'
                }, {
                    value: '2',
                    label: '↑'
                }, {
                    value: '3',
                    label: '↗'
                }, {
                    value: '4',
                    label: '→'
                }, {
                    value: '5',
                    label: '↘'
                }, {
                    value: '6',
                    label: '↓'
                }, {
                    value: '7',
                    label: '↙'
                }, {
                    value: '8',
                    label: '←'
                }],

                rare_options: [{
                    value: 'N',
                    label: '平卡'
                }, {
                    value: 'R',
                    label: '银字'
                }, {
                    value: 'SR',
                    label: '面闪'
                }, {
                    value: 'UR',
                    label: '金闪'
                }, {
                    value: 'SER',
                    label: '银碎'
                }, {
                    value: 'UL',
                    label: '立体'
                }, {
                    value: 'HR',
                    label: '全息'
                }, {
                    value: 'P',
                    label: '平爆'
                }, {
                    value: 'GR',
                    label: '黄金闪'
                }, {
                    value: 'GSE',
                    label: '黄金碎'
                }, {
                    value: 'EXSE',
                    label: '额外银碎'
                }, {
                    value: 'CR',
                    label: '收藏家罕贵'
                }, {
                    value: 'M',
                    label: '千年罕贵'
                }, {
                    value: 'KC',
                    label: '海马公司罕贵'
                }, {
                    value: 'SE',
                    label: '红碎'
                }],

                order_options: [{
                    value: 'id',
                    label: '默认顺序'
                }, {
                    value: 'update_time DESC',
                    label: '从新到旧'
                }, {
                    value: 'level DESC',
                    label: '星级从高到低'
                }, {
                    value: 'level',
                    label: '星级从低到高'
                }, {
                    value: 'atk DESC',
                    label: '攻击力从大到小'
                }, {
                    value: 'atk',
                    label: '攻击力从小到大'
                }, {
                    value: 'def DESC',
                    label: '防御力从大到小'
                }, {
                    value: 'def',
                    label: '防御力从小到大'
                }],

            }
        },
        watch: {
            locales(newValue, oldValue) {
                this.from.locale = newValue.toString()
            },
            typeCs(newValue, oldValue) {
                this.from.typeC = newValue.toString()
            },
            linkArrows(newValue, oldValue) {
                this.from.linkArrow = newValue.toString()
            },
            rares(newValue, oldValue) {
                this.from.rare = newValue.toString()
            },
            'from.typeF'(newValue, oldValue) {
                this.from.typeC = ''
                this.typeCs = []

                if (newValue == '怪兽') {
                    this.shows = {
                        name: true,
                        typeF: true,
                        ban: true,
                        locale: true,
                        typeC: true,
                        level: true,
                        attribute: true,
                        race: true,
                        atk: true,
                        def: true,
                        pend: true,
                        link: true,
                        linkArrow: true,
                        pendDesc: true,
                        desc: true,
                        rare: true,
                        order: true,

                    }

                    this.typeC_options = [{
                        value: '通常',
                        label: '通常'
                    }, {
                        value: '效果',
                        label: '效果'
                    }, {
                        value: '仪式',
                        label: '仪式'
                    }, {
                        value: '融合',
                        label: '融合'
                    }, {
                        value: '同调',
                        label: '同调'
                    }, {
                        value: '超量',
                        label: '超量'
                    }, {
                        value: '卡通',
                        label: '卡通'
                    }, {
                        value: '同盟',
                        label: '同盟'
                    }, {
                        value: '灵魂',
                        label: '灵魂'
                    }, {
                        value: '调整',
                        label: '调整'
                    }, {
                        value: '二重',
                        label: '二重'
                    }, {
                        value: '灵摆',
                        label: '灵摆'
                    }, {
                        value: '反转',
                        label: '反转'
                    }, {
                        value: '连接',
                        label: '连接'
                    }, {
                        value: '特殊召唤',
                        label: '特殊召唤'
                    }]
                }
                if (newValue == '魔法') {
                    this.shows = {
                        name: true,
                        typeF: true,
                        ban: true,
                        locale: true,
                        typeC: true,
                        level: false,
                        attribute: false,
                        race: false,
                        atk: false,
                        def: false,
                        pend: false,
                        link: false,
                        linkArrow: false,
                        pendDesc: false,
                        desc: true,
                        rare: true,
                        order: true,
                    }

                    this.typeC_options = [{
                        value: '装备',
                        label: '装备'
                    }, {
                        value: '场地',
                        label: '场地'
                    }, {
                        value: '速攻',
                        label: '速攻'
                    }, {
                        value: '仪式',
                        label: '仪式'
                    }, {
                        value: '永续',
                        label: '永续'
                    }, {
                        value: '反击',
                        label: '反击'
                    }, {
                        value: '通常',
                        label: '通常'
                    }]
                }
                if (newValue == '陷阱') {
                    this.shows = {
                        name: true,
                        typeF: true,
                        ban: true,
                        locale: true,
                        typeC: true,
                        level: false,
                        attribute: false,
                        race: false,
                        atk: false,
                        def: false,
                        pend: false,
                        link: false,
                        linkArrow: false,
                        pendDesc: false,
                        desc: true,
                        rare: true,
                        order: true,
                    }

                    this.typeC_options = [{
                        value: '永续',
                        label: '永续'
                    }, {
                        value: '反击',
                        label: '反击'
                    }, {
                        value: '通常',
                        label: '通常'
                    }]
                }

            }
        },
        methods: {
            init() {

            },
            submitForm(formName) {
                this.$router.push({
                    name: 'Cards',
                    query: {
                        search: JSON.stringify(this.from)
                    }
                })
            },
            handleClear() {
                this.shows = {
                    name: true,
                    typeF: true,
                    ban: true,
                    locale: true,
                    typeC: false,
                    level: false,
                    attribute: false,
                    race: false,
                    atk: false,
                    def: false,
                    pend: false,
                    link: false,
                    linkArrow: false,
                    pendDesc: false,
                    desc: true,
                    rare: true,
                    order: true,
                }
            }
        },
        created() {
            this.init();
        },

    }
</script>

<style scoped lang="less">
    .cardSearch {}
</style>