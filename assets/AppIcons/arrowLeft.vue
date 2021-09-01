<template>
  <svg
    id="Arrow.8"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    :class="rotate?'arrowRotate':''"
  >
    <path
      id="Path_9151"
      data-name="Path 9151"
      d="M14,8l-4,4,4,4"
      fill="none"
      stroke="#757575"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    />
    <path id="Path_9152" data-name="Path 9152" d="M0,0H24V24H0Z" fill="none" />
  </svg>
</template>

<script>
export default {
  props: {
    rotate: {
      type: Boolean, 
      default: false
    }
  }
}
</script>

<style lang="scss">
svg.arrowRotate {
  transform: rotate(180deg);
}
</style>