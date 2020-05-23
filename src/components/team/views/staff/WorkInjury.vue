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
                            <p class="main_text">
                                <span class="main_title">片号:</span>
                                <span class="main_val">{{item.number}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">姓名:</span>
                                <span class="main_val">{{item.name}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">性别:</span>
                                <span class="main_val">{{item.sexText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">单位:</span>
                                <span class="main_val">{{item.danwei}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">工种:</span>
                                <span class="main_val">{{item.profession}}</span>
                            </p>
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
        <Popup :popshow="popshow" @close="popshow=false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>片号: {{selectData.number}}</p>
                </div>
                <div>
                    <p>姓名: {{selectData.name}}</p>
                </div>
                <div>
                    <p>性别: {{selectData.sexText}}</p>
                </div>
                <div>
                    <p>单位: {{selectData.danwei}}</p>
                </div>
                <div>
                    <p>出生年月: {{selectData.birthday}}</p>
                </div>
                <div>
                    <p>籍贯: {{selectData.place}}</p>
                </div>
                <div>
                    <p>工种: {{selectData.profession}}</p>
                </div>
                <div>
                    <p>本工种工龄: {{selectData.age}}</p>
                </div>
                <div>
                    <p>累计接尘毒工龄: {{selectData.cdage}}</p>
                </div>
                <div>
                    <p>开始接尘毒年月: {{selectData.recordman}}</p>
                </div>
                <div>
                    <p>查体情况: {{selectData.situation}}</p>
                </div>
                <div>
                    <p>备注: {{selectData.memo}}</p>
                </div>
                <div>
                    <p>填表日期: {{selectData.tbdate}}</p>
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
    name: "WorkInjury",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/workinjury/list.action",
                obj: {}
            },
            sheetShow: false,
            actions: [{ name: "查看详情" }],
            popshow: false,
            selectData: {}
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.setSex(element);
            });
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.clearData();
        },
        btnClick(obj) {
            this.selectData = obj;
            this.sheetShow = true;
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