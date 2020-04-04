<template>
    <div class="deleteCompany"></div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
    name: "deleteCompany",
    data() {
        return {};
    },
    props: {
        delShow: {
            type: Boolean,
            default: false
        },
        wid: {
            type: String,
            default: ""
        }
    },
    methods: {
        getData() {
            MessageBox.confirm("确定执行此操作?")
                .then(resolve => {
                    this.$api.risk
                        .companyRiskDelete({
                            "bean.wid": this.wid,
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