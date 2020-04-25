<template>
    <div>
        <SearchBox placeholder="请输入姓名搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>姓名: {{item.peopleName}}</p>
                        </div>
                        <div>
                            <p>性别: {{item.sexText}}</p>
                        </div>
                        <div>
                            <p>出生日期:{{item.birthday}}</p>
                        </div>
                        <div>
                            <p>身份证号:{{item.idcard}}</p>
                        </div>
                        <div>
                            <p>职务:{{item.position}}</p>
                        </div>
                        <div>
                            <p>行业类别:{{item.industry}}</p>
                        </div>
                        <div>
                            <p>初领日期:{{item.startDate}}</p>
                        </div>
                        <div>
                            <p>有效期至:{{item.endDate}}</p>
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
    name: "SpecialPeople",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    created() {
        // 主要负责人证照
        if (this.pageData.id == "peoplephoto") {
            this.postData.url = "biz/people/peoplephoto/list.action";
            // 安全员资质
        } else if (this.pageData.id == "secoffqua") {
            this.postData.url = "biz/people/secoffqua/list.action";
            // 员工代表
        } else if (this.pageData.id == "staffrep") {
            this.postData.url = "biz/people/staffrep/list.action";
            // 事故调查员
        } else if (this.pageData.id == "accnve") {
            this.postData.url = "biz/people/accnve/list.action";
            // 职业卫生管理员
        } else if (this.pageData.id == "occhealadmin") {
            this.postData.url = "biz/people/occhealadmin/list.action";
        }
    },
    methods: {
        getRendering(arr) {
            arr.forEach(item => {
                this.$common.setSex(element, "peopleSex");
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