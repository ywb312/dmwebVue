<template>
    <div>
        <SearchBox placeholder="请输入承包商名字搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.contractorname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>创建时间: {{item.createtime}}</p>
                        </div>
                        <div>
                            <p>创建人:{{item.createpeople}}</p>
                        </div>
                        <div>
                            <p>修改时间:{{item.edittime}}</p>
                        </div>
                        <div>
                            <p>修改人:{{item.editpeople}}</p>
                        </div>
                        <div>
                            <p>总分:{{item.totalscore}}</p>
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
    name: "ContractorFile",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/OrgcontractorConz/list.action",
                obj: {}
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