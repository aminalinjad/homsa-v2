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
      if (monthId !== this.calendar.length - 1) {
        this.setDisplayedCalendar(monthId, monthId + 1);
        this.prevDisable = false;
        if (monthId === this.calendar.length - 2) {
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
      if(!value.other_month) {
        if (this.checkIn.day === value.day && this.checkIn.monthId === monthId) {
          return this.$vuetify.rtl ? "firstDay selected" : "lastDay selected";
        } else if (this.checkOut.day === value.day && this.checkOut.monthId === monthId) {
          return this.$vuetify.rtl ? "lastDay selected" : "firstDay selected";
        }
        return "";
      } else {
        return "";
      }
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
        });
    },
    submitDate() {
      this.$emit("submitCalendarDate", this.selectedDaysFlexibility);
    },
  },
};
