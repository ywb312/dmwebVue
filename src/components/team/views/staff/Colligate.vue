<template>
    <div>
        <SearchBox placeholder="请输入姓名搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="main">
                        <div>
                            <p>姓名: {{item.colligatename}}</p>
                        </div>
                        <div>
                            <p>民族: {{item.nationText}}</p>
                        </div>
                        <div>
                            <p>出生日期: {{item.birthday}}</p>
                        </div>
                        <div>
                            <p>籍贯: {{item.nativeplace}}</p>
                        </div>
                        <div>
                            <p>学历: {{item.educationText}}</p>
                        </div>
                        <div>
                            <p>入职时间: {{item.entrydate}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="tip">
                <van-divider>没有更多数据了</van-divider>
            </div>
        </ViewBox>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "Colligate",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/staffarchive/colligate/list.action",
                obj: {}
            },
            mzArr: [
                {
                    id: "MZ001",
                    text: "汉族"
                },
                {
                    id: "MZ002",
                    text: "壮族"
                },
                {
                    id: "MZ003",
                    text: "满族"
                },
                {
                    id: "MZ004",
                    text: "回族"
                },
                {
                    id: "MZ005",
                    text: "苗族"
                },
                {
                    id: "MZ006",
                    text: "维吾尔族"
                }
            ],
            xlArr: [
                {
                    id: "XL001",
                    text: "小学"
                },
                {
                    id: "XL002",
                    text: "初中"
                },
                {
                    id: "XL003",
                    text: "高中"
                },
                {
                    id: "XL004",
                    text: "大专"
                },
                {
                    id: "XL005",
                    text: "本科"
                },
                {
                    id: "XL006",
                    text: "硕士研究生"
                },
                {
                    id: "XL007",
                    text: "博士研究生"
                },
                {
                    id: "XL008",
                    text: "技校"
                },
                {
                    id: "XL009",
                    text: "中专"
                },
                {
                    id: "XL010",
                    text: "职高"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.setSex(element);
                this.$common.code2Text(element, "nation", this.mzArr);
                this.$common.code2Text(element, "education", this.xlArr);
            });
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.cleraData();
        },
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            this.$router.push({
                path: "/team/colligateDetail"
            });
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>