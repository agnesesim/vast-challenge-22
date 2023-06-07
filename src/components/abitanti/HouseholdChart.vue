<template>
    <v-card title="Household size">
        <Bar :data="dataChart" :options="options" style="max-height: 350px;" />
    </v-card>
</template>


<script>
import * as d3 from 'd3'
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
                        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4'],
                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
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
                        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4'],
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