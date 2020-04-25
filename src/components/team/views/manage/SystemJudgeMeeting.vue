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
                            <p>机构/单位/车间: {{item.dept}}</p>
                        </div>
                        <div>
                            <p>会议开始时间: {{item.meetingbegintime}}</p>
                        </div>
                        <div>
                            <p>会议结束时间: {{item.meetingendtime}}</p>
                        </div>
                        <div>
                            <p>主持人: {{item.hostman}}</p>
                        </div>
                        <div>
                            <p>主要参与人员: {{item.joinstaff}}</p>
                        </div>
                        <div>
                            <p>请假或缺席人员: {{item.meetingtheme}}</p>
                        </div>
                        <div>
                            <p>会议主要内容: {{item.meetingcontent}}</p>
                        </div>
                        <div>
                            <p>记录人: {{item.createpeople}}</p>
                        </div>
                        <div>
                            <p>是否存档: {{item.issubmit}}</p>
                        </div>
                        <div>
                            <p>
                                附件名称:
                                <a :href="item.attach?item.attach:''">{{item.attachname}}</a>
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