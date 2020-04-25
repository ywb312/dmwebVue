<template>
    <div>
        <SearchBox placeholder="请输入姓名搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>姓名: {{item.certificateName}}</p>
                        </div>
                        <div>
                            <p>性别: {{item.sexText}}</p>
                        </div>
                        <div>
                            <p>证件号: {{item.certificateIdCard}}</p>
                        </div>
                        <div>
                            <p>部门名称: {{item.deptName}}</p>
                        </div>
                        <div>
                            <p>作业类别: {{item.industry}}</p>
                        </div>
                        <div>
                            <p>初领日期: {{item.startDate}}</p>
                        </div>
                        <div>
                            <p>有效期至: {{item.endDate}}</p>
                        </div>
                        <div>
                            <p>复审日期: {{item.reviewDate}}</p>
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
    name: "FireCertificate",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/people/firecertificate/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.setSex(element, "certificateSex");
            });
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