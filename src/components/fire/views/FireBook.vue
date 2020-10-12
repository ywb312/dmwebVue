<template>
  <div>
    <SearchBox placeholder="请输入名称搜索" @callback="searchBack"></SearchBox>
    <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
      <div slot="views">
        <div
          class="wrapper"
          v-for="(item, index) in rendering"
          :key="index"
          @click="btnClick(item)"
        >
          <div class="main">
            <div>
              <p class="main_text">
                <span class="main_title">位置: </span>
                <span class="main_val">{{ item.place }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">名称:</span>
                <span class="main_val">{{ item.name }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">规格型号: </span>
                <span class="main_val">{{ item.specification }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">单位: </span>
                <span class="main_val">{{ item.unit }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">数量: </span>
                <span class="main_val">{{ item.amount }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">配备时间(年): </span>
                <span class="main_val">{{ item.equiptime }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">厂家: </span>
                <span class="main_val">{{ item.factory }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">备注: </span>
                <span class="main_val">{{ item.memo }}</span>
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
  name: "FireAccept",
  data() {
    return {
      // 渲染的数据
      rendering: [],
      postData: {
        url: "biz/operate/firebook/list.action",
        obj: {},
      },
    };
  },
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