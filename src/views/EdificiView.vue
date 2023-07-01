<template>
    <div class="buildings">
        <v-row>
            <v-col sm="12" md="8">
                <v-card class="d-flex justify-center pa-3">
                        <CityMapBuild :colorType="showType" :data="arrayDataMap" :locals="arrayLocalsMap"></CityMapBuild>
                </v-card>
            </v-col>
            <v-col sm="12" md="4">
                <v-card class="column-flex justify-center pa-3 mb-3"
                    title="Opzioni visualizzazione"
                >
                    <v-checkbox
                        class="mx-3"
                        v-model="showType"
                        label="Mostra il tipo degli edifici"
                        hide-details
                        density="compact"
                    ></v-checkbox>
                    <v-checkbox
                        class="mx-3"
                        v-model="showRest"
                        label="Mostra ristoranti"
                        hide-details
                        density="compact"
                    ></v-checkbox>
                    <v-checkbox
                        class="mx-3"
                        v-model="showPub"
                        label="Mostra pubs"
                        hide-details
                        density="compact"
                    ></v-checkbox>
                </v-card>
                <v-card class="column-flex justify-center pa-3 my-3">
                    <template v-slot:title>
                        <div class="d-flex justify-space-between">
                            Appartamenti
                            <v-checkbox
                                v-model="showHouse"
                                hide-details
                                density="compact"
                            
                            ></v-checkbox>
                        </div>
                    </template>

                    <v-radio-group
                        v-model="selectedItemHouse"
                    >
                        <v-radio 
                            v-for="i in itemsHouse"
                            :label="i.title" 
                            :value="i.value"
                            :disabled="!showHouse"
                        ></v-radio>
                    </v-radio-group>
                    <!-- <v-expansion-panels
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
                                <v-radio-group
                                    v-model="selectedItemRest"
                                >
                                    <v-radio 
                                        v-for="i in itemsRest"
                                        :label="i.title" 
                                        :value="i.value"
                                    ></v-radio>
                                </v-radio-group>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel
                            value="pub"
                            title="Pubs"
                        >
                            <v-expansion-panel-text>
                                <v-radio-group
                                    v-model="selectedItemPub"
                                >
                                    <v-radio 
                                        v-for="i in itemsPub"
                                        :label="i.title" 
                                        :value="i.value"
                                    ></v-radio>
                                </v-radio-group>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels> -->
                </v-card>
                <v-card class="column-flex justify-center pa-3">
                    <DistributionChart v-if="selectedItem!=null" 
                        :data-subject="selectedItem" 
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
                showType: false,
                showRest: false,
                showPub: false,
                showHouse: false,
                openAspect: 'house',
                itemsHouse: [   
                    {value: 'rent', title: 'Rent'}, 
                    {value: 'occupancy', title: 'Occupancy'},
                    {value: 'rooms', title: 'Rooms'}
                ],
                selectedItemHouse: null,
                apartments_all: [],
                apartments_filter: [],
                // itemsRest: [   
                //     {value: 'price', title: 'Prices'}, 
                //     {value: 'occupancy', title: 'Occupancy'}
                // ],
                // selectedItemRest: null,
                restaurants_all: [],
                // restaurants_filter: [],
                // itemsPub: [   
                //     {value: 'price', title: 'Prices'}, 
                //     {value: 'occupancy', title: 'Occupancy'}
                // ],
                // selectedItemPub: null,
                pubs_all: [],
                // pubs_filter: []
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

            d3.csv('datasets/tables/Restaurants.csv')
            .then((rows) => {
                this.restaurants_all = rows.map( r => {                    
                    return {
                        id: +r['restaurantId'],
                        price: +r['foodCost'],
                        occupancy: +r['maxOccupancy'],
                        x: +this.getPointX(r['location']),
                        y: +this.getPointY(r['location']),
                        type: 'rest'
                    }
                })
                // this.restaurants_filter = this.restaurants_all
            });

            d3.csv('datasets/tables/Pubs.csv')
            .then((rows) => {
                this.pubs_all = rows.map( r => {                    
                    return {
                        id: +r['restaurantId'],
                        price: +r['hourlyCost'],
                        occupancy: +r['maxOccupancy'],
                        x: +this.getPointX(r['location']),
                        y: +this.getPointY(r['location']),
                        type: 'pub'
                    }
                })
                // this.pubs_filter = this.pubs_all
            });


        },
        computed: {
            arrayDataMap(){
                var data = []
                // switch(this.openAspect){
                //     case 'house':
                //         data = this.apartments_filter
                //         break
                //     // case "rest":
                //     //     data = this.restaurants_filter
                //     //     break
                //     // case "pub":
                //     //     data = this.pubs_filter
                //     //     break
                // }

                if(this.showHouse){
                    data = this.apartments_filter
                }
                return data.map(d => {
                    return { 
                        value: d[this.selectedItem], 
                        color: this.houseDistributionColor[this.getIndexByValue(d[this.selectedItem])], 
                        x: d['x'], 
                        y: d['y']
                    }
                })
            },
            arrayLocalsMap(){
                var locals = []
                if (this.showRest)
                    locals = locals.concat(this.restaurants_all)
                if (this.showPub)
                    locals = locals.concat(this.pubs_all)
                return locals
            },
            selectedItem(){
                switch(this.openAspect){
                    case 'house':
                        return this.selectedItemHouse
                    // case 'rest':
                    //     return this.selectedItemRest
                    // case 'pub':
                    //     return this.selectedItemPub
                }
            },
            houseDistributionTable(){
                var table = {}

                table['house'] = []
                var rent = []
                rent.push({id: 0, min: 0, max: 500,  count: this.apartments_all.filter(d => d['rent'] <= 500).length, label: '< 500', color: '#f19e18'})
                rent.push({id: 1, min: 500, max: 700,  count: this.apartments_all.filter(d => d['rent'] > 500 && d['rent'] <= 700).length, label: '500 - 700', color: '#ef8a17'})
                rent.push({id: 2, min: 700, max: 900,  count: this.apartments_all.filter(d => d['rent'] > 700 && d['rent'] <= 900).length, label: '700 - 900', color: '#ed7517'})
                rent.push({id: 3, min: 900, max: 1100,  count: this.apartments_all.filter(d => d['rent'] > 900 && d['rent'] <= 1100).length, label: '900 - 1100', color: '#ec6116'})
                rent.push({id: 4, min: 1100, max: 1300,  count: this.apartments_all.filter(d => d['rent'] > 1100 && d['rent'] <= 1300).length, label: '1100 - 1300', color: '#ea4c15'})
                rent.push({id: 5, min: 1300, max: 1500,  count: this.apartments_all.filter(d => d['rent'] > 1300 && d['rent'] <= 1500).length, label: '1300 - 1500', color: '#e83715'})
                rent.push({id: 6, min: 1500, max: 2000,  count: this.apartments_all.filter(d => d['rent'] > 1500).length, label: '> 1500', color: '#e62314'})
                table['house']['rent'] = rent

                var occupancy = []
                occupancy.push({id: 0, min: 1, max: 1, count: this.apartments_all.filter(d => d['occupancy'] == 1).length, label: '1', color: '#f19e18'})
                occupancy.push({id: 1, min: 2, max: 2, count: this.apartments_all.filter(d => d['occupancy'] == 2).length, label: '2', color: '#ed7517'})
                occupancy.push({id: 2, min: 3, max: 3, count: this.apartments_all.filter(d => d['occupancy'] == 3).length, label: '3', color: '#ea4c15'})
                occupancy.push({id: 3, min: 4, max: 4, count: this.apartments_all.filter(d => d['occupancy'] == 4).length, label: '4', color: '#e62314'})
                table['house']['occupancy'] = occupancy

                var rooms = []
                rooms.push({id: 0, min: 1, max: 1, count: this.apartments_all.filter(d => d['rooms'] == 1).length, label: '1', color: '#f19e18'})
                rooms.push({id: 1, min: 2, max: 2, count: this.apartments_all.filter(d => d['rooms'] == 2).length, label: '2', color: '#ed7517'})
                rooms.push({id: 2, min: 3, max: 3, count: this.apartments_all.filter(d => d['rooms'] == 3).length, label: '3', color: '#ea4c15'})
                rooms.push({id: 3, min: 4, max: 4, count: this.apartments_all.filter(d => d['rooms'] == 4).length, label: '4', color: '#e62314'})
                table['house']['rooms'] = rooms


                // table['rest'] = []
                // var price = []
                // price.push({id: 0, min: 0, max: 4.5,  count: this.restaurants_all.filter(d => d['price'] <= 4.5).length, label: 'Inexpensive', color: '#f19e18'})
                // price.push({id: 1, min: 4.5, max: 5,  count: this.restaurants_all.filter(d => d['price'] > 4.5 && d['price'] <= 5).length, label: 'Moderately expensive', color: '#ed7517'})
                // price.push({id: 2, min: 5, max: 5.5,  count: this.restaurants_all.filter(d => d['price'] > 5 && d['price'] <= 5.5).length, label: 'Expensive', color: '#ea4c15'})
                // price.push({id: 3, min: 5.5, max: 6,  count: this.restaurants_all.filter(d => d['price'] > 5.5).length, label: 'Very Expensive', color: '#e62314'})
                // table['rest']['price'] = price

                // var occupancy = []
                // occupancy.push({id: 0, min: 47, max: 67, count: this.restaurants_all.filter(d => d['occupancy'] <= 67).length, label: '1', color: '#f19e18'})
                // occupancy.push({id: 1, min: 67, max: 86, count: this.restaurants_all.filter(d => d['occupancy'] > 67 && d['occupancy'] <= 86).length, label: '2', color: '#ed7517'})
                // occupancy.push({id: 2, min: 87, max: 106, count: this.restaurants_all.filter(d => d['occupancy'] > 86 && d['occupancy'] <= 106).length, label: '3', color: '#ea4c15'})
                // occupancy.push({id: 3, min: 107, max: 120, count: this.restaurants_all.filter(d => d['occupancy'] > 106).length, label: '4', color: '#e62314'})
                // table['rest']['occupancy'] = occupancy


                // table['pub'] = []
                // var price = []
                // price.push({id: 0, min: 0, max: 8.5,  count: this.pubs_all.filter(d => d['price'] <= 8.5).length, label: 'Inexpensive', color: '#f19e18'})
                // price.push({id: 1, min: 8.5, max: 10.6,  count: this.pubs_all.filter(d => d['price'] > 8.5 && d['price'] <= 10.6).length, label: 'Moderately expensive', color: '#ed7517'})
                // price.push({id: 2, min: 10.6, max: 12.7,  count: this.pubs_all.filter(d => d['price'] > 10.6 && d['price'] <= 12.7).length, label: 'Expensive', color: '#ea4c15'})
                // price.push({id: 3, min: 12.7, max: 15,  count: this.pubs_all.filter(d => d['price'] > 12.7).length, label: 'Very Expensive', color: '#e62314'})
                // table['pub']['price'] = price

                // var occupancy = []
                // occupancy.push({id: 0, min: 0, max: 69, count: this.pubs_all.filter(d => d['occupancy'] <= 69).length, label: '1', color: '#f19e18'})
                // occupancy.push({id: 1, min: 70, max: 79, count: this.pubs_all.filter(d => d['occupancy'] > 69 && d['occupancy'] <= 79).length, label: '2', color: '#ed7517'})
                // occupancy.push({id: 2, min: 80, max: 89, count: this.pubs_all.filter(d => d['occupancy'] > 79 && d['occupancy'] <= 89).length, label: '3', color: '#ea4c15'})
                // occupancy.push({id: 3, min: 90, max: 99, count: this.pubs_all.filter(d => d['occupancy'] > 89).length, label: '4', color: '#e62314'})
                // table['pub']['occupancy'] = occupancy


                var empty = [{id: 0, min: Number.NEGATIVE_INFINITY, max: Number.POSITIVE_INFINITY, count: 0, label: '0', color: '#000'}]
                table['house'][null] = empty
                // table['rest'][null] = empty
                // table['pub'][null] = empty
                return table
            },
            houseDistributionData(){
                return this.houseDistributionTable[this.openAspect][this.selectedItem].map(d => d['count'])
            },
            houseDistributionLabel(){
                return this.houseDistributionTable[this.openAspect][this.selectedItem].map(d => d['label'])
            },
            houseDistributionColor(){
                return this.houseDistributionTable[this.openAspect][this.selectedItem].map(d => d['color'])
            }
        },
        methods: {
            getIndexByValue(value){
                if (value == undefined) return 0
                return this.houseDistributionTable[this.openAspect][this.selectedItem].filter(a => value >= a.min && value <= a.max )[0]['id']
            },
            getValueByChart(index){
                if (index == -1) {
                    // this.pubs_filter = this.pubs_all
                    // this.restaurants_filter = this.restaurants_all
                    this.apartments_filter = this.apartments_all
                }
                else {
                    var min = this.houseDistributionTable[this.openAspect][this.selectedItem].filter(a => a.id == index)[0]['min'],
                        max = this.houseDistributionTable[this.openAspect][this.selectedItem].filter(a => a.id == index)[0]['max']

                    switch(this.openAspect){
                        case 'house':
                            this.apartments_filter = this.apartments_all.filter(r => r[this.selectedItem] >= min && r[this.selectedItem] <= max)
                            break
                        // case "rest":
                        //     this.restaurants_filter = this.restaurants_all.filter(r => r[this.selectedItem] >= min && r[this.selectedItem] <= max)
                        //     break
                        // case "pub":
                        //     this.pubs_filter = this.pubs_all.filter(r => r[this.selectedItem] >= min && r[this.selectedItem] <= max)
                        //     break
                    }
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
  