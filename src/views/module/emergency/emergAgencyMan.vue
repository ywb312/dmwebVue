<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="救援队伍人员"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <!-- 主体 -->
        <div>
            <SearchBox placeholder="请输入演练名称/预案名称搜索" @callback="searchBack"></SearchBox>
            <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
                <div slot="views">
                    <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                        <div class="title">
                            <h4>{{index+1+"."+item.name}}</h4>
                        </div>
                        <div class="main">
                            <div>
                                <p>人员单位: {{item.dept}}</p>
                            </div>
                            <div>
                                <p>人员角色: {{item.role}}</p>
                            </div>
                            <div>
                                <p>人员电话: {{item.tel}}</p>
                            </div>
                            <div>
                                <p>职责: {{item.duty}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ViewBox>
        </div>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "emergAgencyMan",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/eme/emeagenman/list.action",
                obj: {
                    filters: this.$route.query.id,
                    "bean.param": ""
                }
            }
        };
    },
    methods: {
        getRendering(v) {
            this.rendering = v;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.clearData();
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>