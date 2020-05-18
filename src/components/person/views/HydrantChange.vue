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
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            this.$common.comboList({ sourcename: "MHJLB" }).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "agenttype", res);
                });
                _self.rendering = arr;
            });
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