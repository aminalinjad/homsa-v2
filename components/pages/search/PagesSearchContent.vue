<template>
  <div>
    <v-container>
      <!-- top section  -->
      <div class="d-flex align-center justify-space-between my-4">
        <div>
          <div class="font-regular-12 mb-2">
            <span class="secondary--text">هومسا /</span>
            <span class="secondary--text">اقامتگاه های استان گیلان /</span>
            <span>شهر رشت</span>
          </div>
          <div class="d-flex align-center">
            <h3 class="font-bold-18">اجاره اقامتگاه در شهر رشت</h3>
            <span class="ms-1 font-regular-12 secondary--text">(۳۴ مورد)</span>
          </div>
        </div>
        <div>
          <div class="d-flex align-center justify-end">
            <div class="d-flex align-center">
              <span class="font-regular-12 secondary--text"
                >مرتب سازی بر اساس</span
              >
              <div class="sortByInput ms-3 mb-n7">
                <v-select
                  :items="sortBy"
                  v-model="sortBydefault"
                  solo
                  flat
                  dense
                ></v-select>
              </div>
            </div>
            <div class="white ms-8 rounded" >
              <v-icon class="py-2 ps-3 pe-1 secondary--text">mdi-menu</v-icon>
              <v-icon class="py-2 ps-1 pe-3 secondary--text">mdi-apps</v-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- main section  -->
      <div class="white rounded-lg">
        <div class="py-4 px-6">
          <v-row class="ma-0" align="center">
            <v-col cols="1" class="pa-0">
              <div>
                <span class="secondary--text font-regular-14">برچسب ها</span>
              </div>
            </v-col>
            <v-col cols="11" class="pa-0">
              <div>
                <AppItemCarousel />
              </div>

              <!-- <v-tabs show-arrows>
                <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

                <v-tab v-for="i in 30" :key="i" :href="'#tab-' + i">
                  Item {{ i }}
                </v-tab>
              </v-tabs> -->
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>
        <!-- <div class="d-flex">
            
            <div class="d-flex" v-for="(result, index) in results" :key="index">
                <div class="py-9 px-6">{{ result.name }}</div>
                <v-divider vertical></v-divider>
                
            </div>
        </div> -->
        <div>
          <v-row class="ma-0">
            <v-col
              cols="12"
              md="4"
              v-for="(result, index) in results"
              :key="index"
              class="pa-0"
            >
              <div class="d-flex justify-space-between">
                <div class="pa-4">
                  <div>
                    <v-card flat class="rounded-lg">
                      <!-- <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        width="400"
                        height="200"
                      >
                        <v-card-title>tgrtt</v-card-title>
                      </v-img> -->

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn icon>
                          <v-icon>mdi-heart</v-icon>
                        </v-btn>

                        <v-btn icon>
                          <v-icon>mdi-bookmark</v-icon>
                        </v-btn>

                        <v-btn icon>
                          <v-icon>mdi-share-variant</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </div>
                </div>
                <v-divider
                  class="grey lighten-4"
                  v-if="(index + 1) % 3 != 0"
                  vertical
                ></v-divider>
              </div>
              <v-divider
                v-if="index < results.length - (results.length % 3)"
              ></v-divider>
            </v-col>
          </v-row>
        </div>
      </div>

      <!-- bottom section  -->
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortBydefault: "بهترین تجربه",
      sortBy: ["گران ترین", "بهترین تجربه"],
      results: [
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
      ],
    };
  },
};
</script>

<style lang="scss">
.sortByInput {
  width: 150px;
}
</style>