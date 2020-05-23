<template>
    <div>
        <SearchBox placeholder="请输入评审计划名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">年度:</span>
                                <span class="main_val">{{item.year}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">评审计划名称:</span>
                                <span class="main_val">{{item.pubname}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">附件名称:</span>
                                <span class="main_val">
                                    <a :href="item.attach?item.attach:''">{{item.attachname}}</a>
                                </span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">发布单位:</span>
                                <span class="main_val">{{item.pubdept}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">发布时间:</span>
                                <span class="main_val">{{item.pubtime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">发布状态:</span>
                                <span class="main_val">{{item.pubstatusText}}</span>
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
    name: "SystemJudgeReport",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/systemjudgereport/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                if (element.pubstatus == "FBZT001") {
                    element.pubstatusText = "未发布";
                } else if (element.pubstatus == "FBZT002") {
                    element.pubstatusText = "已发布";
                }
            });
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