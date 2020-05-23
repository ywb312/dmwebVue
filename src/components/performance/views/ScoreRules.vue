<template>
    <div>
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
                            <p class="main_text">
                                <span class="main_title">版本名称:</span>
                                <span class="main_val">{{item.versioncode}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">开始时间:</span>
                                <span class="main_val">{{item.starttime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">结束时间:</span>
                                <span class="main_val">{{item.endtime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">标准总分:</span>
                                <span class="main_val">{{item.allstandscore}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">实际总得分:</span>
                                <span class="main_val">{{item.allnowscore}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">百分制:</span>
                                <span class="main_val">{{item.nowpercent}}</span>
                            </p>
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
            <div slot="views" class="popup"></div>
        </Popup>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/eval/evalplan/listbyscore.action",
                obj: {}
            },
            show: false,
            popshow: false,
            actions: [{ name: "查看详情" }],
            selectData: {}
        };
    },
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                if (element.planstatus == "KHZT001") {
                    element.planstatusText = "未开始";
                } else if (element.planstatus == "KHZT002") {
                    element.planstatusText = "正在进行";
                } else if (element.planstatus == "KHZT003") {
                    element.planstatusText = "已结束";
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
            // this.show = true;
            this.selectData = obj;
            this.$router.push({
                path: "/performance/doscorerules",
                query: {
                    filters:
                        "and t_eval_doscorerules.planid = '" +
                        this.selectData.planid +
                        "'",
                    type: "scorerules"
                }
            });
        },
        onSelect(item) {
            if (item.name == "查看详情") {
                this.popshow = true;
            }
        }
    },
    components: {
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>