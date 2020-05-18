<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="从业人员登记列表"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <!-- 主体 -->
        <div>
            <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
                <div slot="views">
                    <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                        <div class="title">
                            <h4>{{index+1+"."+item.name}}</h4>
                        </div>
                        <div class="main">
                            <div>
                                <p>性别: {{item.sex}} | 出生日期: {{item.birthday}}</p>
                            </div>
                            <div>
                                <p>文化程度: {{item.edugradeText}} | 籍贯: {{item.birthplace}}</p>
                            </div>
                            <div>
                                <p>职务: {{item.jobtitle}}</p>
                            </div>
                            <div>
                                <p>工种: {{item.profession}}</p>
                            </div>
                            <div>
                                <p>是否新进员工: {{item.isnew}}</p>
                            </div>
                            <div>
                                <p>培训日期: {{item.trainstartDate + " 至 " + item.trainendDate}}</p>
                            </div>
                            <div>
                                <p>考核情况: {{item.checkinfo}}</p>
                            </div>
                            <div>
                                <p>资格证号: {{item.qualification}}</p>
                            </div>
                            <div>
                                <p>复训日期: {{item.refreshmentDate}}</p>
                            </div>
                            <div>
                                <p>体检时间: {{item.physicalDate}}</p>
                            </div>
                            <div>
                                <p>体检情况: {{item.physicalinfo}}</p>
                            </div>
                            <div>
                                <p>备注: {{item.memo}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ViewBox>
        </div>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "peopleDetail",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/create/stakeholderpeople/list.action",
                obj: {
                    filters: this.$route.query.filters
                }
            }
        };
    },
    methods: {
        getRendering(arr) {
            let _self = this;
            this.$common.comboList({ sourcename: "XL" }).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "edugrade", res);
                });
                _self.rendering = arr;
            });
        }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>