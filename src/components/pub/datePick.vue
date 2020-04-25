<template>
    <div class="datePick">
        <van-cell :title="title" is-link @click.native="openPicker">
            <span style="color:black">{{message}}</span>
        </van-cell>
        <mt-datetime-picker
            ref="picker"
            :type="type"
            v-model="pickerValue"
            :startDate="startDate"
            :endDate="endDate"
            yearFormat="{value}年"
            monthFormat="{value}月"
            dateFormat="{value}日"
            hourFormat="{value}时"
            minuteFormat="{value}分"
            @confirm="handleConfirm"
        ></mt-datetime-picker>
    </div>
</template>
<script>
// 默认为日期选择器 type为选择器类型 time是可选之前/之后/任意 placeholder默认文字 title名称
import { DatetimePicker } from "mint-ui";
export default {
    name: "datePick",
    data() {
        return {
            message: "请选择",
            pickerValue: new Date(),
            startDate: new Date(new Date().getFullYear() - 10, 0, 1),
            endDate: new Date(new Date().getFullYear() + 10, 11, 31)
        };
    },
    props: ["title", "time", "placeholder", "type"],
    props: {
        title: {
            type: String,
            default: "时间"
        },
        time: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: "请选择时间"
        },
        type: {
            type: String,
            default: "date"
        }
    },
    created() {
        this.message = this.placeholder;
        switch (this.time) {
            case "left":
            case "before":
                this.endDate = new Date();
                break;
            case "right":
            case "after":
                this.startDate = new Date();
                break;
            default:
                break;
        }
    },
    methods: {
        openPicker() {
            this.$refs.picker.open();
        },
        handleConfirm(value) {
            let year = value.getFullYear();
            let month = value.getMonth() + 1;
            let day = value.getDate();
            let date = year + "-" + month + "-" + day;
            this.message = date;
            this.$emit("returnDate", this.message);
        },
        reset() {
            this.message = this.placeholder;
        }
    },
    components: {
        "mt-datetime-picker": DatetimePicker
    }
};
</script>
<style lang="scss" scoped>
</style>