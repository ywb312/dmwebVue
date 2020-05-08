<template>
    <div>
        <SearchBox placeholder="请输入要素编码、要素描述搜索" @callback="searchBack"></SearchBox>
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
                                <span class="main_title">一级要素:</span>
                                <span class="main_val">{{item.firstitemText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">二级要素:</span>
                                <span class="main_val">{{item.seconditemText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">PDCA标志:</span>
                                <span class="main_val">{{item.pdcaText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">要素编码:</span>
                                <span class="main_val">{{item.itemcode}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">要素项描述:</span>
                                <span class="main_val">{{item.itemdescribe}}</span>
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
                    <p>一级要素: {{selectData.firstitemText}}</p>
                </div>
                <div>
                    <p>二级要素: {{selectData.seconditemText}}</p>
                </div>
                <div>
                    <p>PDCA标志: {{selectData.pdcaText}}</p>
                </div>
                <div>
                    <p>要素编码: {{selectData.itemcode}}</p>
                </div>
                <div>
                    <p>要素项描述: {{selectData.itemdescribe}}</p>
                </div>
                <div>
                    <p>标准分: {{selectData.standerdscore}}</p>
                </div>
                <div>
                    <p>当前规则数: {{selectData.rulenums}}</p>
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
                url: "biz/eval/items/list.action",
                obj: {}
            },
            show: false,
            popshow: false,
            actions: [{ name: "查看详情" }, { name: "评分规则表" }],
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
            } else if (item.name == "评分规则表") {
                this.$router.push({
                    path: "/performance/doscorerules",
                    query: {
                        filters:
                            "and itemid = '" + this.selectData.itemid + "'",
                        type: "items"
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