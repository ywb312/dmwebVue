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
                    <div class="main">
                        <div>
                            <p>
                                <span>预警内容:</span>
                                {{item.warmcontent}}
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>预警级别:</span>
                                {{item.warmlevel}}
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>发布时间:</span>
                                {{item.addtime}}
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>预警状态:</span>
                                {{item.warmstatus}}
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
                    <p>
                        <span>风险点:</span>
                        {{selectData.fxdText}}
                    </p>
                </div>
                <div>
                    <p>
                        <span>危险源:</span>
                        {{selectData.wxyText}}
                    </p>
                </div>
                <div>
                    <p>
                        <span>管控措施:</span>
                        {{selectData.gkcsText}}
                    </p>
                </div>
                <div>
                    <p>
                        <span>预警级别:</span>
                        {{selectData.warmlevel}}
                    </p>
                </div>
                <div>
                    <p>
                        <span>发布时间:</span>
                        {{selectData.addtime}}
                    </p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "WarningInfo",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/tm/warninginfo/list.action",
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
        btnClick(obj) {
            this.show = true;
            this.selectData = obj;
        },
        onSelect(item) {
            if (item.name == "查看详情") {
                let warmArr = this.selectData.warmcontent.split("-");
                this.selectData.fxdText = warmArr[0];
                if (warmArr[1]) {
                    this.selectData.wxyText = warmArr[1];
                }
                if (warmArr[2]) {
                    this.selectData.gkcsText = warmArr[2];
                }
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
<style scoped>
.main span,
.popup span {
    font-weight: bold;
}
</style>