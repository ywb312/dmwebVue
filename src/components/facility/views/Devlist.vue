<template>
    <div>
        <SearchBox placeholder="请输入设备名称，设备编号搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.devname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>设备编号: {{item.devcode}}</p>
                        </div>
                        <div>
                            <p>规格型号: {{item.specification}}</p>
                        </div>
                        <div>
                            <p>设备类别: {{item.devtypeText}}</p>
                        </div>
                        <div>
                            <p>使用部门: {{item.deptname}}</p>
                        </div>
                        <div>
                            <p>安装地点: {{item.position}}</p>
                        </div>
                        <div>
                            <p>特种设备属性: {{item.devattributeText}}</p>
                        </div>
                        <div>
                            <p>责任人员: {{item.operateman}}</p>
                        </div>
                        <div>
                            <p>维护保养状态: {{item.maketime}}</p>
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
    name: "Devlist",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/dev/devinfo/dolist.action",
                obj: {
                    "bean.element": this.pageData.element
                }
            },
            tzsbsxArr: [
                {
                    id: "TZSBSX001",
                    text: "锅炉"
                },
                {
                    id: "TZSBSX002",
                    text: "压力容器"
                },
                {
                    id: "TZSBSX003",
                    text: "压力管道"
                },
                {
                    id: "TZSBSX004",
                    text: "电梯"
                },
                {
                    id: "TZSBSX005",
                    text: "起重机械"
                },
                {
                    id: "TZSBSX006",
                    text: "客运索道"
                },
                {
                    id: "TZSBSX007",
                    text: "大型游乐设施"
                },
                {
                    id: "TZSBSX008",
                    text: "场（厂）内专用机动车辆"
                },
                {
                    id: "TZSBSX009",
                    text: "无"
                }
            ],
            sblbArr: [
                {
                    id: "SBLB001",
                    text: "建（构）筑物"
                },
                {
                    id: "SBLB002",
                    text: "采掘设备"
                },
                {
                    id: "SBLB003",
                    text: "运输设备"
                },
                {
                    id: "SBLB004",
                    text: "提升设备"
                },
                {
                    id: "SBLB005",
                    text: "通风设备"
                },
                {
                    id: "SBLB006",
                    text: "电气设备"
                },
                {
                    id: "SBLB007",
                    text: "排水设备"
                },
                {
                    id: "SBLB008",
                    text: "供气设备"
                },
                {
                    id: "SBLB009",
                    text: "照明设施"
                },
                {
                    id: "SBLB010",
                    text: "仪器仪表"
                },
                {
                    id: "SBLB011",
                    text: "安全避险“六大系统”设备"
                },
                {
                    id: "SBLB012",
                    text: "备用设备"
                },
                {
                    id: "SBLB013",
                    text: "矿安煤安标志设备"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            Promise.all([
                _self.$common.comboList({ sourcename: "TZSBSX" }),
                _self.$common.comboList({ sourcename: "SBLB" })
            ]).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "devattribute", res[0]);
                    _self.$common.code2Text(element, "devtype", res[1]);
                });
                _self.rendering = arr;
            });
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