<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="重大隐患评估记录"
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
                                <span class="main_title">评估部门:</span>
                                <span class="main_val">{{item.deptName}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">评估描述:</span>
                                <span class="main_val">{{item.pgdesc}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">管控措施:</span>
                                <span class="main_val">{{item.gkcs}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">评估时间:</span>
                                <span class="main_val">{{item.pgdate}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">创建时间:</span>
                                <span class="main_val">{{item.createdate}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <search-popup
            @returnMsg="paramsDate"
            :statusShow="false"
            :companyShow="false"
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
                    <p>隐患名称: {{selectData.crname}}</p>
                </div>
                <div>
                    <p>评估部门: {{selectData.deptName}}</p>
                </div>
                <div>
                    <p>评估描述: {{selectData.pgdesc}}</p>
                </div>
                <div>
                    <p>管控措施: {{selectData.gkcs}}</p>
                </div>
                <div>
                    <p>评估时间: {{selectData.pgdate}}</p>
                </div>
                <div>
                    <p>创建时间: {{selectData.createdate}}</p>
                </div>
                <div>
                    <p>填表人员: {{selectData.tbr}}</p>
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
                url: "biz/rm/zdriskassess/list.action",
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
            this.$refs.view.clearData();
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