<template>
    <div>
        <choice-dept @choiceCompany="getCompany"></choice-dept>
        <SearchBox
            placeholder="请输入检测人搜索"
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
                    <div class="main">
                        <div>
                            <p>仪器型号: {{ item.instrument }}</p>
                        </div>
                        <div>
                            <p>仪器编号: {{ item.instruid }}</p>
                        </div>
                        <div>
                            <p>采样点: {{ item.location }}</p>
                        </div>
                        <div>
                            <p>水样: {{ item.exampleText }}</p>
                        </div>
                        <div>
                            <p>检测人: {{ item.mpeople }}</p>
                        </div>
                        <div>
                            <p>检测时间: {{ item.mtime }}</p>
                        </div>
                        <div>
                            <p>提交状态: {{ item.issubmit }}</p>
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
    </div>
</template>
<script>
import choiceDept from "@/components/pub/choiceDept";
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "WaterInfo",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/waterinfo/list.action",
                obj: {},
            },
            show: false,
            actions: [{ name: "水质检测结果" }],
            selectData: {},
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            this.$common.comboList({ sourcename: "SYLX" }).then((res) => {
                arr.forEach((element) => {
                    _self.$common.code2Text(element, "example", res);
                });
                _self.rendering = arr;
            });
        }, // 选取矿业公司
        getCompany(v) {
            for (const key in v) {
                this.postData.obj[key] = v[key];
            }
            this.$refs.view.clearData();
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
            if (item.name == "水质检测结果") {
                // 向父组件传值 切换组件
                let componentConfig = {
                    text: "水质检测结果",
                    components: "WaterResult",
                    param: {
                        filters: this.selectData.waterid,
                        tablesuffix: this.postData.obj["bean.tablesuffix"],
                    },
                };
                this.$emit("choiseComponent", componentConfig);
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