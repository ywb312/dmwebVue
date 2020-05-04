<template>
    <div>
        <SearchBox placeholder="请输入相关方名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.contractorname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">相关方类型:</span>
                                <span class="main_val">{{item.contractortypeText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">联系人:</span>
                                <span class="main_val">{{item.contactpeople}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">联系地址:</span>
                                <span class="main_val">{{item.address}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">联系方式:</span>
                                <span class="main_val">{{item.tel}}</span>
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
                    <p>相关方名称: {{selectData.contractorname}}</p>
                </div>
                <div>
                    <p>相关方类型: {{selectData.contractortypeText}}</p>
                </div>
                <div>
                    <p>联系人: {{selectData.contactpeople}}</p>
                </div>
                <div>
                    <p>联系地址: {{selectData.address}}</p>
                </div>
                <div>
                    <p>联系方式: {{selectData.tel}}</p>
                </div>
                <div>
                    <p>关联业务: {{selectData.busasssociation}}</p>
                </div>
                <div>
                    <p>对口部门: {{selectData.counterparts}}</p>
                </div>
                <div>
                    <p>
                        附件名称:
                        <a
                            :href="selectData.attach?selectData.attach:''"
                        >{{selectData.attachname}}</a>
                    </p>
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
    name: "ContractorFile",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/org/orgcontractor/listfile.action",
                obj: {}
            },
            sheetShow: false,
            actions: [{ name: "查看详情" }],
            popshow: false,
            selectData: {},
            xgflxArr: [
                {
                    text: "安全生产监管部门",
                    id: "XGFLX001"
                },
                {
                    text: "上级主管单位",
                    id: "XGFLX002"
                },
                {
                    text: "安全生产技术服务与咨询",
                    id: "XGFLX003"
                },
                {
                    text: "其他服务与咨询",
                    id: "XGFLX004"
                },
                {
                    text: "监测、检验机构",
                    id: "XGFLX005"
                },
                {
                    text: "相关劳保用品供应商",
                    id: "XGFLX006"
                },
                {
                    text: "工程承包商",
                    id: "XGFLX007"
                },
                {
                    text: "周边社区",
                    id: "XGFLX008"
                },
                {
                    text: "外部应急机构",
                    id: "XGFLX009"
                },
                {
                    text: "其他",
                    id: "XGFLX010"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(
                    element,
                    "contractortype",
                    this.xgflxArr
                );
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