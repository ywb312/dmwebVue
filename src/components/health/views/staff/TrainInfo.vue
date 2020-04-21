<template>
    <div>
        <SearchBox placeholder="请输入培训人员搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.traPeople}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>培训日期: {{item.traDate}}</p>
                        </div>
                        <div>
                            <p>主讲人: {{item.speaker}}</p>
                        </div>
                        <div>
                            <p>培训地点: {{item.traPlace}}</p>
                        </div>
                        <div>
                            <p>培训内容: {{item.traContent}}</p>
                        </div>
                        <div>
                            <p>培训单位: {{item.traUnit}}</p>
                        </div>
                        <div>
                            <p>备注: {{item.memo}}</p>
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
    name: "TrainInfo",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/guardinfo/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    created() {
        if (pageData.id == "hygieneinfo") {
            this.postData.obj["bean.mark"] = "0";
        } else if (pageData.id == "guardinfo") {
            this.postData.obj["bean.mark"] = "1";
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