<template>
    <div>
        <SearchBox placeholder="请输入违章地点、违章事由搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>违章人员: {{item.username}}</p>
                        </div>
                        <div>
                            <p>所属单位: {{item.deptname}}</p>
                        </div>
                        <div>
                            <p>违章时间: {{item.peccancytime}}</p>
                        </div>
                        <div>
                            <p>违章地点:{{item.peccancyaddress}}</p>
                        </div>
                        <div>
                            <p>违章事由:{{item.peccancyReason}}</p>
                        </div>
                        <div>
                            <p>处罚金额（元）:{{item.punishmoney}}</p>
                        </div>
                        <div>
                            <p>记录人:{{item.recordman}}</p>
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
    name: "Peccancy",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/staffarchive/peccancy/list.action",
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