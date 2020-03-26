<template>
    <div class="correlation">
        <mt-radio title="查看方式" v-model="value" :options="['与我相关', '查看全部']" @change="toParent"></mt-radio>
    </div>
</template>
<script>
import { Radio } from 'mint-ui';
export default {
    name: "correlation",
    data() {
        return {
            value:"与我相关"
        };
    },
    methods:{
        toParent(){
            let queryAll = "";
            if(this.value=="与我相关"){
                queryAll = "null";
            }else{
                queryAll = "all";
            }
            this.$emit('radioChange', queryAll);
        }
    },
    components:{ 
        "mt-radio": Radio
    }
};
</script>
<style>
.mint-radiolist {
    display: flex;
    align-items: center;
    color: black;
}
.mint-radiolist-title {
    font-size: 14px;
    color: #000;
}
</style>
<style scoped>
.correlation {
    height: 100%;
    overflow: hidden;
}
</style>