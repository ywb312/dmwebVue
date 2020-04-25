<template>
    <div>
        <SearchBox placeholder="请输入名称搜索" @callback="searchBack"></SearchBox>
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
                            <p>名称: {{item.name}}</p>
                        </div>
                        <div>
                            <p>位置: {{item.position}}</p>
                        </div>
                        <div>
                            <p>建设时间: {{item.builddate}}</p>
                        </div>
                        <div>
                            <p>改扩建时间: {{item.modifydate}}</p>
                        </div>
                        <div>
                            <p>场所类型: {{item.type}}</p>
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
                    <p>名称: {{selectData.name}}</p>
                </div>
                <div>
                    <p>位置: {{selectData.position}}</p>
                </div>
                <div>
                    <p>建设时间: {{selectData.builddate}}</p>
                </div>
                <div>
                    <p>改扩建时间: {{selectData.modifydate}}</p>
                </div>
                <div>
                    <p>场所类型: {{selectData.type}}</p>
                </div>
                <div>
                    <p>消防设施情况: {{selectData.xfseflag}}</p>
                </div>
                <div>
                    <p>管控手段: {{selectData.controlflag}}</p>
                </div>
                <div>
                    <p>管控部门: {{selectData.mangedept}}</p>
                </div>
                <div>
                    <p>统计人: {{selectData.statisman}}</p>
                </div>
                <div>
                    <p>统计时间: {{selectData.statisdate}}</p>
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
    name: "DangerPlace",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/dangerplace/list.action",
                obj: {}
            },
            show: false,
            popshow: false,
            actions: [{ name: "查看详情" }],
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