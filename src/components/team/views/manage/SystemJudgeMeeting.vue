<template>
    <div>
        <SearchBox placeholder="会议类型,机构/单位/车间,工段/职能班组,班组,会议名称,主持人,会议类型,会议地点" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.meetingname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">机构/单位/车间:</span>
                                <span class="main_val">{{item.dept}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">会议开始时间:</span>
                                <span class="main_val">{{item.meetingbegintime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">会议结束时间:</span>
                                <span class="main_val">{{item.meetingendtime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">主持人:</span>
                                <span class="main_val">{{item.hostman}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">主要参与人员:</span>
                                <span class="main_val">{{item.joinstaff}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">请假或缺席人员:</span>
                                <span class="main_val">{{item.meetingtheme}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">会议主要内容:</span>
                                <span class="main_val">{{item.meetingcontent}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">记录人:</span>
                                <span class="main_val">{{item.createpeople}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">是否存档:</span>
                                <span class="main_val">{{item.issubmit}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">附件名称:</span>
                                <span class="main_val">
                                    <a :href="item.attach?item.attach:''">{{item.attachname}}</a>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "SystemJudgeMeeting",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/systemjudgemeeting/list.action",
                obj: {}
            }
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
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>