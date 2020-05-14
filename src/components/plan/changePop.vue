<template>
    <div>
        <div class="maskWrap" v-if="changeShow" @click="close">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">排查隐患</div>
                <van-form @submit="postData" :show-error-message="false">
                    <van-field
                        label="隐患名称"
                        placeholder="请输入隐患名称"
                        v-model="inspacetcontent"
                        :rules="[{ required: true, message: '1' }]"
                    ></van-field>
                    <van-field
                        label="存在问题"
                        placeholder="请输入存在问题"
                        v-model="czwt"
                        :rules="[{ required: true, message: '1' }]"
                    ></van-field>
                    <picker title="可能发生" ref="knfs" :slots="knfsSlots" @returnMsg="getKnfs"></picker>
                    <van-field name="radio" label="隐患类型">
                        <template #input>
                            <van-radio-group v-model="prtype" direction="horizontal">
                                <van-radio name="YHLX001">一般隐患</van-radio>
                                <van-radio name="YHLX002">重大隐患</van-radio>
                            </van-radio-group>
                        </template>
                    </van-field>
                    <picker
                        v-if="prtype=='YHLX001'"
                        title="隐患分类"
                        ref="childtype"
                        :slots="classifySlots"
                        @returnMsg="getClassify"
                    ></picker>
                    <div class="setBtnGroup">
                        <van-button type="info" native-type="button" @click="close">取消</van-button>
                        <van-button type="info" native-type="submit">确定</van-button>
                    </div>
                </van-form>
            </div>
        </div>
    </div>
</template>
<script>
// 修改原对象 公用一个堆地址 不用返回赋值
import picker from "@/components/pub/picker.vue";
export default {
    data() {
        return {
            inspacetcontent: "",
            czwt: "",
            knfs: "",
            prtype: "YHLX001",
            childtype: "",
            classifySlots: [
                { text: "管理缺陷", id: "YHLB001" },
                { text: "设备设施不安全", id: "YHLB002" },
                { text: "员工行为不安全", id: "YHLB003" },
                { text: "作业环境不安全", id: "YHLB004" },
                { text: "防护用品/器不安全", id: "YHLB005" }
            ]
        };
    },
    props: ["changeShow", "selectData"],
    methods: {
        // 获取不同下拉框的值
        getKnfs(v) {
            this.knfs = v.id;
        },
        getClassify(v) {
            this.childtype = v.text;
        },
        // 返回数据
        postData() {
            this.selectData.inspacetcontent = this.inspacetcontent;
            this.selectData.czwt = this.czwt;
            this.selectData.knfs = this.knfs;
            this.selectData.prtype = this.prtype;
            this.selectData.childtype = this.childtype;
            this.close();
        },
        close() {
            this.inspacetcontent = "";
            this.czwt = "";
            this.prtype = "YHLX001";
            this.$refs.knfs.reset();
            if (this.$refs.childtype) {
                this.$refs.childtype.reset();
            }
            this.$emit("popupClose");
        }
    },
    watch: {
        changeShow(newValue) {
            if (newValue) {
                this.inspacetcontent = this.selectData.inspacetcontent;
            }
        }
    },
    computed: {
        knfsSlots() {
            return this.$store.state.knfsSlots;
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
    margin-top: 40%;
}
</style>