<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="检查记录详情"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <van-sticky :offset-top="46">
            <div class="topPage">
                <div>
                    计划名称:
                    <span>{{selectData.cpname}}</span>
                </div>
                <div>
                    检查时间:
                    <span>{{selectData.checkend}}</span>
                </div>
                <div>
                    作业地点:
                    <span>{{selectData.zydd}}</span>
                </div>
                <div>
                    检查人员:
                    <span>{{selectData.tbr}}</span>
                </div>
                <div>
                    <span>检查结果</span>
                </div>
            </div>
        </van-sticky>
        <van-pull-refresh v-model="isLoading" @refresh="cleraData">
            <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                <div class="main">
                    <div>
                        管控措施:
                        <span>{{index+1+'.'+item.gkcs.inspacetcontent}}</span>
                    </div>
                    <div>
                        危险源:
                        <span>{{item.maindanger}}</span>
                    </div>
                    <div>
                        检查结果:
                        <span>已落实</span>
                    </div>
                </div>
            </div>
            <van-empty v-show="noData" description="暂无数据" />
            <van-empty image="error" v-show="noRes" description="数据有误" />
        </van-pull-refresh>
    </div>
</template>
<script>
export default {
    name: "planDetail",
    data() {
        return {
            rendering: [],
            isLoading: false,
            noData: false,
            noRes: false
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取当前页面数据函数
        getData() {
            this.$api.plan
                .doDetail({ "bean.cpid": this.selectData.cpid })
                .then(res => {
                    this.isLoading = false;
                    // 数据有误
                    if (typeof res != "object") {
                        this.noRes = true;
                        return;
                    }
                    if (res.entity && res.entity.length != 0) {
                        this.setRendering(res.entity);
                    } else {
                        this.noData = true;
                    }
                });
        },
        // 处理rendering渲染数据的函数
        setRendering(arr) {
            let render = [];
            arr.forEach(item => {
                item.gkcs.forEach(element => {
                    let _obj = JSON.stringify(item);
                    let objClone = JSON.parse(_obj);
                    objClone.gkcs = element;
                    render.push(objClone);
                });
            });
            this.rendering = render;
        },
        // 清空所需渲染数据并重新渲染
        cleraData() {
            this.noRes = false;
            this.noData = false;
            this.rendering = [];
            this.getData();
        }
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>
<style scoped>
.topPage {
    background: white;
}
.topPage span,
.main span {
    color: #2585cf;
}
.topPage div {
    padding: 10px 15px;
}
.main div {
    display: block;
}
</style>