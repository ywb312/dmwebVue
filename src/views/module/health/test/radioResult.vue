<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="放射源放射性检测结果"
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
                                <p>核素名称: {{item.nuclidename}}</p>
                            </div>
                            <div>
                                <p>活度: {{item.activity}}</p>
                            </div>
                            <div>
                                <p>购源时间: {{item.bugtime}}</p>
                            </div>
                            <div>
                                <p>贮存情况: {{item.storage}}</p>
                            </div>
                            <div>
                                <p>类别: {{item.type}}</p>
                            </div>
                            <div>
                                <p>用途: {{item.purpose}}</p>
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
                    <p>核素名称: {{selectData.nuclidename}}</p>
                </div>
                <div>
                    <p>活度: {{selectData.activity}}</p>
                </div>
                <div>
                    <p>购源时间: {{selectData.bugtime}}</p>
                </div>
                <div>
                    <p>贮存情况: {{selectData.storage}}</p>
                </div>
                <div>
                    <p>类别: {{selectData.type}}</p>
                </div>
                <div>
                    <p>用途: {{selectData.purpose}}</p>
                </div>
                <div>
                    <p>场所: {{selectData.address}}</p>
                </div>
                <div>
                    <p>5厘米处值(μSv/h): {{selectData.num50cm}}</p>
                </div>
                <div>
                    <p>1米处值(μSv/h): {{selectData.num1m}}</p>
                </div>
                <div>
                    <p>周围环境值(μSv/h): {{selectData.envirnum}}</p>
                </div>
                <div>
                    <p>设备运行是否正常: {{selectData.isnormalText}}</p>
                </div>
                <div>
                    <p>判断结果: {{selectData.isover}}</p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import Popup from "@/components/pub/Popup.vue";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "radioResult",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/radioresult/list.action",
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
            arr.forEach(element => {
                //    this.$common.setSex(element);
                //     this.$common.code2Text(element, "edugrade", this.xlArr);
                if (element.storage == "HSZCQK001") {
                    element.storageText = "合格";
                } else if (element.storage == "HSZCQK002") {
                    element.storageText = "不合格";
                }
                if (element.isnormal == "SF001") {
                    element.isnormalText = "是";
                } else if (element.isnormal == "SF002") {
                    element.isnormalText = "否";
                }
            });
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