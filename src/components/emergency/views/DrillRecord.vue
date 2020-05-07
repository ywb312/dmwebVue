<template>
    <div>
        <SearchBox placeholder="请输入演练名称/预案名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.plantitle}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>预案名称: {{item.sortname}}</p>
                        </div>
                        <div>
                            <p>演练类型: {{item.plantype}}</p>
                        </div>
                        <div>
                            <p>演练时间: {{item.plantime}}</p>
                        </div>
                        <div>
                            <p>演练地点: {{item.planplace}}</p>
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
        <Popup :popshow="detailShow" @close="detailShow=false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>演练名称: {{selectData.plantitle}}</p>
                </div>
                <div>
                    <p>演练类型: {{selectData.plantype}}</p>
                </div>
                <div>
                    <p>预案名称: {{selectData.sortname}}</p>
                </div>
                <div>
                    <p>演练时间: {{selectData.plantime}}</p>
                </div>
                <div>
                    <p>演练地点: {{selectData.planplace}}</p>
                </div>
                <div>
                    <p>演练级别: {{selectData.drillrule}}</p>
                </div>
                <div>
                    <p>记录时间: {{selectData.recordtime}}</p>
                </div>
                <div>
                    <p>提交状态: {{selectData.submitstatus}}</p>
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
    name: "DrillRecord",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/eme/drillrecord/list.action",
                obj: {
                    "bean.element": this.pageData.element,
                    "bean.param": ""
                }
            },
            // 查找组件的显示
            sheetShow: false,
            actions: [{ name: "查看详情" }],
            detailShow: false,
            selectData: {}
        };
    },
    created() {},
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
                this.detailShow = true;
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