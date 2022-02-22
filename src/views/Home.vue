<template>
  <div class="home">
    <el-container>
      <el-header>
        <my-header></my-header>
      </el-header>
      <el-main>

        <router-view></router-view>

      </el-main>

      <el-footer>
        <my-footer></my-footer>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
  import MyFooter from '../components/MyFooter.vue'
  import MyHeader from '../components/MyHeader.vue'
  import MyMain from '../components/MyMain.vue'
  import User from '../components/User.vue'

  export default {
    name: 'Home',
    components: {
      MyHeader,
      MyFooter,
        User,
        MyMain
    },
    data() {
      return {
        isUser: true
      }
    },
    mounted () {
      //this.$router.push({ name: 'Main'});
    },

  }
</script>

<style scoped lang="less">
  .el-container {
    margin: 0 100px;
  }

  .el-header,.el-main, .el-footer {
    height: 100% !important;
  }

  .block {
    background-color: aquamarine;
  }
  
</style>