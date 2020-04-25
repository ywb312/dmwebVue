<template>
    <div class="detail page">
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
                <mt-field label="作业地点" v-model="pro.craddr" readonly></mt-field>
                <mt-field label="隐患名称" v-model="pro.crname" readonly></mt-field>
                <mt-field label="检查单位" v-model="pro.crqy" readonly></mt-field>
                <mt-field label="检查人员" v-model="pro.tbr" readonly></mt-field>
                <mt-field label="隐患类型" v-model="pro.prtype" readonly></mt-field>
                <mt-field label="隐患来源" v-model="pro.sourcetype" readonly></mt-field>
                <mt-field label="检查日期" v-model="pro.pcdate" readonly></mt-field>
                <mt-field label="存在问题" v-model="pro.crdesc" readonly></mt-field>
                <div v-if="pro.yhImg.length>0">
                    <h4 class="color">检查现场图片</h4>
                    <div class="imgs">
                        <img v-for="item in pro.yhImg" :key="item" :src="item" alt />
                        <!-- 添加空div 使flex最后一行左对齐 -->
                        <div class="holder"></div>
                    </div>
                </div>
            </div>
            <div v-for="item in infos" :key="item.yhzt">
                <img class="arrow" src="@/assets/iconfont/downarrow.svg" alt />
                <div class="box">
                    <h2 class="color">{{item.text}}</h2>
                    <mt-field
                        v-for="n in item.config"
                        :key="n.label"
                        :label="n.label"
                        v-model="n.key"
                        readonly
                    ></mt-field>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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
                yhImg: []
            },
            infos: [],
            // 指派数据渲染设置
            zpConfig: [
                {
                    label: "指派人员",
                    key: "tbr"
                },
                {
                    label: "整改单位",
                    key: "filed3"
                },
                {
                    label: "治理要求",
                    key: "filed1"
                },
                {
                    label: "指派日期",
                    key: "createDate"
                },
                {
                    label: "整改日期",
                    key: "filed4"
                },
                {
                    label: "备注",
                    key: "memo"
                }
            ],
            // 整改数据渲染设置
            zgConfig: [
                {
                    label: "整改人员",
                    key: "tbr"
                },
                {
                    label: "整改单位",
                    key: "filed7"
                },
                {
                    label: "问题整改",
                    key: "filed1"
                },
                {
                    label: "整改日期",
                    key: "createDate"
                }
            ]
            // 其他数据渲染设置根据zpConfig格式添加即可
        };
    },
    created() {
        let self = this;
        let obj = {
            "bean.yhid": this.selectData.yhid,
            "bean.flag": "1"
        };
        self.$api.danger.detail(obj).then(res => {
            self.pro = res.pro;
            self.setInfos(res.infos);
        });
    },
    methods: {
        // 对数据进行筛选 添加标题
        setInfos(data) {
            let self = this;
            let res = [];
            let obj = {};
            // 数组对象去重
            for (let i = 0; i < data.length; i++) {
                if (!obj[data[i].yhzt]) {
                    // name  对应数组中的name
                    res.push(data[i]);
                    obj[data[i].yhzt] = true;
                }
            }
            res.forEach(item => {
                switch (item.yhzt) {
                    case "整改":
                        item.text = "隐患指派";
                        self.setInfoOne(item, self.zpConfig);
                        break;
                    case "验收":
                    case "验收结果":
                        item.text = "隐患整改";
                        self.setInfoOne(item, self.zgConfig);
                        break;
                    default:
                        break;
                }
            });
            self.infos = res;
        },
        // 将整合好的数据添回至某一项
        setInfoOne(data, config) {
            config.forEach(item => {
                item.key = data[item.key];
            });
            data.config = config;
        }
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    }
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