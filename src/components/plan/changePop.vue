<template>
    <div>
        <div class="maskWrap" v-show="changeShow" @touchmove.prevent @click.stop="close">
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
                    <picker
                        v-if="prtype=='YHLX001'"
                        ref="crLevel"
                        title="隐患等级"
                        :slots="crLevelSlots"
                        @returnMsg="getCrLevel"
                    ></picker>
                    <div class="bgColor">
                        <uploadimg ref="upImg" @toImgArr="getImgArr"></uploadimg>
                    </div>
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
import uploadimg from "@/components/pub/uploadimg";
export default {
    data() {
        return {
            // 确定
            confim: false,
            // 数据
            inspacetcontent: "",
            czwt: "",
            knfs: "",
            crLevel: "",
            prtype: "YHLX001",
            childtype: "",
            knfsSlots: [],
            classifySlots: [],
            // 下拉框的配置
            crLevelSlots: [
                { text: "一级", id: "1" },
                { text: "二级", id: "2" },
                { text: "三级", id: "3" },
                { text: "四级", id: "4" }
            ],
            upImgArr: []
        };
    },
    props: ["changeShow", "selectData"],
    created() {
        this.$common.comboList({ sourcename: "KNFS" }).then(res => {
            this.knfsSlots = res;
        });
        this.$common.comboList({ sourcename: "YHLB" }).then(res => {
            this.classifySlots = res;
        });
    },
    methods: {
        // 获取不同下拉框的值
        getKnfs(v) {
            this.knfs = v.id;
        },
        getClassify(v) {
            this.childtype = v.text;
        },
        getCrLevel(v) {
            this.crLevel = v.id;
        },
        // 获取图片数组
        getImgArr(v) {
            this.upImgArr = v;
        },
        // 返回数据
        postData() {
            this.confim = true;
            this.selectData.inspacetcontent = this.inspacetcontent;
            this.selectData.czwt = this.czwt;
            this.selectData.knfs = this.knfs;
            this.selectData.prtype = this.prtype;
            if (this.prtype == "YHLX001") {
                this.selectData.crLevel = this.crLevel;
            }
            this.selectData.childtype = this.childtype;
            this.selectData.img = this.upImgArr;
            this.close();
        },
        close() {
            this.$emit("popupClose");
            this.inspacetcontent = "";
            this.czwt = "";
            this.prtype = "YHLX001";
            this.$refs.knfs.reset();
            if (this.$refs.childtype) {
                this.$refs.childtype.reset();
            }
            if (this.$refs.crLevel) {
                this.$refs.crLevel.reset();
            }
            this.$refs.upImg.clearImg();
            if (this.confim) {
                this.confim = false;
                this.$emit("suc");
            }
        }
    },
    watch: {
        changeShow(newValue) {
            if (newValue) {
                this.inspacetcontent = this.selectData.inspacetcontent;
                if (this.selectData.czwt) {
                    this.czwt = this.selectData.czwt;
                }
                if (this.selectData.prtype) {
                    this.prtype = this.selectData.prtype;
                }
                if (this.selectData.knfs) {
                    this.$refs.knfs.setVal(this.selectData.knfs);
                }
                if (
                    this.selectData.prtype == "YHLX001" &&
                    this.selectData.crLevel
                ) {
                    this.$refs.crLevel.setVal(this.selectData.crLevel);
                }
            }
        }
    },
    components: {
        picker,
        uploadimg
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>
<style scoped>
.maskWrap {
    overflow: scroll;
}
.maskMiddle {
    margin-top: 15%;
}
.bgColor {
    background: white;
}
.setBtnGroup {
    padding-top: 8px;
}
</style>