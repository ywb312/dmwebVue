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
                        <h4>{{index+1+"."+item.org_name}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>日期: {{item.years}}年度{{item.quartersText}}</p>
                        </div>
                        <div>
                            <p>审批状态: {{item.stateText}}</p>
                        </div>
                        <div>
                            <p>提交状态: {{item.edit_status}}</p>
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
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "SafetySignOffer",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url:
                    "/biz/operate/tasksafemarkappmain/list.action?filters=" +
                    "and state='SPZT002'",
                obj: {}
            },
            sgjdArr: [
                {
                    text: "第一季度",
                    id: "SGJD001"
                },
                {
                    text: "第二季度",
                    id: "SGJD002"
                },
                {
                    text: "第三季度",
                    id: "SGJD003"
                },
                {
                    text: "第四季度",
                    id: "SGJD004"
                }
            ],
            spztArr: [
                {
                    id: "SPZT001",
                    text: "审批中"
                },
                {
                    id: "SPZT002",
                    text: "审批通过"
                },
                {
                    id: "SPZT003",
                    text: "审批不通过"
                },
                {
                    id: "SPZT004",
                    text: "未审批"
                },
                {
                    id: "SPZT005",
                    text: "未提交"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "quarters", this.sgjdArr);
                this.$common.code2Text(element, "state", this.spztArr);
            });
            this.rendering = arr;
        },
        btnClick(obj) {}
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>