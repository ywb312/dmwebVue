<template>
    <div class="correlation">
        <van-radio-group v-model="radio" direction="horizontal" @change="toParent">
            <van-row style="width:100%;" type="flex" justify="space-around">
                <van-col span="6">查看方式</van-col>
                <van-col span="8">
                    <van-radio name="1">与我相关</van-radio>
                </van-col>
                <van-col span="8">
                    <van-radio name="2">查看全部</van-radio>
                </van-col>
            </van-row>
        </van-radio-group>
    </div>
</template>
<script>
export default {
    name: "correlation",
    data() {
        return {
            radio: "1"
        };
    },
    methods: {
        toParent() {
            let queryAll = "";
            if (this.radio == "1") {
                queryAll = "null";
            } else if (this.radio == "2") {
                queryAll = "all";
            }
            this.$emit("radioChange", queryAll);
        }
    },
    components: {}
};
</script>
<style scoped>
.correlation {
    padding: 10px 0;
    background-color: white;
}
</style>