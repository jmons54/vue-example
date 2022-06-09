<template>
  <MyComponent/>
  <MyComponent
    v-model:value="count"
    name="Custom Component"
    :index="9"
  >
    <p>Parent text</p>
    <template v-slot:myName="props">
      Parent say index = {{ props.index * 2 }}
    </template>
  </MyComponent>
  <p>Count : {{ count }}</p>
</template>

<script>
import MyComponent from '../components/MyComponent'

export default {
  components: {
    MyComponent,
  },
  data() {
    return {
      count: 0,
    }
  },
}
</script>


