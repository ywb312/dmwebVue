<template>
    <div>
        <SearchBox placeholder="请输入建议名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.deptname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">建议名称:</span>
                                <span class="main_val">{{item.colname}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">奖励内容:</span>
                                <span class="main_val">{{item.content}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">创建日期:</span>
                                <span class="main_val">{{item.createdate}}</span>
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
    name: "Rewards",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/saferationalrewards/list.action",
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