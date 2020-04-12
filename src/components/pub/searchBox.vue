<template>
    <div class="SearchBox">
        <van-sticky :offset-top="50">
            <div class="box">
                <input type="text" v-bind="$attrs" v-model="value" />
                <span @click="btnClick">查询</span>
            </div>
        </van-sticky>
    </div>
</template>
<script>
// 需要传入placeholder默认显示  点击查询后返回回调callback
export default {
    name: "SearchBox",
    inheritAttrs: false,
    data() {
        return {
            value: ""
        };
    },
    methods: {
        btnClick() {
            this.$emit("callback", this.value);
        }
    }
};
</script>
<style scoped>
.box {
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    width: 100%;
    box-sizing: border-box;
    padding: 6px;
}
.box input {
    padding: 4px 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 16px;
    outline-style: none;
    flex: 1;
}
.box span {
    margin-left: 6px;
    padding: 5px 10px;
    color: white;
    background: #2585cf;
    border-radius: 3px;
}
</style>