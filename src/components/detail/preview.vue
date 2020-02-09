<template>
    <div class="preview">
        <div class="wrapper" v-for="(item,index) in res" :key="index">
            <div class="title">
                <h3>{{item[pageData.headerLeft.value]!=null?index+1+"."+item[pageData.headerLeft.value]:""}}</h3>
                <p>{{item[pageData.headerRight.value]!=null?item[pageData.headerRight.value]:""}}</p>
            </div>
            <div class="main">
                <div v-for="(n,m) in pageData.main" :key="m">
                    <span>{{n.key}}:</span>
                    <span>{{item[n.value]!=null?item[n.value]:""}}</span>
                </div>
            </div>
            <div class="bottom">操作</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "preview",
    data() {
        return {};
    },
    props: ["res", "pageData"],
    mounted() {},
    methods: {}
};
</script>
<style scoped>
.preview {
    height: 100%;
    overflow: hidden;
}
.wrapper{
    border-bottom: solid 1px #ddd;
    margin-bottom: 5px;
}
.title,.main div {
    display: flex;
    justify-content: space-between;
    padding: 0.1rem 0.4rem;
    background-color:rgb(250,250, 250);
}
.bottom {
    width: 100%;
    padding: 0.2rem 0.3rem;
    margin-bottom: -1px;
    text-align: center;
    border-top: solid 1px #ddd;
    border-bottom: solid 1px #ddd;
    letter-spacing:0.2rem;
}
</style>