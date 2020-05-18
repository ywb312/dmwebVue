<template>
    <div>
        <SearchBox placeholder="请输入设备名称，设备编号搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.devname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>设备编号: {{item.devcode}}</p>
                        </div>
                        <div>
                            <p>规格型号: {{item.specification}}</p>
                        </div>
                        <div>
                            <p>设备类别: {{item.devtypeText}}</p>
                        </div>
                        <div>
                            <p>使用部门: {{item.deptname}}</p>
                        </div>
                        <div>
                            <p>安装地点: {{item.position}}</p>
                        </div>
                        <div>
                            <p>特种设备属性: {{item.devattributeText}}</p>
                        </div>
                        <div>
                            <p>责任人员: {{item.operateman}}</p>
                        </div>
                        <div>
                            <p>维护保养状态: {{item.maketime}}</p>
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
    name: "Devlist",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/dev/devinfo/dolist.action",
                obj: {
                    "bean.element": this.pageData.element
                }
            },
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            Promise.all([
                _self.$common.comboList({ sourcename: "TZSBSX" }),
                _self.$common.comboList({ sourcename: "SBLB" })
            ]).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "devattribute", res[0]);
                    _self.$common.code2Text(element, "devtype", res[1]);
                });
                _self.rendering = arr;
            });
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