<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="14"
    viewBox="0 0 16 14"
  >
    <path
      id="Path_8836"
      data-name="Path 8836"
      d="M4,15H20V13H4Zm0,4H20V17H4Zm0-8H20V9H4ZM4,5V7H20V5Z"
      transform="translate(-4 -5)"
      :fill="clr ? clr : $vuetify.theme.dark ? $vuetify.theme.themes.dark.secondary : $vuetify.theme.themes.light.secondary"
    />
  </svg>
</template>

<script>
export default {
  props: ["clr"],
};
</script>