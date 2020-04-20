<template>
    <div>
        <SearchBox placeholder="请输入评审计划名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>年度: {{item.year}}</p>
                        </div>
                        <div>
                            <p>评审计划名称: {{item.pubname}}</p>
                        </div>
                        <div>
                            <p>
                                附件名称:
                                <a :href="item.attach?item.attach:''">{{item.attachname}}</a>
                            </p>
                        </div>
                        <div>
                            <p>发布单位: {{item.pubdept}}</p>
                        </div>
                        <div>
                            <p>发布时间: {{item.pubtime}}</p>
                        </div>
                        <div>
                            <p>发布状态: {{item.pubstatusText}}</p>
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
    name: "SystemJudgePlan",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/systemjudgeplan/list.action",
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