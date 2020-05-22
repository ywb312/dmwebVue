<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+'.'+item.name}}</h4>
                        <p class="main_tag">
                            <van-tag size="large" round type="primary">{{item.fxtypeText}}</van-tag>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <p>
                                <span class="main_title">危险源名称:</span>
                                <span class="main_val">{{item.wname}}</span>
                            </p>
                            <p class="main_tag">
                                <van-tag
                                    size="large"
                                    round
                                    :type="item.grade == 1?'danger':item.grade==2?'warning':'primary'"
                                    :color="item.grade == 3?'yellow':''"
                                >{{item.grade+"级"}}</van-tag>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span class="main_title">危险源责任单位:</span>
                                <span class="main_val">{{item.deptname}}</span>
                            </p>
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
                                <span class="main_title">管控措施类型:</span>
                                <span class="main_val">{{item.gtypeText}}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span class="main_title">管控措施名:</span>
                                <span class="main_val">{{item.gname}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "twoOnrisk",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/risk/info/twoOnrisk.action",
                obj: {}
            }
        };
    },
    methods: {
        getRendering(arr) {
            let _self = this;
            Promise.all([
                _self.$common.comboList({ sourcename: "FXDLX" }),
                _self.$common.comboList({ sourcename: "KNFS" }),
                _self.$common.comboList({ sourcename: "YXFWEI" }),
                _self.$common.comboList({ sourcename: "QZHG" }),
                _self.$common.comboList({ sourcename: "GKCSLX" })
            ]).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "fxtype", res[0]);
                    _self.$common.code2Text(element, "knfs", res[1]);
                    _self.$common.code2Text(element, "yxfw", res[2]);
                    _self.$common.code2Text(element, "qzhg", res[3]);
                    _self.$common.code2Text(element, "gtype", res[4]);
                });
                _self.rendering = arr;
            });
        }
        // btnClick(obj) {
        //     this.$store.commit("getSelectData", obj);
        //     this.$router.push({
        //         path: "/risk/auditDetail"
        //     });
        // }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>