w<template>
    <div>
        <SearchBox placeholder="请输入照明箱编号,存放地点,责任人搜索" @callback="searchBack"></SearchBox>
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
                            <p>照明箱编号: {{item.cabinetcode}}</p>
                        </div>
                        <div>
                            <p>照明设施类型: {{item.cabinettype}}</p>
                        </div>
                        <div>
                            <p>数量: {{item.cabinetcount}}</p>
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
    name: "IllumineCabinet",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/hyd/illuminecabinet/list.action",
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
            this.$refs.view.clearData();
        },
        btnClick(obj) {
            this.$router.push({
                path: "/person/illumineNumber",
                query: {
                    filters: obj.cabinetid
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