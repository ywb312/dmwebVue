<template>
    <div>
        <SearchBox placeholder="请输入项目名称、项目内容搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>项目名称: {{item.proname}}</p>
                        </div>
                        <div>
                            <p>项目内容: {{item.project_content}}</p>
                        </div>
                        <div>
                            <p>启动时间: {{item.start_time}}</p>
                        </div>
                        <div>
                            <p>验收时间: {{item.check_time}}</p>
                        </div>
                        <div>
                            <p>验收单位: {{item.checkdept}}</p>
                        </div>
                        <div>
                            <p>预算金额: {{item.budget_money}}</p>
                        </div>
                        <div>
                            <p>项目类型: {{item.protypeText}}</p>
                        </div>
                        <div>
                            <p>承包单位: {{item.idName}}</p>
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
    name: "SafeMeasures",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/safe/safemeasures/list.action",
                obj: {}
            },
            aqcsfylb: [
                {
                    id: "AQCSFYLB001",
                    text: "安全工程"
                },
                {
                    id: "AQCSFYLB002",
                    text: "安全管理"
                },
                {
                    id: "AQCSFYLB003",
                    text: "安全设备"
                },
                {
                    id: "AQCSFYLB004",
                    text: "个体防护用品"
                },
                {
                    id: "AQCSFYLB005",
                    text: "安全标志及标识"
                },
                {
                    id: "AQCSFYLB006",
                    text: "安全奖励"
                },
                {
                    id: "AQCSFYLB007",
                    text: "安全教育培训"
                },
                {
                    id: "AQCSFYLB008",
                    text: "安全科技"
                },
                {
                    id: "AQCSFYLB009",
                    text: "应急设备设施"
                },
                {
                    id: "AQCSFYLB010",
                    text: "其他与安全生产直接相关的支出"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "protype", this.aqcsfylb);
                let obj = this.$common.getDeptName(
                    this.treeData,
                    element.org_id
                );
                if (obj.name) {
                    element.idName = obj.name;
                }
            });
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
    },
    computed: {
        treeData() {
            return this.$store.state.treeData;
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>