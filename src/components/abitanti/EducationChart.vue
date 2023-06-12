<template>
    <v-card title="Education" class="pa-2">
        <Doughnut :data="dataChart" :options="options"  style="max-height: 300px;" />
    </v-card> 
</template>


<script>
import { defineComponent } from 'vue';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend)

export default defineComponent ({
    name: 'EducationChart',
    components: {
        Doughnut
    },
    data(){
        return {
            dataChart:{
                labels: [ '' ],
                datasets: [
                    {
                        data: [ 0 ],
                        backgroundColor: ['#78AE99'],
                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
            },

            loaded: false
        }
    },
    props:{
        datafields:{
            type: Array,
            default:  []
        }
    },
    mounted () {
        this.dataChart = this.buildDataset()
    },
    methods:{
        buildDataset(){
            var data = []
            var labels = [... new Set(this.datafields.map(d => d['educationLevel']))] 

            labels.forEach(e => {
                data.push(this.datafields.filter(d=> d['educationLevel'] == e).length)
            })

            return {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: ['#78AE99', '#497F76', '#316764','#A7DDBC'],
                    },
                ]
            };
        },
    },
    watch:{
        datafields(){
            this.dataChart = this.buildDataset()
        }
    }
})
</script>