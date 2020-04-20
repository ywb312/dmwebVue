<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.companyName}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>相关方名称: {{item.companyName}}</p>
                        </div>
                        <div>
                            <p>业主单位: {{item.ownerUnit}}</p>
                        </div>
                        <div>
                            <p>业务主管部门: {{item.competentDept}}</p>
                        </div>
                        <div>
                            <p>属地监管单位: {{item.supervisionUnit}}</p>
                        </div>
                        <div>
                            <p>年月: {{item.yearMonth}}</p>
                        </div>
                        <div>
                            <p>人数: {{item.staCount}}</p>
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
    name: "StakeholderInfo",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/create/stakeholder/stakeholderInfo.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>