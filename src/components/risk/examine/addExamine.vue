<template>
    <div class="addExamine">
        <div class="maskWrap" v-show="addshow" @click="close">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">新增排查计划</div>
                <van-form @submit="postData" :show-error-message="false">
                    <tree title="单位" ref="tree" @selectMsg="getDept"></tree>
                    <picker title="频率" ref="pick" :slots="rateSlots" @returnMsg="getRate"></picker>
                    <van-button type="info" size="large" native-type="submit">确定</van-button>
                </van-form>
            </div>
        </div>
    </div>
</template>
<script>
import picker from "@/components/pub/picker.vue";
import tree from "@/components/pub/tree.vue";
export default {
    name: "addExamine",
    data() {
        return {
            addVisible: false,
            getData: {
                rate: "",
                deptid: ""
            },
            rateSlots: [
                {
                    text: "一班",
                    id: ""
                },
                {
                    text: "二班",
                    id: ""
                },
                {
                    text: "三班",
                    id: ""
                },
                {
                    text: "周",
                    id: ""
                },
                {
                    text: "月",
                    id: ""
                },
                {
                    text: "年",
                    id: ""
                }
            ]
        };
    },
    props: ["addshow", "gid"],
    methods: {
        // 根据当前页面的配置 对请求入参进行添加筛选
        returnData(option) {
            let obj = {
                "bean.gid": this.gid,
            };
            for (const key in this.getData) {
                obj["bean." + key] = this.getData[key];
            }
            return obj;
        },
        postData(obj) {
            this.$api.risk.examineAdd(this.returnData()).then(res => {
                // 数据有误
                if (typeof res != "object") {
                    this.$toast("服务器连接错误")
                    return;
                }
                this.close();
                this.$emit("addSuc");
            });
        },
        // 获取频率
        getRate(v) {
            this.getData.rate = v.text;
        },
        // 获取单位
        getDept(v) {
            this.getData.deptid = v.id;
        },
        close() {
            this.$refs.tree.reset();
            this.$refs.pick.reset();
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
        gTypeSlots() {
            return this.$store.state.gTypeSlots;
        }
    },
    components: {
        picker,
        tree
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>