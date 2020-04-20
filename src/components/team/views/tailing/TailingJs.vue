<template>
    <div>
        <SearchBox placeholder="请输入尾矿库名称搜索" @callback="searchBack"></SearchBox>
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
                            <p>企业名称: {{item.companyName}}</p>
                        </div>
                        <div>
                            <p>主要负责人: {{item.principal}}</p>
                        </div>
                        <div>
                            <p>尾矿库名称: {{item.name}}</p>
                        </div>
                        <div>
                            <p>联系电话: {{item.phone}}</p>
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
    name: "TailingJs",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/create/tailingjs/list.action",
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
        },
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            this.$router.push({
                path: "/team/tailingDetail"
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