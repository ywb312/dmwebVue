<template>
    <div class="datePick">
        <mt-cell :title="title" is-link @click.native="openPicker">
            <span style="color:black">{{message}}</span>
        </mt-cell>
        <mt-datetime-picker
            ref="picker"
            type="date"
            v-model="pickerValue"
            :startDate="startDate"
            :endDate="endDate"
            yearFormat="{value}年"
            monthFormat="{value}月"
            dateFormat="{value}日"
            @confirm="handleConfirm"
        ></mt-datetime-picker>
    </div>
</template>
<script>
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
    props: ["title", "type", "placeholder"],
    created() {
        this.message = this.placeholder;
        switch (this.type) {
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
        }
    },
    components: {
        "mt-datetime-picker": DatetimePicker
    }
};
</script>
<style lang="scss" scoped>
</style>