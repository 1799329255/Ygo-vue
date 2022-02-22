<template>
  <div class="footer">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="footer-title">关于网站</div>
        <div class="footer-content">
          决斗链接中文网(又名游戏王决斗链接中文网/YGODL中文网)是由玩家建立的非官方中文网站，为广大游戏玩家提供决斗链接最新新闻资讯、热门卡组检索、新手必看教程、大神优质攻略等。
          这里有群最酷的玩家 , 正玩着世界上最棒的卡牌游戏！
        </div>
      </el-col>
      <el-col :span="6">
        <div class="footer-title">合作伙伴</div>
        <div class="footer-content">
          <img src="https://ygodl.com/wp-content/uploads/2020/09/top_logo_2061663.png" style="width: 80%" alt="" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="footer-title">支持我们</div>
        <div class="footer-content">
          <ul class="links-widget">
            <li>
              <a target="__blank" class="link-block" href="https://ygodl.com/donate"></a>
              <div class="links-icon">
                <img src="https://ygodl.com/wp-content/themes/b2/Assets/fontend/images/tools/youhui.png"
                  style="width: 15%" />
              </div>
              <div>
                <h2>捐助鼓励</h2>
                <p>帮助网站健康运行</p>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="footer-title">群组聚合</div>
        <div class="footer-content">
          <div>微信群：点击查看加入</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "MyFooter",
  };
</script>

<style scoped lang="less">
  .footer {
    .el-col {
      height: 250px;
    }
  }
</style>