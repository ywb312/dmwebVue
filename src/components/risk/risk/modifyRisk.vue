<template>
    <div class="modifyRisk">
        <div class="maskWrap" v-show="modShow" @click="close">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">修改风险点</div>
                <van-form @submit="postData">
                    <picker ref="pick" title="风险类型" :slots="slots" @returnMsg="getType"></picker>
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
    name: "modifyRisk",
    data() {
        return {
            modVisible: false,
            getData: {
                name: "",
                fxtype: ""
            }
        };
    },
    props: ["modShow", "selectData"],
    methods: {
        postData(obj) {
            this.$api.risk
                .riskModify({
                    "bean.fxtype": this.getData.fxtype,
                    "bean.name": this.getData.name,
                    "bean.fid": this.fid,
                    session: window.localStorage["session_Id"]
                })
                .then(res => {
                    this.close();
                    this.$emit("suc");
                });
        },
        getType(v) {
            this.getData.fxtype = v.id;
        },
        close() {
            this.modVisible = false;
            this.$emit("popupClose");
        }
    },
    watch: {
        // 监听两个值 确定显示的状态
        modShow(val) {
            //popshow为父组件的值，val参数为值
            if (val) {
                this.modVisible = val; //将父组件的值赋给popupVisible 子组件的值
                this.getData.name = this.selectData.name;
                this.$refs.pick.setVal({
                    text: this.selectData.fxtypeText,
                    id: this.selectData.fxtype
                });
            }
        }
    },
    computed: {
        slots() {
            return this.$store.state.fxtypeSlots;
        }
    },
    components: {
        picker
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>