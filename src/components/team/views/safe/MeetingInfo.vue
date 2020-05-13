<template>
    <div>
        <SearchBox placeholder="会议类型,机构/单位/车间,工段/职能班组" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.pubname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">机构/单位/车间:</span>
                                <span class="main_val">{{item.dept}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">会议开始时间:</span>
                                <span class="main_val">{{item.meetingbegintime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">会议结束时间:</span>
                                <span class="main_val">{{item.meetingendtime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">主持人:</span>
                                <span class="main_val">{{item.hostman}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">主要参与人员:</span>
                                <span class="main_val">{{item.joinstaff}}</span>
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
                    <p>会议名称: {{selectData.meetingname}}</p>
                </div>
                <div>
                    <p>机构/单位/车间: {{selectData.dept}}</p>
                </div>
                <div>
                    <p>会议开始时间: {{selectData.meetingbegintime}}</p>
                </div>
                <div>
                    <p>会议结束时间: {{selectData.meetingendtime}}</p>
                </div>
                <div>
                    <p>主持人: {{selectData.hostman}}</p>
                </div>
                <div>
                    <p>主要参与人员: {{selectData.joinstaff}}</p>
                </div>
                <div>
                    <p>请假或缺席人员: {{selectData.meetingtheme}}</p>
                </div>
                <div>
                    <p>会议主要内容: {{selectData.meetingcontent}}</p>
                </div>
                <div>
                    <p>记录人: {{selectData.createpeople}}</p>
                </div>
                <div>
                    <p>是否存档: {{selectData.issubmit}}</p>
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
    name: "MeetingInfo",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/org/meetinginfo/list.action",
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