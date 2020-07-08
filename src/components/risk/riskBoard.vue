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
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+'.'+item.wname}}</h4>
                    </div>
                    <div class="main">
                        <div
                            class="noFlex"
                            v-for="(n,m) in item.child"
                            :key="m"
                            @click.stop="btnClick(n)"
                        >
                            <div>
                                <p>
                                    <span class="main_title bold">{{"("+(m+1)+")"}}</span>
                                    <span class="main_val bold">{{n.deptname}}</span>
                                </p>
                            </div>
                            <div>
                                <p>事故类型: {{n.knfsText}}</p>
                            </div>
                            <div>
                                <p>潜在后果: {{n.qzhgText}}</p>
                            </div>
                            <div>
                                <p>影响范围: {{n.yxfwText}}</p>
                            </div>
                            <div v-for="(key,val) in n.child" :key="val">
                                <p>
                                    <span class="main_title">{{key.gtypeText+":"}}</span>
                                    <span class="main_val">{{key.gname}}</span>
                                </p>
                            </div>
                            <div>
                                <p>责任人: {{n.zrr?n.zrr:""}}</p>
                            </div>
                            <div>
                                <p>环节或部位: {{n.part}}</p>
                            </div>
                            <div>
                                <p>有效期: {{n.validity}}</p>
                            </div>
                            <div>
                                <p>报告电话: {{n.reportphone}}</p>
                            </div>
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
            this.rendering = this.setRes(arr);
        },
        getComboList() {
            Promise.all([
                this.$common.comboList({ sourcename: "KNFS" }),
                this.$common.comboList({ sourcename: "YXFWEI" }),
                this.$common.comboList({ sourcename: "QZHG" }),
                this.$common.comboList({ sourcename: "GKCSLX" })
            ]).then(res => {
                this.knfs = res[0];
                this.yxfw = res[1];
                this.qzhg = res[2];
                this.gtype = res[3];
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
        // 设置返还参数
        setRes(arr) {
            let _self = this;
            let returnArr = [];
            function getItem(key, val, arr) {
                return arr.findIndex(item => item[key] == val);
            }
            arr.forEach((item, index, arr) => {
                _self.$common.code2Text(item, "knfs", _self.knfs);
                _self.$common.code2Text(item, "yxfw", _self.yxfw);
                _self.$common.code2Text(item, "qzhg", _self.qzhg);
                _self.$common.code2Text(item, "gtype", _self.gtype);
                let wnameIndex = getItem("wname", item.wname, returnArr);
                if (wnameIndex == -1) {
                    // 风险点不一致 向后新增
                    // 深拷贝
                    let obj = this.$common.deepClone(item);
                    // 加入到其危险源
                    obj.child = [this.$common.deepClone(item)];
                    // 加入到其管控措施
                    obj.child[0].child = [this.$common.deepClone(item)];
                    // 推入数组
                    returnArr.push(obj);
                } else if (wnameIndex >= 0) {
                    // 风险点一致 匹配危险源
                    let widArr = returnArr[wnameIndex].child;
                    let deptnameIndex = getItem(
                        "deptname",
                        item.deptname,
                        widArr
                    );
                    if (deptnameIndex >= 0) {
                        // 危险源一致 匹配危险源
                        if (!widArr[deptnameIndex].child) {
                            widArr[deptnameIndex].child = [];
                        }
                        widArr[deptnameIndex].child.push(item);
                    } else if (deptnameIndex == -1) {
                        // 危险源不一致 向后新增
                        let obj = this.$common.deepClone(item);
                        obj.child = [this.$common.deepClone(item)];
                        widArr.push(obj);
                    }
                }
            });
            return returnArr;
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