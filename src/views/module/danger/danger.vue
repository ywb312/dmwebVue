<template>
    <div class="danger">
        <!-- 标题  -->
        <mt-header :title="pageData.text" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
            <mt-button v-if="a==0" slot="right" @click="$router.push('/increase')">
                <img src="@/assets/iconfont/add.svg" />
            </mt-button>
            <mt-button v-else slot="right" @click="popshow=true">
                <img src="@/assets/iconfont/search.svg" />
            </mt-button>
        </mt-header>
        <div class="wrap">
            <!-- 查看方式 -->
            <correlation
                class="sty"
                @radioChange="radioData"
                v-if="pageData.updata.indexOf('queryAll')>=0"
            ></correlation>
            <!-- 主体 -->
            <preview
                :pageData="pageData"
                :params="params"
                :everyConfig="everyConfig"
                ref="previewChild"
            ></preview>
        </div>
        <search-popup
            @returnMsg="paramsDate"
            :statusShow="a==1"
            :companyShow="a==2||a==3||a==4||a==5||a==6"
            :popshow="popshow"
            @popupClose="popshow=false"
        ></search-popup>
    </div>
</template>
<script>
// 查看方式组件
import correlation from "@/components/danger/correlation";
// 渲染组件
import preview from "@/components/pub/preview";
// 查找组件
import searchPopup from "@/components/danger/searchPopup";
export default {
    name: "danger",
    data() {
        return {
            // 第几个页面
            a: "",
            // 渲染页面接口所传入的对象
            params: {
                olddate: "0",
                queryAll: "null",
                crstate: "",
                crqy: "",
                str: "",
                end: "",
                zgzrdw: "",
                param: ""
            },
            // 查找组件的显示
            popshow: false,
            // 筛选出页面配置
            pageData: "",
            // 所有页面进入的配置
            page: [
                {
                    text: "隐患处理",
                    ajaxurl: "biz/im/zdrisknotice/list_notice_two.action",
                    updata: ["olddate"],
                    headerLeft: {
                        value: "crname"
                    },
                    headerRight: {
                        value: "txlb"
                    },
                    main: [
                        {
                            key: "隐患描述",
                            value: "crdesc"
                        },
                        {
                            key: "隐患场所",
                            value: "craddr"
                        },
                        {
                            key: "审批时间",
                            value: "pcdate"
                        }
                    ]
                },
                {
                    text: "隐患详情查询",
                    ajaxurl: "biz/rm/processrisk/list.action",
                    updata: ["queryAll", "crstate", "crqy", "str", "end"],
                    headerLeft: {
                        value: "crname"
                    },
                    headerRight: {
                        value: "crdeptcode"
                    },
                    main: [
                        {
                            key: "存在问题",
                            value: "crdesc"
                        },
                        {
                            key: "隐患地点",
                            value: "craddr"
                        },
                        {
                            key: "检查时间",
                            value: "pcdate"
                        },
                        {
                            key: "检查人",
                            value: "createid"
                        }
                    ]
                },
                {
                    text: "重大隐患评估记录",
                    ajaxurl: "biz/rm/zdriskassess/list.action",
                    updata: ["str", "end"],
                    headerLeft: {
                        value: "crname"
                    },
                    headerRight: {
                        value: ""
                    },
                    main: [
                        {
                            key: "评估部门",
                            value: "deptName"
                        },
                        {
                            key: "评估描述",
                            value: "pgdesc"
                        },
                        {
                            key: "管控措施",
                            value: "gkcs"
                        },
                        {
                            key: "评估时间",
                            value: "pgdate"
                        },
                        {
                            key: "创建时间",
                            value: "createdate"
                        },
                        {
                            key: "填表人员",
                            value: "tbr"
                        },
                        {
                            key: "备注",
                            value: "memo"
                        }
                    ]
                },
                {
                    text: "重大隐患督办记录",
                    ajaxurl: "biz/rm/zdriskfeet/list.action",
                    updata: ["str", "end"],
                    headerLeft: {
                        value: "crname"
                    },
                    headerRight: {
                        value: ""
                    },
                    main: [
                        {
                            key: "督办单位",
                            value: "deptName"
                        },
                        {
                            key: "督办事项",
                            value: "column_12"
                        },
                        {
                            key: "督办截止日期",
                            value: "dbjzdate"
                        },
                        {
                            key: "创建日期",
                            value: "createdate"
                        },
                        {
                            key: "填表人员",
                            value: "tbr"
                        },
                        {
                            key: "备注",
                            value: "memo"
                        }
                    ]
                },
                {
                    text: "隐患整改指令记录",
                    ajaxurl: "biz/rm/zdriskreform/list.action",
                    updata: ["str", "end", "zgzrdw"],
                    headerLeft: {
                        value: "crname"
                    },
                    headerRight: {
                        value: "deptName"
                    },
                    main: [
                        {
                            key: "整改责任单位",
                            value: "zgzrdwName"
                        },
                        {
                            key: "整改治理要求",
                            value: "zgzlyq"
                        },
                        {
                            key: "整改截止日期",
                            value: "zgdate"
                        },
                        {
                            key: "创建日期",
                            value: "createdate"
                        },
                        {
                            key: "填表人员",
                            value: "tbr"
                        },
                        {
                            key: "备注",
                            value: "memo"
                        }
                    ]
                },
                {
                    text: "隐患申请复查记录",
                    ajaxurl: "biz/rm/zdriskreview/list.action",
                    updata: ["str", "end", "zgzrdw"],
                    headerLeft: {
                        value: "crname"
                    },
                    headerRight: {
                        value: ""
                    },
                    main: [
                        {
                            key: "申请验收单位",
                            value: "dwysryname"
                        },
                        {
                            key: "申请验收说明",
                            value: "dyysqk"
                        },
                        {
                            key: "整改申请部门",
                            value: "zgpsbmName"
                        },
                        {
                            key: "整改情况说明",
                            value: "zgpsqk"
                        },
                        {
                            key: "验收截止日期",
                            value: "fcjzdate"
                        },
                        {
                            key: "创建时间",
                            value: "createdate"
                        },
                        {
                            key: "填表人员",
                            value: "tbr"
                        }
                    ]
                },
                {
                    text: "隐患验收结果记录",
                    ajaxurl: "biz/rm/zdriskaccept/list.action",
                    updata: ["str", "end", "zgzrdw"],
                    headerLeft: {
                        value: "crname"
                    },
                    headerRight: {
                        value: ""
                    },
                    main: [
                        {
                            key: "验收负责单位",
                            value: "ysfzdwName"
                        },
                        {
                            key: "验收专家人员",
                            value: "yszjry"
                        },
                        {
                            key: "现场验收时间",
                            value: "xcyssj"
                        },
                        {
                            key: "验收情况",
                            value: "ysqk"
                        },
                        {
                            key: "创建时间",
                            value: "createdate"
                        },
                        {
                            key: "填表人员",
                            value: "tbr"
                        },
                        {
                            key: "备注",
                            value: "memo"
                        }
                    ]
                },
                {
                    text: "重大隐患闭环记录",
                    ajaxurl: "biz/rm/zdriskclose/list.action",
                    updata: ["str", "end"],
                    headerLeft: {
                        value: "crname"
                    },
                    headerRight: {
                        value: ""
                    },
                    main: [
                        {
                            key: "验收负责单位",
                            value: "ysfzdwName"
                        },
                        {
                            key: "验收专家人员",
                            value: "yszjry"
                        },
                        {
                            key: "现场验收时间",
                            value: "xcyssj"
                        },
                        {
                            key: "验收情况",
                            value: "ysqk"
                        },
                        {
                            key: "创建时间",
                            value: "createdate"
                        },
                        {
                            key: "填表人员",
                            value: "tbr"
                        },
                        {
                            key: "备注",
                            value: "memo"
                        }
                    ]
                }
            ],
            //router是跳转的路由名 component动态组件名 show显示的条件 value下key为接口传入的键名,获取的属性名,fix为固定值
            everyConfig: [
                {
                    text: "查看详情",
                    router: "/detail",
                    show: true
                },
                {
                    text: "审批记录",
                    component: "record",
                    show: true
                },
                {
                    text: "自查自改",
                    value: [
                        {
                            key: "bean.yhid",
                            val: "yhid",
                            fix: false
                        },
                        {
                            key: "bean.zgtype",
                            val: "ZGLX002",
                            fix: true
                        }
                    ],
                    postUrl: "biz/sc/ybyhActiviti/doexp.action"
                },
                {
                    text: "上报上级",
                    value: [
                        {
                            key: "bean.yhid",
                            val: "yhid",
                            fix: false
                        },
                        {
                            key: "bean.zgtype",
                            val: "ZGLX001",
                            fix: true
                        }
                    ],
                    postUrl: "biz/sc/ybyhActiviti/doexp.action"
                },
                {
                    text: "隐患指派",
                    router: "/assign",
                    show: true
                }
            ]
        };
    },
    created() {
        this.a = this.$route.query.a;
        this.pageData = this.page[this.a]; //当前页面的配置
    },
    methods: {
        // 查看方式 得到子组件传入的值
        radioData(v) {
            this.params.queryAll = v;
            this.$refs.previewChild.cleraData();
        },
        paramsDate(v) {
            Object.keys(v).forEach(key => {
                this.params[key] = v[key];
            });
            this.$refs.previewChild.cleraData();
        }
    },
    components: {
        preview,
        correlation,
        searchPopup
    },
    beforeRouteLeave(to, from, next) {
        if (to.name != "list") {
            //不是list , 缓存
            from.meta.keepAlive = true;
        } else {
            //list列表页,不缓存
            from.meta.keepAlive = false;
            this.$destroy();
        }
        next();
    }
};
</script>
<style scoped>
.danger {
    height: 100%;
}
.sty {
    position: sticky;
    top: 1.1rem;
    background: white;
    z-index: 100;
}
</style>