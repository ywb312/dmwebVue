<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+'.'+item.name}}</h4>
                        <p style="min-width:40px">
                            <van-tag size="large" round type="primary">{{item.fxtypeText}}</van-tag>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <span>1.{{item.wname}}</span>
                            <span>
                                <van-tag
                                    size="large"
                                    round
                                    :type="item.grade == 1?'danger':item.grade==2?'warning':'primary'"
                                    :color="item.grade == 3?'yellow':''"
                                >{{item.grade+"级"}}</van-tag>
                            </span>
                        </div>
                        <div v-for="(n,m) in item.child" :key="m">
                            <span>{{m+2+"."+n.wname}}</span>
                            <span>
                                <van-tag
                                    size="large"
                                    round
                                    :type="n.grade == 1?'danger':n.grade==2?'warning':'primary'"
                                    :color="item.grade == 3?'yellow':''"
                                >{{n.grade+"级"}}</van-tag>
                            </span>
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
    name: "riskList",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/risk/info/selectriskreportlist.action",
                obj: {}
            }
        };
    },
    methods: {
        getRendering(arr) {
            this.rendering = this.setRes(arr);
        },
        // 设置返还参数
        setRes(res) {
            let self = this;
            let returnArr = [];
            // 先对数组进行排序
            let sortArr = res.sort((a, b) => {
                return a.name > b.name ? 1 : -1;
            });
            this.$common.comboList({ sourcename: "FXDLX" }).then(res => {
                // 如果name,fxtype和上一项的name,fxtype不一致就推入新数组,否则添加子元素
                sortArr.forEach((item, index, arr) => {
                    self.$common.code2Text(item, "fxtype", res);
                    if (index == 0) {
                        item.child = [];
                        returnArr.push(item);
                    } else if (
                        item.name == arr[index - 1].name &&
                        item.fxtype == arr[index - 1].fxtype
                    ) {
                        returnArr[returnArr.length - 1].child.push(item);
                    } else {
                        item.child = [];
                        returnArr.push(item);
                    }
                });
            });
            return returnArr;
        },
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            this.$router.push({
                path: "/risk/auditDetail"
            });
        }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>