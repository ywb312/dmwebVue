<template>
    <div>
        <SearchBox placeholder="请输入姓名搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>姓名: {{item.insurance_name}}</p>
                        </div>
                        <div>
                            <p>单位: {{item.deptName}}</p>
                        </div>
                        <div>
                            <p>工伤时间: {{item.injury_time}}</p>
                        </div>
                        <div>
                            <p>工伤认定时间: {{item.firm_time}}</p>
                        </div>
                        <div>
                            <p>工伤鉴定时间: {{item.identify}}</p>
                        </div>
                        <div>
                            <p>伤残等级: {{item.levelText}}</p>
                        </div>
                        <div>
                            <p>待遇: {{item.treatment}}</p>
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
    name: "SafeInsurance",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/safe/safeinsurance/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            this.$common.comboList({ sourcename: "SCDJ" }).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "level", this.res);
                    let obj = this.$common.getDeptName(
                        this.treeData,
                        element.insurance_org
                    );
                    if (obj.name) {
                        element.deptName = obj.name;
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