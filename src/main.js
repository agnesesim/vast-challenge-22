import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/VDataTable'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components: {
    ...components,
    VDataTable
  },
  directives,
})

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(vuetify, {
  iconfont: 'mdi'
})

app.mount('#app')
