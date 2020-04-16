w<template>
    <div>
        <SearchBox placeholder="请输入灭火器箱编号搜索" @callback="searchBack"></SearchBox>
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
                            <p>灭火器箱编号: {{item.cabinetcode}}</p>
                        </div>
                        <div>
                            <p>灭火器编号: {{item.hydrantcode}}</p>
                        </div>
                        <div>
                            <p>灭火器类型: {{item.agenttypeText}}</p>
                        </div>
                        <div>
                            <p>出厂日期: {{item.prodate}}</p>
                        </div>
                        <div>
                            <p>更换日期: {{item.changedate}}</p>
                        </div>
                        <div>
                            <p>存放地点: {{item.site}}</p>
                        </div>
                        <div>
                            <p>责任人: {{item.respman}}</p>
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
    name: "HydrantChange",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/hyd/hydrant/list.action",
                obj: {}
            },
            agenttypeArr: [
                {
                    id: "MHJLB001",
                    text: "2Kg二氧化碳"
                },
                {
                    id: "MHJLB002",
                    text: "4Kg干粉"
                },
                {
                    id: "MHJLB005",
                    text: "2Kg干粉"
                },
                {
                    id: "MHJLB006",
                    text: "1Kg干粉"
                },
                {
                    id: "MHJLB007",
                    text: "35Kg干粉"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "agenttype", this.agenttypeArr);
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