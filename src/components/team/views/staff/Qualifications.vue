<template>
    <div>
        <SearchBox placeholder="请输入单位、姓名搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>单位: {{item.dept}}</p>
                        </div>
                        <div>
                            <p>姓名: {{item.peopleName}}</p>
                        </div>
                        <div>
                            <p>性别: {{item.sexText}}</p>
                        </div>
                        <div>
                            <p>资格证类型:{{item.qualtype}}</p>
                        </div>
                        <div>
                            <p>资格证号:{{item.qualcard}}</p>
                        </div>
                        <div>
                            <p>职务:{{item.position}}</p>
                        </div>
                        <div>
                            <p>联系电话:{{item.phone}}</p>
                        </div>
                        <div>
                            <p>发证日期:{{item.startDate}}</p>
                        </div>
                        <div>
                            <p>有效期至:{{item.endDate}}</p>
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
    name: "Qualifications",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/staffarchive/qualifications/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.setSex(element, "peopleSex");
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