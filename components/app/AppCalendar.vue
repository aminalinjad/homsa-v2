<template>
  <v-card
    width="864"
    :height="checkIn.day && checkOut.day ? 460 : 415"
    class="pt-9 px-11 calenderClass"
  >
    <v-row class="ma-0 fill-height">
      <!-- calendar section  -->
      <v-col cols="12" class="py-0">
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
                  <span
                    :class="$vuetify.rtl ? 'font-FaNummedium-14' : ''"
                  >
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
              <v-col class="py-0">
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
                  <v-row class="my-0">
                    <v-col
                      v-for="(dayInfo, dayIndex) in calendarMonth.calendar"
                      :key="dayIndex"
                      class="my-1 py-0 text-center"
                      :class="btnColumnClass(dayInfo, calendarMonth.id)"
                    >
                      <v-hover v-slot="{ hover }">
                        <v-btn
                          elevation="0"
                          :width="36"
                          :height="36"
                          :min-width="36"
                          color="primary"
                          :text="!(btnTextMode(dayInfo, calendarMonth) || hover)"
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
                              btnSpanClass(dayInfo, calendarMonth.id, hover),
                              {'font-FaNumregular-14' : $vuetify.rtl}
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
      </v-col>

      <!-- bottom section  -->
      <v-col align-self="end">
        <v-scroll-y-transition>
          <v-row
            align="center"
            class="greenDark8--text my-0"
            v-show="checkIn.day && checkOut.day"
          >
            <v-col cols="auto">
              <v-row class="ma-0">
                <v-btn
                  depressed
                  small
                  :color="
                    selectedDaysFlexibility === dateRanges[0]
                      ? '#3591380D'
                      : 'greyLight1'
                  "
                  :class="
                    selectedDaysFlexibility === dateRanges[0]
                      ? 'primary--text'
                      : 'greenDark8--text'
                  "
                  class="px-2 font-medium-14 text-lowercase"
                  @click="setSelectedDaysFlexibility(dateRanges[0])"
                >
                  <v-icon small v-if="selectedDaysFlexibility === dateRanges[0]"
                    >$plusMinusPrimary</v-icon
                  >
                  <v-icon small v-else>$plusMinus</v-icon>
                  <span
                    :class="$vuetify.rtl ? 'font-FaNumregular-14' : ''"
                    >{{ dateRanges[0] }}</span
                  >
                  <span>{{ $t("header.bottom.calendar.day") }}</span>
                </v-btn>
                <v-btn
                  depressed
                  small
                  :color="
                    selectedDaysFlexibility === dateRanges[1]
                      ? '#3591380D'
                      : 'greyLight1'
                  "
                  :class="
                    selectedDaysFlexibility === dateRanges[1]
                      ? 'primary--text'
                      : 'greenDark8--text'
                  "
                  class="mx-4 px-2 font-medium-14 text-lowercase"
                  @click="setSelectedDaysFlexibility(dateRanges[1])"
                >
                  <v-icon small v-if="selectedDaysFlexibility === dateRanges[1]"
                    >$plusMinusPrimary</v-icon
                  >
                  <v-icon small v-else>$plusMinus</v-icon>

                  <span
                    :class="$vuetify.rtl ? 'font-FaNumregular-14' : ''"
                    >{{ dateRanges[1] }}</span
                  >
                  <span>{{ $t("header.bottom.calendar.day") }}</span>
                </v-btn>
                <v-btn
                  depressed
                  small
                  :color="
                    selectedDaysFlexibility === dateRanges[2]
                      ? '#3591380D'
                      : 'greyLight1'
                  "
                  :class="
                    selectedDaysFlexibility === dateRanges[2]
                      ? 'primary--text'
                      : 'greenDark8--text'
                  "
                  class="px-2 font-medium-14 text-lowercase"
                  @click="setSelectedDaysFlexibility(dateRanges[2])"
                >
                  <v-icon small v-if="selectedDaysFlexibility === dateRanges[2]"
                    >$plusMinusPrimary</v-icon
                  >
                  <v-icon small v-else>$plusMinus</v-icon>
                  <span
                    :class="$vuetify.rtl ? 'font-FaNumregular-14' : ''"
                    >{{ dateRanges[2] }}</span
                  >
                  <span>{{ $t("header.bottom.calendar.day") }}</span>
                </v-btn>
              </v-row>
              <v-row class="ma-0 align-center">
                <v-icon small class="mb-n1 me-1">$information</v-icon>
                <span class="pt-2 font-regular-10 primary--text">{{
                  $t("header.bottom.calendar.tips")
                }}</span>
              </v-row>
            </v-col>
            <v-col
              class="font-regular-14"
              :class="$vuetify.rtl ? 'text-left' : 'text-right'"
            >
              <v-btn
                depressed
                color="primary"
                class="font-medium-12"
                width="160"
                height="46"
                @click="submitDate"
              >
                <span
                  :class="
                    $vuetify.rtl ? 'font-FaNummedium-12' : 'font-medium-12'
                  "
                  >{{ selectedDays }}</span
                >
                <span class="font-medium-12">
                  {{ $t("header.bottom.calendar.night") }} -
                  {{ $t("header.bottom.calendar.confirm") }}
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-scroll-y-transition>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { CalendarService } from "@/services";

export default {
  props: ["checkInDate", "checkOutDate", "clearCalendarData"],
  data() {
    return {
      selectedDaysFlexibility: null,
      dateRanges: [],
      prevDisable: true,
      nextDisable: false,
      checkIn: {
        day: null,
        month: null,
        monthId: null,
      },
      checkOut: {
        day: null,
        month: null,
        monthId: null,
      },
      displayedCalendar: [],
      calendar: [],
      calendarDaysName: [],
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
        let checkInMonthNumberOfDays =
          this.calendar[checkInMonthId].number_of_days;
        let checkOutMonthNumberOfDays =
          this.calendar[checkOutMonthId].number_of_days;
        if (monthsInterval === 0) {
          return checkOutDay - checkInDay;
        } else if (monthsInterval === 1) {
          return checkInMonthNumberOfDays - checkInDay + checkOutDay;
        } else if (monthsInterval === 2) {
          let middleMonthNumberOfDays =
            this.calendar[checkInMonthId + 1].number_of_days;
          return (
            checkInMonthNumberOfDays -
            checkInDay +
            checkOutDay +
            middleMonthNumberOfDays
          );
        } else if (monthsInterval === 3) {
          let firstMiddleMonthNumberOfDays =
            this.calendar[checkInMonthId + 1].number_of_days;
          let secondMiddleMonthNumberOfDays =
            this.calendar[checkInMonthId + 2].number_of_days;
          return (
            checkInMonthNumberOfDays -
            checkInDay +
            checkOutDay +
            firstMiddleMonthNumberOfDays +
            secondMiddleMonthNumberOfDays
          );
        }
      }
    },
  },
  watch: {
    clearCalendarData(value) {
      if(value) {
        this.clearCalendar();
      }
    },
  },
  created() {
    this.getCalendar();
  },
  methods: {
    btnTextMode(dayInfo, calendarMonth) {
      return this.checkIn.day === dayInfo.day && this.checkIn.monthId === calendarMonth.id && !dayInfo.other_month || this.checkOut.day === dayInfo.day && this.checkOut.monthId === calendarMonth.id && !dayInfo.other_month;
    },
    datePick(value, month, monthId) {
      console.log('check !this.checkIn.day', !this.checkIn.day, value)
      if (!this.checkIn.day) {
        this.checkIn = value;
        this.checkIn.month = month;
        this.checkIn.monthId = monthId;
        this.$emit("setCheckInDate", value);
      } else if (!this.checkOut.day) {
        if (monthId === this.checkIn.monthId) {
          if (value.day <= this.checkIn.day) {
            this.checkIn = value;
            this.checkIn.month = month;
            this.checkIn.monthId = monthId;
            this.$emit("setCheckInDate", value);
          } else {
            this.checkOut = value;
            this.checkOut.month = month;
            this.checkOut.monthId = monthId;
            this.$emit("setCheckOutDate", value);
          }
        } else if (monthId < this.checkIn.monthId) {
          this.checkIn = value;
          this.checkIn.month = month;
          this.checkIn.monthId = monthId;
          this.$emit("setCheckInDate", value);
        } else {
          this.checkOut = value;
          this.checkOut.month = month;
          this.checkOut.monthId = monthId;
          this.$emit("setCheckOutDate", value);
        }
      } else {
        this.clearCalendar();
        this.$emit("setCheckInDate", null);
        this.$emit("setCheckOutDate", null);
        this.datePick(value, month, monthId);
      }
    },
    clearCalendar() {
        this.checkIn = {};
        this.checkIn.day = null;
        this.checkIn.month = null;
        this.checkIn.monthId = null;
        this.checkOut = {};
        this.checkOut.day = null;
        this.checkOut.month = null;
        this.checkOut.monthId = null;
    },
    setDisplayedCalendar(firstDisplayedMonth, secondDisplayedMonth) {
      this.displayedCalendar = [];
      this.displayedCalendar.push(
        this.calendar[firstDisplayedMonth],
        this.calendar[secondDisplayedMonth]
      );
    },
    prev(monthId) {
      if (monthId !== 0) {
        this.setDisplayedCalendar(monthId - 1, monthId);
        this.nextDisable = false;
        if (monthId === 1) {
          this.prevDisable = true;
        }
      }
    },
    next(monthId) {
      let calendarLength = this.calendar.length;
      if (monthId !== calendarLength - 1) {
        this.setDisplayedCalendar(monthId, monthId + 1);
        this.prevDisable = false;
        if (monthId === calendarLength - 2) {
          this.nextDisable = true;
        }
      }
    },
    setSelectedDaysFlexibility(value) {
      this.selectedDaysFlexibility === value
        ? (this.selectedDaysFlexibility = null)
        : (this.selectedDaysFlexibility = value);
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
      }
      return "";
    },
    btnSpanClass(value, monthId, hover) {
        if((this.checkIn.day === value.day &&
          this.checkIn.monthId === monthId )||
          (this.checkOut.day === value.day &&
            this.checkOut.monthId === monthId)) {
          return 'WhiteColor';
        } else if (!hover) {
          if(value.previous) {
            return 'greyLight3--text';
          } else if ( value.type === 'holiday' || value.end_of_weekend) {
            return 'redOfferTime--text';
          } else {
            return 'greenDark8--text';
          }
        } else {
          return '';
        }

    },
    btnColumnClass(value, monthId) {
      if(!value.other_month) {
        if (this.checkIn.day === value.day && this.checkIn.monthId === monthId) {
          if (this.checkOut.day) {
            return this.$vuetify.rtl ? "firstDay selected ms-1 ps-0 pe-2" : "firstDayLtr selected ms-1 ps-0 pe-2";
          }
        } else if (this.checkOut.day === value.day && this.checkOut.monthId === monthId) {
          return this.$vuetify.rtl ? "lastDay selected ps-1 me-2 pe-0" : "lastDayLtr selected ps-1 me-2 pe-0";
        } else if (monthId === this.checkIn.monthId) {
          if (monthId === this.checkOut.monthId) {
            if (value.day > this.checkIn.day && value.day < this.checkOut.day) {
              return "selected ps-1 pe-2";
            }
          } else if (monthId < this.checkOut.monthId && value.day > this.checkIn.day) {
            return "selected ps-1 pe-2";
          }
        } else if (monthId > this.checkIn.monthId) {
          if (monthId === this.checkOut.monthId) {
            if (value.day < this.checkOut.day) {
              return "selected ps-1 pe-2";
            }
          } else if (monthId < this.checkOut.monthId) {
            return "selected ps-1 pe-2";
          }
        }
        return "ps-1 pe-2";
      } else {
        return "ps-1 pe-2";
      }
    },
    getCalendar() {
      return CalendarService.calendar(3)
        .then((res) => {
          this.calendar = res.data.data.calendars;
          this.calendarDaysName = res.data.calendar_days_name;
          this.dateRanges = res.data.date_ranges;
          this.setDisplayedCalendar(0, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitDate() {
      this.$emit("submitCalendarDate", this.selectedDaysFlexibility);
    },
  },
};
</script>

<style lang="scss">
.calenderClass {
  border-radius: 16px !important;
  transition: all 0.5s;
}

.calendarBtn {
  border-radius: 4px !important;
}

.calendarBtn {
  &.firstDay , &.lastDayLtr {
    &::after {
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
  }

  &.lastDay , &.firstDayLtr {
    &::after {
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
  }

  &.firstDay, &.lastDay {
    &:hover {
      &::after {
        display: none;
      }
    }
  }
}


.selected {
  background: #35913826;
}
</style>
