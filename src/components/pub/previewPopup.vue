<template>
    <div class="previewPopup">
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="true">
            <div
                class="popupItem"
                v-for="item in everyConfig"
                :key="item.text"
                @click="goRouter(item)"
            >{{item.text}}</div>
        </mt-popup>
    </div>
</template>
<script>
import { Popup, Toast } from "mint-ui";
// props三个参数 popshow控制组件显示隐藏 everyConfig弹窗的配置项 selcetData选中对象的数据
export default {
    name: "previewPopup",
    data() {
        return {
            popupVisible: false
        };
    },
    props: ["popshow", "everyConfig", "selcetData"],
    methods: {
        // 点击
        goRouter(obj) {
            let self = this;
            self.$api.pub
                .showPage(obj.postUrl, this.setPostData(obj.value))
                .then(res => {
                    self.popupVisible = false;
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
    components: {
        "mt-popup": Popup,
        Toast
    }
};
</script>
<style scoped>
.popupItem {
    width: 4.8rem;
    padding: 0.2rem 0.2rem;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid #2585cf;
}
.popupItem:last-of-type {
    border-bottom: none;
}
</style>