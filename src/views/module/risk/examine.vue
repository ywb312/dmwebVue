<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="排查信息"
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
                            <span>频率: {{item.rate}}</span>
                        </div>
                        <div>
                            <span>单位: {{item.deptname}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 新增按钮 -->
        <div>
            <van-button class="btn" type="info" size="large" @click="addshow=true">新增排查</van-button>
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
            <add-examine
                :addshow="addshow"
                :gid="$route.query.gid"
                @popupClose="addshow=false"
                @addSuc="clearData"
            ></add-examine>
        </div>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import ViewBox from "@/components/pub/ViewBox.vue";
// 增删改框
import addExamine from "@/components/risk/examine/addExamine";
export default {
    name: "examine",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/risk/rate/list.action",
                obj: {
                    "bean.gid": this.$route.query.gid
                }
            },
            // 选中的对象
            selectData: {},
            actions: [{ name: "删除" }],
            // 控制操作模态框的显示
            popshow: false,
            // 增删改查组件的显示
            addshow: false
        };
    },
    methods: {
        // 获取当前页面数据函数
        getRendering(arr) {
            this.rendering = arr;
        },
        // 操作按钮点击事件
        btnClick(obj) {
            this.selectData = obj;
            this.popshow = true;
        },
        // 菜单选择
        onSelect(item) {
            if (item.name == "删除") {
                this.popshow = false;
                this.delData();
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
                        .examineDelete({
                            "bean.cprid": this.selectData.cprid
                        })
                        .then(res => {
                            // 数据有误
                            if (typeof res != "object") {
                                _self.$toast("服务器连接错误");
                                return;
                            }
                            this.clearData();
                        });
                })
                .catch(reject => {});
        },
        // 清空数据 重新加载
        clearData() {
            this.$refs.view.cleraData();
        }
    },
    components: {
        ViewBox,
        addExamine
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>