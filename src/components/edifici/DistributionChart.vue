<template>
    <Bar :data="data" :options="options" style="max-height: 300px;" />
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
    name: 'DistributionChart',
    components: {
        Bar
    },
    data(){
        return {
            data: {
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        },
                        border: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                onClick: (e) => {
                    var index = e.chart.scales.x.getValueForPixel(e.x)
                    this.$emit('sendValue', index)
                },
                interaction: {
                    mode: 'index',
                    axis: 'y'
                }
            },
        }
    },
    props:{
        dataSubject: {
            type: String,
            default: ''
        },
        dataArray:{
            type: Array,
            default: []
        },
        dataLabels: {
            type: Array,
            default: []
        },
        dataColors: {
            type: Array,
            default: ['#f87979']
        },
    },
    created () {
       this.buildChart()
    },
    methods: {
        buildChart(){
            this.data = {
                labels: this.dataLabels,
                    datasets: [
                        {
                            label: this.dataSubject,
                            backgroundColor: this.dataColors.length == 1 ? this.dataColors[0] : this.dataColors,
                            data: this.dataArray
                        }
                    ]
            }
            console.log(this.data)
        }
    },
    watch:{
        dataArray(){
            this.buildChart()
        }
    }
})
</script>