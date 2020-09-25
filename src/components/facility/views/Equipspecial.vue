<template>
    <div>
        <SearchBox
            placeholder="请输入设备名称，设备编号搜索"
            @callback="searchBack"
        ></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item, index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">单位编号:</span>
                                <span class="main_val">{{
                                    item.unitnumber
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">设备名称:</span>
                                <span class="main_val">{{
                                    item.equipname
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">规格型号:</span>
                                <span class="main_val">{{
                                    item.specification
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title"
                                    >设备固定资产编号:</span
                                >
                                <span class="main_val">{{ item.assetid }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">使用地点:</span>
                                <span class="main_val">{{
                                    item.equipsite
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">使用登记证:</span>
                                <span class="main_val">{{
                                    item.register
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">设备注册代码:</span>
                                <span class="main_val">{{
                                    item.equipcode
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">生产厂家:</span>
                                <span class="main_val">{{ item.vendors }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">出厂编号:</span>
                                <span class="main_val">{{
                                    item.vendornumber
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">投用日期:</span>
                                <span class="main_val">{{ item.usedate }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">检测频率:</span>
                                <span class="main_val">{{
                                    item.frequency
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">上次检测日期:</span>
                                <span class="main_val">{{
                                    item.neardate
                                }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "Equipspecial",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/equipbook/list.action?bean.flag=1",
                obj: {},
            },
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.clearData();
        },
        btnClick(obj) {
            // 向父组件传值 切换组件
            let componentConfig = {
                text: "检测详情",
                components: "equipbookresult",
                param: {
                    toeid: obj.toeid,
                },
            };
            this.$emit("choiseComponent", componentConfig);
        },
    },
    components: {
        SearchBox,
        ViewBox,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>