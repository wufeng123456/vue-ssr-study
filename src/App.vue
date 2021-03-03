<template>
  <div class="container">
      <div>{{`我是App， ${msg}`}}</div>
      <bar></bar>
      <foo></foo>
  </div>
</template>

<script>
import Foo from './components/Foo'
import Bar from './components/Bar'
export default {
  data() {
    return {
        msg: 'hello vue ssr'
    }
  },
  components: {
      Foo,
      Bar
  }
}
</script>

<style scoped lang="scss">

</style>
