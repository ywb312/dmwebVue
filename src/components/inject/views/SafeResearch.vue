<template>
    <div>
        <SearchBox placeholder="请输入项目名称、项目内容搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>项目名称: {{item.project_name}}</p>
                        </div>
                        <div>
                            <p>项目内容: {{item.content}}</p>
                        </div>
                        <div>
                            <p>启动时间: {{item.start_time}}</p>
                        </div>
                        <div>
                            <p>验收时间: {{item.finish_time}}</p>
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
        </ViewBox>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "SafeResearch",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/safe/saferesearch/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            this.$common.comboList({ sourcename: "AQCSFYLB" }).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "protype", res);
                    let obj = this.$common.getDeptName(
                        this.treeData,
                        element.org_id
                    );
                    if (obj.name) {
                        element.idName = obj.name;
                    }
                });
                _self.rendering = arr;
            });
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.clearData();
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