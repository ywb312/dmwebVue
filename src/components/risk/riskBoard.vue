<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+'.'+item.wname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>事故类型: {{item.knfsText}}</p>
                        </div>
                        <div>
                            <p>潜在后果: {{item.qzhgText}}</p>
                        </div>
                        <div>
                            <p>影响范围: {{item.yxfwText}}</p>
                        </div>
                        <div>
                            <p>责任人: {{item.zrr?item.zrr:""}}</p>
                        </div>
                        <div>
                            <p>环节或部位: {{item.part}}</p>
                        </div>
                        <div>
                            <p>有效期: {{item.validity}}</p>
                        </div>
                        <div>
                            <p>报告电话: {{item.reportphone}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 组件框 -->
        <div>
            <board-modify
                :modShow="modShow"
                :cid="seletData.cid"
                @popupClose="modShow=false"
                @suc="clearData"
            ></board-modify>
        </div>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import ViewBox from "@/components/pub/ViewBox.vue";
import boardModify from "@/components/risk/board/boardModify";
export default {
    name: "riskBoard",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/risk/companyRisk/ggl.action",
                obj: {}
            },
            modShow: false,
            seletData: {}
        };
    },
    methods: {
        // 处理请求的数据
        getRendering(arr) {
            let _self = this;
            Promise.all([
                _self.$common.comboList({ sourcename: "KNFS" }),
                _self.$common.comboList({ sourcename: "YXFWEI" }),
                _self.$common.comboList({ sourcename: "QZHG" })
            ]).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "knfs", res[0]);
                    _self.$common.code2Text(element, "yxfw", res[1]);
                    _self.$common.code2Text(element, "qzhg", res[2]);
                });
                _self.rendering = arr;
            });
        },
        btnClick(obj) {
            this.seletData = obj;
            this.modShow = true;
        },
        // 清空数据 重新加载
        clearData() {
            this.$refs.view.cleraData();
        }
    },
    components: {
        ViewBox,
        boardModify
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>