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
                            <p>检测地点: {{item.monitorSite}}</p>
                        </div>
                        <div>
                            <p>检测内容: {{item.monitorContent}}</p>
                        </div>
                        <div>
                            <p>检测区域运行情况: {{item.monitorFlag}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="tip">
                <van-divider>没有更多数据了</van-divider>
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
                    <p>检测地点: {{selectData.monitorSite}}</p>
                </div>
                <div>
                    <p>检测内容: {{selectData.monitorContent}}</p>
                </div>
                <div>
                    <p>检测区域运行情况: {{selectData.monitorFlag}}</p>
                </div>
                <div>
                    <p>风速(m/s): {{selectData.windSpeed}}</p>
                </div>
                <div>
                    <p>噪声(dB): {{selectData.noise}}</p>
                </div>
                <div>
                    <p>氧气浓度(ppm): {{selectData.ooMmol}}</p>
                </div>
                <div>
                    <p>二氧化硫浓度(ppm): {{selectData.soMmol}}</p>
                </div>
                <div>
                    <p>温度(℃): {{selectData.temp}}</p>
                </div>
                <div>
                    <p>湿度(%rh): {{selectData.humidity}}</p>
                </div>
                <div>
                    <p>粉尘浓度(mg/m3): {{selectData.dustMmol}}</p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "HarmElement",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/ventilateresult/list.action",
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