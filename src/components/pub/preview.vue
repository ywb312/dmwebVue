<template>
    <div class="preview">
        <!-- 主体 -->
        <mt-loadmore
            :top-method="loadTop"
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :auto-fill="allLoaded"
            bottomPullText="正在加载更多..."
            ref="loadmore"
        >
            <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                <div class="title">
                    <h3>{{item[pageData.headerLeft.value]!=null?index+1+"."+item[pageData.headerLeft.value]:""}}</h3>
                    <p>{{item[pageData.headerRight.value]!=null?item[pageData.headerRight.value]:""}}</p>
                </div>
                <div class="main">
                    <div v-for="(n,m) in pageData.main" :key="m">
                        <span>{{n.key}}:</span>
                        <span style="max-width:250px;">{{item[n.value]!=null?delHtmlTag(item[n.value]):""}}</span>
                    </div>
                </div>
                <div class="bottom" @click="btnClick(item)">操作</div>
            </div>
        </mt-loadmore>
        <pop :popshow="popshow" :everyConfig="everyConfig" :selcetData="selcetData" @popupClose="popshow=false"></pop>
        <div v-show="noDate" class="noMoreText">暂无数据</div>
        <div v-show="noMore" class="noMoreText">没有更多数据了</div>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import { Loadmore } from "mint-ui";
// 具体某一项所操作的组件
import pop from "@/components/pub/previewPopup";
export default {
    name: "preview",
    data() {
        return {
            // 页码
            page: 1,
            // 渲染的数据
            rendering: [],
            // 停止上拉加
            allLoaded: false,
            // 没有数据
            noDate: false,
            // 没有更多数据了
            noMore: false,
            // 控制模态框的显示
            popshow: false,
            // 选中的列表数据
            selcetData:""
        };
    },
    // pageData父组件传来的配置项 params请求入参配置
    props: ["pageData", "params","everyConfig"],
    created() {
        this.getData();
    },
    methods: {
        // 根据当前页面的配置 对请求入参进行添加筛选
        returnData(option) {
            let obj = {
                rows: 10,
                page: this.page,
                session: window.localStorage["session_Id"]
            };
            if (option.updata) {
                for (let i = 0; i < option.updata.length; i++) {
                    obj["bean." + option.updata[i]] = this.params[
                        option.updata[i]
                    ];
                }
            }
            return obj;
        },
        // 获取当前页面数据函数
        getData(more = true) {
            this.$api.pub
                .showPage(this.pageData.ajaxurl, this.returnData(this.pageData))
                .then(res => {
                    if (!res.rows) {
                        return;
                    }
                    // 判断rows是否返回数据
                    if (res.rows.length != 0) {
                        // 判断是新增还是替换  默认为新增
                        if (more) {
                            this.rendering.push(...res.rows);
                        } else {
                            this.rendering = res.rows;
                        }
                        // 返回数据小于10条 停止上拉刷新
                        if (res.rows.length < 10) {
                            this.allLoaded = true;
                            this.noMore = true;
                        } else {
                            this.allLoaded = false;
                            this.noMore = false;
                        }
                    } else {
                        this.noDate = true;
                        this.allLoaded = true;
                    }
                });
        },
        // 按钮点击事件popup组件显示
        btnClick(obj) {
            this.selcetData = obj;
            this.popshow=true;
        },
        // 上拉加载方法
        loadBottom() {
            this.page++;
            this.$refs.loadmore.onBottomLoaded();
            this.getData();
        },
        // 下拉刷新方法
        loadTop() {
            this.cleraDate();
            this.$refs.loadmore.onTopLoaded();
        },
        // 清空所需渲染数据并重新渲染
        cleraDate() {
            this.page = 1;
            this.noMore = false;
            this.noDate = false;
            this.rendering = [];
            this.getData(false);
        },
        //正则去掉所有的html标记
        delHtmlTag(str) {
            str = str.replace(/&nbsp/g,"");
            return str.replace(/<[^>]+>/g,""); 
        },
    },
    components: {
        "mt-loadmore": Loadmore,
        pop
    }
};
</script>
<style scoped>
.preview {
    height: 100%;
    overflow: hidden;
}
.wrapper {
    border-bottom: solid 1px #ddd;
    margin-bottom: 5px;
}
.title,
.main div {
    display: flex;
    justify-content: space-between;
    padding: 0.1rem 0.4rem;
    background-color: rgb(250, 250, 250);
}
.bottom {
    width: 100%;
    padding: 0.2rem 0.3rem;
    margin-bottom: -1px;
    text-align: center;
    border-top: solid 1px #ddd;
    border-bottom: solid 1px #ddd;
    letter-spacing: 0.2rem;
}
.noMoreText {
    width: 100%;
    padding: 0.3rem 0;
    text-align: center;
    color: gray;
}
</style>