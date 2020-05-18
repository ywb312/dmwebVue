<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            :title="$route.query.type=='1'?'申请单详细内容':'发放单详细内容'"
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
                        <div v-if="$route.query.type=='1'" class="main">
                            <div>
                                <p>标志名称: {{item.mark_name}}</p>
                            </div>
                            <div>
                                <p>标志类型: {{item.mark_typeText}}</p>
                            </div>
                            <div>
                                <p>标志规格: {{item.standText}}</p>
                            </div>
                            <div>
                                <p>定制要求: {{item.requirements}}</p>
                            </div>
                            <div>
                                <p>材质性能: {{item.qualityText}}</p>
                            </div>
                            <div>
                                <p>使用地点: {{item.place}}</p>
                            </div>
                            <div>
                                <p>申请数量: {{item.numbers}}</p>
                            </div>
                            <div>
                                <p>单价: {{item.price}}</p>
                            </div>
                            <div>
                                <p>
                                    标志图片:
                                    <img class="navImg" :src="item.image" alt="加载失败" />
                                </p>
                            </div>
                        </div>
                        <div v-if="$route.query.type=='2'" class="main">
                            <div>
                                <p>标志名称: {{item.mark_name}}</p>
                            </div>
                            <div>
                                <p>标志类型: {{item.mark_typeText}}</p>
                            </div>
                            <div>
                                <p>标志规格: {{item.standText}}</p>
                            </div>
                            <div>
                                <p>定制要求: {{item.requirements}}</p>
                            </div>
                            <div>
                                <p>材质性能: {{item.qualityText}}</p>
                            </div>
                            <div>
                                <p>申请数量: {{item.numbers}}</p>
                            </div>
                            <div>
                                <p>发放数量: {{item.actnumbers}}</p>
                            </div>
                            <div>
                                <p>领取人: {{item.recevice_man}}</p>
                            </div>
                            <div>
                                <p>发放状态: {{item.offer_status=='0'?'未发放':'已发放'}}</p>
                            </div>
                            <div>
                                <p>发放人: {{item.offer_man}}</p>
                            </div>
                            <div>
                                <p>发放时间: {{item.offer_time}}</p>
                            </div>
                            <div>
                                <p>
                                    标志图片:
                                    <img class="navImg" :src="item.image" alt="加载失败" />
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
    name: "safetySignApplyDetail",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/tasksafemarkappdetial/list.action",
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
                _self.$common.comboList({ sourcename: "BZLX" }),
                _self.$common.comboList({ sourcename: "AQBZGG" }),
                _self.$common.comboList({ sourcename: "AQBZPCZ" })
            ]).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "mark_type", res[0]);
                    _self.$common.code2Text(element, "stand", res[1]);
                    _self.$common.code2Text(element, "quality", res[2]);
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