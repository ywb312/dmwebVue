<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="通风测尘监测数据结果"
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
                                <p>检测地点: {{item.monitorSite}}</p>
                            </div>
                            <div>
                                <p>检测内容: {{item.monitorContent}}</p>
                            </div>
                            <div>
                                <p>检测区域运行情况: {{item.monitorFlag}}</p>
                            </div>
                            <div>
                                <p>断面积(m²): {{item.sectionalArea}}</p>
                            </div>
                            <div>
                                <p>风速(m/s): {{item.windSpeed}}</p>
                            </div>
                            <div>
                                <p>风量(m³/s): {{item.windQuantity}}</p>
                            </div>
                            <div>
                                <p>噪声(dB): {{item.noise}}</p>
                            </div>
                        </div>
                    </div>
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
                    <p>检测地点: {{selectData.monitorSite}}</p>
                </div>
                <div>
                    <p>检测内容: {{selectData.monitorContent}}</p>
                </div>
                <div>
                    <p>检测区域运行情况: {{selectData.monitorFlag}}</p>
                </div>
                <div>
                    <p>断面积(m²): {{selectData.sectionalArea}}</p>
                </div>
                <div>
                    <p>风速(m/s): {{selectData.windSpeed}}</p>
                </div>
                <div>
                    <p>风量(m³/s): {{selectData.windQuantity}}</p>
                </div>
                <div>
                    <p>噪声(dB): {{selectData.noise}}</p>
                </div>
                <div>
                    <p>CO: {{selectData.coMmol}}</p>
                </div>
                <div>
                    <p>NOx: {{selectData.noxMmol}}</p>
                </div>
                <div>
                    <p>H2S: {{selectData.hsMmol}}</p>
                </div>
                <div>
                    <p>O2: {{selectData.ooMmol}}</p>
                </div>
                <div>
                    <p>SO2: {{selectData.soMmol}}</p>
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
import Popup from "@/components/pub/Popup.vue";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "ventilateResult",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/ventilateresult/list.action",
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
            arr.forEach(element => {});
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