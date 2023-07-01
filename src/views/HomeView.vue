<template>
    <v-row class="d-flex justify-space-evenly">
      <template v-for="(item, i) in items" :key="i">
        <v-col
          cols="6"
          md="2"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              flat height="200" width="200"
              class="d-flex flex-column justify-center align-center rounded-lg"
              :elevation="isHovering ? 12 : 2"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              :to="'/'+ item.link"
            >
              <v-img
                contain
                width="100"
                :src="item.img"
              >
              </v-img>
              <div class="text-h6 pb-3">{{item.title}}</div>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
</template>

<script>
 
export default {
  data() {
    return {
      items: [
        // Assuming the volunteers are representative of the city’s population, characterize what you can about the demographics of the town. 
        // Provide your rationale and supporting data. Limit your response to 10 images and 500 words.
        // Grafici distribuzione dei singoli attributi filtrabili
        // TODO: Mappa dei partecipanti dove vivono, con possibilità di assegnare al colore il valore di un atributo. ESEMPIO: seleziono age e vedo la distribuzione delle età dei partcipanti
        // La mappa potrebbe anche essere vista dal punto di vista di dove lavorano i partecipanti. 
        // SWITCH PER ABITA/LAVORA, RADIOBUTTON per aspetto che voglio colorare
        {
          title: 'Demografia',
          link: `demografia`,
          img: 'src\\assets\\icons\\people.png',
        },        
        // Consider the social activities in the community. What patterns do you see in the social networks in the town? 
        // Describe up to ten significant patterns you observe, with evidence and rationale. Limit your response to 10 images and 500 words.
        {
          title: 'Relazioni',
          link: `relazioni`,
          img: 'src\\assets\\icons\\network.png',
        },
        // Identify the predominant business base of the town, and describe patterns you observe. Limit your response to 10 images and 500 words.
        // Mappa con PUB/Risto e Jobs, slider che segna l'ora e indicatore dei presenti in quel luogo (Check maxOccupancy superata diventa CRITIC)
        {
          title: 'Mappa',
          link: `edifici`,
          img: 'src\\assets\\icons\\treasure-map.png',
        },
        // {
        //   title: 'Pattern of life',
        //   link: `TODO`,
        //   img: 'src\\assets\\icons\\store.png',
        // },
        // {
        //   title: 'Mappa',
        //   link: `AbitantiView`,
        //   img: 'src\\assets\\icons\\treasure-map.png',
        // },
      ],
    }
  }
}

</script>
