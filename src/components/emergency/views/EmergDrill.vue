<template>
  <div>
    <choice-dept @choiceCompany="getCompany"></choice-dept>
    <SearchBox
      placeholder="请输入演练预案名称搜索"
      @callback="searchBack"
    ></SearchBox>
    <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
      <div slot="views">
        <div class="wrapper" v-for="(item, index) in rendering" :key="index">
          <div class="main">
            <div>
              <p class="main_text">
                <span class="main_title">演练预案名称: </span>
                <span class="main_val">{{ item.yjyaname }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">演练时间: </span>
                <span class="main_val">{{ item.drilltime }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">组织单位: </span>
                <span class="main_val">{{ item.unitname }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">演练方式: </span>
                <span class="main_val">{{ item.drillmode }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">负责人: </span>
                <span class="main_val">{{ item.person }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">参与部门及人员: </span>
                <span class="main_val">{{ item.deptstaff }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ViewBox>
  </div>
</template>
<script>
import choiceDept from "@/components/pub/choiceDept";
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
  name: "EmergDrill",
  data() {
    return {
      rendering: [],
      postData: {
        url: "biz/create/emergdrill/list.action",
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
    // 选取矿业公司
    getCompany(v) {
      for (const key in v) {
        this.postData.obj[key] = v[key];
      }
      this.$refs.view.clearData();
    },
  },
  components: {
    SearchBox,
    ViewBox,
    choiceDept,
  },
};
</script>
<style scoped src="@/assets/css/public.css"/>