<template>
    <div>
        <SearchBox placeholder="请输入填报单位搜索" @callback="searchBack"></SearchBox>
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
                            <p>填报单位: {{item.filldept}}</p>
                        </div>
                        <div>
                            <p>记录编号: {{item.recordnum}}</p>
                        </div>
                        <div>
                            <p>填表人: {{item.tbpeople}}</p>
                        </div>
                        <div>
                            <p>审核人: {{item.shpeople}}</p>
                        </div>
                        <div>
                            <p>负责人: {{item.fzpeople}}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </ViewBox>
        <!-- 操作面板 -->
        <van-action-sheet
            v-model="show"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />
        <!-- 弹窗组件 -->
        <Popup :popshow="popshow" @close="popshow=false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>填报单位: {{selectData.filldept}}</p>
                </div>
                <div>
                    <p>记录编号: {{selectData.recordnum}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >消防器材-上月数据</van-divider>
                <div>
                    <p>干粉: {{selectData.gfsycount}}</p>
                </div>
                <div>
                    <p>CO2: {{selectData.eyhtsycount}}</p>
                </div>
                <div>
                    <p>水基型: {{selectData.sjxsycount}}</p>
                </div>
                <div>
                    <p>其它: {{selectData.qtsycount}}</p>
                </div>
                <div>
                    <p>合计: {{selectData.hjsycount}}</p>
                </div>
                <div>
                    <p>完好率（%）: {{selectData.whsyrate}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >消防器材-本月数据</van-divider>
                <div>
                    <p>干粉: {{selectData.gfbycount}}</p>
                </div>
                <div>
                    <p>CO2: {{selectData.eyhtbycount}}</p>
                </div>
                <div>
                    <p>水基型: {{selectData.sjxbycount}}</p>
                </div>
                <div>
                    <p>其它: {{selectData.qtbycount}}</p>
                </div>
                <div>
                    <p>合计: {{selectData.hjbycount}}</p>
                </div>
                <div>
                    <p>本月变动情况-更换: {{selectData.ghbycount}}</p>
                </div>
                <div>
                    <p>本月变动情况-补充: {{selectData.bcbycount}}</p>
                </div>
                <div>
                    <p>本月变动情况-新增: {{selectData.xzbycount}}</p>
                </div>
                <div>
                    <p>完好率（%）: {{selectData.whbyrate}}</p>
                </div>
                <div>
                    <p>未完成原因: {{selectData.xfqcwwcyy}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >应急照明与疏散标志-上月数据</van-divider>
                <div>
                    <p>应急照明: {{selectData.yjzmsycount}}</p>
                </div>
                <div>
                    <p>应急照明完好率（%）: {{selectData.yjzmsyrate}}</p>
                </div>
                <div>
                    <p>疏散标志: {{selectData.ssbzsycount}}</p>
                </div>
                <div>
                    <p>疏散标志完好率（%）: {{selectData.ssbzsyrate}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >应急照明与疏散标志-本月数据</van-divider>
                <div>
                    <p>应急照明: {{selectData.yjzmbycount}}</p>
                </div>
                <div>
                    <p>应急照明本月增减: {{selectData.yjzmzjbycount}}</p>
                </div>
                <div>
                    <p>应急照明完好率（%）: {{selectData.yjzmbyrate}}</p>
                </div>
                <div>
                    <p>疏散标志: {{selectData.ssbzbycount}}</p>
                </div>
                <div>
                    <p>疏散标志本月增减: {{selectData.ssbzzjbycount}}</p>
                </div>
                <div>
                    <p>疏散标志完好率（%）: {{selectData.ssbzbyrate}}</p>
                </div>
                <div>
                    <p>未完成原因: {{selectData.yjysswwcyy}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >消火栓系统-室外栓</van-divider>
                <div>
                    <p>室外栓: {{selectData.swscount}}</p>
                </div>
                <div>
                    <p>水压正常数: {{selectData.swssyzcs}}</p>
                </div>
                <div>
                    <p>水压正常值: {{selectData.swssyzcz}}</p>
                </div>
                <div>
                    <p>本月测试数: {{selectData.swsbycss}}</p>
                </div>
                <div>
                    <p>累计测试数: {{selectData.swsljcss}}</p>
                </div>
                <div>
                    <p>完好率（%）: {{selectData.swsrate}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >消火栓系统-室内栓</van-divider>
                <div>
                    <p>室内栓: {{selectData.snscount}}</p>
                </div>
                <div>
                    <p>水带水压正常数: {{selectData.snssyzcs}}</p>
                </div>
                <div>
                    <p>水压正常值: {{selectData.snssyzcz}}</p>
                </div>
                <div>
                    <p>本月测试数: {{selectData.snsbycss}}</p>
                </div>
                <div>
                    <p>累计测试数: {{selectData.snsljcss}}</p>
                </div>
                <div>
                    <p>完好率（%）: {{selectData.snsrate}}</p>
                </div>
                <div>
                    <p>未完成原因分析: {{selectData.xhswwcyy}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >火灾报警系统</van-divider>
                <div>
                    <p>数量（套）: {{selectData.hzbjxtnum}}</p>
                </div>
                <div>
                    <p>完好数量: {{selectData.hzbjxtwhnum}}</p>
                </div>
                <div>
                    <p>故障数量: {{selectData.hzbjxtgznum}}</p>
                </div>
                <div>
                    <p>是否正常维保: {{selectData.whflag}}</p>
                </div>
                <div>
                    <p>现场运行管理是否符合要求: {{selectData.yxglflag}}</p>
                </div>
                <div>
                    <p>不符合原因分析: {{selectData.hzbjxtbfhyy}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >自动灭火系统</van-divider>
                <div>
                    <p>数量（套）: {{selectData.zdmhxtnum}}</p>
                </div>
                <div>
                    <p>完好率（%）: {{selectData.zdmhxtrate}}</p>
                </div>
                <div>
                    <p>防火分区: {{selectData.zdmhxtfhfq}}</p>
                </div>
                <div>
                    <p>本月测试: {{selectData.zdmhxtbycsnum}}</p>
                </div>
                <div>
                    <p>累计测试: {{selectData.zdmhxtljcsnum}}</p>
                </div>
                <div>
                    <p>维保值守是否正常: {{selectData.wbzflag}}</p>
                </div>

                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >其他消防设施</van-divider>
                <div>
                    <p>消防通道: {{selectData.qtxftdflag}}</p>
                </div>
                <div>
                    <p>安全出口: {{selectData.qtaqckflag}}</p>
                </div>
                <div>
                    <p>防火门: {{selectData.qtfhmflag}}</p>
                </div>
                <div>
                    <p>防火封堵: {{selectData.qtfhfdflag}}</p>
                </div>
                <div>
                    <p>防火卷帘: {{selectData.qtfhjlflag}}</p>
                </div>
                <div>
                    <p>消防广播: {{selectData.qtxfgbflag}}</p>
                </div>
                <div>
                    <p>防排烟系统: {{selectData.qtfpyxtflag}}</p>
                </div>
                <div>
                    <p>备注: {{selectData.bzcontent}}</p>
                </div>
                <div>
                    <p>填表人: {{selectData.tbpeople}}</p>
                </div>
                <div>
                    <p>审核人: {{selectData.shpeople}}</p>
                </div>
                <div>
                    <p>负责人: {{selectData.fzpeople}}</p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "FireSeasonReport",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/fireseasonreport/list.action",
                obj: {}
            },
            show: false,
            popshow: false,
            actions: [{ name: "查看详情" }],
            selectData: {}
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.cleraData();
        },
        btnClick(obj) {
            this.show = true;
            this.selectData = obj;
        },
        onSelect(item) {
            if (item.name == "查看详情") {
                this.popshow = true;
            }
        }
    },
    components: {
        SearchBox,
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>