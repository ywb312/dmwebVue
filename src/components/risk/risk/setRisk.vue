<template>
    <div>
        <div class="maskWrap" v-show="setShow" @click="close">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">{{this.type == "add"?"新增风险点":"修改风险点"}}</div>
                <van-form @submit="postData" :show-error-message="false">
                    <picker title="风险类型" ref="pick" :slots="fxtypeSlots" @returnMsg="getType"></picker>
                    <van-field
                        label="风险名称"
                        v-model="getData.name"
                        placeholder="风险名称"
                        :rules="[{ required: true, message: '填写风险名称' }]"
                    />
                    <van-button type="info" size="large" native-type="submit">确定</van-button>
                </van-form>
            </div>
        </div>
    </div>
</template>
<script>
import picker from "@/components/pub/picker.vue";
export default {
    data() {
        return {
            setVisible: false,
            resData: [],
            getData: {
                name: "",
                fxtype: ""
            },
            fxtypeSlots: []
        };
    },
    props: ["setShow", "type", "selectData"],
    created() {
        this.$common.comboList({ sourcename: "FXDLX" }).then(res => {
            this.fxtypeSlots = res;
        });
    },
    methods: {
        postData(obj) {
            this.$store.commit("setIsLoading", true);
            if (this.type == "add") {
                this.$api.risk
                    .riskAdd({
                        "bean.fxtype": this.getData.fxtype,
                        "bean.name": this.getData.name
                    })
                    .then(res => {
                        this.$store.commit("setIsLoading", false);
                        let data = eval("(" + res + ")");
                        // 数据有误
                        if (!data.success) {
                            this.$toast("提交不成功");
                            return;
                        }
                        this.close();
                        this.$emit("suc");
                    });
            } else if (this.type == "mod") {
                this.$api.risk
                    .riskModify({
                        "bean.fxtype": this.getData.fxtype,
                        "bean.name": this.getData.name,
                        "bean.fid": this.selectData.fid
                    })
                    .then(res => {
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
            }
        },
        getType(v) {
            this.getData.fxtype = v.id;
        },
        close() {
            this.getData.name = "";
            this.$refs.pick.reset();
            this.setVisible = false;
            this.$emit("popupClose");
        }
    },
    watch: {
        // 监听两个值 确定显示的状态
        setShow(val) {
            //popshow为父组件的值，val参数为值
            if (val) {
                this.setVisible = val; //将父组件的值赋给popupVisible 子组件的值
                if (this.type == "mod") {
                    this.getData.name = this.selectData.name;
                    this.$refs.pick.setVal({
                        text: this.selectData.fxtypeText,
                        id: this.selectData.fxtype
                    });
                }
            }
        }
    },
    components: {
        picker
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>