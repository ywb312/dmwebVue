<template>
    <div>
        <SearchBox placeholder="设备编号,资产编号,设备设施类型,设备名称,型号规格,制造厂,使用部门,管理责任人" @callback="searchBack"></SearchBox>
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
                            <p>设备编号: {{item.equipid}}</p>
                        </div>
                        <div>
                            <p>设备名称: {{item.equipname}}</p>
                        </div>
                        <div>
                            <p>型号规格: {{item.modeltype}}</p>
                        </div>
                        <div>
                            <p>使用部门: {{item.dept}}</p>
                        </div>
                        <div>
                            <p>制造厂: {{item.makefactory}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="tip">
                <van-divider>没有更多数据了</van-divider>
            </div>
        </ViewBox>
        <!-- 操作面板 -->
        <van-action-sheet
            v-model="show"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />
        <!-- 弹窗组件 -->
        <Popup :popshow="popshow" @close="popshow=false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>设备编号: {{selectData.equipid}}</p>
                </div>
                <div>
                    <p>设备名称: {{selectData.equipname}}</p>
                </div>
                <div>
                    <p>型号规格: {{selectData.modeltype}}</p>
                </div>
                <div>
                    <p>使用部门: {{selectData.dept}}</p>
                </div>
                <div>
                    <p>制造厂: {{selectData.makefactory}}</p>
                </div>
                <div>
                    <p>原值: {{selectData.num}}</p>
                </div>
                <div>
                    <p>装机功率: {{selectData.power}}</p>
                </div>
                <div>
                    <p>投产日期: {{selectData.usetime}}</p>
                </div>
                <div>
                    <p>管理责任人: {{selectData.dutypeople}}</p>
                </div>
                <div>
                    <p>危害因素: {{selectData.prodanger}}</p>
                </div>
                <div>
                    <p>核元素: {{selectData.nuclear}}</p>
                </div>
                <div>
                    <p>活度: {{selectData.activitynum}}</p>
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
    name: "Equip",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/equip/list.action",
                obj: {}
            },
            selectData: {},
            // 底部面板
            show: false,
            actions: [{ name: "查看详情" }],
            // 查看详情弹窗
            popshow: false
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
        },
        btnClick(obj) {
            this.show = true;
            this.selectData = obj;
        },
        onSelect(item) {
            if (item.name == "查看详情") {
                this.popshow = true;
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