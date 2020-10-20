<template>
    <div>
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
                                <span class="main_title">检查日期: </span>
                                <span class="main_val">{{
                                    item.examtime
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">检查机构: </span>
                                <span class="main_val">{{
                                    item.checkDept
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">体检种类: </span>
                                <span class="main_val">{{
                                    item.examtype
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">应检人数: </span>
                                <span class="main_val">{{ item.yjcount }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">实检人数: </span>
                                <span class="main_val">{{ item.sjcount }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">未见异常: </span>
                                <span class="main_val">{{
                                    item.wjyccount
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">复查: </span>
                                <span class="main_val">{{ item.fccount }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">疑是: </span>
                                <span class="main_val">{{ item.yscount }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">禁忌症: </span>
                                <span class="main_val">{{
                                    item.jjzcount
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">其他疾患: </span>
                                <span class="main_val">{{ item.qtcount }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "CheckAbnormalCount",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/health/examdetail/checkResultList.action",
                obj: {
                    "bean.tablesuffix": this.pageData.param.filters,
                },
            },
            // 查找组件的显示
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
    },
    components: {
        ViewBox,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>