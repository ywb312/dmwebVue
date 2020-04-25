<template>
    <div>
        <SearchBox placeholder="请输入建议名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.companyName}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>主要责任人: {{item.legalPerson}}</p>
                        </div>
                        <div>
                            <p>单位地址: {{item.companyAddress}}</p>
                        </div>
                        <div>
                            <p>经济类型: {{item.companyType}}</p>
                        </div>
                        <div>
                            <p>许可范围: {{item.permission}}</p>
                        </div>
                        <div>
                            <p>业主单位: {{item.ownerUnit}}</p>
                        </div>
                        <div>
                            <p>属地监管单位: {{item.supervisionUnit}}</p>
                        </div>
                        <div>
                            <p>业务主管部门: {{item.competentDept}}</p>
                        </div>
                        <div>
                            <p>编号: {{item.socialCode}}</p>
                        </div>
                        <div>
                            <p>有效始期: {{item.startDate}}</p>
                        </div>
                        <div>
                            <p>有效止期: {{item.endDate}}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </ViewBox>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "Stakeholder",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/create/stakeholder/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.cleraData();
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>