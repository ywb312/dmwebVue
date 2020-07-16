<template>
    <div class="datePick">
        <van-field
            readonly
            clickable
            name="datetimePicker"
            :value="value1"
            :label="config[0].title"
            :placeholder="config[0].placeholder"
            @click="showPicker1=true"
        />
        <van-field
            readonly
            clickable
            name="datetimePicker"
            :value="value2"
            :label="config[1].title"
            :placeholder="config[1].placeholder"
            @click="showPicker2=true"
        />
        <van-popup v-model="showPicker1" position="bottom" get-container="#app">
            <van-datetime-picker
                v-model="pickerValue1"
                ref="picker1"
                type="date"
                :formatter="formatter"
                :min-date="minDate1"
                :max-date="maxDate1"
                @confirm="handleConfirm1"
                @cancel="showPicker1 = false"
            />
        </van-popup>
        <van-popup v-model="showPicker2" position="bottom" get-container="#app">
            <van-datetime-picker
                v-model="pickerValue2"
                ref="picker2"
                type="date"
                :formatter="formatter"
                :min-date="minDate2"
                :max-date="maxDate2"
                @confirm="handleConfirm2"
                @cancel="showPicker2 = false"
            />
        </van-popup>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showPicker1: false,
            value1: "",
            pickerValue1: new Date(),
            minDate1: new Date(new Date().getFullYear() - 10, 0, 1),
            maxDate1: new Date(new Date().getFullYear() + 10, 11, 31),
            showPicker2: false,
            value2: "",
            pickerValue2: new Date(),
            minDate2: new Date(new Date().getFullYear() - 10, 0, 1),
            maxDate2: new Date(new Date().getFullYear() + 10, 11, 31)
        };
    },
    props: ["config"],
    methods: {
        handleConfirm1(value) {
            this.value1 = this.formatDate(value);
            this.minDate2 = value;
            this.$emit("returnDate1", this.value1);
            this.showPicker1 = false;
        },
        handleConfirm2(value) {
            this.value2 = this.formatDate(value);
            this.maxDate1 = value;
            this.$emit("returnDate2", this.value2);
            this.showPicker2 = false;
        },
        reset() {
            this.value1 = "";
            this.value2 = "";
        },
        // 对时间选择器设置
        formatter(type, val) {
            if (type === "year") {
                return `${val}年`;
            } else if (type === "month") {
                return `${val}月`;
            } else if (type === "day") {
                return `${val}日`;
            } else if (type === "hour") {
                return `${val}时`;
            } else if (type === "minute") {
                return `${val}分`;
            }
            return val;
        },
        // 设置选中时间的格式
        formatDate(date) {
            return `${date.getFullYear()}-${
                date.getMonth() + 1 >= 10
                    ? date.getMonth() + 1
                    : "0" + (date.getMonth() + 1)
            }-${
                date.getDate() >= "10" ? date.getDate() : "0" + date.getDate()
            }`;
        }
    }
};
</script>
<style lang="scss" scoped>
</style>