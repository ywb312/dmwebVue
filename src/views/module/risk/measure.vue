<template>
    <div class="measure page">
        <!-- 标题  -->
        <van-nav-bar
            title="管控措施"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <!-- 渲染当前页面 -->
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
                            <span>管控措施名称: {{item.gname}}</span>
                        </div>
                        <div>
                            <span>管控措施类型: {{item.gtypeText}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 新增按钮 -->
        <div>
            <van-button class="btn" type="info" size="large" @click="addClick">新增管控措施</van-button>
        </div>
        <!-- 隐藏的组件 -->
        <!-- 操作按钮点击 -->
        <van-action-sheet
            v-model="popshow"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />
        <!-- 组件框 -->
        <div>
            <set-measure
                :setShow="setShow"
                :type="type"
                :wid="$route.query.wid"
                :selectData="selectData"
                @popupClose="setShow=false"
                @suc="clearData"
            ></set-measure>
        </div>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import ViewBox from "@/components/pub/ViewBox.vue";
// 增删改框
import setMeasure from "@/components/risk/measure/setMeasure";
export default {
    name: "measure",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/risk/companyriskinspect/list.action",
                obj: {
                    "bean.wid": this.$route.query.wid
                }
            },
            // 选中的对象
            selectData: {},
            // 控制操作模态框的显示
            popshow: false,
            actions: [
                { name: "修改" },
                { name: "删除" },
                { name: "查看排查计划" }
            ],
            // 增删改查组件的显示
            setShow: false,
            type: "add"
        };
    },
    methods: {
        // 获取当前页面数据
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "gtype", this.gTypeSlots);
            });
            this.rendering = arr;
        },
        // 操作按钮点击事件
        btnClick(obj) {
            this.selectData = obj;
            this.popshow = true;
        },
        addClick() {
            this.type = "add";
            this.setShow = true;
        },
        // 菜单选择
        onSelect(item) {
            if (item.name == "修改") {
                this.type = "mod";
                this.setShow = true;
            } else if (item.name == "删除") {
                this.delData();
            } else if (item.name == "查看排查计划") {
                this.goRouter();
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
                        .measureDelete({
                            "bean.gid": this.selectData.gid
                        })
                        .then(res => {
                            this.clearData();
                        });
                })
                .catch(reject => {});
        },
        // 危险源页
        goRouter() {
            this.$router.push({
                path: "/risk/examine",
                query: {
                    gid: this.selectData.gid
                }
            });
        },
        // 清空数据 重新加载
        clearData() {
            this.$refs.view.cleraData();
        }
    },
    computed: {
        gTypeSlots() {
            return this.$store.state.gTypeSlots;
        }
    },
    components: {
        ViewBox,
        setMeasure
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>