<template>
    <div>
        <SearchBox placeholder="请输入操作任务搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.task_name}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>调令号: {{item.order_no}}</p>
                        </div>
                        <div>
                            <p>操作票时间: {{item.ticket_time}}</p>
                        </div>
                        <div>
                            <p>命令票编号: {{item.command_code}}</p>
                        </div>
                        <div>
                            <p>申请人: {{item.apply_man}}</p>
                        </div>
                        <div>
                            <p>申请单位: {{item.apply_org}}</p>
                        </div>
                        <div>
                            <p>申请时间: {{item.apply_time}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="tip">
                <van-divider>没有更多数据了</van-divider>
            </div>
        </ViewBox>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "OperationTicket",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/taskoperationticketinfo/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(v) {
            this.rendering = v;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.cleraData();
        },
        btnClick(obj) {}
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>