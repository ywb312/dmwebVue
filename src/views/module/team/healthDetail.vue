<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="个人体检档案"
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
                    <div
                        class="wrapper"
                        v-for="(item,index) in rendering"
                        :key="index"
                        @click="btnClick(item)"
                    >
                        <div class="main">
                            <div>
                                <p>姓名: {{item.name}}</p>
                            </div>
                            <div>
                                <p>部门: {{item.dept}}</p>
                            </div>
                            <div>
                                <p>工种: {{item.jobtype}}</p>
                            </div>
                            <div>
                                <p>参检时间:{{item.examtime}}</p>
                            </div>
                            <div>
                                <p>体检结论:{{item.eaxmresultText}}</p>
                            </div>
                            <div>
                                <p>结果描述:{{item.resultdetail}}</p>
                            </div>
                            <div>
                                <p>处理意见:{{item.advice}}</p>
                            </div>
                            <div>
                                <p>体检类型:{{item.examtypeText}}</p>
                            </div>
                            <div>
                                <p>接触有毒物质:{{item.toxictype}}</p>
                            </div>
                            <div>
                                <p>接触有毒物质时间:{{item.touchtoxictime}}</p>
                            </div>
                            <div>
                                <p>职业病:{{item.diseasename}}</p>
                            </div>
                            <div>
                                <p>
                                    附件名称:
                                    <a :href="item.attach?item.attach:''"  target="_blank">{{item.attachname}}</a>
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
    name: "healthDetail",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate//health/examdetail/dofileList.action",
                obj: {
                    filters: this.$route.query.filters
                }
            }
        };
    },
    methods: {
        getRendering(arr) {
            let _self = this;
            Promise.all([
                _self.$common.comboList({ sourcename: "TJJL" }),
                _self.$common.comboList({ sourcename: "TJLX" })
            ]).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "eaxmresult", res[0]);
                    _self.$common.code2Text(element, "examtype", res[1]);
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