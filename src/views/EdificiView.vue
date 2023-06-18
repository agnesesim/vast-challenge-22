<template>
    <div class="buildings">
        <v-row>
            <v-col sm="12" md="8">
                <v-card class="d-flex justify-center pa-3">
                        <CityMapBuild :colorType="buildType" :data="arrayDataMap"></CityMapBuild>
                </v-card>
            </v-col>
            <v-col sm="12" md="4">
                <v-card class="column-flex justify-center pa-3 h-100">
                    <v-checkbox
                        v-model="buildType"
                        label="Mostra il tipo degli edifici"
                        hide-details
                    ></v-checkbox>
                    <v-expansion-panels
                        v-model="openAspect"
                        class="pb-3"
                    >
                        <v-expansion-panel
                            value="house"
                            title="Houses"
                        >
                            <v-expansion-panel-text>
                                <v-radio-group
                                    v-model="selectedItemHouse"
                                >
                                    <v-radio 
                                        v-for="i in itemsHouse"
                                        :label="i.title" 
                                        :value="i.value"
                                    ></v-radio>
                                </v-radio-group>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel
                            value="rest"
                            title="Restaurants"
                        >
                            <v-expansion-panel-text>
                                    <v-checkbox label="Checkbox"></v-checkbox>
                                    <v-checkbox label="Checkbox"></v-checkbox>
                                    <v-checkbox label="Checkbox"></v-checkbox>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel
                            value="pub"
                            title="Pubs"
                        >
                            <v-expansion-panel-text>
                                    <v-checkbox label="Checkbox"></v-checkbox>
                                    <v-checkbox label="Checkbox"></v-checkbox>
                                    <v-checkbox label="Checkbox"></v-checkbox>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <DistributionChart v-if="selectedItemHouse!=null" 
                        :data-subject="selectedItemHouse" 
                        :data-array="houseDistributionData"
                        :data-labels="houseDistributionLabel"
                        :data-colors="houseDistributionColor"
                        @send-value="getValueByChart"
                    ></DistributionChart>
                </v-card>
            </v-col>
        </v-row>
    </div>
  </template>
  
  <script>
    import * as d3 from 'd3'
    import CityMapBuild from '../components/edifici/CityMapBuild.vue'
    import DistributionChart from '../components/edifici/DistributionChart.vue'

    export default {
        name: 'EdificiView',
        components:{
            CityMapBuild,
            DistributionChart
        },
        data () {
            return {
                building: [],
                buildType: false,
                openAspect: null,
                itemsHouse: [   
                    {value: 'rent', title: 'Rent'}, 
                    {value: 'occupancy', title: 'Occupancy'},
                    {value: 'rooms', title: 'Rooms'},
                    {value: 'units', title: 'Units'}
                ],
                selectedItemHouse: null,
                apartments_all: [],
                apartments_filter: []
            }
        },
        async mounted () {
            d3.csv('datasets/tables/Buildings.csv')
            .then((rows) => {
                this.building = rows
            });

            d3.csv('datasets/tables/Apartments.csv')
            .then((rows) => {
                this.apartments_all = rows.map( r => {
                    
                    return {
                        id: +r['apartmentId'],
                        rent: +r['rentalCost'],
                        occupancy: +r['maxOccupancy '],
                        rooms: +r['numberOfRooms'],
                        buildingId: +r['buildingId'],
                        x: +this.getPointX(r['location']),
                        y: +this.getPointY(r['location'])
                    }
                })
                this.apartments_filter = this.apartments_all
            });


        },
        computed: {
            arrayDataMap(){
                switch(this.openAspect){
                    case "house":
                        return this.apartments_filter.map(d => {
                            return { 
                                value: d[this.selectedItemHouse], 
                                color: this.houseDistributionColor[this.getIndexByValueHouseData(d[this.selectedItemHouse])], 
                                x: d['x'], 
                                y: d['y']
                            }
                        })
                }
            },
            houseDistributionTable(){
                var table = []

                var rent = []
                rent.push({id: 0, min: 0, max: 500,  count: this.apartments_all.filter(d => d['rent'] <= 500).length, label: '< 500', color: '#f19e18'})
                rent.push({id: 1, min: 500, max: 700,  count: this.apartments_all.filter(d => d['rent'] > 500 && d['rent'] <= 700).length, label: '500 - 700', color: '#ef8a17'})
                rent.push({id: 2, min: 700, max: 900,  count: this.apartments_all.filter(d => d['rent'] > 700 && d['rent'] <= 900).length, label: '700 - 900', color: '#ed7517'})
                rent.push({id: 3, min: 900, max: 1100,  count: this.apartments_all.filter(d => d['rent'] > 900 && d['rent'] <= 1100).length, label: '900 - 1100', color: '#ec6116'})
                rent.push({id: 4, min: 1100, max: 1300,  count: this.apartments_all.filter(d => d['rent'] > 1100 && d['rent'] <= 1300).length, label: '1100 - 1300', color: '#ea4c15'})
                rent.push({id: 5, min: 1300, max: 1500,  count: this.apartments_all.filter(d => d['rent'] > 1300 && d['rent'] <= 1500).length, label: '1300 - 1500', color: '#e83715'})
                rent.push({id: 6, min: 1500, max: 2000,  count: this.apartments_all.filter(d => d['rent'] > 1500).length, label: '> 1500', color: '#e62314'})
                table['rent'] = rent

                var occupancy = []
                occupancy.push({id: 0, min: 1, max: 1, count: this.apartments_all.filter(d => d['occupancy'] == 1).length, label: '1', color: '#f19e18'})
                occupancy.push({id: 1, min: 2, max: 2, count: this.apartments_all.filter(d => d['occupancy'] == 2).length, label: '2', color: '#ed7517'})
                occupancy.push({id: 2, min: 3, max: 3, count: this.apartments_all.filter(d => d['occupancy'] == 3).length, label: '3', color: '#ea4c15'})
                occupancy.push({id: 3, min: 4, max: 4, count: this.apartments_all.filter(d => d['occupancy'] == 4).length, label: '4', color: '#e62314'})
                table['occupancy'] = occupancy

                var rooms = []
                rooms.push({id: 0, min: 1, max: 1, count: this.apartments_all.filter(d => d['rooms'] == 1).length, label: '1', color: '#f19e18'})
                rooms.push({id: 1, min: 2, max: 2, count: this.apartments_all.filter(d => d['rooms'] == 2).length, label: '2', color: '#ed7517'})
                rooms.push({id: 2, min: 3, max: 3, count: this.apartments_all.filter(d => d['rooms'] == 3).length, label: '3', color: '#ea4c15'})
                rooms.push({id: 3, min: 4, max: 4, count: this.apartments_all.filter(d => d['rooms'] == 4).length, label: '4', color: '#e62314'})
                table['rooms'] = rooms

                var empty = [{id: 0, min: Number.NEGATIVE_INFINITY, max: Number.POSITIVE_INFINITY, count: 0, label: '0', color: '#000'}]
                table[null] = empty
                return table
            },
            houseDistributionData(){
                return this.houseDistributionTable[this.selectedItemHouse].map(d => d['count'])
            },
            houseDistributionLabel(){
                return this.houseDistributionTable[this.selectedItemHouse].map(d => d['label'])
            },
            houseDistributionColor(){
                return this.houseDistributionTable[this.selectedItemHouse].map(d => d['color'])
            }
        },
        methods: {
            getValueByChart(v){
                switch(this.openAspect){
                    case "house":
                        this.filterHouseData(v)
                    break 
                }
            },
            getIndexByValueHouseData(value){
                if (value == undefined) return 0
                return this.houseDistributionTable[this.selectedItemHouse].filter(a => value >= a.min && value <= a.max )[0]['id']
            },
            filterHouseData(index){
                if (index == -1)
                    this.apartments_filter = this.apartments_all
                else {
                    var min = this.houseDistributionTable[this.selectedItemHouse].filter(a => a.id == index)[0]['min'],
                        max = this.houseDistributionTable[this.selectedItemHouse].filter(a => a.id == index)[0]['max']
                   console.log(min,max)
                    this.apartments_filter = this.apartments_all.filter(r => r[this.selectedItemHouse] >= min && r[this.selectedItemHouse] <= max)
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
  