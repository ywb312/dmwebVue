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
                    </div>
                    <div class="main">
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td @click="checkDetail(item,'1')">
                                            <span class="dian red">一</span>
                                            <span>{{item.onegrade+"个"}}</span>
                                        </td>
                                        <td @click="checkDetail(item,'2')">
                                            <span class="dian orange">二</span>
                                            <span>{{item.twograde+"个"}}</span>
                                        </td>
                                        <td @click="checkDetail(item,'3')">
                                            <span class="dian yellow">三</span>
                                            <span>{{item.threegrade+"个"}}</span>
                                        </td>
                                        <td @click="checkDetail(item,'4')">
                                            <span class="dian blue">四</span>
                                            <span>{{item.fourgrade+"个"}}</span>
                                        </td>
                                        <td @click="checkDetail(item,'')">
                                            <span class="all">合计</span>
                                            <span>{{item.allgrade+"个"}}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
import choiceDept from "@/components/pub/choiceDept";
export default {
    name: "riskChart",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/risk/info/fxwxytjlist.action",
                obj: {}
            },
            titleText: ""
        };
    },
    methods: {
        // 处理请求的数据
        getRendering(arr) {
            this.rendering = arr;
        },
        // 选取矿业公司
        getCompany(v) {
            let _self = this;
            for (const key in v) {
                this.postData.obj[key] = v[key];
            }
            this.$api.pub
                .showPage("biz/risk/info/fxwxytjByObject.action", {
                    "bean.tablesuffix": v["bean.tablesuffix"]
                })
                .then(res => {
                    _self.titleText = `风险点共${res[0].fxdcount}危险源共${res[0].allgrade},一级${res[0].onegrade},二级${res[0].twograde},三级${res[0].threegrade},四级${res[0].fourgrade}`;
                });
            this.$refs.view.clearData();
        },
        checkDetail(item, param) {
            let _self = this;
            this.$router.push({
                path: "/risk/selcetRisk",
                query: {
                    "bean.tablesuffix": _self.postData.obj["bean.tablesuffix"],
                    "bean.name": item.name,
                    "bean.param": param,
                    rows: 20
                }
            });
        }
    },
    components: {
        ViewBox,
        choiceDept
    }
};
</script>
<style src="@/assets/css/public.css"/>
<style scoped>
table {
    width: 100%;
}
tr {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 6px 0;
}
tr td {
    width: 20%;
    text-align: left;
}
.dian {
    display: block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    color: white;
    text-align: center;
    margin-bottom: 4px;
}
.red {
    background-color: red;
}
.orange {
    background-color: orange;
}
.yellow {
    background-color: yellow;
    color: black;
}
.blue {
    background-color: blue;
}
.all {
    display: block;
    height: 30px;
    line-height: 30px;
    margin-bottom: 4px;
}
</style>