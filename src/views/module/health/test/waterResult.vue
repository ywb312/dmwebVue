<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="水质检测结果"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
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
                                <p>检测项: {{item.mitem}}</p>
                            </div>
                            <div>
                                <p>检测值: {{item.mnumber}}</p>
                            </div>
                            <div>
                                <p>是否超限: {{item.address}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ViewBox>
        </div>
        <!-- 操作面板 -->
        <!-- <van-action-sheet
            v-model="show"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />-->
    </div>
</template>
<script>
import Popup from "@/components/pub/Popup.vue";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "dustResult",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/waterresult/list.action",
                obj: {
                    filters: this.$route.query.filters
                }
            }
            // show: false,
            // actions: [{ name: "查看详情" }],
            // selectData: {},
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        }
        // btnClick(obj) {
        //     this.show = true;
        //     this.selectData = obj;
        // },
        // onSelect(item) {
        //     if (item.name == "查看详情") {
        //     }
        // }
    },
    components: {
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>