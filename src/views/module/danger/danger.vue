<template>
    <div class="danger page">
        <component :is="views"></component>
    </div>
</template>
<script>
export default {
    name: "danger",
    data() {
        return {
            views: ""
        };
    },
    created() {
        let id = this.$route.query.id;
        if (id == "zdrisknotice") {
            this.views = "dealDanger";
        } else {
            this.views = "dangerPub";
        }
    },
    components: {
        dangerPub: resolve =>
            require(["@/components/danger/view/dangerPub"], resolve),
        dealDanger: resolve =>
            require(["@/components/danger/view/dealDanger"], resolve)
    },
    beforeRouteLeave(to, from, next) {
        if (to.name != "list") {
            //不是list , 缓存
            from.meta.keepAlive = true;
        } else {
            //list列表页,不缓存
            from.meta.keepAlive = false;
            this.$destroy();
        }
        next();
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>