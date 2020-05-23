<template>
    <div>
        <SearchBox placeholder="请输入名称、文号、发布单位搜索" @callback="searchBack"></SearchBox>
        <van-tabs type="card" color="#2585cf" @click="ruleActive">
            <van-tab title="我的法律法规馆"></van-tab>
            <van-tab title="法律法规库"></van-tab>
        </van-tabs>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.rulename}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>文号: {{item.fileid}}</p>
                        </div>
                        <div>
                            <p>发布单位: {{item.dept}}</p>
                        </div>
                        <div>
                            <p>有效性: {{item.validityText}}</p>
                        </div>
                        <div>
                            <p>专业类别: {{item.protypeText}}</p>
                        </div>
                        <div>
                            <p>级别: {{item.levelText}}</p>
                        </div>
                        <div>
                            <p>发布日期: {{item.releasedate}}</p>
                        </div>
                        <div>
                            <p>实施日期: {{item.carryoutdate}}</p>
                        </div>
                        <div>
                            <p>文件概要: {{item.filedetail}}</p>
                        </div>
                        <div>
                            <p>发布状态: {{item.stage=="FBZT001"?"未发布":"已发布"}}</p>
                        </div>
                        <div>
                            <p>
                                附件名称:
                                <a :href="item.attach?item.attach:''">{{item.attachname}}</a>
                            </p>
                        </div>
                        <div>
                            <p>附件制作人:{{item.makeman}}</p>
                        </div>
                        <div>
                            <p>附件制作时间:{{item.maketime}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "Rules",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/rule/rules/mylist.action",
                obj: {
                    "bean.element": this.pageData.element
                }
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            Promise.all([
                _self.$common.comboList({ sourcename: "FLFGZYLB" }),
                _self.$common.comboList({ sourcename: "FLFGYXX" }),
                _self.$common.comboList({ sourcename: "FLFGJB" })
            ]).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "protype", res[0]);
                    _self.$common.code2Text(element, "validity", res[1]);
                    _self.$common.code2Text(element, "level", res[2]);
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
        // 法律法规库
        ruleActive(name) {
            if (name == 0) {
                this.postData.url = "biz/operate/rule/rules/mylist.action";
            } else {
                this.postData.url = "biz/operate/rule/rules/list.action";
            }
            this.rendering = [];
            this.$refs.view.clearData();
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>