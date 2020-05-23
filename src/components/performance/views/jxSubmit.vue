<template>
    <div>
        <SearchBox placeholder="请输入部门名称搜索" @callback="searchBack"></SearchBox>
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
                            <p class="main_text">
                                <span class="main_title">部门:</span>
                                <span class="main_val">{{item.bumen}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">制作人:</span>
                                <span class="main_val">{{item.person}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">测量频率:</span>
                                <span class="main_val">{{item.frequency}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">测量范围位置:</span>
                                <span class="main_val">{{item.location}}</span>
                            </p>
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
                    <p>部门: {{selectData.bumen}}</p>
                </div>
                <div>
                    <p>制作人: {{selectData.person}}</p>
                </div>
                <div>
                    <p>测量频率: {{selectData.frequency}}</p>
                </div>
                <div>
                    <p>测量范围位置: {{selectData.location}}</p>
                </div>
                <div>
                    <p>测量标准: {{selectData.standard}}</p>
                </div>
                <div>
                    <p>测量程序: {{selectData.course}}</p>
                </div>
                <div>
                    <p>资源配备: {{selectData.resource}}</p>
                </div>
                <div>
                    <p>测量方法和技术: {{selectData.method}}</p>
                </div>
                <div>
                    <p>测量内容: {{selectData.content}}</p>
                </div>
                <div>
                    <p>测量日期: {{selectData.createDate}}</p>
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
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/safejxsubmit/list.action",
                obj: {}
            },
            show: false,
            popshow: false,
            actions: [{ name: "查看详情" }],
            selectData: {}
        };
    },
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