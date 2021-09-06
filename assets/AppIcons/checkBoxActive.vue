<template>
  <svg
    id="Small_Checkbox"
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <g id="Checkbox_Icon" data-name="Checkbox Icon">
      <rect
        id="Rectangle_16"
        data-name="Rectangle 16"
        width="18"
        height="18"
        rx="5"
        :fill="clr ? clr : $vuetify.theme.dark ? $vuetify.theme.themes.dark.primary : $vuetify.theme.themes.light.primary"
      />
      <path
        id="Path_8727"
        data-name="Path 8727"
        d="M19.4,11.5l1.186,1.186-5.525,5.533L11.5,14.662l1.186-1.186,2.379,2.371Z"
        transform="translate(-7.5 -5.5)"
        fill="#fff"
      />
    </g>
  </svg>
</template>

<script>
export default {
    props: ["clr"]
}
</script>