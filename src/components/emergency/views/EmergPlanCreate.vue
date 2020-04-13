<template>
    <div>
        <SearchBox placeholder="请输入文件编号/要素号/文件名称" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.filename}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>文件编号: {{item.filecode}}</p>
                        </div>
                        <div>
                            <p>要素号: {{item.elemcode}}</p>
                        </div>
                        <div>
                            <p>创建人员:{{item.createdept+" | "+item.createman}}</p>
                        </div>
                        <div>
                            <p>创建时间:{{item.createtime}}</p>
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
// 这是基本渲染功能的组件 公用
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "EmergPlanCreate",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/create/emergplancreate/validlist.action",
                obj: {
                    "bean.element": this.pageData.element,
                    "bean.param": ""
                }
            }
        };
    },
    created() {},
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
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            this.$router.push({
                path: "/emergency/emergPlanDetail"
            });
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>