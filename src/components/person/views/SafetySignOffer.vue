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
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            Promise.all([
                _self.$common.comboList({ sourcename: "SGJD" }),
                _self.$common.comboList({ sourcename: "SPZT" })
            ]).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "quarters", this.sgjdArr);
                    _self.$common.code2Text(element, "state", this.spztArr);
                    _self.$common.setSex(element);
                });
                _self.rendering = arr;
            });
        },
        btnClick(obj) {
            this.$router.push({
                path: "/person/safetySignApplyDetail",
                query: {
                    filters: obj.form_id,
                    type: "2"
                }
            });
        }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>