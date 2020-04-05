<template>
    <div class="deleteRisk"></div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
    name: "deleteRisk",
    data() {
        return {};
    },
    props: {
        delShow: {
            type: Boolean,
            default: false
        },
        fid: {
            type: String,
            default: "",
        }
    },
    methods: {
        getData() {
            MessageBox.confirm("确定执行此操作?")
                .then(resolve => {
                    this.$api.risk
                        .riskDelete({
                            "bean.fid": this.fid,
                            ssession: window.localStorage["session_Id"]
                        })
                        .then(res => {
                            this.$emit("suc")
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