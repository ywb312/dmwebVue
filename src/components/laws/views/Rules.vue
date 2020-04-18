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
            <div slot="tip">
                <van-divider>没有更多数据了</van-divider>
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
            },
            // 专业类别
            flfgzylbArr: [
                {
                    id: "FLFGZYLB001",
                    text: "综合"
                },
                {
                    id: "FLFGZYLB002",
                    text: "劳动保护"
                },
                {
                    id: "FLFGZYLB003",
                    text: "环境保护"
                },
                {
                    id: "FLFGZYLB004",
                    text: "消防安全"
                },
                {
                    id: "FLFGZYLB005",
                    text: "应急管理"
                },
                {
                    id: "FLFGZYLB006",
                    text: "防汛防旱"
                },
                {
                    id: "FLFGZYLB007",
                    text: "交通安全"
                },
                {
                    id: "FLFGZYLB008",
                    text: "安全"
                },
                {
                    id: "FLFGZYLB009",
                    text: "危险物品"
                },
                {
                    id: "FLFGZYLB010",
                    text: "设备设施"
                },
                {
                    id: "FLFGZYLB011",
                    text: "电气安全"
                },
                {
                    id: "FLFGZYLB012",
                    text: "职业卫生"
                },
                {
                    id: "FLFGZYLB013",
                    text: "其他"
                }
            ],
            // 有效性
            flfgyxxArr: [
                {
                    text: "尚未实施",
                    id: "FLFGYXX001"
                },
                {
                    text: "现行有效",
                    id: "FLFGYXX002"
                },
                {
                    text: "废止",
                    id: "FLFGYXX003"
                }
            ],
            // 法律法规级别
            flfgjb: [
                {
                    text: "法律",
                    id: "FLFGJB001"
                },
                {
                    text: "行政法规",
                    id: "FLFGJB002"
                },
                {
                    text: "地方法规",
                    id: "FLFGJB003"
                },
                {
                    text: "部门规章",
                    id: "FLFGJB004"
                },
                {
                    text: "国家和行业标准",
                    id: "FLFGJB005"
                },
                {
                    text: "规范性文件及其他要求",
                    id: "FLFGJB006"
                },
                {
                    text: "国际公约",
                    id: "FLFGJB007"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "protype", this.flfgzylbArr);
                this.$common.code2Text(element, "validity", this.flfgyxxArr);
                this.$common.code2Text(element, "level", this.flfgjb);
            });
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.cleraData();
        },
        // 法律法规库
        ruleActive(name) {
            if (name == 0) {
                this.postData.url = "biz/operate/rule/rules/mylist.action";
            } else {
                this.postData.url = "biz/operate/rule/rules/list.action";
            }
            this.rendering = [];
            this.$refs.view.cleraData();
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>