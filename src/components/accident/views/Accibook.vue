<template>
    <div>
        <SearchBox
            placeholder="请输入事故名称搜索"
            @callback="searchBack"
        ></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item, index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{ index + 1 + "." + item.unitname }}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>事故日期: {{ item.acciDate }}</p>
                        </div>
                        <div>
                            <p>伤者姓名: {{ item.name }}</p>
                        </div>
                        <div>
                            <p>伤者性别: {{ item.sex }}</p>
                        </div>
                        <div>
                            <p>事故单位: {{ item.acciunit }}</p>
                        </div>
                        <div>
                            <p>事故类型: {{ item.accitypeText }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 弹窗组件 -->
        <Popup :popshow="popshow" @close="popshow = false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>单位名称: {{ selectData.unitname }}</p>
                </div>
                <div>
                    <p>事故日期: {{ selectData.acciDate }}</p>
                </div>
                <div>
                    <p>季度: {{ selectData.season }}</p>
                </div>
                <div>
                    <p>伤者姓名: {{ selectData.name }}</p>
                </div>
                <div>
                    <p>伤者性别: {{ selectData.sex }}</p>
                </div>
                <div>
                    <p>伤者年龄: {{ selectData.age }}</p>
                </div>
                <div>
                    <p>事故单位: {{ selectData.acciunit }}</p>
                </div>
                <div>
                    <p>区域单位: {{ selectData.quyunit }}</p>
                </div>
                <div>
                    <p>事故地点: {{ selectData.accisite }}</p>
                </div>
                <div>
                    <p>事故类型: {{ selectData.accitypeText }}</p>
                </div>
                <div>
                    <p>事故原因: {{ selectData.accireason }}</p>
                </div>
                <div>
                    <p>伤害程度: {{ selectData.harmlevelText }}</p>
                </div>
                <div>
                    <p>伤者属性: {{ selectData.profession }}</p>
                </div>
                <div>
                    <p>事故特性: {{ selectData.property }}</p>
                </div>
                <div>
                    <p>损日（日）: {{ selectData.sunday }}</p>
                </div>
                <div>
                    <p>直损（万）: {{ selectData.losemoney }}</p>
                </div>
                <div>
                    <p>事故情况: {{ selectData.accistatus }}</p>
                </div>
                <div>
                    <p>事故原因分析: {{ selectData.accianalyze }}</p>
                </div>
                <div>
                    <p>工艺设备改善要求: {{ selectData.gysbgsyq }}</p>
                </div>
                <div>
                    <p>管理改善要求: {{ selectData.glgsyq }}</p>
                </div>
                <div>
                    <p>相关标准及要求: {{ selectData.xgbzjyq }}</p>
                </div>
                <div>
                    <p>填报人: {{ selectData.tbperson }}</p>
                </div>
                <div>
                    <p>联系电话: {{ selectData.telephone }}</p>
                </div>
                <div>
                    <p>工艺分类: {{ selectData.gytype }}</p>
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
    name: "Accireportnew",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/accibook/list.action",
                obj: {
                    "bean.param": "",
                },
            },
            popshow: false,
            selectData: {},
        };
    },
    created() {},
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            Promise.all([
                _self.$common.comboList({ sourcename: "SGLB" }),
                _self.$common.comboList({ sourcename: "SGDJ" }),
            ]).then((res) => {
                arr.forEach((element) => {
                    _self.$common.code2Text(element, "accitype", res[0]);
                    _self.$common.code2Text(element, "harmlevel", res[1]);
                });
                _self.rendering = arr;
            });
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.clearData();
        },
        btnClick(obj) {
            this.selectData = obj;
            this.popshow = true;
        },
    },
    computed: {},
    components: {
        SearchBox,
        ViewBox,
        Popup,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>