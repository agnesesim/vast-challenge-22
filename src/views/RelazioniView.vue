<script lang="ts">
import * as d3 from 'd3'
import SocialNetwork from '../components/relazioni/SocialNetwork.vue'

export default {
    name: 'App',
    components: {
        SocialNetwork
    },
    data(){
        return {
            loaded: false,
            links: [],
            nodes: []
        }
    },
    async mounted () {
        d3.csv('datasets/journals/SocialNetworkEdited.csv')
        .then((rows) => {
            this.links = rows

            this.loaded = true
        });

        d3.csv('datasets/tables/Participants.csv')
        .then((rows) => {
            this.nodes = rows
        });
    },
    computed: {
        selectedNodes(){
            return this.nodes.map( n =>  {
                return { id: n.participantId, group: n.interestGroup }
            })
        },
        linkOfNodes(){
            return this.links.slice(0, 10000)
        },
    }
}
</script>

<template>
    <div class="relation">
        <v-row>
            <v-col sm="12">
                <v-card class="pa-3">
                    <div class="d-flex justify-center" v-if="loaded">
                        <SocialNetwork 
                            :nodes="selectedNodes" 
                            :links="linkOfNodes"
                        ></SocialNetwork>
                    </div>
                    <div class="d-column pa-3" v-else>
                        <v-skeleton-loader type="list-item-avatar" width="50%"></v-skeleton-loader>
                        <v-skeleton-loader  height="500px"></v-skeleton-loader>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<style>
.v-card {
    padding: 2%;
    padding-top: 0%;
}
</style>