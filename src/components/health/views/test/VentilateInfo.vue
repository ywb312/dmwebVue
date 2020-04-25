<template>
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
                            <p>单位名称: {{item.companyName}}</p>
                        </div>
                        <div>
                            <p>单位负责人: {{item.principal}}</p>
                        </div>
                        <div>
                            <p>检测人: {{item.preparer}}</p>
                        </div>
                        <div>
                            <p>检测时间: {{item.fillingDate}}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </ViewBox>
        <!-- 操作面板 -->
        <van-action-sheet
            v-model="show"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "VentilateInfo",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/ventilate/list.action",
                obj: {}
            },
            show: false,
            actions: [{ name: "检测结果" }],
            selectData: {}
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        btnClick(obj) {
            this.show = true;
            this.selectData = obj;
        },
        onSelect(item) {
            if (item.name == "检测结果") {
                this.$router.push({
                    path: "/health/ventilateResult",
                    query: {
                        filters: this.selectData.venid
                    }
                });
            }
        }
    },
    components: {
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>