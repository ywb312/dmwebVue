<template>
    <div class="deleteExamine"></div>
</template>
<script>
export default {
    name: "deleteExamine",
    data() {
        return {};
    },
    props: {
        delShow: {
            type: Boolean,
            default: false
        },
        cprid: {
            type: String,
            default: ""
        }
    },
    methods: {
        getData() {
            this.$dialog
                .confirm({
                    title: "删除",
                    message: "确定执行此操作?"
                })
                .then(resolve => {
                    this.$api.risk
                        .examineDelete({
                            "bean.cprid": this.cprid,
                            ssession: window.localStorage["session_Id"]
                        })
                        .then(res => {
                            this.$emit("suc");
                        });
                })
                .catch(reject => {});
            this.$emit("popupClose");
        }
    },
    watch: {
        delShow(val) {
            if (val == true) {
                this.getData();
            }
        }
    }
};
</script>