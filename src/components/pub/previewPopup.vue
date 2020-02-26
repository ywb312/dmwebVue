<template>
    <div class="previewPopup">
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="true">
            <div class="popupItem">待配置</div>
            <div class="popupItem">待配置</div>
            <div class="popupItem">待配置</div>
        </mt-popup>
    </div>
</template>
<script>
import { Popup } from "mint-ui";
export default {
    name: "previewPopup",
    data() {
        return {
            popupVisible:false,
            childrenMessage: ""
        };
    },
    props: ["popshow"],
    methods: {},
    watch: {
        popshow(val) {
            //message即为父组件的值，val参数为值
            this.popupVisible = val; //将父组件的值赋给childrenMessage 子组件的值
        },
        popupVisible(val){
            if(val == false){
                this.$emit("popupClose");
            }
        }
    },
    components: {
        "mt-popup": Popup
    }
};
</script>
<style scoped>
.popupItem {
    width: 4rem;
    padding: 0.2rem 0.2rem;
    font-size: 16px;
    text-align: center;
    color: #888;
}
</style>