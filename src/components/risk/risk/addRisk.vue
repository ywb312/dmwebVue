<template>
    <div class="addRisk">
        <div class="maskWrap" v-show="addshow" @click="close">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">新增风险点</div>
                <van-form @submit="postData">
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
    name: "addRisk",
    data() {
        return {
            addVisible: false,
            resData: [],
            getData: {
                name: "",
                fxtype: ""
            }
        };
    },
    props: ["addshow"],
    methods: {
        postData(obj) {
            this.$api.risk
                .riskAdd({
                    "bean.fxtype": this.getData.fxtype,
                    "bean.name": this.getData.name,
                    session: window.localStorage["session_Id"]
                })
                .then(res => {
                    this.close();
                    this.$emit("addSuc");
                });
        },
        getType(v) {
            this.getData.fxtype = v.id;
        },
        close() {
            this.$refs.pick.reset();
            this.getData.name = "";
            this.addVisible = false;
            this.$emit("popupClose");
        }
    },
    watch: {
        // 监听两个值 确定显示的状态
        addshow(val) {
            //popshow为父组件的值，val参数为值
            this.addVisible = val; //将父组件的值赋给popupVisible 子组件的值
        }
    },
    computed: {
        fxtypeSlots() {
            return this.$store.state.fxtypeSlots;
        }
    },
    components: {
        picker
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>