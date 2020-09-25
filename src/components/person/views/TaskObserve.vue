<template>
    <div>
        <SearchBox placeholder="请输入观察工种、观察任务搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <!-- <div class="title">
                        <h4>{{index+1+"."+item.title}}</h4>
                        <p style="min-width:40px">
                            <van-tag round type="primary">{{item.moduleid}}</van-tag>
                        </p>
                    </div>-->
                    <div class="main">
                        <div>
                            <p>观察工种: {{item.profession}}</p>
                        </div>
                        <div>
                            <p>观察任务: {{item.task}}</p>
                        </div>
                        <div>
                            <p>观察时间: {{item.time}}</p>
                        </div>
                        <div>
                            <p>执行观察人员: {{item.person}}</p>
                        </div>
                        <div>
                            <p>
                                附件名称:
                                <a :href="item.attach?item.attach:''"  target="_blank">{{item.attachname}}</a>
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
    name: "TaskObserve",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/create/taskobserve/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(v) {
            this.rendering = v;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.clearData();
        },
        btnClick(obj) {}
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>