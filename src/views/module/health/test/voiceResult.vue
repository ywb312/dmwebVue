<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="工作场所噪声检测结果"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
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
                                <p>车间: {{item.workshop}}</p>
                            </div>
                            <div>
                                <p>作业地点: {{item.location}}</p>
                            </div>
                            <div>
                                <p>声源名称: {{item.voicename}}</p>
                            </div>
                            <div>
                                <p>具体设备: {{item.application}}</p>
                            </div>
                            <div>
                                <p>作业时间: {{item.worktime}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div slot="tip">
                    <van-divider>没有更多数据了</van-divider>
                </div>
            </ViewBox>
        </div>
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
                    <p>车间: {{selectData.workshop}}</p>
                </div>
                <div>
                    <p>作业地点: {{selectData.location}}</p>
                </div>
                <div>
                    <p>声源名称: {{selectData.voicename}}</p>
                </div>
                <div>
                    <p>具体设备: {{selectData.application}}</p>
                </div>
                <div>
                    <p>作业状态: {{selectData.workstate}}</p>
                </div>
                <div>
                    <p>作业时间: {{selectData.worktime}}</p>
                </div>
                <div>
                    <p>个体防护情况: {{selectData.safestate}}</p>
                </div>
                <div>
                    <p>测定结果最低: {{selectData.testmin}}</p>
                </div>
                <div>
                    <p>测定结果最高: {{selectData.testmax}}</p>
                </div>
                <div>
                    <p>leqdb: {{selectData.leqdb}}</p>
                </div>
                <div>
                    <p>是否超限: {{selectData.isover}}</p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import Popup from "@/components/pub/Popup.vue";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "voiceResult",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/voiceresult/list.action",
                obj: {
                    filters: this.$route.query.filters
                }
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