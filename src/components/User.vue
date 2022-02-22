<template>
  <div class="user">

    <el-row :gutter="20">
      <el-col :span="6">
        <div class="left">

          <div class="left-top">
            <div class="img">
              <el-image style="width:100px;" :src="middleUser.pic" fit="contain"></el-image>
            </div>
            <div class="userName">{{middleUser.name}}</div>
          </div>

          <el-menu router>
            <el-menu-item index="/user/overView">
              <i class="el-icon-menu"></i>
              <span slot="title">概览</span>
            </el-menu-item>
            <el-menu-item index="/user/article">
              <i class="el-icon-menu"></i>
              <span slot="title">文章</span>
            </el-menu-item>
            <el-menu-item index="/user/comment">
              <i class="el-icon-menu"></i>
              <span slot="title">评论</span>
            </el-menu-item>
            <el-menu-item index="/user/follow">
              <i class="el-icon-menu"></i>
              <span slot="title">关注</span>
            </el-menu-item>
            <el-menu-item index="/user/fan">
              <i class="el-icon-document"></i>
              <span slot="title">粉丝</span>
            </el-menu-item>
            <el-menu-item index="/user/setting" v-if="!otherUser">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="main">
          <router-view></router-view>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'User',
    computed: {
      ...mapState(['user', 'otherUser']),
      middleUser() {
        return this.otherUser ? this.otherUser : this.user
      }
    },
    beforeDestroy() {
      if (this.otherUser) {
        this.$store.commit('setOtherUser', null)
      }
    },
  }
</script>

<style scoped lang="less">
  .left-top {
    display: flex;
    justify-content: flex-start;
    padding: 20px;

    .img {
      margin-right: 20px;
    }

    .userName {
      height: 100px;
      line-height: 100px;
    }
  }
</style>