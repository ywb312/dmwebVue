<template>
    <div>
        <SearchBox placeholder="请输入规则描述、事实描述搜索" @callback="searchBack"></SearchBox>
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
                                <span class="main_title">规则描述:</span>
                                <span class="main_val">{{item.ruledescribe}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">事实描述:</span>
                                <span class="main_val">{{item.factdescribe}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">事实结果:</span>
                                <span class="main_val">{{item.finalresult}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">最近更新人:</span>
                                <span class="main_val">{{item.createman}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">最近更新时间:</span>
                                <span class="main_val">{{item.createtime}}</span>
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
                    <p>规则描述: {{selectData.ruledescribe}}</p>
                </div>
                <div>
                    <p>事实调用路径: {{selectData.functionname}}</p>
                </div>
                <div>
                    <p>事实描述: {{selectData.factdescribe}}</p>
                </div>
                <div>
                    <p>事实有效性: {{selectData.vaildtype}}</p>
                </div>
                <div>
                    <p>事实结果: {{selectData.finalresult}}</p>
                </div>
                <div>
                    <p>结果标志: {{selectData.resultflag}}</p>
                </div>
                <div>
                    <p>最近更新人: {{selectData.createman}}</p>
                </div>
                <div>
                    <p>最近更新时间: {{selectData.createtime}}</p>
                </div>
                <div>
                    <p>更新状态: {{selectData.updatenow}}</p>
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
                url: "biz/eval/evalfacts/list.action",
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