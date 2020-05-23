<template>
    <div>
        <SearchBox placeholder="请输入计划名称、版本名称搜索" @callback="searchBack"></SearchBox>
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
                                <span class="main_title">计划状态:</span>
                                <span class="main_val">{{item.planstatusText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">创建人:</span>
                                <span class="main_val">{{item.createman}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">创建时间:</span>
                                <span class="main_val">{{item.createtime}}</span>
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
            <div slot="views" class="popup">
                <div>
                    <p>部门: {{selectData.bumen}}</p>
                </div>
                <div>
                    <p>制作人: {{selectData.person}}</p>
                </div>
                <div>
                    <p>测量频率: {{selectData.frequency}}</p>
                </div>
                <div>
                    <p>测量范围位置: {{selectData.location}}</p>
                </div>
                <div>
                    <p>测量标准: {{selectData.standard}}</p>
                </div>
                <div>
                    <p>测量程序: {{selectData.course}}</p>
                </div>
                <div>
                    <p>资源配备: {{selectData.resource}}</p>
                </div>
                <div>
                    <p>测量方法和技术: {{selectData.method}}</p>
                </div>
                <div>
                    <p>测量内容: {{selectData.content}}</p>
                </div>
                <div>
                    <p>测量日期: {{selectData.createDate}}</p>
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
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/eval/evalplan/list.action",
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
                    type: "evalplan"
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
        SearchBox,
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>