<template>
    <div class="planDetail page">
        <!-- 标题  -->
        <mt-header title="检查记录详情" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
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
        <mt-loadmore
            :top-method="loadTop"
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :auto-fill="allLoaded"
            bottomPullText="正在加载更多..."
            ref="loadmore"
        >
            <div class="wrap">
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
            </div>
        </mt-loadmore>
        <div v-show="noDate" class="noMoreText">暂无数据</div>
    </div>
</template>
<script>
import { Loadmore } from "mint-ui";
import { Toast } from "mint-ui";
export default {
    name: "planDetail",
    data() {
        return {
            rendering: [],
            allLoaded: false,
            noDate: false
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
                    if (!res.entity) {
                        return;
                    }
                    // 判断rows是否返回数据
                    if (res.entity.length != 0) {
                        this.setRendering(res.entity);
                        this.allLoaded = true;
                    } else {
                        this.noDate = true;
                        this.allLoaded = true;
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
        // 上拉加载方法
        loadBottom() {
            this.$refs.loadmore.onBottomLoaded();
            this.getData();
        },
        // 下拉刷新方法
        loadTop() {
            this.cleraData();
            this.$refs.loadmore.onTopLoaded();
        },
        // 清空所需渲染数据并重新渲染
        cleraData() {
            this.noDate = false;
            this.rendering = [];
            this.getData();
        }
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    },
    components: {
        Loadmore,
        "mt-loadmore": Loadmore
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>
<style scoped>
.topPage {
    position: sticky;
    top: 50px;
    z-index: 100;
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