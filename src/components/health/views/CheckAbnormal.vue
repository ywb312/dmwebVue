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
                                <span class="main_title">姓名: </span>
                                <span class="main_val">{{ item.name }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">性别: </span>
                                <span class="main_val">{{ item.sex }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">年龄: </span>
                                <span class="main_val">{{ item.age }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">部门: </span>
                                <span class="main_val">{{ item.dept }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">体检日期: </span>
                                <span class="main_val">{{
                                    item.examtime
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">体检类别: </span>
                                <span class="main_val">{{
                                    item.examtype
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title"
                                    >接触职业病危害因素:
                                </span>
                                <span class="main_val">{{
                                    item.toxictype
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title"
                                    >可能导致的职业病:
                                </span>
                                <span class="main_val">{{
                                    item.diseasename
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title"
                                    >体检结论与处理意见:
                                </span>
                                <span class="main_val">{{
                                    item.resultdetail
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">落实情况: </span>
                                <span class="main_val">{{
                                    item.fulfillInfo
                                }}</span>
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
                url: "biz/operate/health/examdetail/checkAbnormalList.action",
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