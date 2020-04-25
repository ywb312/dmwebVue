<template>
    <div>
        <SearchBox placeholder="输入班组名称、会议名称、参会人员" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.classteamname}}</h4>
                        <p style="min-width:40px">
                            <van-tag round type="primary">{{item.classesText}}</van-tag>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <p>班组长: {{item.classteamer}}</p>
                        </div>
                        <div>
                            <p>主持人: {{item.hostman}}</p>
                        </div>
                        <div>
                            <p>参会领导: {{item.leaders}}</p>
                        </div>
                        <div>
                            <p>记录时间: {{item.createtime}}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </ViewBox>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "LeaderRecord",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/taskclassdownholeinfo/listbycreateid.action",
                obj: {}
            },
            bcArr: [
                {
                    text: "早班",
                    id: "BC001"
                },
                {
                    text: "中班",
                    id: "BC002"
                },
                {
                    text: "晚班",
                    id: "BC003"
                },
                {
                    text: "休班",
                    id: "BC004"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "classes", this.bcArr);
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
                path: "/person/replaceDetail"
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