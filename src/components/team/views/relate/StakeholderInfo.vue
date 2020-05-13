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
                            <p class="main_text">
                                <span class="main_title">相关方名称:</span>
                                <span class="main_val">{{item.companyName}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">业主单位:</span>
                                <span class="main_val">{{item.ownerUnit}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">业务主管部门:</span>
                                <span class="main_val">{{item.competentDept}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">属地监管单位:</span>
                                <span class="main_val">{{item.supervisionUnit}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">年月:</span>
                                <span class="main_val">{{item.yearMonth}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">人数:</span>
                                <span class="main_val">{{item.staCount}}</span>
                            </p>
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