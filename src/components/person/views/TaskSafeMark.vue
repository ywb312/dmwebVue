<template>
    <div>
        <SearchBox placeholder="确认标准,适用作业面类型搜索" @callback="searchBack"></SearchBox>
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
                            <p>安全标志类型: {{item.mark_typeText}}</p>
                        </div>
                        <div>
                            <p>安全标志名称: {{item.mark_name}}</p>
                        </div>
                        <div>
                            <p>创建人: {{item.creater}}</p>
                        </div>
                        <div>
                            <p>创建时间: {{item.create_time}}</p>
                        </div>
                        <div>
                            <p>
                                图片:
                                <img style="width:50px;height:50px" :src="item.image" alt="加载失败" />
                            </p>
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
    name: "TaskSafeMark",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/tasksafemarkinfo/list.action",
                obj: {}
            },
            bzlxArr: [
                {
                    text: "禁止标志",
                    id: "BZLX001"
                },
                {
                    text: "警告标志",
                    id: "BZLX002"
                },
                {
                    text: "指令标志",
                    id: "BZLX003"
                },
                {
                    text: "路标、名牌、提示标志",
                    id: "BZLX004"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "mark_type", this.bzlxArr);
            });
            this.rendering = arr;
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