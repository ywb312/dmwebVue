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
        onConfirm(value) {
            this.value = value;
            this.popupVisible = false;
            this.$emit("returnMsg", value);
        },
        reset() {
            this.value = "";
        }
    },
    components: {}
};
</script>
<style scoped>
</style>