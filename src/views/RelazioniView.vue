<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Bar
  },
    data(){
        return {
            data:{
                labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ],
                datasets: [
                    {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    }
}
</script>

<template>
    <div class="relation">
        <h1>ci sei</h1>
        <v-row class="my-1">
            <v-col>
                <v-card title="Age">
                    <Bar :data="data" :options="options" style="max-height: 350px;"/>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<style>
.v-card {
    padding: 2%;
    padding-top: 0%;
}
</style>