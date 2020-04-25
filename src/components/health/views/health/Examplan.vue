<template>
    <div>
        <SearchBox placeholder="请输入姓名搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.planname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>年度: {{item.year}}</p>
                        </div>
                        <div>
                            <p>上报截止日期: {{item.endtime}}</p>
                        </div>
                        <div>
                            <p>
                                附件名称:
                                <a :href="item.attach?item.attach:''">{{item.attachname}}</a>
                            </p>
                        </div>
                        <div>
                            <p>发布单位: {{item.publishdept}}</p>
                        </div>
                        <div>
                            <p>发布人: {{item.publishpeople}}</p>
                        </div>
                        <div>
                            <p>发布时间: {{item.publishtime}}</p>
                        </div>
                        <div>
                            <p>发布状态: {{item.stageText}}</p>
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
        <!-- <Popup :popshow="popshow" @close="popshow=false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>姓名: {{selectData.name}}</p>
                </div>
                <div>
                    <p>培训时间: {{selectData.traDate}}</p>
                </div>
                <div>
                    <p>培训地点: {{selectData.traPlace}}</p>
                </div>
                <div>
                    <p>培训内容: {{selectData.traContent}}</p>
                </div>
                <div>
                    <p>工种: {{selectData.profession}}</p>
                </div>
                <div>
                    <p>出生年月: {{selectData.birthday}}</p>
                </div>
                <div>
                    <p>身份证号: {{selectData.idcard}}</p>
                </div>
                <div>
                    <p>联系号码: {{selectData.phone}}</p>
                </div>
                <div>
                    <p>备注: {{selectData.memo}}</p>
                </div>
            </div>
        </Popup>-->
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "Examplan",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/examplan/list.action",
                obj: {}
            },
            show: false,
            // popshow: false,
            actions: [{ name: "各部门安排" }]
            // selectData: {}
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                if (element.stage == "FBZT001") {
                    element.stageText = "未发布";
                } else if (element.stage == "FBZT002") {
                    element.stageText = "已发布";
                }
            });
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
            if (item.name == "各部门安排") {
                this.$router.push({
                    path: "/health/healthPlan",
                    query: {
                        filters: this.selectData.planid
                    }
                });
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