import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import "vue-awesome/icons/play"

library.add(faUserSecret)
createApp(App).mount('#app')
