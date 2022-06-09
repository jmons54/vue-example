<template>
  <h3>Prices</h3>
  <div>
    <button @click="filter = 'BTC'">BTC</button>
    <button @click="setFilter('ETH')">ETH</button>
    <button @click="filter = 'USDT'">USDT</button>
  </div>
  <div>Total : {{ total }}</div>
  <div class="prices">
    <div v-for="price of filteredPrices">
      {{ price.symbol }} => ${{ price.price }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      prices: [],
      filter: null,
    }
  },
  computed: {
    filteredPrices() {
      if (!this.filter) {
        return this.prices
      }
      return this.prices.filter(price => price.symbol.endsWith(this.filter))
    },
    total() {
      return this.filteredPrices.length
    },
  },
  methods: {
    setFilter(symbol) {
      this.filter = symbol
    }
  },
  watch: {
    filteredPrices(prices, oldPrices) {
      console.log(prices.length, oldPrices.length)
    }
  },
  mounted() {
    console.log('DOM ready')
  },
  async created() {
    console.log('created')
    const { data } = await axios.get('https://api1.binance.com/api/v3/ticker/price')
    this.prices = data
  },
}
</script>

<style scoped lang="scss">
button {
  background-color: #616161;
  margin-right: 4px;
}

.prices {
  display: grid;    
  grid-template-columns: repeat(7, 1fr);
  margin-top: 20px;
  gap: 4px;
  > div {
    background-color: #cddc39;
    display: flex;
    padding: 6px 0;
    justify-content: center;
    align-items: center;
    &:nth-child(odd) {
      background-color: #795548;
      color: #fff;
    }
  }
}
</style>


