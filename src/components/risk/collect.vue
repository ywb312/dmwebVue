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
                            <p>
                                <span class="main_title">危险源名称:</span>
                                <span class="main_val">{{item.wname}}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>危险源责任单位:</span>
                                <span>{{item.deptname}}</span>
                            </p>
                        </div>
                        <div>
                            <span class="main_title">风险等级:</span>
                            <span class="main_val">
                                <van-tag
                                    size="large"
                                    round
                                    :type="item.grade == 1?'danger':item.grade==2?'warning':'primary'"
                                    :color="item.grade == 3?'yellow':''"
                                >{{item.grade+"级"}}</van-tag>
                            </span>
                        </div>
                        <div>
                            <p>
                                <span class="main_title">项目:</span>
                                <span class="main_val">{{item.project}}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span class="main_title">内容:</span>
                                <span class="main_val">{{item.content}}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span class="main_title">影响范围:</span>
                                <span class="main_val">{{item.yxfwText}}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span class="main_title">可能导致的事故:</span>
                                <span class="main_val">{{item.knfsText}}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span class="main_title">潜在后果:</span>
                                <span class="main_val">{{item.qzhgText}}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span class="main_title">{{item.gtypeText}}:</span>
                                <span class="main_val">{{item.gname}}</span>
                            </p>
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
                _self.$common.comboList({ sourcename: "FXDLX" }),
                _self.$common.comboList({ sourcename: "GKCSLX" })
            ]).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "knfs", res[0]);
                    _self.$common.code2Text(element, "yxfw", res[1]);
                    _self.$common.code2Text(element, "qzhg", res[2]);
                    _self.$common.code2Text(element, "fxtype", res[3]);
                    _self.$common.code2Text(element, "gtype", res[4]);
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
                // 重新获取列表
                this.$refs.view.clearData();
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