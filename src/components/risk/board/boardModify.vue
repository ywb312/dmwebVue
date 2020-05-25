<template>
    <div class="boardModify">
        <div class="maskWrap" v-show="modShow"  @touchmove.prevent @click="close">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">修改公告栏信息</div>
                <van-form @submit="postData" :show-error-message="false">
                    <van-field
                        label="环节或部位"
                        placeholder="环节或部位"
                        v-model="getData.part"
                        :rules="[{ required: true, message: '填写环节或部位' }]"
                    />
                    <van-field
                        label="责任人"
                        placeholder="责任人"
                        v-model="getData.zrr"
                        :rules="[{ required: true, message: '填写责任人' }]"
                    />
                    <van-field
                        label="报告电话"
                        placeholder="报告电话"
                        v-model="getData.reportphone"
                        :rules="[{ required: true, message: '填写报告电话' }]"
                    />
                    <van-field
                        label="有效期"
                        placeholder="有效期"
                        v-model="getData.validity"
                        :rules="[{ required: true, message: '填写有效期' }]"
                    />
                    <van-button type="info" size="large" native-type="submit">确定</van-button>
                </van-form>
            </div>
        </div>
    </div>
</template>
<script>
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
                "bean.cid": this.cid
            };
            for (const key in this.getData) {
                obj["bean." + key] = this.getData[key];
            }
            return obj;
        },
        postData(obj) {
            this.$store.commit("setIsLoading", true);
            this.$api.risk.riskBoardModify(this.returnData()).then(res => {
                this.$store.commit("setIsLoading", false);
                // 数据有误
                let data = eval("(" + res + ")");
                        // 数据有误
                        if (!data.success) {
                            this.$toast("提交不成功");
                            return;
                        }
                this.close();
                this.$emit("suc");
            });
        },
        close() {
            this.modVisible = false;
            this.getData.part = "";
            this.getData.zrr = "";
            this.getData.reportphone = "";
            this.getData.validity = "";
            this.$emit("popupClose");
        }
    },
    watch: {
        // 监听两个值 确定显示的状态
        modShow(val) {
            //popshow为父组件的值，val参数为值
            if (val) {
                this.modVisible = val; //将父组件的值赋给popupVisible 子组件的值
            }
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>