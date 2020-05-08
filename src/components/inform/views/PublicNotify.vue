<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.title}}</h4>
                        <p class="main_tag">
                            <van-tag size="large" round type="primary">{{item.notiftype}}</van-tag>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">审核人:</span>
                                <span class="main_val">{{item.checkman}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">发布单位:</span>
                                <span class="main_val">{{item.createdept}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">发布时间:</span>
                                <span class="main_val">{{item.createtime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">修改时间:</span>
                                <span class="main_val">{{item.modifytime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">审核时间:</span>
                                <span class="main_val">{{item.checktime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">消息内容:</span>
                                <span class="main_val van-ellipsis">{{item.content}}</span>
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
            <div slot="views" class="popup" v-html="selectData.content"></div>
        </Popup>
    </div>
</template>
<script>
// 这是基本渲染功能的组件
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "PublicNotify",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/pub/publicnotify/list.action",
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
        getRendering(v) {
            this.rendering = v;
        },
        //正则去掉所有的html标记
        delHtmlTag(str) {
            str = str.replace(/&nbsp/g, "");
            return str.replace(/<[^>]+>/g, "");
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
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>