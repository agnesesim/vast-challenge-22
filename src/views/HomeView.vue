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
        {
          title: 'Abitanti',
          link: `abitanti`,
          img: 'src\\assets\\icons\\profile.png',
        },
        {
          title: 'Negozi',
          link: `AbitantiView`,
          img: 'src\\assets\\icons\\store.png',
        },
        {
          title: 'Relazioni',
          link: `AbitantiView`,
          img: 'src\\assets\\icons\\network.png',
        },
        {
          title: 'Demografia',
          link: `AbitantiView`,
          img: 'src\\assets\\icons\\people.png',
        },
        {
          title: 'Mappa',
          link: `AbitantiView`,
          img: 'src\\assets\\icons\\treasure-map.png',
        },
      ],
    }
  }
}

</script>
