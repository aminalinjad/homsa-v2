<template>
  <v-card width="864" min-height="370" class="py-9 px-11 calenderClass">
    <!-- calendar section  -->
    <v-row class="mb-1">
      <!-- calendar  -->
      <v-col v-for="(clndr, j) in displayedCalendar" :key="j">
        <!-- top  -->
        <v-row align="center">
          <v-col cols="auto" class="pe-0" v-if="j === 0">
            <v-btn
              small
              icon
              depressed
              :disabled="prevDisable"
              @click="prev(clndr.id)"
            >
              <v-icon>$arrowRight</v-icon>
            </v-btn>
          </v-col>
          <v-col class="ps-0 text-center" :class="j === 0 ? 'ps-0' : 'pe-0'">
            <p class="mb-0 greenDark8--text">
              <span class="font-medium-14">
                {{ clndr.month }}
              </span>
              <span class="font-medium-14">
                {{ clndr.year }}
              </span>
            </p>
          </v-col>
          <v-col cols="auto" class="ps-0" v-if="j === 1">
            <v-btn
              small
              icon
              depressed
              :disabled="nextDisable"
              @click="next(clndr.id)"
            >
              <v-icon>$arrowLeft</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <!-- body  -->

        <v-row>
          <v-col class="pt-0">
            <v-card flat width="327" class="mx-auto">
              <!-- weeks head  -->
              <v-row>
                <v-col
                  v-for="(item, index) in clndr.weekHead"
                  :key="index"
                  class="text-center"
                >
                  <span class="font-medium-12 secondary--text">
                    {{ item }}
                  </span>
                </v-col>
              </v-row>
              <v-divider class="my-1 greyLight4"></v-divider>

              <!-- weeks -->
              <v-row v-for="(item, index) in clndr.weeks" :key="index">
                <v-col
                  v-for="(value, i) in item"
                  :key="i"
                  class="ps-1 pe-2 pb-1 text-center"
                >
                  <v-hover v-slot="{ hover }">
                    <v-btn
                      :width="36"
                      :height="36"
                      :min-width="36"
                      color="primary"
                      :text="
                        (checkIn.day === value.day &&
                          checkIn.month === clndr.id) ||
                        (checkOut.day === value.day &&
                          checkOut.month === clndr.id) ||
                        hover
                          ? false
                          : true
                      "
                      :outlined="hover ? true : false"
                      @click="datePick(value, clndr.id)"
                      :disabled="value.type === 'disable'"
                      :class="[(checkIn.day === value.day &&
                          checkIn.month === clndr.id) ? 'firstDay selected' : (checkOut.day === value.day &&
                          checkOut.month === clndr.id) ? 'lastDay selected' : (parseInt(value.day) >parseInt(checkIn.day) && parseInt(value.day) < parseInt(checkOut.day) &&
                          clndr.id >= parseInt(checkIn.month) && clndr.id <= parseInt(checkOut.month) ) ? 'selected' : '' ]"
                    >
                      <span
                        :class="
                          hover
                            ? ''
                            : value.type === 'normal'
                            ? 'greenDark8--text'
                            : value.type === 'holiday'
                            ? 'redOfferTime--text'
                            : 'greyLight3--text'
                        "
                      >
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
    </v-row>

    <!-- bottom section  -->
    <v-row align="center" class="mt-8 greenDark8--text" v-if="rangeSection">
      <v-col cols="auto">
        <span class="font-medium-12"> ۶ شب </span>
      </v-col>
      <v-col class="text-center font-regular-14">
        <span>+ ۱ روز</span>
        <span class="mx-4">+ ۳ روز</span>
        <span>+ ۷ روز</span>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      prevDisable: true,
      nextDisable: false,
      rangeSection: true,
      checkIn: {
        day: null,
        month: null,
      },
      checkOut: {
        day: null,
        month: null,
      },
      displayedCalendar: [],
      calendar: [
        {
          id: 0,
          month: "فروردین",
          year: "۱۴۰۰",
          weekHead: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
          weeks: [
            [
              { day: "1", type: "disable" },
              { day: "2", type: "disable" },
              { day: "3", type: "disable" },
              { day: "4", type: "normal" },
              { day: "5", type: "normal" },
              { day: "6", type: "normal" },
              { day: "7", type: "normal" },
            ],
            [
              { day: "8", type: "normal" },
              { day: "9", type: "normal" },
              { day: "10", type: "normal" },
              { day: "11", type: "normal" },
              { day: "12", type: "normal" },
              { day: "13", type: "normal" },
              { day: "14", type: "normal" },
            ],
            [
              { day: "15", type: "normal" },
              { day: "16", type: "normal" },
              { day: "17", type: "normal" },
              { day: "18", type: "normal" },
              { day: "19", type: "holiday" },
              { day: "20", type: "holiday" },
              { day: "21", type: "normal" },
            ],
            [
              { day: "22", type: "normal" },
              { day: "23", type: "normal" },
              { day: "24", type: "normal" },
              { day: "25", type: "normal" },
              { day: "26", type: "normal" },
              { day: "27", type: "normal" },
              { day: "28", type: "normal" },
            ],
            [
              { day: "29", type: "normal" },
              { day: "30", type: "normal" },
              { day: "31", type: "normal" },
              { day: "", type: "empty" },
              { day: "", type: "empty" },
              { day: "", type: "empty" },
              { day: "", type: "empty" },
            ],
          ],
        },
        {
          id: 1,
          month: "اردیبهشت",
          year: "۱۴۰۰",
          weekHead: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
          weeks: [
            [
              { day: "1", type: "disable" },
              { day: "2", type: "disable" },
              { day: "3", type: "disable" },
              { day: "4", type: "normal" },
              { day: "5", type: "normal" },
              { day: "6", type: "normal" },
              { day: "7", type: "normal" },
            ],
            [
              { day: "8", type: "normal" },
              { day: "9", type: "normal" },
              { day: "10", type: "normal" },
              { day: "11", type: "normal" },
              { day: "12", type: "normal" },
              { day: "13", type: "normal" },
              { day: "14", type: "normal" },
            ],
            [
              { day: "15", type: "normal" },
              { day: "16", type: "normal" },
              { day: "17", type: "normal" },
              { day: "18", type: "normal" },
              { day: "19", type: "holiday" },
              { day: "20", type: "holiday" },
              { day: "21", type: "normal" },
            ],
            [
              { day: "22", type: "normal" },
              { day: "23", type: "normal" },
              { day: "24", type: "normal" },
              { day: "25", type: "normal" },
              { day: "26", type: "normal" },
              { day: "27", type: "normal" },
              { day: "28", type: "normal" },
            ],
            [
              { day: "29", type: "normal" },
              { day: "30", type: "normal" },
              { day: "31", type: "normal" },
              { day: "", type: "empty" },
              { day: "", type: "empty" },
              { day: "", type: "empty" },
              { day: "", type: "empty" },
            ],
          ],
        },
        {
          id: 2,
          month: "خرداد",
          year: "۱۴۰۰",
          weekHead: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
          weeks: [
            [
              { day: "1", type: "disable" },
              { day: "2", type: "disable" },
              { day: "3", type: "disable" },
              { day: "4", type: "normal" },
              { day: "5", type: "normal" },
              { day: "6", type: "normal" },
              { day: "7", type: "normal" },
            ],
            [
              { day: "8", type: "normal" },
              { day: "9", type: "normal" },
              { day: "10", type: "normal" },
              { day: "11", type: "normal" },
              { day: "12", type: "normal" },
              { day: "13", type: "normal" },
              { day: "14", type: "holiday" },
            ],
            [
              { day: "15", type: "normal" },
              { day: "16", type: "normal" },
              { day: "17", type: "normal" },
              { day: "18", type: "normal" },
              { day: "19", type: "holiday" },
              { day: "20", type: "normal" },
              { day: "21", type: "normal" },
            ],
            [
              { day: "22", type: "normal" },
              { day: "23", type: "normal" },
              { day: "24", type: "normal" },
              { day: "25", type: "normal" },
              { day: "26", type: "normal" },
              { day: "27", type: "normal" },
              { day: "28", type: "normal" },
            ],
            [
              { day: "29", type: "normal" },
              { day: "30", type: "holiday" },
              { day: "31", type: "normal" },
              { day: "", type: "empty" },
              { day: "", type: "empty" },
              { day: "", type: "empty" },
              { day: "", type: "empty" },
            ],
          ],
        },
        {
          id: 3,
          month: "تیر",
          year: "۱۴۰۰",
          weekHead: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
          weeks: [
            [
              { day: "1", type: "disable" },
              { day: "2", type: "disable" },
              { day: "3", type: "disable" },
              { day: "4", type: "normal" },
              { day: "5", type: "normal" },
              { day: "6", type: "normal" },
              { day: "7", type: "normal" },
            ],
            [
              { day: "8", type: "normal" },
              { day: "9", type: "normal" },
              { day: "10", type: "normal" },
              { day: "11", type: "holiday" },
              { day: "12", type: "normal" },
              { day: "13", type: "normal" },
              { day: "14", type: "normal" },
            ],
            [
              { day: "15", type: "normal" },
              { day: "16", type: "holiday" },
              { day: "17", type: "normal" },
              { day: "18", type: "normal" },
              { day: "19", type: "normal" },
              { day: "20", type: "normal" },
              { day: "21", type: "normal" },
            ],
            [
              { day: "22", type: "normal" },
              { day: "23", type: "normal" },
              { day: "24", type: "normal" },
              { day: "25", type: "normal" },
              { day: "26", type: "normal" },
              { day: "27", type: "normal" },
              { day: "28", type: "normal" },
            ],
            [
              { day: "29", type: "normal" },
              { day: "30", type: "normal" },
              { day: "31", type: "normal" },
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
  created() {
    this.setDisplayedCalendar(0, 1);
  },
  methods: {
    datePick(value, month) {
      // let checkInDay = parseInt(this.checkIn.day);
      // let valueDay = parseInt(value.day);
      // let checkInMonth = parseInt(this.checkIn.month);
      if (!this.checkIn.day) {
        this.checkIn.day = value.day;
        this.checkIn.month = month;
      } else if (!this.checkOut.day) {
        if (month === parseInt(this.checkIn.month)) {
          if (parseInt(value.day) <= parseInt(this.checkIn.day)) {
            this.checkIn.day = value.day;
            this.checkIn.month = month;
          } else {
          this.checkOut.day = value.day;
          this.checkOut.month = month;
        }
        } else if (month < parseInt(this.checkIn.month)) {
          this.checkIn.day = value.day;
          this.checkIn.month = month;
        } else {
          this.checkOut.day = value.day;
          this.checkOut.month = month;
        }
      } else {
        this.checkIn.day = null;
        this.checkIn.month = null;
        this.checkOut.day = null;
        this.checkOut.month = null;
        this.datePick(value, month);
      }
    },
    setDisplayedCalendar(f, s) {
      this.displayedCalendar = [];
      this.displayedCalendar.push(this.calendar[f], this.calendar[s]);
    },
    prev(index) {
      if (index != 1) {
        this.setDisplayedCalendar(0, 1);
        this.prevDisable = true;
        this.nextDisable = false;
      }
    },
    next(index) {
      if (index != 3) {
        this.setDisplayedCalendar(2, 3);
        this.prevDisable = false;
        this.nextDisable = true;
      }
    },
  },
};
</script>

<style lang="scss">
.calenderClass {
  border-radius: 16px !important;
}
</style>