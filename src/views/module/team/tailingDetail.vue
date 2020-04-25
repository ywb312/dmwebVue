<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="尾矿库建设详情"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <!-- 主体 -->
        <div class="wrapper">
            <div class="main">
                <div>
                    <p>企业名称: {{selectData.companyName}}</p>
                </div>
                <div>
                    <p>主要负责人: {{selectData.principal}}</p>
                </div>
                <div>
                    <p>详细地址: {{selectData.address}}</p>
                </div>
                <div>
                    <p>联系电话: {{selectData.phone}}</p>
                </div>
                <div>
                    <p>尾矿库名称: {{selectData.name}}</p>
                </div>
                <div>
                    <p>运行状态: {{selectData.status}}</p>
                </div>
                <div>
                    <p>安全许可证号: {{selectData.licence}}</p>
                </div>
                <div>
                    <p>尾矿型式: {{selectData.pattern}}</p>
                </div>
                <div>
                    <p>尾矿有效始期: {{selectData.startDate}}</p>
                </div>
                <div>
                    <p>尾矿有效止期: {{selectData.endDate}}</p>
                </div>
                <div>
                    <p>原设计单位: {{selectData.startDesign}}</p>
                </div>
                <div>
                    <p>优化设计单位: {{selectData.youhuaDesign}}</p>
                </div>
                <div>
                    <p>总库容: {{selectData.zstorage}}</p>
                </div>
                <div>
                    <p>设计总坝高: {{selectData.bheight}}</p>
                </div>
                <div>
                    <p>初期坝坝型: {{selectData.cqtype}}</p>
                </div>
                <div>
                    <p>初期坝坝型: {{selectData.cqtypeone}}</p>
                </div>
                <div>
                    <p>初期坝坝高: {{selectData.bdbheight}}</p>
                </div>
                <div>
                    <p>初期坝坝长: {{selectData.bdwidth}}</p>
                </div>
                <div>
                    <p>尾矿库防洪标准(洪水重现期)初期(年): {{selectData.fhbzcq}}</p>
                </div>
                <div>
                    <p>尾矿库防洪标准(洪水重现期)中、后期(年): {{selectData.fhbzzhq}}</p>
                </div>
                <div>
                    <p>堆坝方法: {{selectData.dbmethod}}</p>
                </div>
                <div>
                    <p>验收评价单位: {{selectData.evaluateUnit}}</p>
                </div>
                <div>
                    <p>验收组织单位: {{selectData.zuzhiUnit}}</p>
                </div>
                <div>
                    <p>验收批复文号: {{selectData.checkNumber}}</p>
                </div>
                <div>
                    <p>验收时间: {{selectData.checkDate}}</p>
                </div>
                <div>
                    <p>全库容(万m3): {{selectData.quanstorage}}</p>
                </div>
                <div>
                    <p>调洪库容(万m3): {{selectData.thstorage}}</p>
                </div>
                <div>
                    <p>坝高(m): {{selectData.yxbheight}}</p>
                </div>
                <div>
                    <p>坝长(m): {{selectData.yxblong}}</p>
                </div>
                <div>
                    <p>汇水面积(km2): {{selectData.acreage}}</p>
                </div>
                <div>
                    <p>安全超高(m): {{selectData.ultrahigh}}</p>
                </div>
                <div>
                    <p>干滩长度(m): {{selectData.gtlength}}</p>
                </div>
                <div>
                    <p>最小干滩长度(m): {{selectData.mingtlength}}</p>
                </div>
                <div>
                    <p>尾矿库防洪标准(洪水重现期)(年): {{selectData.fhbz}}</p>
                </div>
                <div>
                    <p>库内堆存尾矿(万m3): {{selectData.stockpiling}}</p>
                </div>
                <div>
                    <p>安全现状评价单位: {{selectData.aqxzpjUnit}}</p>
                </div>
                <div>
                    <p>安全现状评价时间: {{selectData.aqxzpjDate}}</p>
                </div>
                <div>
                    <p>尾矿库等别: {{selectData.level}}</p>
                </div>
                <div>
                    <p>尾矿库安全度分类: {{selectData.wkkaqdtype}}</p>
                </div>
                <div>
                    <p>下游是否有重要城镇、工矿企业、重要铁路干线: {{selectData.xyflag}}</p>
                </div>
                <div>
                    <p>库区有无滑坡体: {{selectData.hptflag}}</p>
                </div>
                <div>
                    <p>库区有无产生泥石流的条件: {{selectData.nslflag}}</p>
                </div>
                <div>
                    <p>子坝级数: {{selectData.zblevel}}</p>
                </div>
                <div>
                    <p>库区是否处于岩溶或裂隙发育地区: {{selectData.yrlfflag}}</p>
                </div>
                <div>
                    <p>库区有无滥伐、滥垦、滥牧现象: {{selectData.lflkflag}}</p>
                </div>
                <div>
                    <p>排洪系统的型式: {{selectData.phxtxs}}</p>
                </div>
                <div>
                    <p>监测项目: {{selectData.jcproject}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "tailingDetail",
    data() {
        return {};
    },
    methods: {},
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>