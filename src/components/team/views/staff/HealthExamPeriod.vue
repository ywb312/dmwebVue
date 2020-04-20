<template>
    <div>
        <SearchBox placeholder="请输入员工姓名,工号,单位,工种搜索" @callback="searchBack"></SearchBox>
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
                            <p>姓名: {{item.staffname}}</p>
                        </div>
                        <div>
                            <p>性别: {{item.sexText}}</p>
                        </div>
                        <div>
                            <p>身份证号: {{item.idcard}}</p>
                        </div>
                        <div>
                            <p>工号:{{item.staffcode}}</p>
                        </div>
                        <div>
                            <p>单位:{{item.deptname}}</p>
                        </div>
                        <div>
                            <p>工种:{{item.station}}</p>
                        </div>
                        <div>
                            <p>总工龄:{{item.workingAge}}</p>
                        </div>
                        <div>
                            <p>联系方式:{{item.relaphone}}</p>
                        </div>
                        <div>
                            <p>体检周期:{{item.examperiod}}</p>
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
    name: "HealthExamPeriod",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/sm/staff/periodlist.action",
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
        },
        btnClick(obj) {
            this.$router.push({
                path: "/team/healthDetail",
                query: {
                    filters: obj.idcard
                }
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