<template>
  <div>
    <SearchBox placeholder="请输入应急预案名称搜索" @callback="searchBack"></SearchBox>
    <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
      <div slot="views">
        <div class="wrapper" v-for="(item, index) in rendering" :key="index">
          <div class="main">
            <div>
              <p class="main_text">
                <span class="main_title">单位名称: </span>
                <span class="main_val">{{ item.unitname }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">应急预案名称: </span>
                <span class="main_val">{{ item.yjyaname }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">制定日期: </span>
                <span class="main_val">{{ item.createDate }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">主管单位: </span>
                <span class="main_val">{{ item.zgunit }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">批准人: </span>
                <span class="main_val">{{ item.approver }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">修订日期: </span>
                <span class="main_val">{{ item.xddate }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ViewBox>
  </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
  name: "EmergDetail",
  data() {
    return {
      rendering: [],
      postData: {
        url: "biz/create/emergdetail/list.action",
        obj: {
          "bean.param": "",
        },
      },
      // 查找组件的显示
    };
  },
  created() {},
  // pageData父组件传来的配置项
  props: ["pageData"],
  methods: {
    getRendering(arr) {
      this.rendering = arr;
    },
    // 搜索框的回调
    searchBack(str) {
      this.postData.obj["bean.param"] = str;
      this.rendering = [];
      this.$refs.view.clearData();
    },
  },
  components: {
    SearchBox,
    ViewBox,
  },
};
</script>
<style scoped src="@/assets/css/public.css"/>