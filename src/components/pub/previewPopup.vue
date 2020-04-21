<template>
    <div class="previewPopup">
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="true">
            <div
                class="popupItem"
                v-for="item in views"
                :key="item.text"
                @click.stop="goRouter(item)"
            >{{item.text}}</div>
        </mt-popup>
        <!-- 跳出的弹窗组件 -->
        <component ref="child" :compShow="compShow" @popupClose="compShow=false" :is="currentView"></component>
    </div>
</template>
<script>
import { Popup } from "mint-ui";
// props三个参数 popshow控制组件显示隐藏 everyConfig弹窗的配置项
// 引入的组件要有emit popupClose函数
import record from "@/components/danger/record";
export default {
    name: "previewPopup",
    data() {
        return {
            popupVisible: false,
            currentView: "",
            compShow: false
        };
    },
    props: {
        popshow: {
            type: Boolean,
            default: false
        },
        everyConfig: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        // 点击
        goRouter(obj) {
            let self = this;
            // 如果需要跳转页面就直接跳转
            self.popupVisible = false;
            if (obj.router) {
                let query = "";
                if (obj.routerQuery) {
                    query = obj.routerQuery;
                }
                self.$router.push({
                    path: obj.router,
                    query: query
                });
                return;
            }
            // 使用动态组件
            if (obj.component) {
                self.compShow = true;
                self.currentView = obj.component;
                return;
            }
            // 没有跳转页 就执行接口操作
            self.$api.pub
                .showPage(obj.postUrl, this.setPostData(obj.value))
                .then(res => {
                    if (res.message) {
                        this.$toast(res.message);
                    }
                });
        },
        // 对数据进行筛选
        setPostData(data) {
            let obj = {};
            let config = this.selectData;
            data.forEach(item => {
                if (!item.fix) {
                    obj[item.key] = config[item.val];
                } else {
                    obj[item.key] = item.val;
                }
            });
            return obj;
        }
    },
    watch: {
        // 监听两个值 确定显示的状态
        popshow(val) {
            //popshow为父组件的值，val参数为值
            this.popupVisible = val; //将父组件的值赋给popupVisible 子组件的值
        },
        popupVisible(val) {
            if (val == false) {
                this.$emit("popupClose");
            }
        }
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        },
        views() {
            let arr = [];
            this.everyConfig.forEach(item => {
                if (eval(item.show) || item.show) {
                    arr.push(item);
                }
            });
            return arr;
        }
    },
    components: {
        "mt-popup": Popup,
        record
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>