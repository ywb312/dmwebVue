<template>
    <div>
        <van-sticky :offset-top="$common.getOffset()">
            <tree
                title="查询单位"
                ref="treeChild"
                placeholder="请选择单位"
                @selectMsg="getCompany"
                :childId="deptID"
            ></tree>
        </van-sticky>
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
import tree from "@/components/pub/tree";
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
            seletData: {},
            deptID: window.localStorage.deptid,
            knfs: "",
            yxfw: "",
            qzhg: ""
        };
    },
    created() {
        this.getComboList();
    },
    methods: {
        // 处理请求的数据
        getRendering(arr) {
            let _self = this;
            if (_self.knfs != "") {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "knfs", _self.knfs);
                    _self.$common.code2Text(element, "yxfw", _self.yxfw);
                    _self.$common.code2Text(element, "qzhg", _self.qzhg);
                });
            }
            _self.rendering = arr;
        },
        getComboList() {
            Promise.all([
                this.$common.comboList({ sourcename: "KNFS" }),
                this.$common.comboList({ sourcename: "YXFWEI" }),
                this.$common.comboList({ sourcename: "QZHG" })
            ]).then(res => {
                this.knfs = res[0];
                this.yxfw = res[1];
                this.qzhg = res[2];
            });
        },
        btnClick(obj) {
            this.seletData = obj;
            this.modShow = true;
        },
        getCompany(v) {
            this.postData.obj["bean.param"] = v.id;
            this.clearData();
        },
        // 清空数据 重新加载
        clearData() {
            this.$refs.view.clearData();
        }
    },
    components: {
        ViewBox,
        boardModify,
        tree
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>