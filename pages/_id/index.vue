<template>
  <div>
    <!-- <h1>new id page</h1> -->
    <!-- <v-btn color="primary" @click="useService"
      >get currency from service file</v-btn
    > -->
    <AppCalendar />
  </div>
</template>
<script>
import { CurrencyService } from "@/services";
import { mapGetters, mapActions } from "vuex";
import * as types from '@/store/types.js';
export default {
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      currencyLists: `modules/currencies/${types.currencies.getters.GET_CURRENCIES}`,
    }),
  },
  mounted() {},
  methods: {
    ...mapActions({
      setCurrencies: `modules/currencies/${types.currencies.actions.SET_CURRENCIES}`,
    }),

    useService() {
      CurrencyService.currencyLists()
        .then((res) => {
          this.setCurrencies(res.data.data);
        })
        .finally(() => {});
    },
  },
};
</script>
