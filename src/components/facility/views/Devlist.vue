<template>
    <div>
        <SearchBox placeholder="请输入评价名称,评价部门,负责人搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.evaluname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>评价部门: {{item.evaludept}}</p>
                        </div>
                        <div>
                            <p>评价时间: {{item.evalutime}}</p>
                        </div>
                        <div>
                            <p>负责人: {{item.chargestaff}}</p>
                        </div>
                        <div>
                            <p>参与人员: {{item.joinstaff}}</p>
                        </div>
                        <div>
                            <p>附件制作人:{{item.makeman}}</p>
                        </div>
                        <div>
                            <p>附件制作时间:{{item.maketime}}</p>
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
    name: "Evalu",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/dev/devinfo/dolist.action",
                obj: {
                    "bean.element": this.pageData.element
                }
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