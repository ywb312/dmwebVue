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
                            <p>动火申请单位: {{item.firedept}}</p>
                        </div>
                        <div>
                            <p>动火部位: {{item.firepart}}</p>
                        </div>
                        <div>
                            <p>动火地点: {{item.fireplace}}</p>
                        </div>
                        <div>
                            <p>动火级别: {{item.firelevel}}</p>
                        </div>
                        <div>
                            <p>动火开始时间: {{item.startdate}}</p>
                        </div>
                        <div>
                            <p>动火结束时间: {{item.enddate}}</p>
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
                    <p>动火申请单位: {{selectData.firedept}}</p>
                </div>
                <div>
                    <p>动火申请时间: {{selectData.firedate}}</p>
                </div>
                <div>
                    <p>动火部位: {{selectData.firepart}}</p>
                </div>
                <div>
                    <p>动火地点: {{selectData.fireplace}}</p>
                </div>
                <div>
                    <p>动火级别: {{selectData.firelevel}}</p>
                </div>
                <div>
                    <p>动火开始时间: {{selectData.startdate}}</p>
                </div>
                <div>
                    <p>动火结束时间: {{selectData.enddate}}</p>
                </div>
                <div>
                    <p>动火负责人: {{selectData.manager}}</p>
                </div>
                <div>
                    <p>监火者: {{selectData.jianhz}}</p>
                </div>
                <div>
                    <p>动火作业地点负责人: {{selectData.dhzyddfzr}}</p>
                </div>
                <div>
                    <p>动火者: {{selectData.donghz}}</p>
                </div>
                <div>
                    <p>风险分析: {{selectData.riskRatio}}</p>
                </div>
                <div>
                    <p>安全措施: {{selectData.safeMeasure}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >动火审批</van-divider>
                <div>
                    <p>分厂（车间）负责人: {{selectData.fcfzr}}</p>
                </div>
                <div>
                    <p>分厂（车间）安全员: {{selectData.fcaqy}}</p>
                </div>
                <div>
                    <p>生产部门负责人: {{selectData.scbmfzr}}</p>
                </div>
                <div>
                    <p>工程设备部门负责人: {{selectData.gcysbbmfzr}}</p>
                </div>
                <div>
                    <p>安全部门负责人: {{selectData.aqbmfzr}}</p>
                </div>
                <div>
                    <p>治安保卫部门负责人: {{selectData.zabwbmfzr}}</p>
                </div>
                <div>
                    <p>厂级负责人: {{selectData.cjfzr}}</p>
                </div>
                <div>
                    <p>上级公司管理部门負責人: {{selectData.sjgsglbmfzr}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >特殊动火会签</van-divider>
                <div>
                    <p>工程与设备负责部门: {{selectData.gcysbfzbm}}</p>
                </div>
                <div>
                    <p>安全负责部门: {{selectData.aqfzbm}}</p>
                </div>
                <div>
                    <p>治安保卫负责部门: {{selectData.zabwfzbm}}</p>
                </div>
                <div>
                    <p>专业部门: {{selectData.zybm}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >现场安全措施确认</van-divider>
                <div>
                    <p style="color:red;">
                        对作业人员进行安全交底和安全防火教育；确认作业人员的特种作业操作资格；
                        现场准备适用的灭火器或利用室内外消防给水进行灭火；
                        动火点30米内无各类可燃气体排放；
                        动火点15米内无各类可燃物堆放；
                        动火点10米内及用火点下方无可燃溶剂清洗或喷漆作业；
                        动火作业使用的电焊、气焊、手持电动工具符合安全要求；
                        现场安排人员警戒、监护；
                        委托消防车监护；
                        将动火作业撤离安全地点或采取隔离、隔热处理；
                        现场对可燃物、易燃物进行清理、清洗、清除；
                        现场对可燃气体、助燃气体进行吹扫和含量分析；
                        制定事故应急预案，明确应急救援通讯、指挥系统；
                        与爆炸危险场所或设备、容器、管道保持安全距离；
                        氧气、乙炔气瓶保持安全距离，现场开展防泄漏检查。
                    </p>
                </div>
                <div>
                    <p>动火前现场当班作业长: {{selectData.dhqxcdbzyz}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >动火前确认</van-divider>
                <div>
                    <p>确认时间: {{selectData.dhqdate}}</p>
                </div>
                <div>
                    <p>确认地点: {{selectData.dhqdhqrdd}}</p>
                </div>
                <div>
                    <p>确认人: {{selectData.dhqqrr}}</p>
                </div>
                <div>
                    <p>现场情况: {{selectData.dhqdhxcqk}}</p>
                </div>
                <div>
                    <p>备注: {{selectData.dhqmemo}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >动火结束后确认</van-divider>
                <div>
                    <p>确认时间: {{selectData.dhjshdate}}</p>
                </div>
                <div>
                    <p>确认地点: {{selectData.dhjshdhqrdd}}</p>
                </div>
                <div>
                    <p>确认人: {{selectData.dhjshqrr}}</p>
                </div>
                <div>
                    <p>现场情况: {{selectData.dhjshdhxcqk}}</p>
                </div>
                <div>
                    <p>备注: {{selectData.dhjshmemo}}</p>
                </div>
                <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
                >动火结束后1小时确认</van-divider>
                <div>
                    <p>确认时间: {{selectData.dhohdate}}</p>
                </div>
                <div>
                    <p>确认地点: {{selectData.dhohdhqrdd}}</p>
                </div>
                <div>
                    <p>确认人: {{selectData.dhohqrr}}</p>
                </div>
                <div>
                    <p>现场情况: {{selectData.dhohdhxcqk}}</p>
                </div>
                <div>
                    <p>备注: {{selectData.dhohmemo}}</p>
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
    name: "FirePermit",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/firepermit/list.action",
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