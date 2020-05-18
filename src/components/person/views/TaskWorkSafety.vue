<template>
    <div>
        <SearchBox placeholder="确认标准,适用作业面类型搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="main">
                        <div>
                            <p>确认项目: {{item.itemstypeText}}</p>
                        </div>
                        <div>
                            <p>确认内容: {{item.remark}}</p>
                        </div>
                        <div>
                            <p>确认标准: {{item.itemscontent}}</p>
                        </div>
                        <div>
                            <p>适用作业面类型: {{item.rangetext}}</p>
                        </div>
                        <div>
                            <p>创建人: {{item.createman}}</p>
                        </div>
                        <div>
                            <p>创建时间: {{item.createtime}}</p>
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
    name: "TaskWorkSafety",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/taskworksafetyconfirmitems/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            this.$common.comboList({ sourcename: "QRXMFL" }).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "itemstype", res);
                });
                _self.rendering = arr;
            });
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.cleraData();
        },
        btnClick(obj) {}
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>