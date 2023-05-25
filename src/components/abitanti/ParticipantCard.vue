<template>
  <div class="usercard">
    <v-card>
      <v-row>
        <v-col sm="4" class="d-flex justify-center align-center">
          <v-img
            src="src\assets\icons\user.png"
            contain
            width="80px"
            class="ma-16"
          ></v-img>
        </v-col>
        <v-divider vertical class="py-3"></v-divider>
        <v-col sm="8" class="pa-8">
          <h1>Nome Cognome</h1>
          <v-list lines="one">
            <v-list-item
              key="age"
              title="Age"
              :subtitle="participant.age + ' anni'"
            ></v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>

export default {
    name: "ParticipantCard",
    props:{
        participant: Object,
    },
    data(){
      return {}
    },
    mounted(){
    },
    methods:{
    },
    watch:{
    }
}
</script>