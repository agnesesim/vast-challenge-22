<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app id="inspire">
      <v-navigation-drawer
        expand-on-hover
        rail
        class="bg-teal-lighten-4"
        theme="dark"
      >
      <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" to="/"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="Address book" value="abitanti" to="/abitanti"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    <v-app-bar
      class="bg-teal-lighten-3"
      prominent
      flat
    >
      <v-toolbar-title>VAST Challenge 22</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>


</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        rail: true,
      }
    },
  }
</script>

