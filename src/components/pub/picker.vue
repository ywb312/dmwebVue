<template>
    <div class="picker">
        <mt-cell :title="title" is-link @click.native="popupVisible = true;">
            <span style="color:black">{{message.text}}</span>
        </mt-cell>
        <mt-popup v-model="popupVisible" closeOnClickModal="true" position="bottom">
            <mt-picker
                :slots="slots"
                @change="onValuesChange"
                style="width: 7.5rem;"
                valueKey="text"
                showToolbar
            >
                <div class="picker-toolbar-title">
                    <div class="usi-btn-cancel" @click="popupVisible = false;">取消</div>
                    <div class="usi-btn-sure" @click="confirm">确定</div>
                </div>
            </mt-picker>
        </mt-popup>
    </div>
</template>
<script>
import { Popup } from "mint-ui";
// text为显示的文字 id为代表其代码 returnMsg为返回选中的数据
export default {
    name: "picker",
    data() {
        return {
            message: {
                text: "请选择"
            },
            showToolbar: true,
            popupVisible: false,
            // 暂存选项 用于第二次打开
            storge: ""
        };
    },
    props: {
        title: {
            type: String,
            default: ""
        },
        slots: {
            type: Array,
            default: () => []
        },
    },
    methods: {
        confirm() {
            this.popupVisible = false;
            this.message = this.storge;
            this.$emit("returnMsg", this.message);
        },
        onValuesChange(picker, values) {
            this.storge = values[0];
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
        }
    },
    components: {
        "mt-popup": Popup
    }
};
</script>
<style lang="scss" scoped>
.picker-toolbar-title {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
}
.usi-btn-cancel,
.usi-btn-sure {
    color: #2585cf;
}
</style>