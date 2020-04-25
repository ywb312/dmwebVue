<template>
    <div>
        <SearchBox placeholder="确认标准,适用作业面类型搜索" @callback="searchBack"></SearchBox>
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
                            <p>确认项目: {{item.itemstypeText}}</p>
                        </div>
                        <div>
                            <p>确认内容: {{item.remark}}</p>
                        </div>
                        <div>
                            <p>确认标准: {{item.itemscontent}}</p>
                        </div>
                        <div>
                            <p>适用作业面类型: {{item.rangetext}}</p>
                        </div>
                        <div>
                            <p>创建人: {{item.createman}}</p>
                        </div>
                        <div>
                            <p>创建时间: {{item.createtime}}</p>
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
    name: "TaskWorkSafety",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/taskworksafetyconfirmitems/list.action",
                obj: {}
            },
            qrxmArr: [
                {
                    id: "QRXMFL001",
                    text: "空气质量"
                },
                {
                    id: "QRXMFL002",
                    text: "照明状况"
                },
                {
                    id: "QRXMFL003",
                    text: "洒水除尘"
                },
                {
                    id: "QRXMFL004",
                    text: "敲帮问顶"
                },
                {
                    id: "QRXMFL005",
                    text: "爆破安全"
                },
                {
                    id: "QRXMFL006",
                    text: "坠落防护"
                },
                {
                    id: "QRXMFL007",
                    text: "顶板防护"
                },
                {
                    id: "QRXMFL008",
                    text: "机电设施"
                },
                {
                    id: "QRXMFL009",
                    text: "矿仓防护"
                },
                {
                    id: "QRXMFL010",
                    text: "供矿设施"
                },
                {
                    id: "QRXMFL011",
                    text: "充填管道"
                },
                {
                    id: "QRXMFL012",
                    text: "充填隔墙"
                },
                {
                    id: "QRXMFL013",
                    text: "机械设备"
                },
                {
                    id: "QRXMFL014",
                    text: "溜井防护"
                },
                {
                    id: "QRXMFL015",
                    text: "物料堆放"
                },
                {
                    id: "QRXMFL016",
                    text: "物体打击"
                },
                {
                    id: "QRXMFL017",
                    text: "动力配电"
                },
                {
                    id: "QRXMFL018",
                    text: "警戒措施"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "itemstype", this.qrxmArr);
            });
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.cleraData();
        },
        btnClick(obj) {}
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>