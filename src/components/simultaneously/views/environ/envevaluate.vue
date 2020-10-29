<template>
    <div>
        <SearchBox
            placeholder="请输入项目名称搜索"
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
                                <span class="main_title">建设项目名称: </span>
                                <span class="main_val">{{
                                    item.projectName
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">项目建设地址: </span>
                                <span class="main_val">{{
                                    item.projectAddress
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">建设单位名称: </span>
                                <span class="main_val">{{
                                    item.unitName
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">建设单位地址: </span>
                                <span class="main_val">{{
                                    item.unitAddress
                                }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 操作面板 -->
        <van-action-sheet
            v-model="actionShow"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />
        <!-- 弹窗组件 -->
        <Popup :popshow="popshow" @close="popshow = false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>建设项目名称: {{ selectData.projectName }}</p>
                </div>
                <div>
                    <p>项目建设地址: {{ selectData.projectAddress }}</p>
                </div>
                <div>
                    <p>建设单位名称: {{ selectData.unitName }}</p>
                </div>
                <div>
                    <p>建设单位地址: {{ selectData.unitAddress }}</p>
                </div>
                <div>
                    <p>企业性质: {{ selectData.firmProperty }}</p>
                </div>
                <div>
                    <p>邮政编码: {{ selectData.postalcode }}</p>
                </div>
                <div>
                    <p>建设单位联系人: {{ selectData.unitContact }}</p>
                </div>
                <div>
                    <p>联系方式: {{ selectData.phone }}</p>
                </div>
                <div>
                    <p>项目可行性研究单位: {{ selectData.projectResearch }}</p>
                </div>
                <div>
                    <p>建设项目生产能力: {{ selectData.projectAbility }}</p>
                </div>
                <div>
                    <p>项目总投资概算: {{ selectData.projectInvest }}</p>
                </div>
                <div>
                    <p>备案号: {{ selectData.reference }}</p>
                </div>
                <div>
                    <p>
                        安全预评价评审意见:
                        {{ selectData.reviewFlag == "0" ? "同意" : "不同意" }}
                    </p>
                </div>
                <div>
                    <p>安全预评价评审日期: {{ selectData.reviewDate }}</p>
                </div>
                <div>
                    <p>
                        建设项目安全预评价报告备案申请日期:
                        {{ selectData.safeReferenceDate }}
                    </p>
                </div>
                <div>
                    <p>安全预评价审批日期: {{ selectData.safeEvaluateDate }}</p>
                </div>
                <div>
                    <p>
                        预评价报告评审单位审批日期:
                        {{ selectData.evaluateReportDate }}
                    </p>
                </div>
                <div>
                    <p>备案机关审批日期: {{ selectData.referenceDate }}</p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "envevaluate",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/envevaluate/list.action",
                obj: {},
            },
            actionShow: false,
            popshow: false,
            actions: [{ name: "查看详情" }],
            selectData: {},
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        btnClick(obj) {
            this.actionShow = true;
            this.selectData = obj;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.clearData();
        },
        onSelect(item) {
            if (item.name == "查看详情") {
                this.popshow = true;
            }
        },
    },
    components: {
        SearchBox,
        ViewBox,
        Popup,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>