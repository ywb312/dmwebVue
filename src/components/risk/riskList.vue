<template>
    <div>
        <choice-dept @choiceCompany="getCompany"></choice-dept>
        <SearchBox placeholder="请输入风险点名称搜索" @callback="searchBack"></SearchBox>
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
                        <div
                            class="noFlex"
                            v-for="(n,m) in item.child"
                            :key="m"
                            @click.stop="btnClick(n)"
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
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "riskList",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/risk/info/selectriskreportlist.action",
                obj: {
                    rows: 20
                }
            }
        };
    },
    methods: {
        getRendering(arr) {
            this.setRes(arr).then(res => {
                this.rendering = res;
            });
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.clearData();
        },
        // 选取矿业公司
        getCompany(v) {
            for (const key in v) {
                this.postData.obj[key] = v[key];
            }
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
                _self.$common.comboList({ sourcename: "GKCSLX" })
            ]).then(res => {
                // 如果name,fxtype和上一项的name,fxtype不一致就推入新数组,否则添加子元素
                sortArr.forEach((item, index, arr) => {
                    _self.$common.code2Text(item, "fxtype", res[0]);
                    _self.$common.code2Text(item, "gtype", res[1]);
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
                        let wnameArr = returnArr[nameIndex].child;
                        let wnameIndex = getItem("wname", item.wname, wnameArr);
                        if (wnameIndex >= 0) {
                            // 危险源一致 匹配危险源
                            if (!wnameArr[wnameIndex].child) {
                                wnameArr[wnameIndex].child = [];
                            }
                            wnameArr[wnameIndex].child.push(item);
                        } else if (wnameIndex == -1) {
                            // 危险源不一致 向后新增
                            let obj = this.$common.deepClone(item);
                            obj.child = [this.$common.deepClone(item)];
                            wnameArr.push(obj);
                        }
                    }
                });
                return new Promise(reslove => {
                    reslove(returnArr);
                });
            });
        },
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            this.$router.push({
                path: "/risk/auditDetail"
            });
        }
    },
    components: {
        ViewBox,
        SearchBox,
        choiceDept
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>