<template>
    <div class="page">
        <!-- 标题  -->
        <mt-header :title="pageData.text" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <div class="wrap">
            <component :is="pageData.components" :pageData="pageData"></component>
        </div>
    </div>
</template>
<script>
export default {
    name: "facility",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "设备、设施、器具台账管理(环保)",
                    id: "devlist1"
                },
                {
                    text: "设备、设施、器具台账管理(消防)",
                    id: "devlist2"
                },
                {
                    text: "设备、设施、器具台账管理(安全)",
                    id: "devlist3"
                },
                {
                    text: "设备、设施、器具购置与租赁(环保)",
                    id: "devpurchase1"
                },
                {
                    text: "设备、设施、器具购置与租赁(消防)",
                    id: "devpurchase2"
                },
                {
                    text: "设备、设施、器具购置与租赁(安全)",
                    id: "devpurchase3"
                },
                {
                    text: "设备、设施、器具检验检测记录(环保)",
                    id: "devexpair1"
                },
                {
                    text: "设备、设施、器具检验检测记录(消防)",
                    id: "devexpair2"
                },
                {
                    text: "设备、设施、器具检验检测记录(安全)",
                    id: "devexpair3"
                },
                {
                    text: "设备、设施、器具维修维护(环保)",
                    id: "devmaintain1"
                },
                {
                    text: "设备、设施、器具维修维护(消防)",
                    id: "devmaintain2"
                },
                {
                    text: "设备、设施、器具维修维护(安全)",
                    id: "devmaintain3"
                },
                {
                    text: "设备、设施、器具报废封存(环保)",
                    id: "devscrap1"
                },
                {
                    text: "设备、设施、器具报废封存(消防)",
                    id: "devscrap2"
                },
                {
                    text: "设备、设施、器具报废封存(安全)",
                    id: "devscrap3"
                },
                {
                    text: "特种设备台帐(环保)",
                    id: "devspeciallist1"
                },
                {
                    text: "特种设备台帐(消防)",
                    id: "devspeciallist2"
                },
                {
                    text: "特种设备台帐(安全)",
                    id: "devspeciallist3"
                },
                {
                    text: "特种设备检测检验报告(环保)",
                    id: "devtzsbjc1"
                },
                {
                    text: "特种设备检测检验报告(消防)",
                    id: "devtzsbjc2"
                },
                {
                    text: "特种设备检测检验报告(安全)",
                    id: "devtzsbjc3"
                },
                {
                    text: "安全标志产品档案(环保)",
                    id: "devsafetysigns1"
                },
                {
                    text: "安全标志产品档案(消防)",
                    id: "devsafetysigns2"
                },
                {
                    text: "安全标志产品档案(安全)",
                    id: "devsafetysigns3"
                },
                {
                    text: "安全标志产品检测检验报告(环保)",
                    id: "devsafetysignsjc1"
                },
                {
                    text: "安全标志产品检测检验报告(消防)",
                    id: "devsafetysignsjc2"
                },
                {
                    text: "安全标志产品检测检验报告(安全)",
                    id: "devsafetysignsjc3"
                }
            ]
        };
    },
    created() {
        this.getPageData();
    },
    methods: {
        getPageData() {
            let id = this.$route.query.id;
            this.page.forEach(item => {
                if (item.id == id) {
                    let i = id.charAt(id.length - 1);
                    item.components = id.substring(0, id.length - 1);
                    item.element = "YS00" + i;
                    this.pageData = item;
                }
            });
        }
    },
    components: {
        // 设备、设施、器具台帐管理
        devlist: resolve =>//无扩展信息
            require(["@/components/facility/views/Devlist"], resolve),
        // 设备、设施、器具购置与租赁
        devpurchase: resolve =>
            require(["@/components/facility/views/DevPurchase"], resolve),
        // 设备、设施、器具检验检测记录
        devexpair: resolve =>
            require(["@/components/facility/views/DevExpair"], resolve),
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>