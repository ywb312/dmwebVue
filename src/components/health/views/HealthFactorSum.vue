<template>
    <div>
        <choice-dept @choiceCompany="getCompany"></choice-dept>
        <SearchBox
            placeholder="请输入工种、危害原因搜索"
            @callback="searchBack"
        ></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item, index) in rendering"
                    :key="index"
                >
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">岗位: </span>
                                <span class="main_val">{{ item.gangw }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title"
                                    >职业病危害因素名称:
                                </span>
                                <span class="main_val">{{ item.name }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">危害来源: </span>
                                <span class="main_val">{{ item.reason }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">接触方式: </span>
                                <span class="main_val">{{ item.model }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">总人数: </span>
                                <span class="main_val">{{
                                    item.personsum
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">女工数: </span>
                                <span class="main_val">{{
                                    item.womansum
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">工程防护设施: </span>
                                <span class="main_val">{{ item.measure }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">个体防护用品: </span>
                                <span class="main_val">{{ item.gtfhyp }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
import choiceDept from "@/components/pub/choiceDept";
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "HealthFactor",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/healthfactorsum/list.action",
                obj: {
                    "bean.param": "",
                },
            },
            // 查找组件的显示
        };
    },
    created() {},
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
            this.$refs.view.clearData();
        },
        // 选取矿业公司
        getCompany(v) {
            for (const key in v) {
                this.postData.obj[key] = v[key];
            }
            this.$refs.view.clearData();
        },
    },
    components: {
        SearchBox,
        ViewBox,
        choiceDept,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>