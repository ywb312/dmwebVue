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
  name: "emergency",
  data() {
    return {
      // 页面配置
      pageData: "",
      page: [
        {
          text: "应急预案明细",
          id: "emergdetail",
        },
        {
          text: "应急预案备案记录",
          id: "emergrecord",
        },
        {
          text: "应急演练",
          id: "emergdrill",
        },
        {
          text: "应急物资",
          id: "emergmaterial",
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
          item.components = item.id;
          this.pageData = item;
        }
      });
    },
  },
  components: {
    // 应急预案明细
    emergdetail: (resolve) =>
      require(["@/components/emergency/views/EmergDetail.vue"], resolve),
    // 应急预案备案记录
    emergrecord: (resolve) =>
      require(["@/components/emergency/views/EmergRecord"], resolve),
    // 应急演练
    emergdrill: (resolve) =>
      require(["@/components/emergency/views/EmergDrill"], resolve),
    // 应急物资
    emergmaterial: (resolve) =>
      require(["@/components/emergency/views/EmergMaterial"], resolve),
  },
};
</script>
<style scoped src="@/assets/css/public.css"/>