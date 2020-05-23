<template>
    <div>
        <SearchBox placeholder="请输入项目/措施名称、项目内容/预期效果/目的搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>项目/措施名称: {{item.cost_name}}</p>
                        </div>
                        <div>
                            <p>项目内容/预期效果/目的: {{item.content}}</p>
                        </div>
                        <div>
                            <p>费用预算: {{item.precost}}</p>
                        </div>
                        <div>
                            <p>启动时间: {{item.starttime}}</p>
                        </div>
                        <div>
                            <p>竣工时间: {{item.endtime}}</p>
                        </div>
                        <div>
                            <p>责任人: {{item.incharid}}</p>
                        </div>
                        <div>
                            <p>安全措施费用类别: {{item.cost_typeText}}</p>
                        </div>
                        <div>
                            <p>使用地点或场所: {{item.place}}</p>
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
    name: "SafeInvestment",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/safe/safeinvestment/list.action",
                obj: {}
            },
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            this.$common.comboList({ sourcename: "AQCSFYLB" }).then(res => {
                arr.forEach(element => {
                     _self.$common.code2Text(element, "cost_type", res);
                });
                _self.rendering = arr;
            });
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