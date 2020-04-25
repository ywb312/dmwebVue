<template>
    <div class="datePick">
        <van-cell :title="config[0].title" is-link @click.native="openPicker1">
            <span style="color:black">{{message1}}</span>
        </van-cell>
        <van-cell :title="config[1].title" is-link @click.native="openPicker2">
            <span style="color:black">{{message2}}</span>
        </van-cell>
        <mt-datetime-picker
            ref="picker1"
            type="date"
            v-model="pickerValue1"
            :startDate="startDate1"
            :endDate="endDate1"
            yearFormat="{value}年"
            monthFormat="{value}月"
            dateFormat="{value}日"
            @confirm="handleConfirm1"
        ></mt-datetime-picker>
        <mt-datetime-picker
            ref="picker2"
            type="date"
            v-model="pickerValue2"
            :startDate="startDate2"
            :endDate="endDate2"
            yearFormat="{value}年"
            monthFormat="{value}月"
            dateFormat="{value}日"
            @confirm="handleConfirm2"
        ></mt-datetime-picker>
    </div>
</template>
<script>
import { DatetimePicker } from "mint-ui";
export default {
    name: "datePick",
    data() {
        return {
            message1: "请选择",
            pickerValue1: new Date(),
            startDate1: new Date(new Date().getFullYear() - 10, 0, 1),
            endDate1: new Date(new Date().getFullYear() + 10, 11, 31),
            message2: "请选择",
            pickerValue2: new Date(),
            startDate2: new Date(new Date().getFullYear() - 10, 0, 1),
            endDate2: new Date(new Date().getFullYear() + 10, 11, 31)
        };
    },
    props: ["config"],
    created() {
        this.message1 = this.config[0].placeholder;
        this.message2 = this.config[1].placeholder;
    },
    methods: {
        openPicker1() {
            this.$refs.picker1.open();
        },
        openPicker2() {
            this.$refs.picker2.open();
        },
        handleConfirm1(value) {
            this.startDate2 = value;
            let year = value.getFullYear();
            let month = value.getMonth() + 1;
            let day = value.getDate();
            let date = year + "-" + month + "-" + day;
            this.message1 = date;
            this.$emit("returnDate1", this.message1);
        },
        handleConfirm2(value) {
            this.endDate1 = value;
            let year = value.getFullYear();
            let month = value.getMonth() + 1;
            let day = value.getDate();
            let date = year + "-" + month + "-" + day;
            this.message2 = date;
            this.$emit("returnDate2", this.message2);
        }
    },
    components: {
        "mt-datetime-picker": DatetimePicker
    }
};
</script>
<style lang="scss" scoped>
</style>