<template>
    <div>
        <SearchBox placeholder="请输入供电线路名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.cpname}}</h4>
                        <p style=" min-width:85px;">
                            <van-tag round type="primary">{{item.checktype}}</van-tag>
                            <van-tag round type="primary">{{item.planstatus}}</van-tag>
                        </p>
                    </div>
                    <div class="main">
                        <div v-if="item.tbr">
                            <span>检查人: {{item.tbr}} | 作业地点: {{item.zydd}}</span>
                        </div>
                        <div v-if="item.checkend">
                            <span>计划执行时间: {{item.checkend}}</span>
                        </div>
                        <div>
                            <span>检查截止时间: {{item.checkdeadline}}</span>
                            <span>{{item.planfrom}}</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </ViewBox>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "TechonlogyPowerMaintain",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/sc/checkplan/getChildPlanRecordpower.action",
                obj: {
                    "bean.param": ""
                }
            }
        };
    },
    created() {},
    methods: {
        getRendering(v) {
            this.rendering = v;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.clearData();
        },
        // 点击某一项 将数据commit到vuex 跳转页面
        btnClick(obj) {
            if (!obj.tbr) return;
            this.$store.commit("getSelectData", obj);
            this.$router.push({
                path: "/plan/planDetail"
            });
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>