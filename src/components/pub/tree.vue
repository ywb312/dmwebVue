<template>
    <div class="tree">
        <mt-cell :title="title" is-link @click.native="popupVisible = true;">
            <span style="color:black">{{message}}</span>
        </mt-cell>
        <mt-popup
            v-model="popupVisible"
            popup-transition="popup-fade"
            closeOnClickModal="true"
            position="right"
        ></mt-popup>
    </div>
</template>
<script>
import { Popup } from "mint-ui";
export default {
    name: "tree",
    data() {
        return {
            message: "请选择",
            popupVisible: false
        };
    },
    created() {
        let self = this;
        // 判断vuex中是否存在数据 如果不存在就获取
        if (this.$store.state.tree != "") {
            return;
        }
        // 获取tree的数据
        this.$api.pub.getTree().then(function(res) {
            var dataObj = eval("(" + res + ")");
            self.$store.commit("setTree", res);
        });
    },
    props: ["title"],
    methods: {},
    components: {
        "mt-popup": Popup
    }
};
</script>
<style scoped>
</style>