<template>
  <div v-if="loading" class="loading-page">
    <div class="image-parent">
      <img src="@/static/loading.gif" alt="loading">
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 253, 253, 0.36);
  text-align: center;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 99999;
}
.image-parent {
  position: absolute;
  top: 40%;
  background: #fff;
  padding: 20px 20px 10px;
  left: 0;
  right: 0;
  margin: auto;
  width: fit-content;
  border-radius: 8px;
}
</style>
