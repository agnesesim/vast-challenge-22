<template>
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
        <template v-slot:item.actions="{ item }">
            <v-btn variant="tonal" color="primary" icon="mdi-plus" size="x-small" density="comfortable" @click="functionEdit(item.raw)"></v-btn>
        </template>
        </v-data-table>
    </v-card>
</template>
<script>
import * as d3 from 'd3'

export default{
    name: 'ParticipantTable',
    data(){
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
            { title: 'Actions', key: 'actions', sortable: false },
            ],
            datafields_all: [],
            datafields: [],
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
        dead: Boolean,
        functionEdit: Function
    },
    async mounted () {
        d3.csv('datasets/tables/Participants.csv')
        .then((rows) => {
            this.datafields_all = rows
            this.filterTable()
        });
    },
    methods:{
        filterTable(){
            this.datafields = this.datafields_all
                .filter(d=> this.education == null ? d : d.educationLevel == this.education )
                .filter(d=> this.group == null ? d : d.interestGroup == this.group )
                .filter(d=> this.figli == 'ind' ? d : this.figli == 'si' ? d.haveKids == 'TRUE' : d.haveKids == 'FALSE' )
                .filter(d=> d.age >= this.age[0] && d.age <= this.age[1])
                .filter(d=> d.householdSize >= this.dim[0] && d.householdSize <= this.dim[1])
                .filter(d=> this.happy? d : d.joviality < 0.75)
                .filter(d=> this.neutral? d : d.joviality >= 0.75 || d.joviality < 0.50)
                .filter(d=> this.sad? d : d.joviality >= 0.50 || d.joviality < 0.25)
                .filter(d=> this.dead? d : d.joviality >= 0.25 )
        }
    },
    watch:{
        education(){
            this.filterTable();
        },
        group(){
            this.filterTable();
        },
        figli(){
            this.filterTable();
        },
        age(){
            this.filterTable();
        },
        dim(){
            this.filterTable();
        },
        happy(){
            this.filterTable();
        },
        neutral(){
            this.filterTable();
        },
        sad(){
            this.filterTable();
        },
        dead(){
            this.filterTable();
        }
    }
}
</script>