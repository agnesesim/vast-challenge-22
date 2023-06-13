import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components: {
    ...components,
    ...labsComponents
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
