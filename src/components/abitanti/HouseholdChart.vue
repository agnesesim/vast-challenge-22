<template>
    <v-card title="Household size">
        <Bar v-if="loaded" :data="dataChart" :options="options"  style="max-height: 350px;" />
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
    name: 'EducationChart',
    components: {
        Bar
    },
    data(){
        return {
            datafields_all: [],
            datafields: [],
            dataChart:[],
            options: {
                responsive: true,
                maintainAspectRatio: false
            },

            loaded: false
        }
    },
    props:{
        education: String,
        group: String,
        figli: String,
        age: Array,
        dim:  Array,
        happy: Boolean,
        neutral: Boolean,
        sad: Boolean,
        dead: Boolean
    },
    async mounted () {
        d3.csv('datasets/tables/Participants.csv')
        .then((rows) => {
            this.datafields_all = rows
            this.datafields = this.filterDataset()
            this.dataChart = this.buildDataset()

            this.loaded = true
        });
    },
    methods:{
        filterDataset(){
            return this.datafields_all
                .filter(d=> this.education == null ? d : d.educationLevel == this.education )
                .filter(d=> this.group == null ? d : d.interestGroup == this.group )
                .filter(d=> this.figli == 'ind' ? d : this.figli == 'si' ? d.haveKids == 'TRUE' : d.haveKids == 'FALSE' )
                .filter(d=> d.age >= this.age[0] && d.age <= this.age[1])
                .filter(d=> d.householdSize >= this.dim[0] && d.householdSize <= this.dim[1])
                .filter(d=> this.happy? d : d.joviality < 0.75)
                .filter(d=> this.neutral? d : d.joviality >= 0.75 || d.joviality < 0.50)
                .filter(d=> this.sad? d : d.joviality >= 0.50 || d.joviality < 0.25)
                .filter(d=> this.dead? d : d.joviality >= 0.25 )
        },
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
        education(){
            this.datafields = this.filterDataset()
            this.dataChart = this.buildDataset()
        },
        group(){
            this.datafields = this.filterDataset()
            this.dataChart = this.buildDataset()
        },
        figli(){
            this.datafields = this.filterDataset()
            this.dataChart = this.buildDataset()
        },
        age(){
            this.datafields = this.filterDataset()
            this.dataChart = this.buildDataset()
        },
        dim(){
            this.datafields = this.filterDataset()
            this.dataChart = this.buildDataset()
        },
        happy(){
            this.datafields = this.filterDataset()
            this.dataChart = this.buildDataset()
        },
        neutral(){
            this.datafields = this.filterDataset()
            this.dataChart = this.buildDataset()
        },
        sad(){
            this.datafields = this.filterDataset()
            this.dataChart = this.buildDataset()
        },
        dead(){
            this.datafields = this.filterDataset()
            this.dataChart = this.buildDataset()
        }
    }
})
</script>