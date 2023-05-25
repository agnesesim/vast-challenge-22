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
    <v-row class="my-1">
        <v-col xs="12" md="6" xl="3">
            <AgeChart 
              :education="educationSelected"
              :group="groupSelected"
              :figli="figliSelected"
              :age="ageRange" 
              :dim="dimRange" 
              :happy="happySelected" 
              :neutral="neutralSelected"
              :sad="sadSelected"
              :dead="deadSelected"
            ></AgeChart>
        </v-col>
        <v-col xs="12" md="6" xl="3">
            <EducationChart 
              :education="educationSelected"
              :group="groupSelected"
              :figli="figliSelected"
              :age="ageRange" 
              :dim="dimRange" 
              :happy="happySelected" 
              :neutral="neutralSelected"
              :sad="sadSelected"
              :dead="deadSelected"
            ></EducationChart>
        </v-col>
        <v-col xs="12" md="6" xl="3">
            <HouseholdChart
              :education="educationSelected"
              :group="groupSelected"
              :figli="figliSelected"
              :age="ageRange" 
              :dim="dimRange" 
              :happy="happySelected" 
              :neutral="neutralSelected"
              :sad="sadSelected"
              :dead="deadSelected"
            ></HouseholdChart>
        </v-col>
        <v-col xs="12" md="6" xl="3">
            <JovialityChart 
              :education="educationSelected"
              :group="groupSelected"
              :figli="figliSelected"
              :age="ageRange" 
              :dim="dimRange" 
              :happy="happySelected" 
              :neutral="neutralSelected"
              :sad="sadSelected"
              :dead="deadSelected"
            ></JovialityChart>
        </v-col>
    </v-row>
    <v-row class="my-1">
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
    </v-row>
    <!-- <v-row class="my-1">
      <v-col>
        <ParticipantCard :participant="participantSelected"></ParticipantCard>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
import ParticipantCard from '../components/abitanti/ParticipantCard.vue'
import ParticipantTable from '../components/abitanti/ParticipantTable.vue'
import AgeChart from '../components/abitanti/AgeChart.vue'
import EducationChart from '../components/abitanti/EducationChart.vue'
import HouseholdChart from '../components/abitanti/HouseholdChart.vue'
import JovialityChart from '../components/abitanti/JovialityChart.vue'

  export default {
    name: 'AbitantiView',
    components:{
    ParticipantCard,
    ParticipantTable,
    AgeChart,
    EducationChart,
    HouseholdChart,
    JovialityChart
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
      }
    },
  }
</script>
