<template>
    <div>
        <SearchBox placeholder="请输入名称搜索" @callback="searchBack"></SearchBox>
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
                            <p>名称: {{item.erectionName}}</p>
                        </div>
                        <div>
                            <p>建设时间: {{item.builddate}}</p>
                        </div>
                        <div>
                            <p>改扩建时间: {{item.modifydate}}</p>
                        </div>
                        <div>
                            <p>验收情况: {{item.acceptFflag}}</p>
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
        <!-- 弹窗组件 -->
        <Popup :popshow="popshow" @close="popshow=false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>名称: {{selectData.erectionName}}</p>
                </div>
                <div>
                    <p>建设时间: {{selectData.builddate}}</p>
                </div>
                <div>
                    <p>改扩建时间: {{selectData.modifydate}}</p>
                </div>
                <div>
                    <p>验收情况: {{selectData.acceptFflag}}</p>
                </div>
                <div>
                    <p>验收类别: {{selectData.acceptType}}</p>
                </div>
                <div>
                    <p>责任部门: {{selectData.mangedept}}</p>
                </div>
                <div>
                    <p>填报人: {{selectData.statisman}}</p>
                </div>
                <div>
                    <p>填报日期: {{selectData.createDate}}</p>
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
    name: "FireAccept",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/fireaccept/list.action",
                obj: {}
            },
            show: false,
            popshow: false,
            actions: [{ name: "查看详情" }],
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
            this.show = true;
            this.selectData = obj;
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