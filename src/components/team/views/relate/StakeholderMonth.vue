<template>
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
                            <p>相关方名称: {{item.companyName}}</p>
                        </div>
                        <div>
                            <p>年月: {{item.yearMonth}}</p>
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
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "StakeholderMonth",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/create/stakeholderMonth/list.action",
                obj: {
                    "bean.mark": "0"
                }
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        btnClick(obj) {
            this.$router.push({
                path: "/team/peopleDetail",
                query: {
                    filters: obj.stamonid
                }
            });
        }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>