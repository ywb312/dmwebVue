<template>
    <div>
        <SearchBox placeholder="请输入文件编号,要素号,文件名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.filename}}</h4>
                        <van-tag round type="primary">{{item.releastateText}}</van-tag>
                    </div>
                    <div class="main">
                        <div>
                            <p>要素号: {{item.elemcode}}</p>
                        </div>
                        <div>
                            <p>文件级别: {{item.filedegree}}</p>
                        </div>
                        <div>
                            <p>文件编号: {{item.filecode}}</p>
                        </div>
                        <div>
                            <p>模板名:{{item.templatename}}</p>
                        </div>
                        <div>
                            <p>创建单位:{{item.createdept}}</p>
                        </div>
                        <div>
                            <p>创建人:{{item.createman}}</p>
                        </div>
                        <div>
                            <p>创建时间:{{item.createtime}}</p>
                        </div>
                        <div>
                            <p>最后修改时间:{{item.lastmoditime}}</p>
                        </div>
                        <div>
                            <p>责任人:{{item.respname}}</p>
                            <van-tag round type="primary">{{item.createstage}}</van-tag>
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
    name: "FileList",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    created() {
        // 安全管理体系文件清单维护
        if (this.pageData.id == "filelist") {
            this.postData.url = "biz/create/filelist/dolist.action";
            // 安全生产责任制清单维护
        } else if (this.pageData.id == "safprodclist") {
            this.postData.url = "biz/create/safprodclist/dolist.action";
            // 安全操作规程清单维护
        } else if (this.pageData.id == "safoperulelist") {
            this.postData.url = "biz/create/safoperulelist/dolist.action";
            // 作业指导书清单维护
        } else if (this.pageData.id == "opeinstrulist") {
            this.postData.url = "biz/create/opeinstrulist/dolist.action";
        }
    },
    methods: {
        getRendering(arr) {
            arr.forEach(item => {
                if (item.releastate == "FPZT001") {
                    item.releastateText = "未分配";
                } else if (item.releastate == "FPZT002") {
                    item.releastateText = "已分配";
                }
            });
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