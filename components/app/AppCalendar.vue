<template>
    <v-card 
    width="864"
    min-height="370"
    >
    <v-row>
        <v-col>
            <v-row>
                <v-col>
                    header

                </v-col>
                
            </v-row>
            <v-row>
                <v-col>
                    <v-row >
                        <v-col>
                            week head
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            week
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
        <v-col>
            h
        </v-col>

    </v-row>
    <v-row>
        <v-col>
            v

        </v-col>

    </v-row>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            calender:[
                {
                    month: 'فروردین',
                    year: '۱۴۰۰',
                    weekHead: [
                        'ش',
                        'ی',
                        'د',
                        'س',
                        'چ',
                        'پ',
                        'ج',
                    ],
                    weeks:[
                        [
                            '۱',
                            '۲',
                            '۳',
                            '۴',
                            '۵',
                            '۶',
                            '۷',
                        ],
                        [
                            '۸',
                            '۹',
                            '۱۰',
                            '۱۱',
                            '۱۲',
                            '۱۳',
                            '۱۴',
                        ],
                        [
                            '۱۵',
                            '۱۶',
                            '۱۷',
                            '۱۸',
                            '۱۹',
                            '۲۰',
                            '۲۱',
                        ],
                        [
                            '۲۲',
                            '۲۳',
                            '۲۴',
                            '۲۵',
                            '۲۶',
                            '۲۷',
                            '۲۸',
                        ],
                        [
                            '۲۹',
                            '۳۰',
                            '۳۱',
                            '',
                            '',
                            '',
                            '',
                        ]
                    ]
                }
            ]
        }
    }
    
}
</script>

<style lang="scss">

</style>