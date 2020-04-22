<template>
    <div>
        <SearchBox placeholder="请输入检测人搜索" @callback="searchBack"></SearchBox>
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
                            <p>仪器型号: {{item.instrument}}</p>
                        </div>
                        <div>
                            <p>仪器编号: {{item.instruid}}</p>
                        </div>
                        <div>
                            <p>采样点: {{item.location}}</p>
                        </div>
                        <div>
                            <p>水样: {{item.exampleText}}</p>
                        </div>
                        <div>
                            <p>检测人: {{item.mpeople}}</p>
                        </div>
                        <div>
                            <p>检测时间: {{item.mtime}}</p>
                        </div>
                        <div>
                            <p>提交状态: {{item.issubmit}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="tip">
                <van-divider>没有更多数据了</van-divider>
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
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "WaterInfo",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/waterinfo/list.action",
                obj: {}
            },
            show: false,
            actions: [{ name: "水质检测结果" }],
            selectData: {},
            sylxArr: [
                {
                    id: "SYLX001",
                    text: "进水"
                },
                {
                    id: "SYLX002",
                    text: "出水"
                },
                {
                    id: "SYLX003",
                    text: "井下水"
                },
                {
                    id: "SYLX004",
                    text: "地表水"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "example", this.sylxArr);
            });
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.cleraData();
        },
        btnClick(obj) {
            this.show = true;
            this.selectData = obj;
        },
        onSelect(item) {
            if (item.name == "水质检测结果") {
                this.$router.push({
                    path: "/health/waterResult",
                    query: {
                        filters: this.selectData.waterid
                    }
                });
            }
        }
    },
    components: {
        SearchBox,
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>