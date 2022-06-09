import { createApp } from 'vue'
import MyView from './views/MyView.vue'
import Component from './views/Component.vue'
import Promises from './views/Promises.vue'
import Prices from './views/Prices.vue'

const myElement = document.getElementById('myElement')
if (myElement) {
  createApp(MyView).mount('#myElement')
}

const component = document.getElementById('component')
if (component) {
  createApp(Component).mount(component)
}

const promises = document.getElementById('promises')
if (promises) {
  createApp(Promises).mount(promises)
}

const prices = document.getElementById('prices')
if (prices) {
  createApp(Prices).mount(prices)
}

