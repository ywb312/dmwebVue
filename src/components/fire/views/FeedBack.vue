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
                <span class="main_title">单位:</span>
                <span class="main_val">{{ item.checkDept }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">检查日期:</span>
                <span class="main_val">{{ item.checkTime }}</span>
              </p>
            </div>
            <div>
              <p class="main_text">
                <span class="main_title">隐患部位:</span>
                <span class="main_val">{{ item.checkPark }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ViewBox>
    <!-- 操作面板 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
      close-on-click-action
    />
    <!-- 弹窗组件 -->
    <Popup :popshow="popshow" @close="popshow = false">
      <div slot="title" class="popupTitle">详情</div>
      <div slot="views" class="popup">
        <div>
          <p>记录编号: {{ selectData.fwlid }}</p>
        </div>
        <div>
          <p>单位: {{ selectData.checkDept }}</p>
        </div>
        <div>
          <p>日期: {{ selectData.startDate }}</p>
        </div>
        <div>
          <p>隐患部位: {{ selectData.checkPark }}</p>
        </div>
        <div>
          <p>检查日期: {{ selectData.checkTime }}</p>
        </div>
        <div>
          <p>存在隐患情况: {{ selectData.checkProblem }}</p>
        </div>
        <div>
          <p>整改落实情况: {{ selectData.zgOption }}</p>
        </div>
        <div>
          <p>单位验收意见: {{ selectData.dwysOption }}</p>
        </div>
        <div>
          <p>备注: {{ selectData.memo }}</p>
        </div>
        <div>
          <p>负责人: {{ selectData.fzMan }}</p>
        </div>
        <div>
          <p>填报人: {{ selectData.tbMan }}</p>
        </div>
      </div>
    </Popup>
  </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
  name: "FireAccept",
  data() {
    return {
      // 渲染的数据
      rendering: [],
      postData: {
        url: "biz/sc/feedback/list.action?bean.flag=3",
        obj: {},
      },
      show: false,
      popshow: false,
      actions: [{ name: "查看详情" }],
      selectData: {},
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
    btnClick(obj) {
      this.show = true;
      this.selectData = obj;
    },
    onSelect(item) {
      if (item.name == "查看详情") {
        this.popshow = true;
      }
    },
  },
  components: {
    SearchBox,
    ViewBox,
    Popup,
  },
};
</script>
<style scoped src="@/assets/css/public.css"/>