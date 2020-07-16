<template>
    <div>
        <choice-dept @choiceCompany="getCompany"></choice-dept>
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
                            <p class="main_text">
                                <span class="main_title">隐患名称:</span>
                                <span class="main_val">{{item.crname}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">隐患描述:</span>
                                <span class="main_val">{{item.crdesc}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">隐患类型:</span>
                                <span class="main_val">{{item.prtypeText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">提醒类别:</span>
                                <span class="main_val">{{item.txlb}}</span>
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
                    <p>隐患名称: {{selectData.crname}}</p>
                </div>
                <div>
                    <p>隐患描述: {{selectData.crdesc}}</p>
                </div>
                <div>
                    <p>隐患类型: {{selectData.prtypeText}}</p>
                </div>
                <div>
                    <p>提醒类别: {{selectData.txlb}}</p>
                </div>
                <div>
                    <p>整改单位: {{selectData.zgzrdw}}</p>
                </div>
                <div>
                    <p>验收单位: {{selectData.dwysdw}}</p>
                </div>
                <div>
                    <p>检查人: {{selectData.createid}}</p>
                </div>
                <div>
                    <p>截止日期: {{selectData.jzdate}}</p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import choiceDept from "@/components/pub/choiceDept";
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "dangerNotice",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/im/zdrisknotice/list_notice_two.action",
                obj: {
                    "bean.olddate": 1
                }
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
            arr.forEach(element => {
                if (element.prtype == "YHLX001") {
                    element.prtypeText = "一般隐患";
                } else if (element.prtype == "YHLX002") {
                    element.prtypeText = "重大隐患";
                }
            });
            this.rendering = arr;
        },
        btnClick(obj) {
            this.show = true;
            this.selectData = obj;
        },
        // 选取矿业公司
        getCompany(v) {
            for (const key in v) {
                this.postData.obj[key] = v[key];
            }
            this.$refs.view.clearData();
        },
        onSelect(item) {
            if (item.name == "查看详情") {
                this.popshow = true;
            }
        }
    },
    components: {
        ViewBox,
        Popup,
        choiceDept
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>