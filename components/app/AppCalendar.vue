<template>
  <v-card
    width="864"
    :height="checkIn.day && checkOut.day ? 475 : 415"
    class="py-9 px-11 calenderClass"
    style="transition: all 0.5s"
  >
    <!-- calendar section  -->
    <v-row>
      <v-col
        v-for="(calendarMonth, calendarMonthIndex) in displayedCalendar"
        :key="calendarMonthIndex"
      >
        <!-- top  -->
        <v-row align="center">
          <v-col cols="auto" class="pe-0" v-if="calendarMonthIndex === 0">
            <v-btn
              small
              icon
              depressed
              :disabled="prevDisable"
              @click="prev(calendarMonth.id)"
            >
              <v-icon v-if="$vuetify.rtl">$arrowRight</v-icon>
              <v-icon v-else>$arrowLeft</v-icon>
            </v-btn>
          </v-col>
          <v-col
            class="ps-0 text-center"
            :class="calendarMonthIndex === 0 ? 'ps-0' : 'pe-0'"
          >
            <p class="mb-0 greenDark8--text">
              <span class="font-medium-14">
                {{ calendarMonth.jalali_month }}
              </span>
              <span :class="$i18n.locale === 'fa' ? 'font-FaNummedium-14' : ''">
                {{ calendarMonth.jalali_year }}
              </span>
            </p>
          </v-col>
          <v-col cols="auto" class="ps-0" v-if="calendarMonthIndex === 1">
            <v-btn
              small
              icon
              depressed
              :disabled="nextDisable"
              @click="next(calendarMonth.id)"
            >
              <v-icon v-if="$vuetify.rtl">$arrowLeft</v-icon>
              <v-icon v-else>$arrowRight</v-icon>
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
                  v-for="(dayName, dayNameIndex) in calendarDaysName"
                  :key="dayNameIndex"
                  class="text-center"
                >
                  <span class="font-medium-12 secondary--text">
                    {{ dayName }}
                  </span>
                </v-col>
              </v-row>
              <v-divider class="my-1 greyLight4"></v-divider>

              <!--days -->
              <v-row>
                <v-col
                  v-for="(dayInfo, dayIndex) in calendarMonth.calendar"
                  :key="dayIndex"
                  class="ps-1 pe-2 pb-1 text-center"
                >
                  <v-hover v-slot="{ hover }">
                    <v-btn
                      elevation="0"
                      :width="36"
                      :height="36"
                      :min-width="36"
                      color="primary"
                      :text="
                        !(
                          (checkIn.day === dayInfo.day &&
                            checkIn.monthId === calendarMonth.id &&
                            !dayInfo.other_month) ||
                          (checkOut.day === dayInfo.day &&
                            checkOut.monthId === calendarMonth.id &&
                            !dayInfo.other_month) ||
                          hover
                        )
                      "
                      :outlined="hover"
                      @click="
                        datePick(
                          dayInfo,
                          calendarMonth.jalali_month_number,
                          calendarMonth.id
                        )
                      "
                      :disabled="dayInfo.previous || dayInfo.other_month"
                      class="calendarBtn"
                      :class="
                        dayInfo.other_month
                          ? ''
                          : btnClass(dayInfo, calendarMonth.id)
                      "
                    >
                      <span
                        v-if="!dayInfo.other_month"
                        :class="[
                          (checkIn.day === dayInfo.day &&
                            checkIn.monthId === calendarMonth.id) ||
                          (checkOut.day === dayInfo.day &&
                            checkOut.monthId === calendarMonth.id)
                            ? 'WhiteColor'
                            : hover
                            ? ''
                            : dayInfo.previous
                            ? 'greyLight3--text'
                            : dayInfo.type === 'holiday' ||
                              dayInfo.end_of_weekend
                            ? 'redOfferTime--text'
                            : 'greenDark8--text',
                          $i18n.locale === 'fa' ? 'font-FaNumregular-14' : ''
                        ]"
                      >
                        {{ dayInfo.day }}
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
    <v-scroll-y-transition>
      <v-row
        align="center"
        class="mt-8 greenDark8--text"
        v-show="checkIn.day && checkOut.day"
      >
        <v-col cols="auto">
          <span class="font-FaNummedium-12">{{ selectedDays }}</span>
          <span class="font-medium-12">
            {{ $t("header.bottom.calendar.night") }}
          </span>
        </v-col>
        <v-col class="text-center font-regular-14">
          <v-btn
            text
            small
            color="greenDark8"
            class="px-2 font-medium-14 text-lowercase"
            @click="setSelectedDaysFlexibility(1)"
          >
            <v-icon small>$plusMinus</v-icon>
            <span :class="$i18n.locale === 'fa' ? 'font-FaNumregular-14' : ''"
              >1</span
            >
            <span>{{ $t("header.bottom.calendar.day") }}</span>
          </v-btn>
          <v-btn
            text
            small
            color="greenDark8"
            class="px-2 font-medium-14 text-lowercase"
            @click="setSelectedDaysFlexibility(3)"
          >
            <v-icon small>$plusMinus</v-icon>
            <span :class="$i18n.locale === 'fa' ? 'font-FaNumregular-14' : ''"
              >3</span
            >
            <span>{{ $t("header.bottom.calendar.day") }}</span>
          </v-btn>
          <v-btn
            text
            small
            color="greenDark8"
            class="px-2 font-medium-14 text-lowercase"
            @click="setSelectedDaysFlexibility(7)"
          >
            <v-icon small>$plusMinus</v-icon>
            <span :class="$i18n.locale === 'fa' ? 'font-FaNumregular-14' : ''"
              >7</span
            >
            <span>{{ $t("header.bottom.calendar.day") }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-scroll-y-transition>
  </v-card>
</template>

<script>
import { CalendarService } from "@/services";

export default {
  data() {
    return {
      selectedDaysFlexibility: null,
      prevDisable: true,
      nextDisable: false,
      checkIn: {
        day: null,
        month: null,
        monthId: null
      },
      checkOut: {
        day: null,
        month: null,
        monthId: null
      },
      displayedCalendar: [],
      calendar: [],
      calendarDaysName: []
    };
  },
  computed: {
    selectedDays() {
      if (this.checkIn.day && this.checkOut.day) {
        let checkInDay = this.checkIn.day;
        let checkInMonthId = this.checkIn.monthId;
        let checkOutDay = this.checkOut.day;
        let checkOutMonthId = this.checkOut.monthId;
        let monthsInterval = checkOutMonthId - this.checkIn.monthId;
        let checkInMonthNumberOfDays = this.calendar[checkInMonthId]
          .number_of_days;
        let checkOutMonthNumberOfDays = this.calendar[checkOutMonthId]
          .number_of_days;
        if (monthsInterval === 0) {
          return checkOutDay - checkInDay;
        } else if (monthsInterval === 1) {
          return checkInMonthNumberOfDays - checkInDay + checkOutDay;
        } else if (monthsInterval === 2) {
          let middleMonthNumberOfDays = this.calendar[checkInMonthId + 1]
            .number_of_days;
          return (
            checkInMonthNumberOfDays -
            checkInDay +
            checkOutDay +
            middleMonthNumberOfDays
          );
        } else if (monthsInterval === 3) {
          let firstMiddleMonthNumberOfDays = this.calendar[checkInMonthId + 1]
            .number_of_days;
          let secondMiddleMonthNumberOfDays = this.calendar[checkInMonthId + 2]
            .number_of_days;
          return (
            checkInMonthNumberOfDays -
            checkInDay +
            checkOutDay +
            firstMiddleMonthNumberOfDays +
            secondMiddleMonthNumberOfDays
          );
        }
      }
    }
  },
  created() {
    this.getCalendar();
    // this.setDisplayedCalendar(0, 1);
  },
  mounted() {
    // this.getCalendar();
  },
  methods: {
    datePick(value, month, monthId) {
      // let checkInDay = parseInt(this.checkIn.day);
      // let valueDay = parseInt(value.day);
      // let checkInMonth = parseInt(this.checkIn.monthId);
      if (!this.checkIn.day) {
        this.checkIn = value;
        this.checkIn.month = month;
        this.checkIn.monthId = monthId;
      } else if (!this.checkOut.day) {
        if (monthId === this.checkIn.monthId) {
          if (value.day <= this.checkIn.day) {
            this.checkIn = value;
            this.checkIn.month = month;
            this.checkIn.monthId = monthId;
          } else {
            this.checkOut = value;
            this.checkOut.month = month;
            this.checkOut.monthId = monthId;
          }
        } else if (monthId < this.checkIn.monthId) {
          this.checkIn = value;
          this.checkIn.month = month;
          this.checkIn.monthId = monthId;
        } else {
          this.checkOut = value;
          this.checkOut.month = month;
          this.checkOut.monthId = monthId;
        }
      } else {
        this.checkIn = {};
        this.checkIn.day = null;
        this.checkIn.monthId = null;
        this.checkOut = {};
        this.checkOut.day = null;
        this.checkOut.monthId = null;
        this.datePick(value, month, monthId);
      }
    },
    setDisplayedCalendar(firstDisplayedMonth, secondDisplayedMonth) {
      this.displayedCalendar = [];
      this.displayedCalendar.push(
        this.calendar[firstDisplayedMonth],
        this.calendar[secondDisplayedMonth]
      );
    },
    prev(index) {
      if (index !== 0) {
        this.setDisplayedCalendar(0, 1);
        this.prevDisable = true;
        this.nextDisable = false;
      }
    },
    next(index) {
      if (index !== this.calendar.length - 1) {
        this.setDisplayedCalendar(2, 3);
        this.prevDisable = false;
        this.nextDisable = true;
      }
    },
    setSelectedDaysFlexibility(value) {
      this.selectedDaysFlexibility = value;
    },
    btnClass(value, monthId) {
      let valueDay = value.day;
      let checkInDay = this.checkIn.day;
      let checkInMonthId = this.checkIn.monthId;
      let checkOutDay = this.checkOut.day;
      let checkOutMonthId = this.checkOut.monthId;
      if (checkInDay === valueDay && checkInMonthId === monthId) {
        return this.$vuetify.rtl ? "firstDay selected" : "lastDay selected";
      } else if (checkOutDay === valueDay && checkOutMonthId === monthId) {
        return this.$vuetify.rtl ? "lastDay selected" : "firstDay selected";
      } else if (monthId === checkInMonthId) {
        if (monthId === checkOutMonthId) {
          if (valueDay > checkInDay && valueDay < checkOutDay) {
            return "selected";
          }
        } else if (monthId < checkOutMonthId && valueDay > checkInDay) {
          return "selected";
        }
      } else if (monthId > checkInMonthId) {
        if (monthId === checkOutMonthId) {
          if (valueDay < checkOutDay) {
            return "selected";
          }
        } else if (monthId < checkOutMonthId) {
          return "selected";
        }
      }
      return "";
    },
    getCalendar() {
      return CalendarService.calendar(3)
        .then(res => {
          this.calendar = res.data.data.calendars;
          this.calendarDaysName = res.data.calendar_days_name;
          console.log("calendar", res.data.data.calendars);
          this.setDisplayedCalendar(0, 1);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
.calenderClass {
  border-radius: 16px !important;
}

.calendarBtn {
  border-radius: 4px !important;
}

.calendarBtn.firstDay::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-bottom: 8px solid transparent;
  border-top: 8px solid transparent;
  border-right: 8px solid var(--v-primary-base);
  position: absolute;
  top: 10px;
  left: -16px;
}

.calendarBtn.lastDay::after {
  content: "";
  width: 0;
  height: 0;
  border-right: 10px solid transparent;
  border-bottom: 8px solid transparent;
  border-top: 8px solid transparent;
  border-left: 8px solid var(--v-primary-base);
  position: absolute;
  top: 10px;
  right: -16px;
}

.calendarBtn.firstDay:hover::after,
.calendarBtn.lastDay:hover::after {
  display: none;
}

.selected {
  background: #35913826;
}
</style>
