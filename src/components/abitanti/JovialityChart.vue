<template>
    <Line :data="dataChart" :options="options"  style="max-height: 300px;" />
</template>


<script>
import { defineComponent } from 'vue';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)

export default defineComponent ({
    name: 'JovialityChart',
    components: {
        Line
    },
    data(){
        return {
            dataChart: {
                labels: ['low', 'medium', 'high', 'top'] ,
                datasets: [
                    {
                        label: '# Abitanti',
                        data: [0,0,0,0],
                        backgroundColor: ['##388E3C','##FBC02D','##F57C00','#D32F2F'],
                        pointRadius: 5,
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
                        min: 0,
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
            var labels = ['low', 'medium', 'high', 'top'] 
            
            data.push(this.datafields.filter( d => d['joviality'] <= 0.25).length)
            data.push(this.datafields.filter( d => d['joviality'] > 0.25 && d['joviality'] <= 0.50).length)
            data.push(this.datafields.filter( d => d['joviality'] > 0.50 && d['joviality'] <= 0.75).length)
            data.push(this.datafields.filter( d => d['joviality'] > 0.75 ).length)


            return {
                labels: labels,
                datasets: [
                    {
                        label: '# Abitanti',
                        data: data,
                        backgroundColor: ['#D32F2F','#F57C00','#FBC02D', '#388E3C'],
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