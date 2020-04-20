<template>
    <div>
        <SearchBox placeholder="请输入姓名搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>片号: {{item.number}}</p>
                        </div>
                        <div>
                            <p>姓名: {{item.name}} | 性别: {{item.sexText}}</p>
                        </div>
                        <div>
                            <p>单位: {{item.danwei}}</p>
                        </div>
                        <div>
                            <p>出生年月: {{item.birthday}}</p>
                        </div>
                        <div>
                            <p>籍贯: {{item.place}}</p>
                        </div>
                        <div>
                            <p>工种: {{item.profession}}</p>
                        </div>
                        <div>
                            <p>本工种工龄: {{item.age}} | 累计接尘毒工龄: {{item.cdage}}</p>
                        </div>
                        <div>
                            <p>开始接尘毒年月: {{item.recordman}}</p>
                        </div>
                        <div>
                            <p>查体情况: {{item.situation}}</p>
                        </div>
                        <div>
                            <p>备注: {{item.memo}}</p>
                        </div>
                        <div>
                            <p>填表日期: {{item.tbdate}}</p>
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
    name: "WorkInjury",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/workinjury/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                if (element.sex == "XB001") {
                    element.sexText = "男";
                } else if (element.sex == "XB002") {
                    element.sexText = "女";
                }
            });
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.cleraData();
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>