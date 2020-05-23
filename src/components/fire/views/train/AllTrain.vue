<template>
    <div>
        <SearchBox placeholder="请输入培训名称,培训地点搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.traname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>培训班期数: {{item.tranum}}</p>
                        </div>
                        <div>
                            <p>开始时间: {{item.starttime}}</p>
                        </div>
                        <div>
                            <p>结束时间: {{item.endtime}}</p>
                        </div>
                        <div>
                            <p>培训地点: {{item.traplace}}</p>
                        </div>
                    </div>
                </div>
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
                    <p>培训名称: {{selectData.traname}}</p>
                </div>
                <div>
                    <p>培训班期数: {{selectData.tranum}}</p>
                </div>
                <div>
                    <p>开始时间: {{selectData.starttime}}</p>
                </div>
                <div>
                    <p>结束时间: {{selectData.endtime}}</p>
                </div>
                <div>
                    <p>培训地点: {{selectData.traplace}}</p>
                </div>
                <div>
                    <p>培训总学时: {{selectData.traallhour}}</p>
                </div>
                <div>
                    <p>培训人数: {{selectData.trapersons}}</p>
                </div>
                <div>
                    <p>登记时间: {{selectData.createtime}}</p>
                </div>
                <div>
                    <p>登记人: {{selectData.createman}}</p>
                </div>
                <div>
                    <p>登记部门: {{selectData.createdept}}</p>
                </div>
                <div>
                    <p>提交状态: {{selectData.datastatus}}</p>
                </div>
                <div>
                    <p>及格线: {{selectData.passline}}</p>
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
    name: "AllTrain",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "",
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
    created() {
        if (this.pageData.id == "expatriatetra") {
            this.postData.url = "biz/operate/tra/expatriatetra/list.action";
        } else if (this.pageData.id == "unittrain") {
            this.postData.url = "biz/operate/tra/unittrain/list.action";
        } else if (this.pageData.id == "foreigntrain") {
            this.postData.url = "biz/operate/tra/foreigntrain/list.action";
        }
    },
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                if (!element.datastatus) {
                    element.datastatus = "未提交";
                }
            });
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.clearData();
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