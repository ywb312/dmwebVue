<template>
    <div>
        <SearchBox placeholder="设备设施名称,规格型号,仪器编号,设备作用,责任人,使用单位" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>设备设施名称: {{item.equipname}}</p>
                        </div>
                        <div>
                            <p>规格型号: {{item.instrument}}</p>
                        </div>
                        <div>
                            <p>仪器编号: {{item.instruid}}</p>
                        </div>
                        <div>
                            <p>数量: {{item.num}}</p>
                        </div>
                        <div>
                            <p>设备作用: {{item.equipact}}</p>
                        </div>
                        <div>
                            <p>责任人: {{item.chargepeople}}</p>
                        </div>
                        <div>
                            <p>使用单位: {{item.dept}}</p>
                        </div>
                        <div>
                            <p>备注: {{item.remark}}</p>
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
    name: "EquipInfo",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/equipinfo/list.action",
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