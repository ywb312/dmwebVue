<template>
    <div class="previewPopup">
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="true">
            <div
                class="popupItem"
                v-for="item in everyConfig"
                :key="item.text"
                @click.stop="goRouter(item)"
            >{{item.text}}</div>
        </mt-popup>
        <!-- 跳出的弹窗组件 -->
        <component
            ref="child"
            :recordShow="recordShow"
            @popupClose="recordShow=false"
            :is="currentView"
        ></component>
    </div>
</template>
<script>
import { Popup, Toast } from "mint-ui";
import record from "@/components/danger/record";
// props三个参数 popshow控制组件显示隐藏 everyConfig弹窗的配置项
export default {
    name: "previewPopup",
    data() {
        return {
            popupVisible: false,
            currentView: "",
            recordShow: false,
            resData: {}
        };
    },
    props: ["popshow", "everyConfig"],
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
                self.recordShow = true;
                self.currentView = obj.component;
                self.$refs.child.getData(self.selcetData);
                return;
            }
            // 没有跳转页 就执行接口操作
            self.$api.pub
                .showPage(obj.postUrl, this.setPostData(obj.value))
                .then(res => {
                    if (res.message) {
                        Toast({
                            message: res.message,
                            position: "bottom",
                            duration: 4000
                        });
                    }
                });
        },
        // 对数据进行筛选
        setPostData(data) {
            let obj = {};
            let config = this.selcetData;
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
        selcetData() {
            return this.$store.state.selcetData;
        }
    },
    components: {
        "mt-popup": Popup,
        Toast,
        record
    }
};
</script>
<style scoped>
.popupItem {
    width: 4.8rem;
    padding: 0.2rem 0.2rem;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid rgb(230, 230, 230);
}
.popupItem:last-of-type {
    border-bottom: none;
}
</style>