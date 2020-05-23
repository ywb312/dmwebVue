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
            selectData: {}
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            Promise.all([
                _self.$common.comboList({ sourcename: "TJJL" }),
                _self.$common.comboList({ sourcename: "TJLX" })
            ]).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "eaxmresult", res[0]);
                    _self.$common.code2Text(element, "examtype", res[1]);
                    _self.$common.setSex(element);
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