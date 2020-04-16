<template>
    <div>
        <SearchBox placeholder="请输入爆破地点搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.miningarea}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>爆破类型: {{item.blasttypeText}}</p>
                        </div>
                        <div>
                            <p>申请时间: {{item.apptime}}</p>
                        </div>
                        <div>
                            <p>申请人: {{item.appman}}</p>
                        </div>
                        <div>
                            <p>申请单位: {{item.apporg}}</p>
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
    name: "TaskBlastApply",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/taskblastappinfo/list.action",
                obj: {}
            },
            bplxArr: [
                {
                    id: "BPLX001",
                    text: "扩槽"
                },
                {
                    id: "BPLX002",
                    text: "拉底"
                },
                {
                    id: "BPLX003",
                    text: "正常排"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "blasttype", this.bplxArr);
            });
            this.rendering = arr;
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