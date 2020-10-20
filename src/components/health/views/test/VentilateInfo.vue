<template>
    <div>
        <choice-dept @choiceCompany="getCompany"></choice-dept>
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
                            <p>单位名称: {{ item.companyName }}</p>
                        </div>
                        <div>
                            <p>单位负责人: {{ item.principal }}</p>
                        </div>
                        <div>
                            <p>检测人: {{ item.preparer }}</p>
                        </div>
                        <div>
                            <p>检测时间: {{ item.fillingDate }}</p>
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
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "VentilateInfo",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/ventilate/list.action",
                obj: {},
            },
            show: false,
            actions: [{ name: "检测结果" }],
            selectData: {},
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        }, // 选取矿业公司
        getCompany(v) {
            for (const key in v) {
                this.postData.obj[key] = v[key];
            }
            this.$refs.view.clearData();
        },
        btnClick(obj) {
            this.show = true;
            this.selectData = obj;
        },
        onSelect(item) {
            if (item.name == "检测结果") {
                // 向父组件传值 切换组件
                let componentConfig = {
                    text: "通风测尘检测结果",
                    components: "VentilateResult",
                    param: {
                        filters: this.selectData.venid,
                        tablesuffix: this.postData.obj["bean.tablesuffix"],
                    },
                };
                this.$emit("choiseComponent", componentConfig);
            }
        },
    },
    components: {
        ViewBox,
        Popup,
        choiceDept,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>