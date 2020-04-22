<template>
    <div>
        <van-dropdown-menu>
            <van-dropdown-item v-model="value" :options="options" @change="searchBack" />
        </van-dropdown-menu>
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
                            <p>检查日期: {{item.examtime}}</p>
                        </div>
                        <div>
                            <p>检查机构: {{item.checkDept}}</p>
                        </div>
                        <div>
                            <p>体检种类: {{item.examtypeText}}</p>
                        </div>
                        <div>
                            <p>应检人数: {{item.yjcount}}</p>
                        </div>
                        <div>
                            <p>实检人数: {{item.sjcount}}</p>
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
                    <p>检查日期: {{selectData.examtime}}</p>
                </div>
                <div>
                    <p>检查机构: {{selectData.checkDept}}</p>
                </div>
                <div>
                    <p>体检种类: {{selectData.examtypeText}}</p>
                </div>
                <div>
                    <p>应检人数: {{selectData.yjcount}}</p>
                </div>
                <div>
                    <p>实检人数: {{selectData.sjcount}}</p>
                </div>
                <div>
                    <p>未见异常: {{selectData.wjyccount}}</p>
                </div>
                <div>
                    <p>复查: {{selectData.fccount}}</p>
                </div>
                <div>
                    <p>疑是: {{selectData.yscount}}</p>
                </div>
                <div>
                    <p>禁忌症: {{selectData.jjzcount}}</p>
                </div>
                <div>
                    <p>其他疾患: {{selectData.qtcount}}</p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "CheckResult",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/examdetail/checkResultList.action",
                obj: {}
            },
            selectData: {},
            // 底部面板
            show: false,
            actions: [{ name: "查看详情" }],
            // 查看详情弹窗
            popshow: false,
            // 下拉菜单
            value: "1",
            options: [
                {
                    text: "所有年份",
                    value: "1"
                },
                {
                    text: new Date().getFullYear() + "年",
                    value: new Date().getFullYear()
                },
                {
                    text: new Date().getFullYear() - 1 + "年",
                    value: new Date().getFullYear() - 1
                },
                {
                    text: new Date().getFullYear() - 2 + "年",
                    value: new Date().getFullYear() - 2
                },
                {
                    text: new Date().getFullYear() - 3 + "年",
                    value: new Date().getFullYear() - 3
                },
                {
                    text: new Date().getFullYear() - 4 + "年",
                    value: new Date().getFullYear() - 4
                }
            ],
            tjlxArr: [
                {
                    id: "TJLX002",
                    text: "岗中体检"
                },
                {
                    id: "TJLX004",
                    text: "离岗体检"
                },
                {
                    id: "TJLX005",
                    text: "应急体检"
                },
                {
                    id: "TJLX006",
                    text: "入职体检"
                },
                {
                    id: "TJLX007",
                    text: "换岗体检"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "examtype", this.tjlxArr);
            });
            this.rendering = arr;
        },
        // 年份的回调
        searchBack(str) {
            if (str != "1") {
                this.postData.obj["bean.param"] = str;
            } else {
                this.postData.obj["bean.param"] = "";
            }
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