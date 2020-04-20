<template>
    <div>
        <SearchBox placeholder="请输入单位名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.companyName}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>主要负责人: {{item.legalPerson}}</p>
                        </div>
                        <div>
                            <p>单位地址: {{item.companyAddress}}</p>
                        </div>
                        <div>
                            <p>经济类型: {{item.companyType}}</p>
                        </div>
                        <div>
                            <p>许可范围:{{item.permission}}</p>
                        </div>
                        <div>
                            <p>有效始期:{{item.startDate}}</p>
                        </div>
                        <div>
                            <p>有效至期:{{item.endDate}}</p>
                        </div>
                        <div v-for="(m,n) in item.attach" :key="m">
                            <p>
                                文件:
                                <a :href="m">{{item.attachname[n]}}</a>
                            </p>
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
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "CompanyLicense",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/create/companyLicense/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(item => {
                if (item.attach) {
                    item.attach = item.attach.split(",");
                    item.attachname = item.attachname.split(",");
                } else {
                    item.attach = [];
                    item.attachname = [];
                }
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