<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
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
export default {
    name: "riskChart",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/risk/info/fxwxytjlist.action",
                obj: {},
            },
        };
    },
    methods: {
        // 处理请求的数据
        getRendering(arr) {
            this.rendering = arr;
        },
        checkDetail(item, param) {
            let _self = this;
            this.$router.push({
                path: "/risk/selcetRisk",
                query: {
                    "bean.name": item.name,
                    "bean.param": param,
                    rows: 20,
                },
            });
        },
    },
    components: {
        ViewBox,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>
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