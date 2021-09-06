<template>
  <svg
    id="heart-favorite"
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 18 18"
  >
    <path id="Path_9195" data-name="Path 9195" d="M0,0H18V18H0Z" fill="none" />
    <path
      id="Path_9196"
      data-name="Path 9196"
      d="M12.525,4A4.226,4.226,0,0,1,16.5,8.32C16.5,12.542,9.87,16,9.75,16S3,12.542,3,8.32A4.226,4.226,0,0,1,6.975,4,3.579,3.579,0,0,1,9.75,5.282,3.579,3.579,0,0,1,12.525,4Z"
      transform="translate(-0.75 -1)"
      :fill="clr ? clr : $vuetify.theme.dark ? $vuetify.theme.themes.dark.greyDark7 : $vuetify.theme.themes.light.greyDark7"
      :stroke="strk ? strk : $vuetify.theme.dark ? $vuetify.theme.themes.dark.whiteColor : $vuetify.theme.themes.light.whiteColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    />
  </svg>
</template>

<script>
export default {
  props: ["clr", "strk"],
};
</script>