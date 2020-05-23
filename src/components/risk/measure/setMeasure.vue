<template>
    <div>
        <div class="maskWrap" v-show="setShow" @click="close">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">{{this.type == "add"?"新增管控措施":"修改管控措施"}}</div>
                <van-form @submit="postData" :show-error-message="false">
                    <van-field
                        label="管控措施名称"
                        v-model="getData.gname"
                        placeholder="管控措施名称"
                        :rules="[{ required: true, message: '填写管控措施名称' }]"
                    />
                    <picker title="管控措施类型" ref="pick" :slots="gTypeSlots" @returnMsg="getGtype"></picker>
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
            getData: {
                gname: "",
                gtype: ""
            },
            gTypeSlots: []
        };
    },
    props: ["setShow", "wid", "type", "selectData"],
    created() {
        this.$common.comboList({ sourcename: "GKCSLX" }).then(res => {
            this.gTypeSlots = res;
        });
    },
    methods: {
        // 操作请求
        postData(obj) {
            this.$store.commit("setIsLoading", true);
            if (this.type == "add") {
                this.$api.risk
                    .measureAdd({
                        "bean.wid": this.wid,
                        "bean.gname": this.getData.gname,
                        "bean.gtype": this.getData.gtype
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
                    .measureModify({
                        "bean.wid": this.selectData.wid,
                        "bean.gid": this.selectData.gid,
                        "bean.gname": this.getData.gname,
                        "bean.gtype": this.getData.gtype
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
            }
        },
        // 获取管控类型
        getGtype(v) {
            this.getData.gtype = v.id;
        },
        // 关闭重置
        close() {
            this.getData.gname = "";
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
                    this.getData.gname = this.selectData.gname;
                    this.$refs.pick.setVal(this.selectData.gtype);
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