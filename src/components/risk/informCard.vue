<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+'.'+item.name}}</h4>
                    </div>
                    <div class="main">
                        <div class="noFlex" v-for="(n,m) in item.child" :key="m">
                            <div>
                                <p>
                                    <span class="main_title bold">{{"("+(m+1)+")"}}</span>
                                    <span class="main_val bold">{{n.deptname}}</span>
                                </p>
                            </div>
                            <div>
                                <p>作业步骤: {{item.project}}</p>
                            </div>
                            <div>
                                <p>事故类别: {{item.knfsText}}</p>
                            </div>
                            <div>
                                <p>危害有害因素: {{item.wname}}</p>
                            </div>
                            <div v-for="(key,val) in n.child" :key="val">
                                <p>
                                    <span class="main_title">{{key.gtypeText+":"}}</span>
                                    <span class="main_val">{{key.gname}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "informCard",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/risk/companyRisk/gzk.action",
                obj: {}
            }
        };
    },
    methods: {
        // 处理请求的数据
        getRendering(arr) {
            let _self = this;
            this.setRes(arr).then(res => {
                _self.rendering = res;
            });
        },
        // 设置返还参数
        setRes(arr) {
            let _self = this;
            let returnArr = [];
            function getItem(key, val, arr) {
                return arr.findIndex(item => item[key] == val);
            }
            return Promise.all([
                _self.$common.comboList({ sourcename: "KNFS" }),
                _self.$common.comboList({ sourcename: "GKCSLX" })
            ]).then(res => {
                arr.forEach((item, index, arr) => {
                    _self.$common.code2Text(item, "knfs", res[0]);
                    _self.$common.code2Text(item, "gtype", res[1]);
                    let nameIndex = getItem("name", item.name, returnArr);
                    if (nameIndex == -1) {
                        // 风险点不一致 向后新增
                        // 深拷贝
                        let obj = this.$common.deepClone(item);
                        // 加入到其危险源
                        obj.child = [this.$common.deepClone(item)];
                        // 加入到其管控措施
                        obj.child[0].child = [this.$common.deepClone(item)];
                        // 推入数组
                        returnArr.push(obj);
                    } else if (nameIndex >= 0) {
                        // 风险点一致 匹配危险源
                        let widArr = returnArr[nameIndex].child;
                        let deptnameIndex = getItem(
                            "deptname",
                            item.deptname,
                            widArr
                        );
                        if (deptnameIndex >= 0) {
                            // 危险源一致 匹配危险源
                            if (!widArr[deptnameIndex].child) {
                                widArr[deptnameIndex].child = [];
                            }
                            widArr[deptnameIndex].child.push(item);
                        } else if (deptnameIndex == -1) {
                            // 危险源不一致 向后新增
                            let obj = this.$common.deepClone(item);
                            obj.child = [this.$common.deepClone(item)];
                            widArr.push(obj);
                        }
                    }
                });
                return returnArr;
            });
        }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>