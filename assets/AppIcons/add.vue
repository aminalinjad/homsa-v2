<template>
  <svg
    id="Add"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path id="Path_9182" data-name="Path 9182" d="M0,0H24V24H0Z" fill="none" />
    <path
      id="Path_9183"
      data-name="Path 9183"
      d="M12,8v8m4-4H8m4,9h0a9,9,0,0,1-9-9H3a9,9,0,0,1,9-9h0a9,9,0,0,1,9,9h0A9,9,0,0,1,12,21Z"
      fill="none"
      :stroke="clr ? clr : (!$vuetify.theme.dark ? $vuetify.theme.themes.light.secondary : $vuetify.theme.themes.dark.secondary)"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    />
  </svg>
</template>

<script>
export default {
  props: ['clr']
}
</script>