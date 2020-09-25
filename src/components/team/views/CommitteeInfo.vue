<template>
    <div>
        <SearchBox placeholder="请输入主任、副主任、成员搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">主任:</span>
                                <span class="main_val">{{item.director}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">副主任:</span>
                                <span class="main_val">{{item.fudirector}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">成员:</span>
                                <span class="main_val">{{item.member}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">创建日期:</span>
                                <span class="main_val">{{item.createDate}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">附件名称:</span>
                                <span class="main_val">
                                    <a :href="item.attach?item.attach:''"  target="_blank">{{item.attachname}}</a>
                                </span>
                            </p>
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
    name: "CommitteeInfo",
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
        // 安全生产委员会信息
        if (this.pageData.id == "orgsafetycommitteeinfo") {
            this.postData.url =
                "biz/operate/org/orgsafetycommitteeinfo/list.action";
            // 环境委员会信息
        } else if (this.pageData.id == "orgenvironcommitteeinfo") {
            this.postData.url =
                "biz/operate/org/orgenvironcommitteeinfo/list.action";
            // 消防管理机构信息
        } else if (this.pageData.id == "orgfirecontrolinfo") {
            this.postData.url =
                "biz/operate/org/orgfirecontrolinfo/list.action";
        }
    },
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.clearData();
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>