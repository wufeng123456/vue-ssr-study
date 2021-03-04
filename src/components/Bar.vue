<template>
  <div class="bar-container">
      {{msg}}
      <button @click="click">点击</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
        msg: 'bar'
    }
  },
  components: {
      
  },
  methods: {
    click() {
      alert('点击成功')
    }
  }
}
</script>

<style>
.bar-container {
  background: aqua;
}
</style>
