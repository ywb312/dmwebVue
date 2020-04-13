<template>
    <div>
        <SearchBox placeholder="请输入采空区名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.pname}}</h4>
                        <p>
                            <mt-badge size="small">{{item.nums=="0"?"未评估":"已评估"}}</mt-badge>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <p>采矿方法: {{item.miningtypeText}}</p>
                        </div>
                        <div>
                            <p>责任单位: {{item.dutyorg}}</p>
                        </div>
                        <div>
                            <p>评估时间: {{item.lastcreatetime}}</p>
                        </div>
                        <div>
                            <p>评估次数: {{item.nums}}</p>
                        </div>
                        <div>
                            <p>登记人: {{item.createman}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="tip">
                <van-divider>没有更多数据了</van-divider>
            </div>
        </ViewBox>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "TechonlogyRoofGrading",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/taskminingprojectinfo/list.action",
                obj: {
                    "bean.param": ""
                }
            },
            // dqztArr: [
            //     { id: "DQZT001", text: "采矿中" },
            //     { id: "DQZT002", text: "充填中" },
            //     { id: "DQZT003", text: "充填完毕" }
            // ],
            ckffArr: [
                { id: "CKFF005", text: "浅孔留矿法" },
                { id: "CKFF006", text: "中深孔落矿空场填充法" },
                { id: "CKFF007", text: "上下水平分层充填" },
                { id: "CKFF008", text: "阶段充填法" },
                { id: "CKFF009", text: "盘区机械化" }
            ]
        };
    },
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                // this.$common.code2Text(element, "crruentstatus", this.dqztArr);
                this.$common.code2Text(element, "miningtype", this.ckffArr);
            });
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.cleraData();
        },
        btnClick(obj) {}
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>