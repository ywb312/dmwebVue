<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="体检详细名单"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <div>
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
                                <p>工号: {{item.jobnum}}</p>
                            </div>
                            <div>
                                <p>姓名: {{item.name}}</p>
                            </div>
                            <div>
                                <p>体检类型: {{item.examtypeText}}</p>
                            </div>
                            <div>
                                <p>接触有毒物质: {{item.toxictype}}</p>
                            </div>
                            <div>
                                <p>性别: {{item.sexText}}</p>
                            </div>
                            <div>
                                <p>身份证号: {{item.idcard}}</p>
                            </div>
                            <div>
                                <p>总工龄: {{item.age}}</p>
                            </div>
                            <div>
                                <p>工种: {{item.jobtype}}</p>
                            </div>
                            <div>
                                <p>部门: {{item.dept}}</p>
                            </div>
                            <div>
                                <p>联系方式: {{item.tel}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ViewBox>
        </div>
    </div>
</template>
<script>
import Popup from "@/components/pub/Popup.vue";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "healthReport",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate//health/examdetail/doList.action",
                obj: {
                    filters: this.$route.query.filters
                }
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            this.$common.comboList({ sourcename: "TJLX" }).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "examtype", res);
                    _self.$common.setSex(element);
                });
                _self.rendering = arr;
            });
        }
    },
    components: {
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>