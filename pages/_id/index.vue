<template>
  <div>
    <h1>new id page</h1>
    <v-btn color="primary" @click="useService"
      >get currency from service file</v-btn
    >
  </div>
</template>
<script>
import { CurrencyService } from '@/services'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: [],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      currencyLists: 'modules/currencies/GET_CURRENCIES'
    })

  },
  mounted () {
    // console.log('here is currency list from store', this.currencyLists);

  },
  methods: {
    ...mapActions ({
      setCurrencies: "modules/currencies/SET_CURRENCIES",

    }),

    useService() {
      CurrencyService.currencyLists().then((res)=>{

        console.log('res in id page from service', res);
        this.setCurrencies(res.data.data)
      })
      .finally(() => {
        console.log('here is currency list from store', this.currencyLists);
    });
      // console.log('here is currency list from store', this.currencyLists);

    }

  }
}
</script>
