<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="生产性粉尘浓度检测结果"
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
                                <p>单位名称: {{item.deptname}}</p>
                            </div>
                            <div>
                                <p>产品设备: {{item.equipname}}</p>
                            </div>
                            <div>
                                <p>检测地点: {{item.address}}</p>
                            </div>
                            <div>
                                <p>作业工艺类型: {{item.techtypeText}}</p>
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
                    <p>单位名称: {{selectData.deptname}}</p>
                </div>
                <div>
                    <p>产品设备: {{selectData.equipname}}</p>
                </div>
                <div>
                    <p>检测地点: {{selectData.address}}</p>
                </div>
                <div>
                    <p>作业工艺类型: {{selectData.techtypeText}}</p>
                </div>
                <div>
                    <p>粉尘类别: {{selectData.dusttype}}</p>
                </div>
                <div>
                    <p>影响工种: {{selectData.effectjobtype}}</p>
                </div>
                <div>
                    <p>作业时间: {{selectData.worktime}}</p>
                </div>
                <div>
                    <p>检测结果/粉尘浓度: {{selectData.purpose}}</p>
                </div>
                <div>
                    <p>个体防护: {{selectData.personprotect}}</p>
                </div>
                <div>
                    <p>工程防护: {{selectData.projectprotect}}</p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import Popup from "@/components/pub/Popup.vue";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "dustResult",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/dustresult/list.action",
                obj: {
                    filters: this.$route.query.filters
                }
            },
            show: false,
            popshow: false,
            actions: [{ name: "查看详情" }],
            selectData: {},
            cczylxArr: [
                {
                    id: "CCZYLX001",
                    text: "卸矿作业"
                },
                {
                    id: "CCZYLX002",
                    text: "卸废石作业"
                },
                {
                    id: "CCZYLX003",
                    text: "运输作业"
                },
                {
                    id: "CCZYLX004",
                    text: "破碎作业"
                },
                {
                    id: "CCZYLX005",
                    text: "巷道掘进作业"
                },
                {
                    id: "CCZYLX006",
                    text: "浅采作业"
                },
                {
                    id: "CCZYLX007",
                    text: "选矿作业"
                },
                {
                    id: "CCZYLX008",
                    text: "脱水作业"
                },
                {
                    id: "CCZYLX009",
                    text: "充填作业"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "techtype", this.cczylxArr);
                if (element.dusttype == "FCLB001") {
                    element.dusttypeText = "矽尘";
                } else if (element.dusttype == "FCLB002") {
                    element.dusttypeText = "其他粉尘";
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