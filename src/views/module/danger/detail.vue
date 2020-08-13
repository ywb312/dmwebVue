<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="隐患详情"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <div>
            <div class="box">
                <h2 class="color">隐患描述</h2>
                <van-field label="作业地点" v-model="pro.craddr" readonly />
                <van-field label="隐患名称" v-model="pro.crname" readonly />
                <van-field label="检查单位" v-model="pro.crqy" readonly />
                <van-field label="检查人员" v-model="pro.tbr" readonly />
                <van-field label="隐患类型" v-model="pro.prtype" readonly />
                <van-field label="隐患来源" v-model="pro.sourcetype" readonly />
                <van-field label="检查日期" v-model="pro.pcdate" readonly />
                <van-field label="存在问题" v-model="pro.crdesc" readonly />
                <div v-if="pro.yhImg.length>0">
                    <h4 class="color">检查现场图片</h4>
                    <div class="imgs">
                        <img
                            v-for="item in pro.yhImg"
                            :key="item"
                            @click="previewImg(item)"
                            :src="item"
                            alt
                        />
                        <!-- 添加空div 使flex最后一行左对齐 -->
                        <div class="holder"></div>
                    </div>
                </div>
            </div>
            <div v-for="(item,index) in infos" :key="index">
                <img class="arrow" src="@/assets/iconfont/downarrow.svg" alt />
                <div class="box" v-if="item.yhzt == '整改'">
                    <h2 class="color">隐患指派</h2>
                    <van-field label="指派日期" v-model="item.createDate" readonly />
                    <van-field label="整改截至日期" v-model="item.filed4" readonly />
                    <van-field label="处理状态" v-model="item.clzt" readonly />
                    <van-field label="指令来源" v-model="item.zlly" readonly />
                    <van-field label="治理要求" v-model="item.filed1" readonly />
                    <van-field label="整改单位" v-model="item.filed3" readonly />
                    <van-field label="指派人员" v-model="item.tbr" readonly />
                </div>
                <div class="box" v-if="item.yhzt == '验收'">
                    <h2 class="color">隐患整改</h2>
                    <van-field label="申请日期" v-model="item.filed8" readonly />
                    <van-field label="复查申请人" v-model="item.createid" readonly />
                    <van-field label="处理状态" v-model="item.clzt" readonly />
                    <van-field label="问题整改" v-model="item.filed1" readonly />
                    <van-field label="整改单位" v-model="item.filed7" readonly />
                    <van-field label="整改人员" v-model="item.tbr" readonly />
                    <van-field label="整改日期" v-model="item.createDate" readonly />
                    <div v-if="item.imgs&&item.imgs.length>0">
                        <h4 class="color">检查现场图片</h4>
                        <div class="imgs">
                            <img
                                v-for="item in item.imgs"
                                :key="item"
                                @click="previewImg(item)"
                                :src="item"
                                alt
                            />
                            <!-- 添加空div 使flex最后一行左对齐 -->
                            <div class="holder"></div>
                        </div>
                    </div>
                </div>
                <div class="box" v-if="item.yhzt == '评估'">
                    <h2 class="color">隐患评估</h2>
                    <van-field label="创建日期" v-model="item.createDate" readonly />
                    <van-field label="评估人" v-model="item.filed2" readonly />
                    <van-field label="评估部门" v-model="item.filed3" readonly />
                    <van-field label="评估时间" v-model="item.filed5" readonly />
                    <van-field label="评估描述" v-model="item.filed6" readonly />
                    <van-field label="管控措施" v-model="item.filed1" readonly />
                    <van-field label="指派人员" v-model="item.tbr" readonly />
                    <van-field label="备注" v-model="item.memo" readonly />
                </div>
                <div class="box" v-if="item.yhzt == '验收结果'">
                    <h2 class="color">验收结果</h2>
                    <van-field label="验收时间" v-model="item.createDate" readonly />
                    <van-field label="验收责任单位" v-model="item.filed3" readonly />
                    <van-field label="填表人" v-model="item.tbr" readonly />
                    <van-field label="验收结论" v-model="item.filed6" readonly />
                    <van-field label="验收情况" v-model="item.filed1" readonly />
                    <van-field label="备注" v-model="item.memo" readonly />
                    <div v-if="item.imgs&&item.imgs.length>0">
                        <h4 class="color">检查现场图片</h4>
                        <div class="imgs">
                            <img
                                v-for="item in item.imgs"
                                :key="item"
                                @click="previewImg(item)"
                                :src="item"
                                alt
                            />
                            <!-- 添加空div 使flex最后一行左对齐 -->
                            <div class="holder"></div>
                        </div>
                    </div>
                </div>
                <div class="box" v-if="item.yhzt == '督办'">
                    <h2 class="color">隐患督办</h2>
                    <van-field label="患督创建日期" v-model="item.createDate" readonly />
                    <van-field label="督办创建人" v-model="item.createid" readonly />
                    <van-field label="督办截至日期" v-model="item.filed4" readonly />
                    <van-field label="处理状态" v-model="item.clzt" readonly />
                    <van-field label="督办主管部门" v-model="item.filed3" readonly />
                    <van-field label="督办事项" v-model="item.filed1" readonly />
                    <van-field label="填表人" v-model="item.tbr" readonly />
                    <van-field label="备注" v-model="item.memo" readonly />
                </div>
                <div class="box" v-if="item.yhzt == '闭环'">
                    <h2 class="color">隐患闭环</h2>
                    <van-field label="隐患闭环人" v-model="item.createid" readonly />
                    <van-field label="销案日期" v-model="item.createDate" readonly />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ImagePreview } from "vant";
export default {
    name: "detail",
    data() {
        return {
            pro: {
                craddr: "",
                crname: "",
                crqy: "",
                tbr: "",
                prtype: "",
                sourcetype: "",
                pcdate: "",
                crdesc: "",
                yhImg: [],
            },
            infos: [],
        };
    },
    created() {
        let _self = this;
        let obj = {
            "bean.yhid": this.$route.query.yhid,
            "bean.flag": "1",
            "bean.tablesuffix": this.deptId,
            "bean.recursuffix": ")",
            "bean.recurprefix": "get",
        };
        _self.$api.danger.detail(obj).then((res) => {
            // 数据有误
            if (typeof res != "object") {
                _self.$toast("服务器连接错误");
                return;
            }
            _self.pro = res.pro;
            _self.infos = res.infos;
        });
    },
    methods: {
        // 图片预览
        previewImg(item) {
            ImagePreview({
                images: [item],
                showIndex: false,
            });
        },
    },
    computed: {
        deptId() {
            return this.$store.state.deptId;
        },
    },
};
</script>
<style scoped>
.box {
    margin: 15px;
    padding: 10px;
    border: solid 1px #2585cf;
    border-radius: 10px;
}
.color {
    color: #2585cf;
}
.imgs {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
.holder {
    width: 30%;
}
.imgs img {
    width: 30%;
    height: 70px;
    margin-bottom: 5px;
}
.arrow {
    display: block;
    margin: auto;
}
</style>
<style scoped src="@/assets/css/public.css"/>