<template>
    <div>
        <SearchBox placeholder="请输入违章地点、违章事由搜索" @callback="searchBack"></SearchBox>
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
                            <p class="main_text">
                                <span class="main_title">违章人员:</span>
                                <span class="main_val">{{item.username}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">所属单位:</span>
                                <span class="main_val">{{item.deptname}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">违章时间:</span>
                                <span class="main_val">{{item.peccancytime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">违章地点:</span>
                                <span class="main_val">{{item.peccancyaddress}}</span>
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
                    <p>违章人员: {{selectData.username}}</p>
                </div>
                <div>
                    <p>所属单位: {{selectData.deptname}}</p>
                </div>
                <div>
                    <p>违章时间: {{selectData.peccancytime}}</p>
                </div>
                <div>
                    <p>违章地点: {{selectData.peccancyaddress}}</p>
                </div>
                <div>
                    <p>违章事由: {{selectData.peccancyReason}}</p>
                </div>
                <div>
                    <p>处罚金额（元）: {{selectData.punishmoney}}</p>
                </div>
                <div>
                    <p>记录人: {{selectData.recordman}}</p>
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
    name: "Peccancy",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/staffarchive/peccancy/list.action",
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