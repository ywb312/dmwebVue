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
                        <!-- <p style="min-width:40px">
                            <van-tag round type="primary">{{item.moduleid}}</van-tag>
                        </p>-->
                    </div>
                    <div class="main">
                        <div>
                            <p>日期: {{item.years}}年度{{item.quartersText}}</p>
                        </div>
                        <div>
                            <p>申请人姓名: {{item.appler_name}}</p>
                        </div>
                        <div>
                            <p>申请时间: {{item.apply_time}}</p>
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
    name: "SafetySignApply",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/tasksafemarkappmain/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            this.$common.comboList({ sourcename: "SGJD" }).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "quarters", res);
                });
                _self.rendering = arr;
            });
        },
        btnClick(obj) {
            this.$router.push({
                path: "/person/safetySignApplyDetail",
                query: {
                    filters: obj.form_id,
                    type: "1"
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