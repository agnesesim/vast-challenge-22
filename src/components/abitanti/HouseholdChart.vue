<template>
    <Bar :data="dataChart" :options="options" style="max-height: 300px;" />
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
    name: 'HouseholdChart',
    components: {
        Bar
    },
    data(){
        return {
            dataChart:{
                labels: [''],
                datasets: [
                    {
                        label: '# Abitanti',
                        data: [0],
                        backgroundColor: ['#FDF1AD', '#FEC98F', '#FFA071'],
                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                scales: {
                    x: {
                        border: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        border: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
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
            var labels = [1, 2, 3] 

            labels.forEach(e => {
                data.push(this.datafields.filter(d=> d['householdSize'] == e).length)
            })

            return {
                labels: labels,
                datasets: [
                    {
                        label: '# Abitanti',
                        data: data,
                        backgroundColor: ['#FDF1AD', '#FEC98F', '#FFA071'],
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