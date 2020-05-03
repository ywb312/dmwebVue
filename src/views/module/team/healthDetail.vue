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
                                    <a :href="item.attach?item.attach:''">{{item.attachname}}</a>
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
            },
            tjjlArr: [
                {
                    id: "TJJL001",
                    text: "未见异常"
                },
                {
                    id: "TJJL002",
                    text: "复查"
                },
                {
                    id: "TJJL003",
                    text: "疑似职业病"
                },
                {
                    id: "TJJL004",
                    text: "职业禁忌症"
                },
                {
                    id: "TJJL005",
                    text: "其他疾患"
                }
            ],
            tjlxArr: [
                {
                    id: "TJLX002",
                    text: "岗中体检"
                },
                {
                    id: "TJLX004",
                    text: "离岗体检"
                },
                {
                    id: "TJLX005",
                    text: "应急体检"
                },
                {
                    id: "TJLX006",
                    text: "入职体检"
                },
                {
                    id: "TJLX007",
                    text: "换岗体检"
                }
            ]
        };
    },
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "eaxmresult", this.tjjlArr);
                this.$common.code2Text(element, "examtype", this.tjlxArr);
            });
            this.rendering = arr;
        }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>