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
                        <h4>{{index+1+'.'+item.deptname}}</h4>
                        <p style="min-width:40px">
                            <van-tag size="large" round type="primary">{{item.stateText}}</van-tag>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <span>提交时间: {{item.createdate}}</span>
                        </div>
                        <div>
                            <span>审核时间: {{item.auditdate}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "audit",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/risk/audit/list.action",
                obj: {}
            },
            stateArr: [
                {
                    text: "未审核",
                    id: "SHZT001"
                },
                {
                    text: "审核通过",
                    id: "SHZT002"
                },
                {
                    text: "审核未通过",
                    id: "SHZT003"
                },
                {
                    text: "待审核",
                    id: "SHZT004"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    created() {
        if (window.localStorage["roleLevel"] == "4") {
            this.postData.obj["bean.type"] = "SH002";
        } else {
            this.postData.obj["bean.type"] = "SH001";
        }
    },
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "state", this.stateArr);
            });
            this.rendering = arr;
        },
        // 每项按钮点击事件
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            //判断是安全环保部
            if (true) {
                this.$router.push({
                    path: "/risk/auditDetailListAn",
                    query: {
                        auditid: obj.auditid,
                        deptid: obj.deptid
                    }
                });
            } else {
                this.$router.push({
                    path: "/risk/auditDetailList",
                    query: {
                        auditid: obj.auditid
                    }
                });
            }
        }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>