w<template>
    <div>
        <SearchBox placeholder="请输入参会人员姓名，班组名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.classteamname}}</h4>
                        <p style="min-width:40px">
                            <van-tag round type="primary">{{item.classesText}}</van-tag>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <p>班组长: {{item.classteamer}}</p>
                        </div>
                        <div>
                            <p>主持人: {{item.hostman}}</p>
                        </div>
                        <div>
                            <p>参会领导: {{item.leaders}}</p>
                        </div>
                        <div>
                            <p>记录时间: {{item.createtime}}</p>
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
                    <p>班组名称: {{selectData.classteamname}}</p>
                </div>
                <div>
                    <p>班次: {{selectData.classesText}}</p>
                </div>
                <div>
                    <p>班组长: {{selectData.classteamer}}</p>
                </div>
                <div>
                    <p>主持人: {{selectData.hostman}}</p>
                </div>
                <div>
                    <p>参会领导: {{selectData.leaders}}</p>
                </div>
                <div>
                    <p>应到人数: {{selectData.shouldcomenumber}}</p>
                </div>
                <div>
                    <p>实到人数: {{selectData.actuallycomenumber}}</p>
                </div>
                <div>
                    <p>记录人: {{selectData.creater}}</p>
                </div>
                <div>
                    <p>记录时间: {{selectData.createtime}}</p>
                </div>
                <div>
                    <p>提交状态: {{selectData.issubmit=="0"?"未提交":"已提交"}}</p>
                </div>
                <div>
                    <p>
                        会议照片:
                        <img class="navImg" :src="selectData.image" alt="加载失败" />
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
    name: "ClassMeettingInfo",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/taskclassmeettinginfo/listbycreateid.action",
                obj: {}
            },
            sheetShow: false,
            actions: [{ name: "查看详情" }],
            detailShow: false,
            selectData: {}
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            this.$common.comboList({ sourcename: "BC" }).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "classes", res);
                });
                _self.rendering = arr;
            });
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
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
        SearchBox,
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>