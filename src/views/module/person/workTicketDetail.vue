<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="工作票操作项目表"
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
                                <p>序号: {{item.ordernumber}}</p>
                            </div>
                            <div>
                                <p>操作项目内容: {{item.operate_content}}</p>
                            </div>
                            <div>
                                <p>命令人: {{item.commander_man}}</p>
                            </div>
                            <div>
                                <p>监护人: {{item.looker_man}}</p>
                            </div>
                            <div>
                                <p>操作人: {{item.operate_man}}</p>
                            </div>
                            <div>
                                <p>操作时间: {{item.operate_time}}</p>
                            </div>
                            <div>
                                <p>汇报时间: {{item.report_time}}</p>
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
    name: "workTicketDetail",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/taskoperateitems/list.action",
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