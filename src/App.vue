<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
  }

  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none
  }

  a {
    text-decoration: none;
  }

  .article_category {

    /*去掉el-tab-pane底部灰色线条*/
    .el-tabs__nav-wrap::after {
      height: 0;
    }

    /*去掉el-tab-pane切换时的蓝色下划线*/
    .el-tabs__active-bar {
      background: none;
    }

    .el-tabs__item {
      padding: 0 10px;
    }


  }

  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .el-upload:hover {
    border-color: #409EFF;
  }

  .cover .el-upload {
    width: 100%;
  }

  .write {
    .el-form-item__content {
      flex: 1;
    }
  }
</style>