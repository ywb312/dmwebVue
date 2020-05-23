<template>
    <div>
        <div class="maskWrap" v-show="setShow" @click="close">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">{{this.type == "add"?"新增危险源":"修改危险源"}}</div>
                <van-form @submit="postData" :show-error-message="false">
                    <van-field
                        label="危险源名称"
                        v-model="getData.wname"
                        placeholder="危险源名称"
                        :rules="[{ required: true, message: '填写危险源名称' }]"
                    />
                    <van-field
                        label="项目"
                        v-model="getData.project"
                        placeholder="项目"
                        :rules="[{ required: true, message: '填写项目' }]"
                    />
                    <van-field
                        label="内容"
                        v-model="getData.content"
                        placeholder="内容"
                        :rules="[{ required: true, message: '填写内容' }]"
                    />
                    <picker title="影响范围" ref="yxfwPick" :slots="yxfwSlots" @returnMsg="getYxfw"></picker>
                    <picker title="可能导致的危害" ref="knfsPick" :slots="knfsSlots" @returnMsg="getKnfs"></picker>
                    <picker title="潜在后果" ref="qzhgPick" :slots="qzhgSlots" @returnMsg="getQzhg"></picker>
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
                wname: "",
                project: "",
                content: "",
                yxfw: "",
                knfs: "",
                qzhg: ""
            },
            knfsSlots: [],
            yxfwSlots: [],
            qzhgSlots: []
        };
    },
    props: ["setShow", "fid", "selectData", "type"],
    created() {
        this.$common.comboList({ sourcename: "KNFS" }).then(res => {
            this.knfsSlots = res;
        });
        this.$common.comboList({ sourcename: "YXFWEI" }).then(res => {
            this.yxfwSlots = res;
        });
        this.$common.comboList({ sourcename: "QZHG" }).then(res => {
            this.qzhgSlots = res;
        });
    },
    methods: {
        // 根据当前页面的配置 对请求入参进行添加筛选
        returnData(option) {
            let obj = {};
            if (this.type == "add") {
                obj["bean.fid"] = this.fid;
            } else if (this.type == "mod") {
                obj["bean.fid"] = this.selectData.fid;
                obj["bean.wid"] = this.selectData.wid;
            }
            for (const key in this.getData) {
                obj["bean." + key] = this.getData[key];
            }
            return obj;
        },
        postData(obj) {
            this.$store.commit("setIsLoading", true);
            if (this.type == "add") {
                this.$api.risk.companyRiskAdd(this.returnData()).then(res => {
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
                    .companyRiskModify(this.returnData())
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
        // 选择器赋值
        getYxfw(v) {
            this.getData.yxfw = v.id;
        },
        getKnfs(v) {
            this.getData.knfs = v.id;
        },
        getQzhg(v) {
            this.getData.qzhg = v.id;
        },
        // 关闭
        close() {
            this.getData.wname = "";
            this.getData.project = "";
            this.getData.content = "";
            this.$refs.yxfwPick.reset();
            this.$refs.knfsPick.reset();
            this.$refs.qzhgPick.reset();
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
                    this.getData.wname = this.selectData.wname;
                    this.getData.project = this.selectData.project;
                    this.getData.content = this.selectData.content;
                    this.$refs.yxfwPick.setVal(this.selectData.yxfw);
                    this.$refs.knfsPick.setVal(this.selectData.knfs);
                    this.$refs.qzhgPick.setVal(this.selectData.qzhg);
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
<style scoped>
.maskMiddle {
    margin-top: 38%;
}
</style>