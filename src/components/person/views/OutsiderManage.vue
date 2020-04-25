w<template>
    <div>
        <SearchBox placeholder="请输入外来参观人员单位名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="main">
                        <div>
                            <p>外来参观单位名称: {{item.danwei}}</p>
                        </div>
                        <div>
                            <p>外来参观人员姓名: {{item.name}}</p>
                        </div>
                        <div>
                            <p>参观日期: {{item.visitDate}}</p>
                        </div>
                        <div>
                            <p>矿内接待单位: {{item.recepdept}}</p>
                        </div>
                        <div>
                            <p>陪同人员: {{item.recepman}}</p>
                        </div>
                        <div>
                            <p>
                                附件名称:
                                <a :href="item.attach?item.attach:''">{{item.attachname}}</a>
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
    name: "OutsiderManage",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/people/outsiderManage/list.action",
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
            this.$refs.view.cleraData();
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