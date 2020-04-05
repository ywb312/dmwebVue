<template>
    <div class="deleteMeasure"></div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
    name: "deleteMeasure",
    data() {
        return {};
    },
    props: {
        delShow: {
            type: Boolean,
            default: false
        },
        gid: {
            type: String,
            default: ""
        }
    },
    methods: {
        getData() {
            MessageBox.confirm("确定执行此操作?")
                .then(resolve => {
                    this.$api.risk
                        .measureDelete({
                            "bean.gid": this.gid,
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