<template>
    <div class="buildings">
        <v-item-group mandatory>
                <v-row>
                    <v-col sm="12" md="4">
                        <v-hover v-slot="{ isHovering }">
                            <v-card
                                :color="typeSelected == 'residental' ? 'teal-lighten-2' : ''"
                                @click="typeSelected = 'residental'"
                                :elevation="isHovering ? 12 : 2"
                                :class="{ 'on-hover': isHovering }"
                            >
                                <v-card-text class="flex-column justify-center">
                                        <div class="d-flex justify-space-evenly">
                                            <v-img :min-width="40" :max-width="70" src="src\assets\icons\home.png"></v-img>
                                            <h1 class="align-self-center text-warning">{{ building.filter(b=> b['buildingType'] == 'Residental').length }}</h1>
                                        </div>
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </v-col>
                    <v-col sm="12" md="4">
                        <v-hover v-slot="{ isHovering }">
                            <v-card
                                :color="typeSelected == 'commercial' ? 'teal-lighten-2' : ''"
                                @click="typeSelected = 'commercial'"
                                :elevation="isHovering ? 12 : 2"
                                :class="{ 'on-hover': isHovering }"
                            >
                                <v-card-text class="flex-column justify-center">
                                        <div class="d-flex justify-space-evenly">
                                            <v-img :min-width="40" :max-width="70" src="src\assets\icons\shop.png"></v-img>
                                            <h1 class="align-self-center text-info">{{ building.filter(b=> b['buildingType'] == 'Commercial').length }}</h1>
                                        </div>
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </v-col>
                    <v-col sm="12" md="4">
                        <v-hover v-slot="{ isHovering }">
                            <v-card
                                :color="typeSelected == 'school' ? 'teal-lighten-2' : ''"
                                @click="typeSelected = 'school'"
                                :elevation="isHovering ? 12 : 2"
                                :class="{ 'on-hover': isHovering }"
                            >
                                <v-card-text class="flex-column justify-center">
                                        <div class="d-flex justify-space-evenly">
                                            <v-img :min-width="40" :max-width="70" src="src\assets\icons\school.png"></v-img>
                                            <h1 class="align-self-center text-success">{{ building.filter(b=> b['buildingType'] == 'School').length }}</h1>
                                        </div>
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
        </v-item-group>
        <v-row>
            <v-col sm="12" order-sm="2" md="8" order-md="1">
                <v-card>
                    <v-row>
                        <v-col class="d-flex justify-end pa-3">
                            <v-chip
                                v-if="selectedIndexRes!=-1"
                                class="ma-2"
                                closable
                                @click:close="getValueByChart(-1)"
                            >
                                {{ selectedFeatureRes.toUpperCase() + ' ' + resDistributionLabel[selectedIndexRes] }}
                            </v-chip>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="d-flex justify-center pa-3">
                            <CityMap 
                                :res-data="residental_filtered"
                                :feature-to-show="selectedFeatureRes"
                            ></CityMap>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col sm="12" order-sm="1" md="4" order-md="2">
                <v-card class="h-100 pa-3">
                    <v-select
                        v-model="selectedFeatureRes"
                        clearable
                        label="Select a feature"
                        item-title="value"
                        item-value="id"
                        :items="[   
                                    {id: 'rent', value: 'Rent'}, 
                                    {id: 'occupancy', value: 'Occupancy'},
                                    {id: 'rooms', value: 'Rooms'},
                                    {id: 'units', value: 'Units'}
                                ]"
                    ></v-select>
                    <v-row v-if="selectedFeatureRes!= null">
                        <v-col sm="12" md="6">
                            <div class="text-h5">Min</div>
                            <div class="text-h4">{{ Math.min(...residental_all.map(r => r[selectedFeatureRes])).toFixed(2) }}</div>
                        </v-col>
                        <v-col sm="12" md="6">
                            <div class="text-h5">Max</div>
                            <div class="text-h4">{{ Math.max(...residental_all.map(r => r[selectedFeatureRes])).toFixed(2) }}</div>
                        </v-col>
                        <v-col sm="12" md="6">
                            <div class="text-h5">Avg</div>
                            <div class="text-h4">{{ (residental_all.map(r => r[selectedFeatureRes]).reduce((a,b) => a + b) / residental_all.map(r => r[selectedFeatureRes]).length).toFixed(2) }}</div>
                        </v-col>
                    </v-row>
                    <v-divider class="my-2"></v-divider>
                    <DistributionChart v-if="selectedFeatureRes!=null" 
                        :data-subject="selectedFeatureRes" 
                        :data-array="resDistributionData"
                        :data-labels="resDistributionLabel"
                        :data-colors="resDistributionColor"
                        @send-value="getValueByChart"
                    ></DistributionChart>
                </v-card>
            </v-col>
        </v-row>
    </div>
  </template>
  
  <script>
    import * as d3 from 'd3'
    import CityMap from '../components/CityMap.vue'
    import DistributionChart from '../components/edifici/DistributionChart.vue'

    export default {
        name: 'EdificiView',
        components:{
            CityMap,
            DistributionChart
        },
        data () {
            return {
                building: [],
                typeSelected: 'residental',
                residental_all: [],
                residental_filtered: [],
                selectedFeatureRes: null,
                selectedIndexRes: -1,
            }
        },
        async mounted () {
            d3.csv('datasets/tables/Buildings.csv')
            .then((rows) => {
                this.building = rows
            });

            d3.csv('datasets/tables/Apartments.csv')
            .then((rows) => {
                this.residental_all = rows.map( r => {
                    // var build = this.building.filter(b=> b['id'] == r['buildingId'])[0]
                    return {
                        id: +r['apartmentId'],
                        rent: +r['rentalCost'],
                        occupancy: +r['maxOccupancy '],
                        rooms: +r['numberOfRooms'],
                        buildingId: +r['buildingId'],
                        // buildingOccup: +build['maxOccupancy'],
                        // totalUnits: build['units'] == null ? 1 :  build['units'].length,
                        x: +this.getPointX(r['location']),
                        y: +this.getPointY(r['location'])
                    }
                })

                this.residental_filtered = this.residental_all
            });

        },
        computed: {
            resDistributionData(){
                var data = []
                switch(this.selectedFeatureRes){
                    case 'rent':
                        data.push(this.residental_all.filter( d => d['rent'] <= 500).length)
                        data.push(this.residental_all.filter( d => d['rent'] > 500 && d['rent'] <= 700).length)
                        data.push(this.residental_all.filter( d => d['rent'] > 700 && d['rent'] <= 900).length)
                        data.push(this.residental_all.filter( d => d['rent'] > 900 && d['rent'] <= 1100).length)
                        data.push(this.residental_all.filter( d => d['rent'] > 1100 && d['rent'] <= 1300).length)
                        data.push(this.residental_all.filter( d => d['rent'] > 1300 && d['rent'] <= 1500).length)
                        data.push(this.residental_all.filter( d => d['rent'] > 1500).length)
                    break
                    case 'occupancy':
                        data.push(this.residental_all.filter( d => d['occupancy'] == 1).length)
                        data.push(this.residental_all.filter( d => d['occupancy'] == 2).length)
                        data.push(this.residental_all.filter( d => d['occupancy'] == 3).length)
                        data.push(this.residental_all.filter( d => d['occupancy'] == 4).length)
                    break
                    case 'rooms':
                        data.push(this.residental_all.filter( d => d['rooms'] == 1).length)
                        data.push(this.residental_all.filter( d => d['rooms'] == 2).length)
                        data.push(this.residental_all.filter( d => d['rooms'] == 3).length)
                        data.push(this.residental_all.filter( d => d['rooms'] == 4).length)
                    break
                }
                return data
            },
            resDistributionLabel(){
                var labels = []
                switch(this.selectedFeatureRes){
                    case 'rent':
                        labels.push('< 500')
                        labels.push('500 - 700')
                        labels.push('700 - 900')
                        labels.push('900 - 1100')
                        labels.push('1100 - 1300')
                        labels.push('1300 - 1500')
                        labels.push('> 1500')
                    break
                    case 'occupancy':
                        labels.push('1')
                        labels.push('2')
                        labels.push('3')
                        labels.push('4')
                    break
                    case 'rooms':
                        labels.push('1')
                        labels.push('2')
                        labels.push('3')
                        labels.push('4')
                    break
                }
                return labels
            },
            resDistributionColor(){
                var colors = []
                switch(this.selectedFeatureRes){
                    case 'rent':
                        colors.push('#f19e18')
                        colors.push('#ef8a17')
                        colors.push('#ed7517')
                        colors.push('#ec6116')
                        colors.push('#ea4c15')
                        colors.push('#e83715')
                        colors.push('#e62314')
                    break
                    case 'occupancy':
                        colors.push('#f19e18')
                        colors.push('#ed7517')
                        colors.push('#ea4c15')
                        colors.push('#e62314')
                    break
                    case 'rooms':
                        colors.push('#f19e18')
                        colors.push('#ed7517')
                        colors.push('#ea4c15')
                        colors.push('#e62314')
                    break
                }
                return colors
            }
        },
        methods: {
            getValueByChart(v){
                switch(this.selectedFeatureRes){
                    case 'rent':
                        this.filterResData(v)
                        this.selectedIndexRes = v
                    break 
                }
            },
            filterResData(index){
                if (index == -1)
                    this.residental_filtered = this.residental_all
                else {
                    var min = 0,
                    max = 2000
                    switch (index) {
                        case 0: max = 500; break
                        case 1: min = 500; max = 700; break;
                        case 2: min = 700; max = 900; break;
                        case 3: min = 900; max = 1100; break;
                        case 4: min = 1100; max = 1300; break;
                        case 5: min = 1300; max = 1500; break;
                        case 6: min = 1500; break;
                    }
                    this.residental_filtered = this.residental_all.filter(r => r['rent'] > min && r['rent'] <= max)
                }
            },
            getPointX(value){
                var x = value.substring(('POINT ('.length), value.length)
                x = x.substring(0, x.indexOf(' '))
                return x
            },
            getPointY(value){
                var y = value.substring(('POINT ('.length), value.length)
                y = y.substring(y.indexOf(' '), y.length-1)
                return y
            }
        }
    }
  </script>
  