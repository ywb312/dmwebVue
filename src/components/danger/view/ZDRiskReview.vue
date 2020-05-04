<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="隐患申请复查记录"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
            @click-right="popshow=true"
        >
            <template #right>
                <img src="@/assets/iconfont/search.svg" />
            </template>
        </van-nav-bar>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.crname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">申请验收单位:</span>
                                <span class="main_val">{{item.dwysryname}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">申请验收说明:</span>
                                <span class="main_val">{{item.dyysqk}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">整改申请部门:</span>
                                <span class="main_val">{{item.zgpsbmName}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">整改情况说明:</span>
                                <span class="main_val">{{item.zgpsqk}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <search-popup
            @returnMsg="paramsDate"
            :statusShow="false"
            :companyShow="true"
            :popshow="popshow"
            @popupClose="popshow=false"
        ></search-popup>
        <!-- 操作面板 -->
        <van-action-sheet
            v-model="sheetShow"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />
        <!-- 弹窗组件 -->
        <Popup :popshow="detailShow" @close="detailShow=false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>申请验收单位: {{selectData.dwysryname}}</p>
                </div>
                <div>
                    <p>申请验收说明: {{selectData.dyysqk}}</p>
                </div>
                <div>
                    <p>整改申请部门: {{selectData.zgpsbmName}}</p>
                </div>
                <div>
                    <p>整改情况说明: {{selectData.zgpsqk}}</p>
                </div>
                <div>
                    <p>验收截止日期: {{selectData.fcjzdate}}</p>
                </div>
                <div>
                    <p>创建时间: {{selectData.createdate}}</p>
                </div>
                <div>
                    <p>备注: {{selectData.memo}}</p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
// 查找组件
import searchPopup from "@/components/danger/searchPopup";
import Popup from "@/components/pub/Popup.vue";
export default {
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/rm/zdriskreview/list.action",
                obj: {}
            },
            // 查找组件的显示
            popshow: false,
            sheetShow: false,
            actions: [{ name: "查看详情" }],
            detailShow: false,
            selectData: {}
        };
    },
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        paramsDate(v) {
            Object.keys(v).forEach(key => {
                this.postData.obj["bean." + key] = v[key];
            });
            this.$refs.view.cleraData();
        },
        btnClick(obj) {
            this.selectData = obj;
            this.sheetShow = true;
        },
        onSelect(item) {
            if (item.name == "查看详情") {
                this.detailShow = true;
            }
        }
    },
    components: {
        ViewBox,
        searchPopup,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>