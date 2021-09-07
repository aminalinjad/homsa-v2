<template>
  <v-card width="864" min-height="370">
    <!-- calendar section  -->
    <v-row>
      <v-col>
        <!-- top  -->
        <v-row>
          <v-col class="text-center">
            <p class="greenDark8--text">
              <span class="font-medium-14"> {{ calendar[0].month }} </span>
              <span class="font-medium-14"> {{ calendar[0].year }} </span>
            </p>
          </v-col>
        </v-row>

        <!-- body  -->

        <v-row>
          <v-col>
            <v-card flat width="327" class="mx-auto">
              <!-- weeks head  -->
              <v-row>
                <v-col
                  v-for="(item, index) in calendar[0].weekHead"
                  :key="index"
                  class="text-center"
                >
                  <span class="font-medium-12 secondary--text">
                    {{ item }}
                  </span>
                </v-col>
              </v-row>

              <!-- weeks -->
              <v-row v-for="(item, index) in calendar[0].weeks" :key="index">
                <v-col
                  v-for="(value, i) in item"
                  :key="i"
                  class="ps-1 pe-2 py-1 text-center"
                >
                  <v-hover v-slot="{ hover }">
                    <v-btn
                      :width="36"
                      :height="36"
                      :min-width="36"
                      color="primary"
                      :text="hover ? false : true"
                      :outlined="hover ? true : false"
                      @click="submit(value)"
                      :disabled="value.type==='disable'"
                    >
                      <span :class="hover ? '' : value.type === 'normal' ? 'greenDark8--text': value.type === 'holiday' ? 'redOfferTime--text': 'greyLight3--text'">
                        {{ value.day }}
                      </span>
                    </v-btn>
                  </v-hover>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col> h </v-col>
    </v-row>

    <!-- bottom section  -->
    <v-row>
      <v-col> btn sec </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      calendar: [
        {
          month: "فروردین",
          year: "۱۴۰۰",
          weekHead: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
          weeks: [
            [
              { day: "۱", type: "disable" },
              { day: "۲", type: "disable" },
              { day: "۳", type: "disable" },
              { day: "۴", type: "normal" },
              { day: "۵", type: "normal" },
              { day: "۶", type: "normal" },
              { day: "۷", type: "normal" },
            ],
            [
              { day: "۸", type: "normal" },
              { day: "۹", type: "normal" },
              { day: "۱۰", type: "normal" },
              { day: "۱۱", type: "normal" },
              { day: "۱۲", type: "normal" },
              { day: "۱۳", type: "normal" },
              { day: "۱۴", type: "normal" },
            ],
            [
              { day: "۱۵", type: "normal" },
              { day: "۱۶", type: "normal" },
              { day: "۱۷", type: "normal" },
              { day: "۱۸", type: "normal" },
              { day: "۱۹", type: "holiday" },
              { day: "۲۰", type: "holiday" },
              { day: "۲۱", type: "normal" },
            ],
            [
              { day: "۲۲", type: "normal" },
              { day: "۲۳", type: "normal" },
              { day: "۲۴", type: "normal" },
              { day: "۲۵", type: "normal" },
              { day: "۲۶", type: "normal" },
              { day: "۲۷", type: "normal" },
              { day: "۲۸", type: "normal" },
            ],
            [
              { day: "۲۹", type: "normal" },
              { day: "۳۰", type: "normal" },
              { day: "۳۱", type: "normal" },
              { day: "", type: "empty" },
              { day: "", type: "empty" },
              { day: "", type: "empty" },
              { day: "", type: "empty" },
            ],
          ],
        },
      ],
    };
  },
  methods: {
    submit(value) {
      console.log("date: ", value);
    },
  },
};
</script>

<style lang="scss">
</style>