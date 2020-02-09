<template>
    <div class="detail">
        <!-- 标题  -->
        <mt-header :title="pageData.text">
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <mt-cell title="标题文字" value="说明文字"></mt-cell>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pageData: "",
            page : 1,
            params :{
                olddate: "0",
                queryAll: "",
                crstate: "",
                crqy: "",
                str: "",
                end: "",
                zgzrdw: "",
                param: ""
            }
        };
    },
    created() {
        let a = this.$route.query.a;
        let num = this.$store.state.listNum;
        this.pageData = this.$store.state.listPage[num - 1].page[a];    //当前页面的配置
        // 进入页面调取详情页接口 进行渲染
        this.$api.inform.showPage(this.pageData.ajaxurl, this.returnData(this.pageData)).then(res => {
            this.rendering(res.rows);
        });
    },
    methods: {
        // 根据当前页面的配置 对请求的data进行添加
        returnData(option) {
            let obj = {
                rows: 10,
                page: this.page
            };
            if (option.updata) {
                for (let i = 0; i < option.updata.length; i++) {
                    obj["bean." + option.updata[i]] = this.params[option.updata[i]];
                }
            }
            return obj;
        },
        // 渲染页面函数
        rendering(data){
            console.log(data);
        }
    },
    components: {}
};
</script>
<style scoped>
.detail {
    height: 100%;
}
.mint-header {
    background-color: #2585cf;
    height: 1.1rem;
    font-size: 20px;
}
</style>