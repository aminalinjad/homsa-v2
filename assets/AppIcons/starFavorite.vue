<template>
  <svg
    id="star-favorite"
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
  >
    <path
      id="Path_8641"
      data-name="Path 8641"
      d="M0,0H14V14H0Z"
      fill="rgba(255,255,255,0)"
    />
    <path
      id="Path_8642"
      data-name="Path 8642"
      d="M5.553,13.4h0a.875.875,0,0,1-1.266-.929l.472-2.7-1.987-1.9h0a.875.875,0,0,1,.482-1.5l2.759-.394L7.258,3.482h0a.875.875,0,0,1,1.568,0l1.245,2.484,2.759.394h0a.875.875,0,0,1,.482,1.5l-1.987,1.9L11.8,12.47h0a.875.875,0,0,1-1.266.929L8.042,12.113Z"
      transform="translate(-1.042 -1.248)"
      :fill="color"
    />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "#359138",
    },
  }
};
</script>
