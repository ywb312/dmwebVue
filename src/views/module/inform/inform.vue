<template>
    <div class="inform">
        <!-- 标题  -->
        <mt-header :title="pageData.text" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
             <mt-button slot="right" @click="comp">
                <img src="@/assets/iconfont/add.svg" />
            </mt-button>
        </mt-header>
        <!-- 主体 -->
        <div class="wrap">
            <preview :params="params" :pageData="pageData"></preview>
        </div>
    </div>
</template>
<script>
import preview from "@/components/pub/preview";
export default {
    name: "inform",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 传入的对象
            params: {
                olddate: "0"
            },
            page: [
                {
                    text: "通知公告管理",
                    ajaxurl: "biz/pub/publicnotify/list.action",
                    // ajax入参 updata
                    // 标题左侧
                    headerLeft: {
                        key: "标题",
                        value: "title"
                    },
                    // 标题右侧
                    headerRight: {
                        key: "通知类型",
                        value: "notiftype"
                    },
                    // 内容
                    main: [
                        {
                            key: "审核人",
                            value: "checkman"
                        },
                        {
                            key: "发布单位",
                            value: "createdept"
                        },
                        {
                            key: "发布时间",
                            value: "createtime"
                        },
                        {
                            key: "修改时间",
                            value: "modifytime"
                        },
                        {
                            key: "审核时间",
                            value: "checktime"
                        },
                        {
                            key: "消息内容",
                            value: "content"
                        }
                    ]
                },
                {
                    text: "新闻动态",
                    ajaxurl: "biz/pub/pubcontext/publist.action",
                    updata: ["olddate"],
                    headerLeft: {
                        key: "标题",
                        value: "title"
                    },
                    headerRight: {
                        key: "栏目名称",
                        value: "moduleid"
                    },
                    main: [
                        {
                            key: "子栏目",
                            value: "remarks"
                        },
                        {
                            key: "发布人",
                            value: "pubman"
                        },
                        {
                            key: "发布单位",
                            value: "pubdept"
                        },
                        {
                            key: "发布时间",
                            value: "pubtime"
                        },
                        {
                            key: "修改人",
                            value: "updateman"
                        },
                        {
                            key: "修改时间",
                            value: "updatetime"
                        }
                    ]
                }
            ]
        };
    },
    created() {
        let a = this.$route.query.a;
        this.pageData = this.page[a]; //当前页面的配置
    },
    methods: {
        com(){
            if (this.$route.query.a == 0) {
                
            } else {
                
            }
        }
    },
    components: {
        preview
    }
};
</script>
<style scoped>
.inform {
    height: 100%;
}
</style>