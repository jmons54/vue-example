<template>
  <h3>{{ name }}</h3>
  <slot>
    <p>Default text</p>
  </slot>
  <slot name="myName" :index="index">
    Child say index = {{ index }}
  </slot>
  <p v-if="value >= 0">
    <button @click="$emit('update:value', ++value)">Increment</button>
  </p>
</template>

<script>
export default {
  props: {
    value: Number,
    index: {
      Number,
      default() {
        return Math.floor(Math.random() * 9)
      }
    },
    name: {
      type: String,
      default: "Default Component"
    },
  }
}
</script>
