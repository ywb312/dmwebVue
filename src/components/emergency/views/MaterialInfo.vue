<template>
    <div>
        <SearchBox placeholder="请输入物资名称/责任人搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.storeplace}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>资源类型: {{item.materialtypeText}}</p>
                        </div>
                        <div>
                            <p>责任单位: {{item.respdept}}</p>
                        </div>
                        <div>
                            <p>责任人: {{item.respman}}</p>
                        </div>
                        <div>
                            <p>状态: {{item.isok=="0"?"已报废":"未报废"}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 操作面板 -->
        <van-action-sheet
            v-model="sheetShow"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />
        <!-- 弹窗组件 -->
        <Popup :popshow="detailShow" @close="detailShow=false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>资源名称: {{selectData.materialmodule}}</p>
                </div>
                <div>
                    <p>资源类型: {{selectData.materialtypeText}}</p>
                </div>
                <div>
                    <p>规格参数: {{selectData.materialpara}}</p>
                </div>
                <div>
                    <p>数量/单位: {{selectData.materialnums+"/"+selectData.materialunitText}}</p>
                </div>
                <div>
                    <p>存放地点: {{selectData.storeplace}}</p>
                </div>
                <div>
                    <p>责任单位: {{selectData.respdept}}</p>
                </div>
                <div>
                    <p>责任人: {{selectData.respman}}</p>
                </div>
                <div>
                    <p>出厂日期: {{selectData.materialborn}}</p>
                </div>
                <div>
                    <p>下次检查日期: {{selectData.materialcheck}}</p>
                </div>
                <div>
                    <p>报废状态: {{selectData.isok=="0"?"已报废":"未报废"}}</p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "MaterialInfo",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/eme/materialinfo/list.action",
                obj: {
                    "bean.element": this.pageData.element,
                    "bean.param": ""
                }
            },
            // 查找组件的显示
            sheetShow: false,
            actions: [{ name: "查看详情" }],
            detailShow: false,
            selectData: {},
            materialtypeArr: [
                { id: "WZZBLX001", text: "防护用品" },
                { id: "WZZBLX002", text: "生命救助" },
                { id: "WZZBLX003", text: "生命支持" },
                { id: "WZZBLX004", text: "临时住宿" },
                { id: "WZZBLX005", text: "通讯广播" },
                { id: "WZZBLX006", text: "污染清理" },
                { id: "WZZBLX007", text: "动力燃料" },
                { id: "WZZBLX008", text: "器材工具" },
                { id: "WZZBLX009", text: "工程设备" },
                { id: "WZZBLX010", text: "矿山救援" }
            ],
            materialArr: [
                { id: "DW001", text: "万元" },
                { id: "DW002", text: "元" },
                { id: "DW003", text: "m" },
                { id: "DW004", text: "m3" },
                { id: "DW005", text: "根" },
                { id: "DW006", text: "台" },
                { id: "DW007", text: "kg" },
                { id: "DW008", text: "t" },
                { id: "DW009", text: "套" },
                { id: "DW010", text: "个" }
            ]
        };
    },
    created() {},
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(
                    element,
                    "materialtype",
                    this.materialtypeArr
                );
                this.$common.code2Text(
                    element,
                    "materialunit",
                    this.materialArr
                );
            });
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.cleraData();
        },
        btnClick(obj) {
            this.selectData = obj;
            this.sheetShow = true;
        },
        onSelect(item) {
            if (item.name == "查看详情") {
                this.detailShow = true;
            }
        }
    },
    components: {
        SearchBox,
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>