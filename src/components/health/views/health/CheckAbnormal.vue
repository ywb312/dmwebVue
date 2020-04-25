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
                            <p>姓名: {{item.name}}</p>
                        </div>
                        <div>
                            <p>性别: {{item.sexText}}</p>
                        </div>
                        <div>
                            <p>年龄: {{item.age}}</p>
                        </div>
                        <div>
                            <p>部门: {{item.dept}}</p>
                        </div>
                        <div>
                            <p>体检日期: {{item.examtime}}</p>
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
                    <p>姓名: {{selectData.name}}</p>
                </div>
                <div>
                    <p>性别: {{selectData.sexText}}</p>
                </div>
                <div>
                    <p>年龄: {{selectData.age}}</p>
                </div>
                <div>
                    <p>部门: {{selectData.dept}}</p>
                </div>
                <div>
                    <p>体检日期: {{selectData.examtime}}</p>
                </div>
                <div>
                    <p>体检种类: {{selectData.examtypeText}}</p>
                </div>
                <div>
                    <p>接触职业病危害因素: {{selectData.toxictype}}</p>
                </div>
                <div>
                    <p>可能导致的职业病: {{selectData.diseasename}}</p>
                </div>
                <div>
                    <p>体检结论与意见处理: {{selectData.resultdetail}}</p>
                </div>
                <div>
                    <p>落实情况: {{selectData.fulfillInfo}}</p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "CheckAbnormal",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/examdetail/checkAbnormalList.action",
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
                this.$common.setSex(element);
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