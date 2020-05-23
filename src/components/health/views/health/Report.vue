<template>
    <div>
        <SearchBox placeholder="请输入姓名搜索" @callback="searchBack"></SearchBox>
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
                            <p>年度: {{item.year}}</p>
                        </div>
                        <div>
                            <p>部门: {{item.deptid}}</p>
                        </div>
                        <div>
                            <p>职业危害: {{item.professiondamage}}</p>
                        </div>
                        <div>
                            <p>检查机构: {{item.checkDept}}</p>
                        </div>
                        <div>
                            <p>上报状态: {{item.repstate}}</p>
                        </div>
                    </div>
                </div>
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
                    <p>年度: {{selectData.year}}</p>
                </div>
                <div>
                    <p>部门: {{selectData.deptid}}</p>
                </div>
                <div>
                    <p>职业危害: {{selectData.professiondamage}}</p>
                </div>
                <div>
                    <p>检查机构: {{selectData.checkDept}}</p>
                </div>
                <div>
                    <p>上报状态: {{selectData.repstate}}</p>
                </div>
                <div>
                    <p>入职体检人数: {{selectData.newnum}}</p>
                </div>
                <div>
                    <p>换岗体检人数: {{selectData.changenum}}</p>
                </div>
                <div>
                    <p>岗中体检人数: {{selectData.staynum}}</p>
                </div>
                <div>
                    <p>离岗体检人数: {{selectData.leftnum}}</p>
                </div>
                <div>
                    <p>应急体检人数: {{selectData.emergenum}}</p>
                </div>
                <div>
                    <p>总人数: {{selectData.num}}</p>
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
    name: "Report",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/report/list.action",
                obj: {}
            },
            show: false,
            popshow: false,
            actions: [{ name: "查看详情" }, { name: "体检详细名单" }],
            selectData: {}
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
            this.$refs.view.clearData();
        },
        btnClick(obj) {
            this.show = true;
            this.selectData = obj;
        },
        onSelect(item) {
            if (item.name == "查看详情") {
                this.popshow = true;
            } else if (item.name == "体检详细名单") {
                this.$router.push({
                    path: "/health/healthReport",
                    query: {
                        filters: this.selectData.reportid
                    }
                });
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