<template>
    <div>
        <SearchBox placeholder="请输入作业场所,职业危害类型搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>作业场所: {{item.workplace}}</p>
                        </div>
                        <div>
                            <p>职业危害类型: {{item.dangertype}}</p>
                        </div>
                        <div>
                            <p>粉尘浓度阈值: {{item.rustnum}}</p>
                        </div>
                        <div>
                            <p>噪声阈值: {{item.voicenum}}</p>
                        </div>
                        <div>
                            <p>检测周期: {{item.monitycycle}}</p>
                        </div>
                        <div>
                            <p>提前提醒天数: {{item.remindday}}</p>
                        </div>
                        <div>
                            <p>提醒人: {{item.remindpeople}}</p>
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
    name: "DangerNum",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/dangernum/list.action",
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