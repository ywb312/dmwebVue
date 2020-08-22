<template>
    <div>
        <choice-dept @choiceCompany="getCompany"></choice-dept>
        <ViewBox
            :postData="postData"
            ref="view"
            @getRendering="getRendering"
            :titleText="titleText"
        >
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+'.'+item.name}}</h4>
                        <p class="main_tag">
                            <van-tag size="large" round type="primary">{{item.fxtypeText}}</van-tag>
                        </p>
                    </div>
                    <div class="main">
                        <div
                            class="noFlex"
                            v-for="(n,m) in item.child"
                            :key="m"
                        >
                            <div>
                                <p>
                                    <span class="main_title bold">{{"("+(m+1)+")"+n.wname}}</span>
                                </p>
                                <p>
                                    <van-tag
                                        size="large"
                                        round
                                        :type="n.grade == 1?'danger':n.grade==2?'warning':'primary'"
                                        :color="n.grade == 3?'yellow':''"
                                    >{{n.grade+"级"}}</van-tag>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span class="main_title">责任单位:</span>
                                    <span class="main_val">{{n.deptname}}</span>
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
                            <div v-for="(key,val) in n.child" :key="val">
                                <p>
                                    <span class="main_title">{{key.gtypeText+":"}}</span>
                                    <span class="main_val">{{key.gname}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import choiceDept from "@/components/pub/choiceDept";
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
            },
            titleText: ""
        };
    },
    methods: {
        getRendering(arr) {
            this.setRes(arr).then(res => {
                this.rendering = res;
            });
        },
        // 选取矿业公司
        getCompany(v) {
            for (const key in v) {
                this.postData.obj[key] = v[key];
            }
            this.$api.pub
                .showPage("biz/risk/info/fxwxytjByObject.action", {
                    "bean.tablesuffix": v["bean.tablesuffix"]
                })
                .then(res => {
                    _self.titleText = `一级${res[0].onegrade},二级${res[0].twograde}`;
                });
            this.$refs.view.clearData();
        },
        // 设置返还参数
        setRes(res) {
            let _self = this;
            let returnArr = [];
            // 先对数组进行排序
            let sortArr = res.sort((a, b) => {
                return a.name > b.name ? 1 : -1;
            });
            function getItem(key, val, arr) {
                return arr.findIndex(item => item[key] == val);
            }
            return Promise.all([
                _self.$common.comboList({ sourcename: "FXDLX" }),
                _self.$common.comboList({ sourcename: "KNFS" }),
                _self.$common.comboList({ sourcename: "YXFWEI" }),
                _self.$common.comboList({ sourcename: "QZHG" }),
                _self.$common.comboList({ sourcename: "GKCSLX" })
            ]).then(res => {
                // 如果name,fxtype和上一项的name,fxtype不一致就推入新数组,否则添加子元素
                sortArr.forEach((item, index, arr) => {
                    _self.$common.code2Text(item, "fxtype", res[0]);
                    _self.$common.code2Text(item, "knfs", res[1]);
                    _self.$common.code2Text(item, "yxfw", res[2]);
                    _self.$common.code2Text(item, "qzhg", res[3]);
                    _self.$common.code2Text(item, "gtype", res[4]);
                    let nameIndex = getItem("name", item.name, returnArr);
                    if (nameIndex == -1) {
                        // 风险点不一致 向后新增
                        // 深拷贝
                        let obj = this.$common.deepClone(item);
                        // 加入到其危险源
                        obj.child = [this.$common.deepClone(item)];
                        // 加入到其管控措施
                        obj.child[0].child = [this.$common.deepClone(item)];
                        // 推入数组
                        returnArr.push(obj);
                    } else if (nameIndex >= 0) {
                        // 风险点一致 匹配危险源
                        let deptnameArr = returnArr[nameIndex].child;
                        let deptnameIndex = getItem(
                            "wname",
                            item.wname,
                            deptnameArr
                        );
                        if (deptnameIndex >= 0) {
                            // 危险源一致 匹配危险源
                            if (!deptnameArr[deptnameIndex].child) {
                                deptnameArr[deptnameIndex].child = [];
                            }
                            deptnameArr[deptnameIndex].child.push(item);
                        } else if (deptnameIndex == -1) {
                            // 危险源不一致 向后新增
                            let obj = this.$common.deepClone(item);
                            obj.child = [this.$common.deepClone(item)];
                            deptnameArr.push(obj);
                        }
                    }
                });
                return new Promise(reslove => {
                    reslove(returnArr);
                });
            });
        }
    },
    components: {
        ViewBox,
        choiceDept
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>