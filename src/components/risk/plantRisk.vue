<template>
    <div class="plantRisk">
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+'.'+item.name}}</h4>
                        <!-- <p style="min-width:40px">
                        <van-tag size="large" round type="primary">{{item.checktype}}</van-tag>
                        </p>-->
                    </div>
                    <div class="main">
                        <div>
                            <span>风险点类型: {{item.fxtypeText}}</span>
                        </div>
                        <div>
                            <span>创建人: {{item.createID}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 新增按钮 -->
        <div>
            <van-button class="btn" type="info" size="large" @click="addRisk">新增风险点</van-button>
        </div>
        <!-- 操作按钮点击 -->
        <van-action-sheet
            v-model="sheetShow"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />
        <!-- 隐藏的组件 -->
        <div>
            <set-risk
                :setShow="setShow"
                :type="type"
                :selectData="selectData"
                @popupClose="setShow=false"
                @suc="clearData"
            ></set-risk>
        </div>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import ViewBox from "@/components/pub/ViewBox.vue";
import setRisk from "@/components/risk/risk/setRisk";
export default {
    name: "plantRisk",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/risk/info/list.action",
                obj: {}
            },
            // 选中的对象
            selectData: {},
            actions: [
                { name: "修改" },
                { name: "删除" },
                { name: "查看危险源" }
            ],
            // 控制操作模态框的显示
            sheetShow: false,
            // 增删改查组件的显示
            setShow: false,
            type: "add"
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        // 获取当前页面数据
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "fxtype", this.fxtypeSlots);
            });
            this.rendering = arr;
        },
        // 操作按钮点击事件
        btnClick(obj) {
            this.selectData = obj;
            this.sheetShow = true;
        },
        // 新增风险点
        addRisk() {
            this.type = "add";
            this.setShow = true;
        },
        // 清空数据重新加载
        clearData() {
            this.$refs.view.cleraData();
        },
        // 选择操作
        onSelect(item) {
            if (item.name == "修改") {
                this.type = "mod";
                this.setShow = true;
            } else if (item.name == "删除") {
                this.delData();
            } else if (item.name == "查看危险源") {
                this.$router.push({
                    path: "/risk/companyRisk",
                    query: {
                        fid: this.selectData.fid
                    }
                });
            }
        },
        // 删除操作
        delData() {
            this.$dialog
                .confirm({
                    title: "删除",
                    message: "确定执行此操作?"
                })
                .then(resolve => {
                    this.$api.risk
                        .riskDelete({
                            "bean.fid": this.selectData.fid,
                            ssession: window.localStorage["session_Id"]
                        })
                        .then(res => {
                            this.clearData();
                        });
                })
                .catch(reject => {});
        }
    },
    computed: {
        fxtypeSlots() {
            return this.$store.state.fxtypeSlots;
        }
    },
    components: {
        ViewBox,
        setRisk
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>