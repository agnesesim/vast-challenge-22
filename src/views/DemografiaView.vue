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
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { Doughnut } from 'vue-chartjs'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend)


export default defineComponent ({
    name: 'DemografiaView',
    components:{
        Bar,
        Doughnut,
        Line
        
    },
    data(){
        return {
            datafields: [],
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
            dataAge:[],
            dataEducation: [],
            dataHousehold: [],
            dataJoviality: [],

            loaded: false
        }
    },
    async mounted () {
        d3.csv('datasets/tables/Participants.csv')
        .then((rows) => {
            this.datafields = rows

            this.dataAge = this.buildAgeDataset()
            this.dataEducation = this.buildEducationDataset()
            this.dataHousehold = this.buildHouseholdDataset()
            this.dataJoviality = this.buildJovialityDataset()

            this.loaded = true
        });
    },
    methods: {
        buildAgeDataset() {
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
        buildEducationDataset(){
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
                        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4'],
                    },
                ]
            };
        },
        buildHouseholdDataset(){
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
        buildJovialityDataset(){
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
                        backgroundColor: '#77CEFF',
                    },
                ]
            };
        }
    }
})
</script>

<template>
    <div class="demographics">
        <v-row class="my-1">
            <v-col>
                <v-card title="Age">
                    <Bar v-if="loaded" :data="dataAge" :options="options"  style="max-height: 350px;" />
                </v-card>
            </v-col>
            <v-col>
                <v-card title="Education">
                    <Doughnut v-if="loaded" :data="dataEducation" :options="options"  style="max-height: 350px;" />
                </v-card> 
            </v-col>
        </v-row>
        
        <v-row class="my-1">
            <v-col>
                <v-card title="Household size">
                    <Bar v-if="loaded" :data="dataHousehold" :options="options"  style="max-height: 350px;" />
                </v-card>
            </v-col>
            <v-col>
                <v-card title="Joviality">
                    <Line v-if="loaded" :data="dataJoviality" :options="options"  style="max-height: 350px;" />
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