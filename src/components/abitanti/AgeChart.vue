<template>
    <v-card title="Age">
        <Bar :data="dataChart" :options="options"  style="max-height: 350px;" /> 
    </v-card>
</template>


<script>
import { defineComponent } from 'vue';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default defineComponent ({
    name: 'AgeChart',
    components: {
        Bar
    },
    data(){
        return {
            dataChart:{
                labels: ['18-24', '24-32', '33-40', '41-49', '50+'],
                datasets: [
                    {
                        label: '# Abitanti',
                        data: [0,0,0,0,0],
                        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
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
        buildDataset() {
            var data = []

            data.push(this.datafields.filter( d => d['age'] > 18 && d['age'] <= 24).length)
            data.push(this.datafields.filter( d => d['age'] > 24 && d['age'] <= 32).length)
            data.push(this.datafields.filter( d => d['age'] > 32 && d['age'] <= 40).length)
            data.push(this.datafields.filter( d => d['age'] > 40 && d['age'] <= 49).length)
            data.push(this.datafields.filter( d => d['age'] > 49).length)

            return {
                labels: ['18-24', '24-32', '33-40', '41-49', '50+'],
                datasets: [
                    {
                        label: '# Abitanti',
                        data: data,
                        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                    },
                ],
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