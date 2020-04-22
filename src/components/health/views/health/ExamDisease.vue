<template>
    <div>
        <SearchBox placeholder="请输入姓名，部门，岗位，体检结论搜索" @callback="searchBack"></SearchBox>
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
                            <p>体检结论: {{item.eaxmresultText}}</p>
                        </div>
                        <div>
                            <p>结果描述: {{item.resultdetail}}</p>
                        </div>
                        <div>
                            <p>处理意见: {{item.advice}}</p>
                        </div>
                        <div>
                            <p>参检时间: {{item.examtime}}</p>
                        </div>
                        <div>
                            <p>工号: {{item.jobnum}}</p>
                        </div>
                        <div>
                            <p>姓名: {{item.name}}</p>
                        </div>
                        <div>
                            <p>性别: {{item.sexText}}</p>
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
                    <p>体检结论: {{selectData.eaxmresultText}}</p>
                </div>
                <div>
                    <p>结果描述: {{selectData.resultdetail}}</p>
                </div>
                <div>
                    <p>处理意见: {{selectData.advice}}</p>
                </div>
                <div>
                    <p>参检时间: {{selectData.examtime}}</p>
                </div>
                <div>
                    <p>工号: {{selectData.jobnum}}</p>
                </div>
                <div>
                    <p>姓名: {{selectData.name}}</p>
                </div>
                <div>
                    <p>性别: {{selectData.sexText}}</p>
                </div>
                <div>
                    <p>身份证号码: {{selectData.idcard}}</p>
                </div>
                <div>
                    <p>总工龄: {{selectData.age}}</p>
                </div>
                <div>
                    <p>检查机构: {{selectData.checkDept}}</p>
                </div>
                <div>
                    <p>部门: {{selectData.dept}}</p>
                </div>
                <div>
                    <p>联系方式: {{selectData.tel}}</p>
                </div>
                <div>
                    <p>体检类型: {{selectData.examtypeText}}</p>
                </div>
                <div>
                    <p>接触有毒物质: {{selectData.toxictype}}</p>
                </div>
                <div>
                    <p>接触有毒物质时间: {{selectData.touchtoxictime}}</p>
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
    name: "ExamDisease",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/examdetail/list.action",
                obj: {}
            },
            show: false,
            popshow: false,
            actions: [{ name: "查看详情" }],
            selectData: {},
            tjjlArr: [
                {
                    id: "TJJL001",
                    text: "未见异常"
                },
                {
                    id: "TJJL002",
                    text: "复查"
                },
                {
                    id: "TJJL003",
                    text: "疑似职业病"
                },
                {
                    id: "TJJL004",
                    text: "职业禁忌症"
                },
                {
                    id: "TJJL005",
                    text: "其他疾患"
                }
            ],
            tjlxArr: [
                {
                    id: "TJLX002",
                    text: "岗中体检"
                },
                {
                    id: "TJLX004",
                    text: "离岗体检"
                },
                {
                    id: "TJLX005",
                    text: "应急体检"
                },
                {
                    id: "TJLX006",
                    text: "入职体检"
                },
                {
                    id: "TJLX007",
                    text: "换岗体检"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "eaxmresult", this.tjjlArr);
                this.$common.code2Text(element, "examtype", this.tjlxArr);
                this.$common.setSex(element);
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