<template>
    <div class="picker">
        <van-field
            readonly
            clickable
            :label="title"
            :value="value.text"
            placeholder="请选择"
            :rules="[{ required: true, message: '请选择' }]"
            @click="popupVisible = true"
        />
        <van-popup v-model="popupVisible" position="bottom">
            <van-picker
                show-toolbar
                :columns="slots"
                ref="pick"
                @cancel="popupVisible = false"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>
<script>
export default {
    name: "picker",
    data() {
        return {
            value: "",
            popupVisible: false
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
        }
    },
    methods: {
        // 确认
        onConfirm(value) {
            this.value = value;
            this.popupVisible = false;
            this.$emit("returnMsg", value);
        },
        // 清空重置
        reset() {
            this.value = "";
            this.$emit("returnMsg", this.value);
        },
        // 数据回显设置
        setVal(id) {
            for (let i = 0; i < this.slots.length; i++) {
                const item = this.slots[i];
                if (item.id == id) {
                    this.value = item;
                    break;
                }
            }
            this.$emit("returnMsg", this.value);
        }
    },
    components: {}
};
</script>
<style scoped>
</style>