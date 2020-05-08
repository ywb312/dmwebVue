<template>
    <div>
        <SearchBox placeholder="请输入版本名称搜索" @callback="searchBack"></SearchBox>
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
                                <span class="main_title">版本号:</span>
                                <span class="main_val">{{item.versioncode}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">版本名称:</span>
                                <span class="main_val">{{item.versionname}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">开始有效日期:</span>
                                <span class="main_val">{{item.starttime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">失效日期:</span>
                                <span class="main_val">{{item.endtime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">版本描述:</span>
                                <span class="main_val">{{item.versiondescribe}}</span>
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
                    <p>版本号: {{selectData.versioncode}}</p>
                </div>
                <div>
                    <p>版本名称: {{selectData.versionname}}</p>
                </div>
                <div>
                    <p>开始有效日期: {{selectData.starttime}}</p>
                </div>
                <div>
                    <p>失效日期: {{selectData.endtime}}</p>
                </div>
                <div>
                    <p>版本描述: {{selectData.versiondescribe}}</p>
                </div>
                <div>
                    <p>版本状态: {{selectData.versionstatus}}</p>
                </div>
                <div>
                    <p>创建时间: {{selectData.createtime}}</p>
                </div>
                <div>
                    <p>创建人: {{selectData.createman}}</p>
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
                url: "biz/eval/version/list.action",
                obj: {}
            },
            show: false,
            popshow: false,
            actions: [{ name: "查看详情" }, { name: "要素内容" }],
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
            }else if (item.name == "要素内容") {
                this.$router.push({
                    path: "/performance/doscorerules",
                    query: {
                        filters:
                            "and versionid = '" + this.selectData.versionid + "'",
                        type: "version"
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