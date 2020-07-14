<template>
    <div>
        <picker title="矿山" ref="company" :slots="companySlots" @returnMsg="getCompany"></picker>
    </div>
</template>

<script>
import picker from "@/components/pub/picker.vue";
export default {
    name: "chioceDept",
    data() {
        return {
            companySlots: [
                { text: "罗河矿业", id: "_lh" },
                { text: "南山矿业", id: "_ns" },
                { text: "张庄矿业", id: "_zz" },
                { text: "桃冲矿业", id: "_tc" },
                { text: "姑山矿业", id: "_gs" }
            ]
        };
    },
    methods: {
        getCompany(v) {
            let obj = {
                "bean.tablesuffix": v.id,
                "bean.recursuffix": ")",
                "bean.recurprefix": "get"
            };
            this.$emit("choiceCompany", obj);
        }
    },
    components: {
        picker
    }
};
</script>

<style>
</style>