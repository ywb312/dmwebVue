<template>
    <div>
        <SearchBox placeholder="请输入设备名称，设备编号搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.devcode}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>设备名称: {{item.devname}}</p>
                        </div>
                        <div>
                            <p>规格型号: {{item.testresult}}</p>
                        </div>
                        <div>
                            <p>安装使用时间: {{item.installtime}}</p>
                        </div>
                        <div>
                            <p>使用单位: {{item.usedept}}</p>
                        </div>
                        <div>
                            <p>检验检测时间: {{item.testtime}}</p>
                        </div>
                        <div>
                            <p>检验检测单位: {{item.testdept}}</p>
                        </div>
                        <div>
                            <p>检验检测结果: {{item.testresult=="1"?"合格":"不合格"}}</p>
                        </div>
                        <div>
                            <p>下次检验时间: {{item.totalcost}}</p>
                        </div>
                        <div>
                            <p>提交状态: {{item.source}}</p>
                        </div>
                        <div>
                            <p>
                                附件名称:
                                <a :href="item.attach?item.attach:''">{{item.attachname}}</a>
                            </p>
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
    name: "DevPurchase",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/devpurchase/list.action",
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
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
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