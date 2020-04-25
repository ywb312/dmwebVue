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
                            <p>年月: {{item.yearmonth}}</p>
                        </div>
                        <div>
                            <p>填报单位: {{item.filldept}}</p>
                        </div>
                        <div>
                            <p>填报日期: {{item.filldate}}</p>
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
                            <p>单位领导: {{item.dwld}}</p>
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
                    <p>年月: {{selectData.yearmonth}}</p>
                </div>
                <div>
                    <p>填报单位: {{selectData.filldept}}</p>
                </div>
                <div>
                    <p>填报日期: {{selectData.filldate}}</p>
                </div>
                <div>
                    <p>记录编号: {{selectData.recordnum}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >消防安全检查</van-divider>
                <div>
                    <p>检查次数（次）: {{selectData.checknum}}</p>
                </div>
                <div>
                    <p>检查部位（个）: {{selectData.checkplace}}</p>
                </div>
                <div>
                    <p>发现隐患（条）: {{selectData.findrisk}}</p>
                </div>
                <div>
                    <p>整改隐患（条）: {{selectData.reformrisk}}</p>
                </div>
                <div>
                    <p>考核扣奖（元）: {{selectData.deductmoney}}</p>
                </div>
                <div>
                    <p>未完成原因分析与整改措施: {{selectData.content}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >动火安全管理</van-divider>
                <div>
                    <p>动火作业一级（次）: {{selectData.dhonelevel}}</p>
                </div>
                <div>
                    <p>动火作业二级（次）: {{selectData.dhtwolevel}}</p>
                </div>
                <div>
                    <p>动火作业三级（次）: {{selectData.dhthreelevel}}</p>
                </div>
                <div>
                    <p>审批动火方案二级（次）: {{selectData.sptwolevel}}</p>
                </div>
                <div>
                    <p>审批动火方案三级（次）: {{selectData.spthreelevel}}</p>
                </div>
                <div>
                    <p>办理动火作业许可证一级（次）: {{selectData.blonelevel}}</p>
                </div>
                <div>
                    <p>办理动火作业许可证二级（次）: {{selectData.bltwolevel}}</p>
                </div>
                <div>
                    <p>办理动火作业许可证三级（次）: {{selectData.blthreelevel}}</p>
                </div>
                <div>
                    <p>消防车监护（次）: {{selectData.xfjhnum}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >消防宣传教育</van-divider>
                <div>
                    <p>学习培训班（次）: {{selectData.xxpxbnum}}</p>
                </div>
                <div>
                    <p>参加人数: {{selectData.pxjoinnum}}</p>
                </div>
                <div>
                    <p>消防演练（次）: {{selectData.xfylnum}}</p>
                </div>
                <div>
                    <p>参加人数: {{selectData.yljoinnum}}</p>
                </div>
                <div>
                    <p>宣传报道（篇）: {{selectData.xcbdnum}}</p>
                </div>
                <div>
                    <p>板报（期）: {{selectData.bbnum}}</p>
                </div>
                <div>
                    <p>播放影视录像（次）: {{selectData.bfyslxnum}}</p>
                </div>
                <div>
                    <p>观看人数: {{selectData.yslxjoinnum}}</p>
                </div>
                <div>
                    <p>订阅消防报刊（份）: {{selectData.dyxfbknum}}</p>
                </div>
                <div>
                    <p>其他宣传方式: {{selectData.qtxcfs}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >外来单位管理</van-divider>
                <div>
                    <p>签订消防安全合同（份）: {{selectData.aqhtnum}}</p>
                </div>
                <div>
                    <p>开展消防安全技术交底（人次）: {{selectData.jsjdnum}}</p>
                </div>
                <div>
                    <p>考核扣奖（元）: {{selectData.wldeductmoney}}</p>
                </div>
                <div>
                    <p>跟踪验证外来单位消防安全管理状况简述: {{selectData.zkjscontent}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >消防器材、设备、设施管理-基本数据</van-divider>
                <div>
                    <p>干粉: {{selectData.gfcount}}</p>
                </div>
                <div>
                    <p>SD: {{selectData.sdcount}}</p>
                </div>
                <div>
                    <p>六合安: {{selectData.lhacount}}</p>
                </div>
                <div>
                    <p>冷火: {{selectData.lhcount}}</p>
                </div>
                <div>
                    <p>机械泡沫: {{selectData.jxpmcount}}</p>
                </div>
                <div>
                    <p>CO2: {{selectData.eyhtcount}}</p>
                </div>
                <div>
                    <p>其它: {{selectData.qtcount}}</p>
                </div>
                <div>
                    <p>报警设备: {{selectData.bjsbcount}}</p>
                </div>
                <div>
                    <p>报警设备完好率（%）: {{selectData.bjsbrate}}</p>
                </div>
                <div>
                    <p>灭火设备: {{selectData.mhsbcount}}</p>
                </div>
                <div>
                    <p>灭火设备完好率（%）: {{selectData.mhsbrate}}</p>
                </div>
                <div>
                    <p>室内栓: {{selectData.snscount}}</p>
                </div>
                <div>
                    <p>室外栓: {{selectData.swsount}}</p>
                </div>
                <div>
                    <p>水带: {{selectData.shuidcount}}</p>
                </div>
                <div>
                    <p>水枪: {{selectData.sqcount}}</p>
                </div>
                <div>
                    <p>本月支出（元）: {{selectData.byzcmoney}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >消防器材、设备、设施管理</van-divider>
                <div>
                    <p>工程名称: {{selectData.gcname}}</p>
                </div>
                <div>
                    <p>建筑面积（m2）: {{selectData.jzmj}}</p>
                </div>
                <div>
                    <p>用途: {{selectData.yongt}}</p>
                </div>
                <div>
                    <p>设计单位: {{selectData.sjdept}}</p>
                </div>
                <div>
                    <p>施工单位: {{selectData.sgdept}}</p>
                </div>
                <div>
                    <p>开工时间: {{selectData.kgdate}}</p>
                </div>
                <div>
                    <p>竣工时间: {{selectData.jgdate}}</p>
                </div>
                <div>
                    <p>是否建审: {{selectData.jsflag}}</p>
                </div>
                <div>
                    <p>是否验收: {{selectData.ysflag}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >火灾事故</van-divider>
                <div>
                    <p>一般火灾（起）: {{selectData.ybhznum}}</p>
                </div>
                <div>
                    <p>较大火灾（起）: {{selectData.jdhznum}}</p>
                </div>
                <div>
                    <p>重大火灾（起）: {{selectData.zdhznum}}</p>
                </div>
                <div>
                    <p>事故调查报告简述: {{selectData.sgdcreport}}</p>
                </div>
                <div>
                    <p>本月工作综述及下月打算: {{selectData.zjcontent}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >审核</van-divider>
                <div>
                    <p>填表人: {{selectData.tbpeople}}</p>
                </div>
                <div>
                    <p>审核人: {{selectData.shpeople}}</p>
                </div>
                <div>
                    <p>单位领导: {{selectData.dwld}}</p>
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
    name: "FireMonthReport",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/firemonthreport/list.action",
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