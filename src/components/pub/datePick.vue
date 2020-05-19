<template>
    <div>
        <van-field
            readonly
            clickable
            name="datetimePicker"
            :value="value"
            :label="title"
            placeholder="点击选择时间"
            :rules="[{ required: true, message: '请选择时间' }]"
            @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom" get-container="#app">
            <van-datetime-picker
                v-model="currentDate"
                :type="type"
                :formatter="formatter"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
        </van-popup>
    </div>
</template>
<script>
// 默认为日期选择器 type为选择器类型 time是可选之前/之后/任意 placeholder默认文字 title名称
export default {
    data() {
        return {
            value: "",
            showPicker: false,
            currentDate: new Date(),
            minDate: new Date(new Date().getFullYear() - 10, 0, 1),
            maxDate: new Date(new Date().getFullYear() + 10, 11, 31)
        };
    },
    props: {
        title: {
            type: String,
            default: "时间"
        },
        time: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "date"
        }
    },
    created() {
        switch (this.time) {
            case "left":
            case "before":
                this.maxDate = new Date();
                break;
            case "right":
            case "after":
                this.minDate = new Date();
                break;
            default:
                break;
        }
    },
    methods: {
        // 确定时间
        onConfirm(time) {
            this.value = this.formatDate(time);
            this.showPicker = false;
            this.$emit("returnDate", this.value);
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
            if (this.type == "date") {
                return `${date.getFullYear()}-${date.getMonth() +
                    1}-${date.getDate()}`;
            } else if (this.type == "datetime") {
                return `${date.getFullYear()}-${date.getMonth() +
                    1}-${date.getDate()} ${
                    date.getHours() >= "10"
                        ? date.getHours()
                        : "0" + date.getHours()
                }:${
                    date.getMinutes() >= "10"
                        ? date.getMinutes()
                        : "0" + date.getMinutes()
                }`;
            }
        },
        // 清空时间
        reset() {
            this.value = "";
        }
    }
};
</script>
<style lang="scss" scoped>
</style>