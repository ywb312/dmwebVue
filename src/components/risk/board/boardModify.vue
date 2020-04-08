<template>
    <div class="boardModify">
        <div class="maskWrap" v-show="modShow" @click="modVisible=false">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">修改公告栏信息</div>
                <mt-field label="环节或部位" placeholder="请输入环节或部位" v-model="getData.part"></mt-field>
                <mt-field label="责任人" placeholder="请输入责任人" v-model="getData.zrr"></mt-field>
                <mt-field label="报告电话" placeholder="请输入报告电话" v-model="getData.reportphone"></mt-field>
                <mt-field label="有效期" placeholder="请输入有效期" v-model="getData.validity"></mt-field>
                <mt-button type="primary" size="large" @click="postData">确定</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    name: "boardModify",
    data() {
        return {
            modVisible: false,
            getData: {
                part: "",
                zrr: "",
                reportphone: "",
                validity: ""
            }
        };
    },
    props: ["modShow", "cid"],
    methods: {
        // 根据当前页面的配置 对请求入参进行添加筛选
        returnData(option) {
            let obj = {
                "bean.cid": this.cid,
                session: window.localStorage["session_Id"]
            };
            for (const key in this.getData) {
                obj["bean." + key] = this.getData[key];
            }
            return obj;
        },
        postData(obj) {
            for (const key in this.getData) {
                if (this.getData[key] == "") {
                    Toast({
                        message: "请把信息补充完整",
                        position: "bottom",
                        duration: 2000
                    });
                    return;
                }
            }
            this.$api.risk.riskBoardModify(this.returnData()).then(res => {
                this.modVisible = false;
                this.$emit("suc");
            });
        }
    },
    watch: {
        // 监听两个值 确定显示的状态
        modShow(val) {
            //popshow为父组件的值，val参数为值
            if (val) {
                this.modVisible = val; //将父组件的值赋给popupVisible 子组件的值
            }
        },
        modVisible(val) {
            if (val == false) {
                this.$emit("popupClose");
            }
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>