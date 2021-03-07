<template>
  <div id="app">
      <div>{{`我是App， ${msg}`}}</div>
      <router-link to="/">Foo页面</router-link>
      <router-link to="/bar">Bar页面</router-linK>
      <router-view></router-view>
  </div>
</template>

<script>
// import Foo from './components/Foo'
// import Bar from './components/Bar'
export default {
  data() {
    return {
        msg: 'hello vue ssr'
    }
  },
  // components: {
  //     Foo,
  //     Bar
  // }
}
</script>

<style scoped lang="scss">

</style>
