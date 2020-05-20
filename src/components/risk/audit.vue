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
            }
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
            let _self = this;
            this.$common.comboList({ sourcename: "SHZT" }).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "state", res);
                });
                _self.rendering = arr;
            });
        },
        // 每项按钮点击事件
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            //判断是安全环保部
            if (window.localStorage.roleLevel == 4) {
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
                        auditid: obj.auditid,
                        deptid: obj.deptid
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