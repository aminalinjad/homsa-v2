<template>
  <div>
    <div class="d-flex align-center px-7 pa-5">
      <div>homsa logo</div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <div>
          <v-btn rounded outlined color="primary">
            <v-icon>mdi-home-plus</v-icon>
            <span>
              {{ hostBtn }}
            </span>
          </v-btn>
        </div>
        <div class="px-5">
          <span>
            {{ login }}
          </span>
          <span>|</span>
          <span>
            {{ register }}
          </span>
        </div>
        <div class="d-flex align-center">
          <div class="pe-1 pt-1">{{ phone }}</div>
          <v-icon> mdi-headset </v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hostBtn: "میزبان شوید",
      login: "ورود",
      register: "ثبت نام",
      phone: "021-28111500",
    };
  },
};
</script>
