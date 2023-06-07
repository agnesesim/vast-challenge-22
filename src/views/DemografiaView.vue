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
                  :items="['Low', 'HighSchoolOrCollege', 'Graduate', 'Bachelors']"
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
                <v-label text="Figli"></v-label>
                <v-radio-group inline v-model="figliSelected">
                  <v-radio label="Si" value="si"></v-radio>
                  <v-radio label="No" value="no"></v-radio>
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
          <v-col xs="12" md="3" xl="3">
              <AgeChart
                v-if="loaded"
                :datafields="filterDataset"
              ></AgeChart>
          </v-col>
          <v-col xs="12" md="3" xl="3">
              <EducationChart
                v-if="loaded"
                :datafields="filterDataset"
              ></EducationChart>
          </v-col>
          <v-col xs="12" md="3" xl="3">
              <HouseholdChart
                v-if="loaded"
                :datafields="filterDataset"
              ></HouseholdChart>
          </v-col>
          <v-col xs="12" md="3" xl="3">
              <JovialityChart
                v-if="loaded"
                :datafields="filterDataset"
              ></JovialityChart>
          </v-col>
      </v-row>
      <v-row>
        <v-col lg="7">
          <v-card class="d-flex justify-center pa-3">
            <CityMapPeople :data="dataForMap" :data-type="'linear'"></CityMapPeople>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-row class="my-1">
        <v-col>
          <ParticipantTable 
            :education="educationSelected"
            :group="groupSelected"
            :figli="figliSelected"
            :age="ageRange" 
            :dim="dimRange" 
            :happy="happySelected" 
            :neutral="neutralSelected"
            :sad="sadSelected"
            :dead="deadSelected"
            :functionEdit="editItem"
          ></ParticipantTable>
        </v-col>
      </v-row> -->
      <!-- <v-row class="my-1">
        <v-col>
          <ParticipantCard :participant="participantSelected"></ParticipantCard>
        </v-col>
      </v-row> -->
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
          loaded: false,
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
                p['apartmentsXY'] = casa.map(c => [c['x'], c['y']])
              })
    
            });
          });

            this.loaded = true
        }); 
      },
      computed: {
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
        dataForMap(){
          return this.filterDataset.map(p => {
            return {
              value: p['age'],
              x: p['apartmentsXY'].length > 0 ? p['apartmentsXY'][0][0] : 0,
              y: p['apartmentsXY'].length > 0 ? p['apartmentsXY'][0][1] : 0
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
        }
      },
    }
  </script>
  