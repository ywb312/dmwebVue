<template>
    <div>
        <SearchBox placeholder="请输入演练名称/预案名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.deptname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>责任人: {{item.man}}</p>
                        </div>
                        <div>
                            <p>联系电话: {{item.tel}}</p>
                        </div>
                        <div>
                            <p>职责: {{item.duty}}</p>
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
    name: "EmergAgency",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/eme/emergagency/dolist.action",
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
                path: "/emergency/emergAgencyMan",
                query: {
                    id: obj.deptid
                }
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