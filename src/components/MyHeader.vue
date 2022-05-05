<template>
  <div class="header">

    <div class="banner">
      <el-row class="search" :gutter="20">
        <el-col :span="elspans[0]"><img src="http://127.0.0.1:9000/system/logo/logo.png" style="height: 50px;" />
        </el-col>
        <el-col :span="elspans[1]">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="elspans[2]">
          <el-input placeholder="请输入内容" v-model="searchStr" class="input-with-select" clearable>
            <el-select v-model="searchSelect" slot="prepend" placeholder="请选择">
              <el-option label="文章" value="1"></el-option>
              <el-option label="用户" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>

        <template v-if="isLogin">
          <el-col :span="elspans[3]">
            <el-popover placement="bottom-end" width="300" trigger="hover">
              <el-avatar slot="reference" size="large" :src="user.pic">
              </el-avatar>
              <div class="user-info-box">
                <div class="user-info-box-top">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <a href="javascript:;" @click="handleCommand">
                        <img :src="user.pic" style="width: 48px;" />
                      </a>
                    </el-col>
                    <el-col :span="7">
                      <a href="javascript:;" @click="handleCommand">
                        <h4>{{user.name}}</h4>
                      </a>
                    </el-col>
                    <el-col :span="7">
                      <div class="grid-content bg-purple"></div>
                    </el-col>
                    <el-col :span="4">
                      <a href="javascript:;" @click="loginOut">
                        <el-tooltip class="item" effect="dark" content="注销" placement="top-start">
                          <el-image style="width:25px;" src="http://127.0.0.1:9000/system/logout/logout.png"
                            fit="cover">
                          </el-image>
                        </el-tooltip>
                      </a>
                    </el-col>
                  </el-row>
                </div>

                <div class="user-info-box-count">
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

              </div>
            </el-popover>
          </el-col>
        </template>

        <template v-else>
          <el-col :span="elspans[3]">
            <router-link :to="{name: 'Login'}">
              <el-button>登录</el-button>
            </router-link>

          </el-col>
          <el-col :span="elspans[4]">
            <router-link :to="{name: 'Register'}">
              <el-button>注册</el-button>
            </router-link>

          </el-col>
        </template>
      </el-row>
    </div>

    <div class="menu">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="menuSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">官方新闻</el-menu-item>
        <el-menu-item index="3">规则</el-menu-item>
        <el-menu-item index="4">快速查询</el-menu-item>
        <el-menu-item index="5">禁卡表</el-menu-item>
        <el-menu-item index="6">游戏下载</el-menu-item>
      </el-menu>

      <template v-if="isLogin">
        <router-link :to="{name: 'Write'}">
          <el-button class="write">写文章</el-button>
        </router-link>
      </template>

    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import {
    Message
  } from 'element-ui'
  import {
    delCookie
  } from '../utils/cookie'
  export default {
    name: 'MyHeader',
    data() {
      return {
        searchStr: '',
        searchSelect: '1',
        activeIndex: '1',
        isLogin: true,
        elspans: [],
      }
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      init() {
        if (this.user == null) {
          this.isLogin = false
        }
        if (this.isLogin) {
          this.elspans = [4, 8, 10, 2, 0]
        } else {
          this.elspans = [3, 8, 9, 1.5, 1.5]
        }
      },
      loginOut() {
        window.sessionStorage.removeItem('tokenStr')
        delCookie('tokenStr')
        this.$store.commit('setUser', null)
        Message.success({
          message: '注销成功'
        })
        this.$router.replace("/login")
      },
      handleCommand() {
        this.$store.commit('setOtherUser', null)
        if (this.$route.name !== 'User' && this.$route.name !== 'userOverView') {
          this.$router.push({
            name: 'User'
          })
        }
      },
      search() {
        if (this.searchSelect == '1') {
          this.$router.push({
            name: 'Search',
            query: {
              search: JSON.stringify({
                title: this.searchStr
              }),
              tabName: this.searchSelect
            }
          })
        }
        if (this.searchSelect == '2') {
          this.$router.push({
            name: 'Search',
            query: {
              search: JSON.stringify({
                name: this.searchStr
              }),
              tabName: this.searchSelect
            }
          })
        }
      },
      menuSelect(index) {
        switch (index) {
          case '1':
            this.$router.push('/')
            break;
          case '2':
            this.$router.push({
              name: 'Search',
              query: {
                search: JSON.stringify({
                  categoryId: 1
                }),
                tabName: '1'
              }
            })
            break;
          case '3':
            this.$router.push({
              name: 'Search',
              query: {
                search: JSON.stringify({
                  categoryId: 7
                }),
                tabName: '1'
              }
            })
            break;
          case '4':
            this.$router.push('/cardSearch')
            break;
          case '5':
            this.$router.push({
              name: 'Search',
              query: {
                search: JSON.stringify({
                  categoryId: 4
                }),
                tabName: '1'
              }
            })
            break;
          case '6':
            this.$router.push({
              name: 'Search',
              query: {
                search: JSON.stringify({
                  categoryId: 8
                }),
                tabName: '1'
              }
            })
            break;
          default:
            break;
        }
      }

    },
    created() {
      this.init();
    },
  }
</script>

<style scoped lang="less">
  .banner {
    width: 100%;

  }

  .search {
    padding: 15px 0;
    height: 100%;

    .el-col {
      height: 40px;
      text-align: center;

      .el-select {
        width: 90px;
      }
    }
  }

  .user-info-box-top {
    .el-col {
      height: 48px;
    }
  }

  .user-info-box-count {
    margin-top: 15px;
    text-align: center;

    p {
      height: 30px;
    }
  }

  .menu {
    position: relative;

    .write {
      position: absolute;
      bottom: 10px;
      left: 92%;
    }
  }
</style>