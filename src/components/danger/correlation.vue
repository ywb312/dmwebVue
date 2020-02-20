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
<style scoped>
.correlation {
    height: 100%;
    overflow: hidden;
}
</style>