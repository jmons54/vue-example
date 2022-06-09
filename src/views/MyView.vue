<template>
  <button @click="count++">{{ count }}</button>
  {{ fullName }}
  <div style="margin: 10px 0">
    <input v-model="modelFirstName"/>
    <input v-model="lastName"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      firstName: "Céline",
      lastName: "Dion",
    }
  },
  computed: {
    modelFirstName: {
      get() {
        return this.firstName
      },
      set(value) {
        if (value === 'Julien')
          value = 'Céline'
        this.firstName = value
      }
    },
    fullName() {
      return `${this.firstName} ${this.lastName}`
    },
  }
}
</script>

<style>
body {
  background-color: #9e9e9e;
  padding: 20px;
  margin: 0;
}

* {
  font-family: monospace;
  font-size: 20px;
}

button {
  cursor: pointer;
  min-width: 100px;
  padding: 6px 12px;
  border: none;
  background-color: #3f51b5;
  color: #fff;
}
</style>
