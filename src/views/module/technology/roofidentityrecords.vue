<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="顶板分级评估记录"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <!-- 主体 -->
        <div>
            <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
                <div slot="views">
                    <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                        <div class="title">
                            <h4>{{index+1+"."+item.pname}}</h4>
                        </div>
                        <div class="main">
                            <div>
                                <p class="main_text">
                                    <span class="main_title">M1:</span>
                                    <span class="main_val">{{item.m1}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">M2:</span>
                                    <span class="main_val">{{item.m2}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">M3:</span>
                                    <span class="main_val">{{item.m3}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">M4:</span>
                                    <span class="main_val">{{item.m4}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">M5:</span>
                                    <span class="main_val">{{item.m5}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">M6:</span>
                                    <span class="main_val">{{item.m6}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">M7:</span>
                                    <span class="main_val">{{item.m7}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">采矿评分:</span>
                                    <span class="main_val">{{item.mall}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">地质评分:</span>
                                    <span class="main_val">{{item.gall}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">采场评分:</span>
                                    <span class="main_val">{{item.total}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">顶板级别:</span>
                                    <span class="main_val">{{item.rooflevel}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">整改措施:</span>
                                    <span class="main_val">{{item.measures}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">评估时间:</span>
                                    <span class="main_val">{{item.createtime}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">评估人:</span>
                                    <span class="main_val">{{item.doman}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">登记人:</span>
                                    <span class="main_val">{{item.createman}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ViewBox>
        </div>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "roofidentityrecords",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/taskroofidentityrecords/list.action",
                obj: {
                    filters: this.$route.query.filters,
                },
            },
        };
    },
    methods: {
        getRendering(arr) {
            let _self = this;
            Promise.all([
                _self.$common.comboList({ sourcename: "TJJL" }),
                _self.$common.comboList({ sourcename: "TJLX" }),
            ]).then((res) => {
                arr.forEach((element) => {
                    _self.$common.code2Text(element, "eaxmresult", res[0]);
                    _self.$common.code2Text(element, "examtype", res[1]);
                });
                _self.rendering = arr;
            });
        },
    },
    components: {
        ViewBox,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>