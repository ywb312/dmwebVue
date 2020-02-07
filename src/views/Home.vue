<template>
  <div class="home">
    <!-- 标题  -->
    <mt-header :title=selected ></mt-header>
    <!-- 面版切换 -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="主页">
        <homepage></homepage>
      </mt-tab-container-item>
      <mt-tab-container-item id="工作台">
        <computerpage></computerpage>
      </mt-tab-container-item>
      <mt-tab-container-item id="我的">
        <mepage></mepage>
      </mt-tab-container-item>
    </mt-tab-container>
    <!-- 底部导航 -->
    <mt-tabbar v-model="selected">
      <mt-tab-item id="主页">
        <img slot="icon" src="../assets/home.png" />
        主页
      </mt-tab-item>
      <mt-tab-item id="工作台">
        <img slot="icon" src="../assets/computer.png" />
        工作台
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="../assets/me.png" />
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import homepage from '@/components/home/homePage'
import computerpage from '@/components/home/computerPage'
import mepage from '@/components/home/mePage'

export default {
  data() {
    return {
      selected: "主页",
    };
  },
  mounted() {},
  methods: {},
  components:{
    homepage,
    computerpage,
    mepage
  }
};
</script>
<style scoped>
.home{
  height: 100%;
}
.mint-tabbar {
  color: #999999;
  background-color: #565656;
}
.mint-tabbar > .mint-tab-item.is-selected {
  background-color: #2585cf;
  color: white;
}
.mint-header{
 background-color: #2585cf;
 height: 1.1rem;
 font-size: 22px;
}
</style>