<template>
    <div>
        <SearchBox placeholder="请输入建议名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.companyName}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">主要责任人:</span>
                                <span class="main_val">{{item.legalPerson}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">单位地址:</span>
                                <span class="main_val">{{item.companyAddress}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">许可范围:</span>
                                <span class="main_val">{{item.permission}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">业主单位:</span>
                                <span class="main_val">{{item.ownerUnit}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 操作面板 -->
        <van-action-sheet
            v-model="sheetShow"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />
        <!-- 弹窗组件 -->
        <Popup :popshow="popshow" @close="popshow=false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>单位名称: {{selectData.companyName}}</p>
                </div>
                <div>
                    <p>主要责任人: {{selectData.legalPerson}}</p>
                </div>
                <div>
                    <p>单位地址: {{selectData.companyAddress}}</p>
                </div>
                <div>
                    <p>经济类型: {{selectData.companyType}}</p>
                </div>
                <div>
                    <p>许可范围: {{selectData.permission}}</p>
                </div>
                <div>
                    <p>业主单位: {{selectData.ownerUnit}}</p>
                </div>
                <div>
                    <p>属地监管单位: {{selectData.supervisionUnit}}</p>
                </div>
                <div>
                    <p>业务主管部门: {{selectData.competentDept}}</p>
                </div>
                <div>
                    <p>编号: {{selectData.socialCode}}</p>
                </div>
                <div>
                    <p>有效始期: {{selectData.startDate}}</p>
                </div>
                <div>
                    <p>有效止期: {{selectData.endDate}}</p>
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
    name: "Stakeholder",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/create/stakeholder/list.action",
                obj: {}
            },
            sheetShow: false,
            actions: [{ name: "查看详情" }],
            popshow: false,
            selectData: {}
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
            this.$refs.view.cleraData();
        },
        btnClick(obj) {
            this.selectData = obj;
            this.sheetShow = true;
        },
        onSelect(item) {
            if (item.name == "查看详情") {
                this.popshow = true;
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