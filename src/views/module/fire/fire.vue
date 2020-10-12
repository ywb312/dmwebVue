<template>
  <div class="page">
    <!-- 标题  -->
    <van-nav-bar
      :title="pageData.text"
      left-text="返回"
      fixed
      placeholder
      left-arrow
      @click-left="$router.back(-1)"
    />
    <!-- 主体 -->
    <div>
      <component :is="pageData.components" :pageData="pageData"></component>
    </div>
  </div>
</template>
<script>
export default {
  name: "fire",
  data() {
    return {
      // 页面配置
      pageData: "",
      // 切换组件页面配置数组
      page: [
        {
          text: "人员密集场所登记表",
          id: "staffdenseplace",
        },
        {
          text: "易燃易爆场所登记表",
          id: "dangerplace",
        },
        {
          text: "重要场所消防验收情况统计",
          id: "fireaccept",
        },
        {
          text: "消防安全检查登记表",
          id: "checkplanXf",
        },
        {
          text: "隐患整改反馈记录",
          id: "feedback",
        },
        {
          text: "消防器材设施台账",
          id: "firebook",
        },
        {
          text: "消防安全专业工作月报表",
          id: "firemonthreport",
        },
        {
          text: "建筑消防设施完好过程控制季报表",
          id: "fireseasonreport",
        },
      ],

    };
  },
  created() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      let id = this.$route.query.id;
      this.page.forEach((item) => {
        if (item.id == id) {
          if (!item.components) {
            item.components = item.id;
          }
          this.pageData = item;
        }
      });
    },
  },
  components: {
    // 人员密集场所登记表
    staffdenseplace: (resolve) =>
      require(["@/components/fire/views/StaffDensePlace"], resolve),
    // 易燃易爆场所登记表
    dangerplace: (resolve) =>
      require(["@/components/fire/views/DangerPlace"], resolve),
    // 重要场所消防验收情况统计
    fireaccept: (resolve) =>
      require(["@/components/fire/views/FireAccept"], resolve),
    // 消防安全检查登记表
    checkplanXf: (resolve) =>
      require(["@/components/fire/views/CheckPlanXf"], resolve),
    // 隐患整改反馈记录
    feedback: (resolve) => 
      require(["@/components/fire/views/FeedBack"], resolve),
    // 消防器材设施台账
    firebook: (resolve) =>
      require(["@/components/fire/views/FireBook"], resolve),
    // 消防安全专业工作月报表
    firemonthreport: (resolve) =>
      require(["@/components/fire/views/FireMonthReport"], resolve),
    // 建筑消防设施完好过程控制季报表
    fireseasonreport: (resolve) =>
      require(["@/components/fire/views/FireSeasonReport"], resolve),
  },
};
</script>
<style scoped src="@/assets/css/public.css"/>