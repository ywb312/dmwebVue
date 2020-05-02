<template>
    <div>
        <SearchBox placeholder="请输入事故名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.acciname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>事故单位: {{item.inchargeid}}</p>
                        </div>
                        <div>
                            <p>事故类别: {{item.categoryText}}</p>
                        </div>
                        <div>
                            <p>发生时间: {{item.happentime}}</p>
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
    name: "Accidetabs",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/acci/accidetabs/list.action",
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
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(
                    element,
                    "category",
                    this.sglbSlots
                );
                this.$common.code2Text(
                    element,
                    "acciclassid",
                    this.sgdjSlots
                );
            });
            this.rendering = arr;
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
                path: "/accident/accidentDetail"
            });
        }
    },
    computed: {
        sglbSlots() {
            return this.$store.state.sglbSlots;
        },
        sgdjSlots() {
            return this.$store.state.sgdjSlots;
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>