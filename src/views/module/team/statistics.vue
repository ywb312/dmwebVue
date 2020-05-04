<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="人员统计列表"
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
                        <div class="main">
                            <div>
                                <p>相关方项目部总人数: {{item.staCount}}</p>
                            </div>
                            <div>
                                <p>本月已培训人数(总人数): {{item.trainCount}}</p>
                            </div>
                            <div>
                                <p>职业健康体检人数: {{item.physicalNum}}</p>
                            </div>
                            <div>
                                <p>三项岗位人员持证人数: {{item.holderNum}}</p>
                            </div>
                            <div>
                                <p>新进人员: {{item.newPeopleNum}}</p>
                            </div>
                            <div>
                                <p>备注: {{item.memo}}</p>
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
    name: "peopleDetail",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/create/statisticsPeople/list.action",
                obj: {
                    filters: this.$route.query.filters
                }
            }
        };
    },
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>