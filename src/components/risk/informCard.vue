<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+'.'+item.name}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>作业步骤: {{item.project}}</p>
                        </div>
                        <div>
                            <p>事故类别: {{item.knfsText}}</p>
                        </div>
                        <div>
                            <p>危害有害因素: {{item.wname}}</p>
                        </div>
                        <div>
                            <p>责任单位: {{item.deptname}}</p>
                        </div>
                        <div>
                            <p>管控措施: {{item.gtypeText}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "informCard",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/risk/companyRisk/gzk.action",
                obj: {}
            }
        };
    },
    methods: {
        // 处理请求的数据
        getRendering(arr) {
            let _self = this;
            Promise.all([
                _self.$common.comboList({ sourcename: "KNFS" }),
                _self.$common.comboList({ sourcename: "GKCSLX" })
            ]).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "knfs", res[0]);
                    _self.$common.code2Text(element, "gtype", res[1]);
                });
                _self.rendering = arr;
            });
        }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>