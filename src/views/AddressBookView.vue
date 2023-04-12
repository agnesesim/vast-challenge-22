<template>
  <div class="addressbook">
    <v-card>
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="datafields"
        item-value="ID"
        class="elevation-1"
      >
      <template v-slot:item.haveKids="{ item }">
        <v-icon v-if="item.raw.haveKids == 'TRUE'" color="green-darken-2" icon="mdi-check"></v-icon>
        <v-icon v-else color="red-darken-2" icon="mdi-close"></v-icon>
      </template>
      <template v-slot:item.joviality="{ item }">
        <v-icon v-if="item.raw.joviality > 0.75" color="green-darken-2" icon="mdi-emoticon"></v-icon>
        <v-icon v-else-if="item.raw.joviality > 0.5" color="yellow-darken-2" icon="mdi-emoticon-neutral"></v-icon>
        <v-icon v-else-if="item.raw.joviality > 0.25" color="orange-darken-2" icon="mdi-emoticon-sad"></v-icon>
        <v-icon v-else color="red-darken-2" icon="mdi-emoticon-dead"></v-icon>
      </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import * as d3 from 'd3'

  export default {
    data () {
      return {
        itemsPerPage: 10,
        headers: [
          {
            title: 'ID',
            align: 'start',
            sortable: false,
            key: 'participantId',
          },
          { title: 'Household size', align: 'end', key: 'householdSize' },
          { title: 'Kids', align: 'end', key: 'haveKids' },
          { title: 'Age', align: 'end', key: 'age' },
          { title: 'Education', align: 'end', key: 'educationLevel' },
          { title: 'Interest group', align: 'end', key: 'interestGroup' },
          { title: 'Joviality', align: 'end', key: 'joviality' },
        ],
        datafields: [],
      }
    },
    async mounted () {
      d3.csv('datasets/tables/Participants.csv')
      .then((rows) => {
        this.datafields = rows
      });
    },
    methods: {
    },
  }
</script>