<template>
    <div>
        <van-popup round closeable v-model="show" @close="close">
            <slot name="title"></slot>
            <slot name="views"></slot>
        </van-popup>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false
        };
    },
    props: {
        popshow: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit("close");
        }
    },
    watch: {
        popshow(newValue) {
            this.show = newValue;
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>