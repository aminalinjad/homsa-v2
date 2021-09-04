<template>
  <svg
    id="Minus"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path id="Path_9184" data-name="Path 9184" d="M0,0H24V24H0Z" fill="none" />
    <path
      id="Path_9185"
      data-name="Path 9185"
      d="M16,12H8m4,9h0a9,9,0,0,1-9-9H3a9,9,0,0,1,9-9h0a9,9,0,0,1,9,9h0A9,9,0,0,1,12,21Z"
      fill="none"
      :stroke="clr ? clr : (!$vuetify.theme.dark ? $vuetify.theme.themes.light.greyLight3 : $vuetify.theme.themes.dark.greyLight3)"
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