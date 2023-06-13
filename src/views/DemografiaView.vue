<template>
    <div class="addressbook">
        <v-row class="my-1">
            <v-col>
                <v-card>
                    <v-row class="ma-2 py-0">
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            order="1"
                            class="py-0"
                        >
                            <v-select
                                clearable
                                label="Education"
                                v-model="educationSelected"
                                :items="['Low', 'HighSchoolOrCollege', 'Bachelors', 'Graduate']"
                                variant="underlined"
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            order="2"
                            class="py-0"
                        >
                            <v-select
                                clearable
                                label="Gruppo"
                                v-model="groupSelected"
                                :items="['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']"
                                variant="underlined"
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            order="4"
                            order-md="3"
                            class="py-0"
                        >
                            <v-radio-group inline v-model="figliSelected">
                                <v-radio label="Con figli" value="si"></v-radio>
                                <v-radio label="Senza figli" value="no"></v-radio>
                                <v-radio label="Indifferente" value="ind"></v-radio>
                            </v-radio-group>    
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            order="5"
                            order-md="4"
                            class="py-0"
                        >
                            <v-label text="Dimensioni della famiglia"></v-label>
                            <v-range-slider
                                v-model="dimRange"
                                step="1"
                                max="3"
                                min="1"
                                thumb-label
                            ></v-range-slider>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            order="3"
                            order-md="5"
                            class="py-0"
                        >
                            <v-label text="Età"></v-label>
                            <v-range-slider
                                v-model="ageRange"
                                step="1"
                                max="60"
                                min="18"
                                thumb-label
                            ></v-range-slider>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            order="6"
                            class="py-0"
                        >
                            <v-label text="Giovialità"></v-label><br> 
                            <div class="d-flex justify-space-around">
                                <v-icon :color="happyColor" icon="mdi-emoticon" @click="changeJoviality('happy')"></v-icon>
                                <v-icon :color="neutralColor" icon="mdi-emoticon-neutral" @click="changeJoviality('neutral')"></v-icon>
                                <v-icon :color="sadColor" icon="mdi-emoticon-sad" @click="changeJoviality('sad')"></v-icon>
                                <v-icon :color="deadColor" icon="mdi-emoticon-dead" @click="changeJoviality('dead')"></v-icon>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="mt-1">
            <v-col sm="6" md="3">
                <v-card title="Age" class="pa-2" style="min-height: 350px;">
                    <AgeChart
                        v-if="loaded"
                        :datafields="filterDataset"
                    ></AgeChart>
                    <div v-else class="d-flex justify-content-center">
                        <v-skeleton-loader :loading="true" height="300" ></v-skeleton-loader>
                    </div>
                </v-card>
            </v-col>
            <v-col sm="6" md="3">
                <v-card title="Education" class="pa-2" style="min-height: 350px;">
                    <EducationChart
                        v-if="loaded"
                        :datafields="filterDataset"
                    ></EducationChart>
                    <div v-else class="d-flex justify-content-center">
                        <v-skeleton-loader></v-skeleton-loader>
                    </div>
                </v-card>
            </v-col>
            <v-col sm="6" md="3">
                <v-card title="Household size" class="pa-2" style="min-height: 350px;">
                    <HouseholdChart
                        v-if="loaded"
                        :datafields="filterDataset"
                    ></HouseholdChart>
                    <div v-else class="d-flex justify-content-center"><v-progress-circular color="primary" indeterminate></v-progress-circular></div>
                </v-card>
            </v-col>
            <v-col sm="6" md="3">
                <v-card title="Joviality" class="pa-2" style="min-height: 350px;">
                    <JovialityChart
                        v-if="loaded"
                        :datafields="filterDataset"
                    ></JovialityChart>
                    <div v-else class="d-flex justify-content-center"><v-progress-circular color="primary" indeterminate></v-progress-circular></div>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="mt-1">
            <v-col sm="6" md="3">
                <div v-if="loaded">
                    <NumberCard 
                        :title="'Average rent'"
                        :value="averageRent"
                    ></NumberCard>
                </div>
            </v-col>
            <v-col sm="6" md="3">
                <div v-if="loaded">
                    <NumberCard 
                        :title="'Average owned houses'"
                        :value="averageHouses"
                    ></NumberCard>
                </div>
            </v-col>
            <v-col sm="6" md="3">
                <div v-if="loaded">
                    <NumberCard 
                        :title="'Average hourly rate'"
                        :value="averageHourlyRate"
                    ></NumberCard>
                </div>
            </v-col>
            <v-col sm="6" md="3">
                <div v-if="loaded">
                    <NumberCard 
                        :title="'Average jobs'"
                        :value="averageJobs"
                    ></NumberCard>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="12" order="2" md="8" order-md="1">
                <v-card class="d-flex justify-center pa-3">
                    <div v-if="loaded">   
                        <CityMapPeople :data="dataForMap" :data-type="'linear'"></CityMapPeople>
                    </div>
                </v-card>
            </v-col>
            <v-col sm="12" order="1" md="4" order-md="2">
                <v-card class="h-100">
                    <v-card-text>
                        <v-row class="ma-2 py-0">
                            <v-col
                                cols="12"
                                class="py-0"
                            >
                                <v-select
                                    label="Where they "
                                    v-model="homeJobSelected"
                                    :items="[{title: 'Live', value: 'home'}, {title: 'Work', value: 'job'}]"
                                    variant="underlined"
                                ></v-select>
                            </v-col>
                            <v-col
                                cols="12"
                                class="py-0"
                            >
                                <v-radio-group column v-model="featureSelected">
                                    <v-radio label="Age" value="age"></v-radio>
                                    <v-radio label="Education" value="education"></v-radio>
                                    <v-radio label="Householde size" value="household"></v-radio>
                                    <v-radio label="Joviality" value="joviality"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
    import * as d3 from 'd3'

    // import ParticipantCard from '../components/abitanti/ParticipantCard.vue'
    // import ParticipantTable from '../components/abitanti/ParticipantTable.vue'
    import AgeChart from '../components/abitanti/AgeChart.vue'
    import EducationChart from '../components/abitanti/EducationChart.vue'
    import HouseholdChart from '../components/abitanti/HouseholdChart.vue'
    import JovialityChart from '../components/abitanti/JovialityChart.vue'
    import NumberCard from '../components/abitanti/NumberCard.vue'
    import CityMapPeople from '../components/abitanti/CityMapPeople.vue'

  
    export default {
        name: 'AbitantiView',
        components:{
        // ParticipantCard,
        // ParticipantTable,
        AgeChart,
        EducationChart,
        HouseholdChart,
        JovialityChart,
        NumberCard,
        CityMapPeople
        },
        data () {
            return {
                educationSelected: null,
                groupSelected: null,
                figliSelected: 'ind',
                ageRange: [18,60],
                dimRange: [1,3],
                happySelected: true,
                happyColor: 'green-darken-2',
                neutralSelected: true,
                neutralColor: 'yellow-darken-2',
                sadSelected: true,
                sadColor: 'orange-darken-2',
                deadSelected: true,
                deadColor: 'red-darken-2',
                participantSelected: {},

                participants: [],
                apartments: [],
                jobs: [],
                homeJobSelected: 'home',
                featureSelected: '',

                loadedApartments: false,
                loadedJobs: false,
            }
        },
        async mounted () {
        d3.csv('datasets/tables/Participants.csv')
            .then((participants) => {
                this.participants = participants
                
                d3.csv('datasets/joins/homes.csv')
                .then((homes) => {

                    d3.csv('datasets/tables/Apartments.csv')
                    .then((apart) => {
                        
                        this.apartments = apart.map( r => {
                            var abitanti = homes.filter(h => +h['aptId'] == +r['apartmentId'])
                            return {
                                id: +r['apartmentId'],
                                rent: +r['rentalCost'],
                                occupancy: +r['maxOccupancy '],
                                rooms: +r['numberOfRooms'],
                                buildingId: +r['buildingId'],
                                participants: abitanti.map(a => +a['participantId']),
                                x: +this.getPointX(r['location']),
                                y: +this.getPointY(r['location'])
                            }
                        })

                        this.participants.forEach(p => {
                            var casa = this.apartments.filter(a => a['participants'].includes(+p['participantId']))
                            p['apartments'] = casa.map(c => c['id'])
                            p['rent'] = casa.map(c => c.rent).reduce((a,b) => a + b, 0) / casa.length
                            p['apartmentsXY'] = casa.map(c => [c['x'], c['y']])
                        })
                        
                        this.loadedApartments = true

                    });
                });

                d3.csv('datasets/joins/employment.csv')
                .then((works) => {

                    d3.csv('datasets/tables/JobsEmployers.csv')
                    .then((jobs) => {
                    
                        this.jobs = jobs.map( j => {
                            var abitanti = works.filter(w => +w['jobId'] == +j['jobId'])
                            return {
                                id: +j['jobId'],
                                hourlyRate: +j['hourlyRate'],
                                education: j['educationRequirement '],
                                buildingId: +j['buildingId'],
                                participants: abitanti.map(a => +a['participantId']),
                                x: +this.getPointX(j['location']),
                                y: +this.getPointY(j['location'])
                            }
                        })

                        this.participants.forEach(p => {
                            var lavoro = this.jobs.filter(j => j['participants'].includes(+p['participantId']))
                            p['jobs'] = lavoro.map(l => l['id'])
                            p['hourlyRate'] =  lavoro.map(c => c.hourlyRate).reduce((a,b) => a + b, 0) / lavoro.length
                            p['jobsXY'] = lavoro.map(l => [l['x'], l['y']])
                        })
                        
                        this.loadedJobs = true
                    });
                });
            }); 
        },
        computed: {
            loaded() {
                return this.loadedApartments && this.loadedJobs
            },
            filterDataset() {
                    return this.participants
                        .filter(d=> this.educationSelected == null ? d : d.educationLevel == this.educationSelected )
                        .filter(d=> this.groupSelected == null ? d : d.interestGroup == this.groupSelected )
                        .filter(d=> this.figliSelected == 'ind' ? d : this.figliSelected == 'si' ? d.haveKids == 'TRUE' : d.haveKids == 'FALSE' )
                        .filter(d=> d.age >= this.ageRange[0] && d.age <= this.ageRange[1])
                        .filter(d=> d.householdSize >= this.dimRange[0] && d.householdSize <= this.dimRange[1])
                        .filter(d=> this.happySelected? d : d.joviality < 0.75)
                        .filter(d=> this.neutralSelected? d : d.joviality >= 0.75 || d.joviality < 0.50)
                        .filter(d=> this.sadSelected? d : d.joviality >= 0.50 || d.joviality < 0.25)
                        .filter(d=> this.deadSelected? d : d.joviality >= 0.25 )
            },
            averageRent(){
                var whopay = this.filterDataset.filter(d => d.apartments.length > 0)
                return whopay.map(p => p.rent)
                        .reduce((a, b) => a + b, 0) / whopay.length
            },
            averageHouses(){
                return this.filterDataset.map(p => p.apartments.length)
                        .reduce((a, b) => a + b, 0) / this.filterDataset.length
            },
            averageHourlyRate(){
                var whopay = this.filterDataset.filter(d => d.jobs.length > 0)
                return whopay.map(p => p.hourlyRate)
                        .reduce((a, b) => a + b, 0) / whopay.length
            },
            averageJobs(){
                return this.filterDataset.map(p => p.jobs.length)
                        .reduce((a, b) => a + b, 0) / this.filterDataset.length
            },
            dataForMap(){
                return this.filterDataset.map(p => {
                    var coordinates = this.homeJobSelected == 'home' ? 'apartmentsXY' : 'jobsXY'

                    switch(this.featureSelected){
                        case 'age':
                        return {
                            value: p['age'],
                            color: this.colorByAge(p['age']),
                            x: p[coordinates].length > 0 ? p[coordinates][0][0] : 0,
                            y: p[coordinates].length > 0 ? p[coordinates][0][1] : 0
                        }
                        case 'education':
                        return {
                            value: p['educationLevel'],
                            color: this.colorByEdu(p['educationLevel']),
                            x: p[coordinates].length > 0 ? p[coordinates][0][0] : 0,
                            y: p[coordinates].length > 0 ? p[coordinates][0][1] : 0
                        }
                        case 'household':
                        return {
                            value: p['householdSize'],
                            color: this.colorBySize(p['householdSize']),
                            x: p[coordinates].length > 0 ? p[coordinates][0][0] : 0,
                            y: p[coordinates].length > 0 ? p[coordinates][0][1] : 0
                        }
                        case 'joviality':
                        return {
                            value: p['joviality'],
                            color: this.colorByJoviality(p['joviality']),
                            x: p[coordinates].length > 0 ? p[coordinates][0][0] : 0,
                            y: p[coordinates].length > 0 ? p[coordinates][0][1] : 0
                        }
                        default:  
                        return {
                            value: 1,
                            color: 'black',
                            x: p[coordinates].length > 0 ? p[coordinates][0][0] : 0,
                            y: p[coordinates].length > 0 ? p[coordinates][0][1] : 0
                        }
                    }
                })
            }
        },
        methods: {
            changeJoviality(status){
                switch(status){
                case "happy":
                    this.happySelected = !this.happySelected
                    this.happyColor = this.happySelected ? 'green-darken-2' : 'grey-darken-2'
                    break;
                case "neutral":
                    this.neutralSelected = !this.neutralSelected
                    this.neutralColor = this.neutralSelected ? 'yellow-darken-2' : 'grey-darken-2'
                    break;
                case "sad":
                    this.sadSelected = !this.sadSelected
                    this.sadColor = this.sadSelected ? 'orange-darken-2' : 'grey-darken-2'
                    break;
                case "dead":
                    this.deadSelected = !this.deadSelected
                    this.deadColor = this.deadSelected ? 'red-darken-2' : 'grey-darken-2'
                    break;
                }
            },
            editItem (item) {
                this.participantSelected = item
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
            },
            colorByAge(value){
                if (value < 25)
                    return '#C0E5FE'
                else if (value < 33)
                    return '#60B2FE'
                else if (value < 41)
                    return '#007FFE'
                else if (value < 50)
                    return '#3373C4'
                else return '#003396'
            },
            colorByEdu(value){
                if (value == 'Low')
                    return '#A7DDBC'
                else if (value == 'HighSchoolOrCollege')
                    return '#78AE99'
                else if (value == 'Bachelors')
                    return '#497F76'
                else if (value == 'Graduate')
                    return '#316764'
            },
            colorBySize(value){
                if (value == 1)
                    return '#FDF1AD'
                else if (value == 2)
                    return '#FEC98F'
                else if (value == 3)
                    return '#FFA071'
            },
            colorByJoviality(value){
                if (value <= 0.25)
                    return '#D32F2F'
                else if (value <= 0.50)
                    return '#F57C00'
                else if (value <= 0.75)
                    return '#FBC02D'
                else return '#388E3C'
            }
        },
    }
</script>
  