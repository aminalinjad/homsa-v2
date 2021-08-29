<template>
  <v-footer class="descriptionSec" color="background">
    <v-container :fluid="$vuetify.breakpoint.md">
      <v-expansion-panels flat class=" mb-4 rounded-lg">
        <v-expansion-panel
          class="secondary--text"
          :class="
            $vuetify.rtl ? 'descriptionSecIconRtl' : 'descriptionSecIconLtr'
          "
        >
          <v-expansion-panel-header>
            <span class="me-2 font-regular-14">
              {{ destinationTitle }}
            </span>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="mt-4 font-regular-12">
            {{ destinationDescription }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      destinationTitle: "اقامتگاه های رشت",
      destinationDescription:
        "شهرستان رَشت از شهرستان‌های ساحلی استان گیلان در ایران به مرکزیت شهر رشت است. این شهرستان از شمال به دریای کاسپین[۱] و شهرستان خمام، از شمال غرب به شهرستان بندرانزلی، از غرب به شهرستانهای صومعه‌سرا و شفت، از جنوب به شهرستان رودبار و از شرق به شهرستان‌های آستانه‌اشرفیه، لاهیجان و سیاهکل محدود می‌شود. جمعیت این شهرستان ۸۶۳٬۵۸۵ نفر (برآورد ۱۳۹۵) است جغرافیای طبیعی ساحل رشت شهرستان رشت ۱۸ کیلومتر نوار ساحلی در دریای خزر دارد. سواحل رشت دارای ۱۴ طرح سالم‌سازی شنا می‌باشد. ودخانه‌ها و تالاب‌ها رودخانه‌های سفیدرود، گوهررود، زرجوب و پیربازار رود از مهم‌ترین رودخانه‌های شهرستان رشت هستند. تالاب عینک بزرگترین تالاب شهری ایران در این شهرستان، در منطقه ۴ شهر رشت واقع است. ساحل شرقی تالاب انزلی محدود به دهستان پیربازار شهرستان رشت است.",
    };
  },
};
</script>

<style lang="scss">
.descriptionSec {
  .v-expansion-panels {
    .v-expansion-panel-header {
    justify-content: center !important;
    span {
        flex: none !important;
    }
    }
    .descriptionSecIconRtl {
      .v-expansion-panel-header {
        &__icon {
          margin-right: unset !important;
        }
      }
    }

    .descriptionSecIconLtr {
      .v-expansion-panel-header {
        &__icon {
          margin-left: unset !important;
        }
      }
    }
  }
}
</style>