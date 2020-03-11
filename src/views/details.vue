<template>
    <div class="details">
        <!-- 标题  -->
        <mt-header title="详情" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
    </div>
</template>
<script>
export default {
    name: "details",
    data() {
        return {
        };
    },
    created() {
    },
    methods: {

    },
    components: {
    }
};
</script>
<style scoped>
.mint-header {
    background-color: #2585cf;
    height: 1.1rem;
    font-size: 20px;
}
.details {
    height: 100%;
}
.wrap {
    padding-top: 1.1rem;
}
</style>