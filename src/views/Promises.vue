<template>
    <h3>Promise</h3>
    <button @click="callAsync" :disabled="load">callAsync</button>
    <button @click="callChained" :disabled="load">callChained</button>
    <button @click="callAll" :disabled="load">callAll</button>
    <button @click="call" :disabled="load">call</button>
    <div v-for="value of data">
      {{ value.price }}
    </div>
    <div v-if="time">Time : {{ time / 100 }}</div>
</template>

<script>
import axios from 'axios'

function getPrice(symbol) {
  let timeout = 0
  if (symbol === 'ADAETH') {
    timeout = 1000
  } else if (symbol === 'ADAUSDT') {
    timeout = 2000
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(axios.get(`https://api1.binance.com/api/v3/avgPrice?symbol=${symbol}`))
    }, timeout)
  })
  
}

export default {
  data() {
    return {
      loading: false,
      data: [],
      time: 0,
    }
  },
  methods: {
    async callAsync() {
      this.start()
      const res1 = await getPrice('ADABTC')
      this.data.push(res1.data)
      const res2 = await getPrice('ADAETH')
      this.data.push(res2.data)
      const res3 = await getPrice('ADAUSDT')
      this.data.push(res3.data)
      try {
        await getPrice('FAKE')
      } catch(e) {
        console.error(e)
      }
    },
    callChained() {
      this.start()
      getPrice('ADABTC')
      .then(res1 => {
        this.data.push(res1.data)
        return getPrice('ADAETH')
      })
      .then(res2 => {
        this.data.push(res2.data)
        return getPrice('ADAUSDT')

      })
      .then(res3 => {
        this.data.push(res3.data)
        return getPrice('FAKE')
      })
      .catch(console.error)
    },
    callAll() {
      this.start()
      Promise.all([
        getPrice('ADABTC'),
        getPrice('ADAETH'),
        getPrice('ADAUSDT')
      ])
      .then(res => {
        this.data.push(res[0].data)
        this.data.push(res[1].data)
        this.data.push(res[2].data)
        return getPrice('FAKE')
      })
      .catch(console.error)
    },
    call() {
      this.start()

      getPrice('ADABTC')
      .then(res1 => {
        this.data.push(res1.data)
      })

      getPrice('ADAETH')
      .then(res2 => {
        this.data.push(res2.data)
      })
      
      getPrice('ADAUSDT')
      .then(res3 => {
        this.data.push(res3.data)
      })

      getPrice('FAKE')
      .catch(console.error)
    },
    start() {
      this.load = true
      this.data = []
      this.time = 0
      
      this.interval = setInterval(() => {
        if (this.data.length === 3) {
          clearInterval(this.interval)
          this.load = false
        }
        this.time++
      }, 10)
    },
  },
}
</script>

<style scoped lang="scss">
button {
  margin-right: 8px;
  &[disabled] {
    background-color: gray;
  }
}
</style>
