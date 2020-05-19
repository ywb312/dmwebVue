<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+'.'+item.name}}</h4>
                        <p style="min-width:40px">
                            <van-tag size="large" round type="primary">{{item.fxtypeText}}</van-tag>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <span>危险源名称: {{item.wname}}</span>
                        </div>
                        <div>
                            <span>危险源责任单位: {{item.deptname}}</span>
                        </div>
                        <div>
                            <span>
                                风险等级:
                                <van-tag
                                    size="large"
                                    round
                                    :type="item.grade == 1?'danger':item.grade==2?'warning':'primary'"
                                    :color="item.grade == 3?'yellow':''"
                                >{{item.grade+"级"}}</van-tag>
                            </span>
                        </div>
                        <div>
                            <span>项目: {{item.project}}</span>
                        </div>
                        <div>
                            <span>内容: {{item.content}}</span>
                        </div>
                        <div>
                            <span>影响范围: {{item.yxfwText}}</span>
                        </div>
                        <div>
                            <span>可能导致的事故: {{item.knfsText}}</span>
                        </div>
                        <div>
                            <span>潜在后果: {{item.qzhgText}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 新增按钮 -->
        <div>
            <van-button class="btn" type="info" size="large" @click="upAffirm">提交辨识</van-button>
        </div>
    </div>
</template>

<script>
// 这是基本渲染功能的组件 公用
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    data() {
        return {
            rendering: [],
            postData: {
                url: "",
                obj: {}
            },
            upUrl: ""
        };
    },
    created() {
        if (this.pageData.id == "reportrisk") {
            this.postData.url = "biz/risk/info/selectreportlist.action";
            this.upUrl = "biz/risk/audit/doallaudit.action";
        } else if (this.pageData.id == "reporpjtrisk") {
            this.postData.url = "biz/risk/companyRisk/reportpjlist.action";
            this.upUrl = "biz/risk/audit/doAddgSave.action";
        }
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        // 处理请求的数据
        getRendering(arr) {
            let _self = this;
            Promise.all([
                _self.$common.comboList({ sourcename: "KNFS" }),
                _self.$common.comboList({ sourcename: "YXFWEI" }),
                _self.$common.comboList({ sourcename: "QZHG" }),
                _self.$common.comboList({ sourcename: "FXDLX" })
            ]).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "knfs", res[0]);
                    _self.$common.code2Text(element, "yxfw", res[1]);
                    _self.$common.code2Text(element, "qzhg", res[2]);
                    _self.$common.code2Text(element, "fxtype", res[3]);
                });
                _self.rendering = arr;
            });
        },
        // 提交辨识
        upAffirm() {
            this.$api.pub.showPage(this.upUrl, {}).then(res => {
                // 数据有误
                let data = eval("(" + res + ")");
                // 数据有误
                if (!data.success) {
                    this.$toast(data.errormessage);
                    return;
                }
                this.$toast({
                    message: "提交成功",
                    position: "bottom"
                });
            });
        }
    },
    computed: {},
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>