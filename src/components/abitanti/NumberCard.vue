<template>
    <v-card class="h-100 d-flex align-center" style="min-height: 150px;">
        <v-row>
            <v-col class="d-flex justify-center align-center">
                <div class="text-h6 pa-3">{{ title }}</div>
            </v-col>
            <v-col class="d-flex justify-center align-center">
                <div class="text-h4 pa-3">{{ value.toFixed(2) }}</div>
            </v-col>
        </v-row>
    </v-card>
</template>


<script>
import { defineComponent } from 'vue';


export default defineComponent ({
    name: 'NumberCard',
    components: {
    },
    data(){
        return {
        }
    },
    props:{
        title: {
            type: String,
            default: ''
        },
        value: {
            type: Number,
            default: 0
        },
        datafields:{
            type: Array,
            default:  []
        }
    },
    mounted () {
       
    },
    methods:{
  
    },
    watch:{
        datafields(){
           
        }
    }
})
</script>