<template>
    <v-row>
        <v-col>
            <v-row>
                <v-col>
                    <h5 class="font-regular-14 secondary--text">جستجوهای مرتبط:</h5>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-chip 
                    v-for="(item, index) in relatedSearch"
                    :key="index"
                    label
                    color="whiteColor"
                    class="mx-2 mb-3 px- font-regular-12 secondary--text cursorPointer"
                    >
                    {{item}}
                        
                    </v-chip>
                </v-col>
            </v-row>
            
        </v-col>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            relatedSearch: [
                'اجاره ویلا ارزان در رشت',
                'اجاره ویلا ارزان در رشت',
                'اجاره ویلا ارزان در رشت',
                'اجاره',
                'اجاره ویلا ارزان در رشت',
                'رشت',
                'اجاره ویلا ارزان در رشت',
                'اجاره ویلا ارزان در رشت',
                'اجاره ویلا',
                'اجاره ویلا ارزان در رشت',
                'اجاره ویلا ارزان در رشت',
                'اجاره ویلا ارزان در رشت',
                'ویلا ارزان در رشت',
                'اجاره ویلا ارزان در رشت',
            ]
        }
    }
}
</script>