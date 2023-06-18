<template>
    <div>
        <v-row>
            <v-col sm="3"></v-col>
            <v-col sm="6" class="d-flex justify-center pa-2 pb-0">
                <v-btn
                    size="small"
                    class="ma-2"
                    color="purple"
                    icon="mdi-play"
                    @click="startTime" 
                ></v-btn>
                <v-btn
                    size="small"  
                    class="ma-2"
                    color="indigo"
                    icon="mdi-pause"
                    @click="pauseTime"
                ></v-btn>
            </v-col>
            <v-col sm="2" class="d-flex align-center justify-end pa-2 pb-0">
                    <v-btn-toggle
                        v-model="selectedSpeed"
                        variant="outlined"
                        color="primary"
                        rounded="xl"
                        mandatory
                        @click="refreshInterval()"
                    >
                        <v-btn  
                            size="small" 
                            v-for="s in speed" 
                            :value="s.value"
                        >
                            {{  s.text }}
                        </v-btn>
                    </v-btn-toggle>
            </v-col>
        </v-row>
        <v-row class="pb-2">
            <v-col sm="1" class="pa-1 pt-0 text-right">
                <p>{{ timeElapsed }}</p>
            </v-col>
            <v-col sm="10" class="pb-1 pt-0">
                <v-slider
                    v-model="selectedTimeID"
                    class="align-center"
                    :max="maxTimeID"
                    :min="minTimeID"
                    hide-details
                ></v-slider>
            </v-col>
            <v-col sm="1" class="pb-1 pt-0">
                <p>{{ timeLeft }}</p>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default {
        name: "SliderTime",
        data: function(){
            return {
                minTimeID:1,
                maxTimeID:1440,
                selectedTimeID: 1,
                interval: 0,
                intervalPlay: false,
                selectedSpeed: 1000,
                speed:[
                    {value: 1000, text: 'x1'},
                    {value: 500, text: 'x2'},
                    {value: 100, text: 'x10'}
                ],
            }
        },     
        mounted(){
            
            this.refreshInterval();
        },
        methods: {
            incrementTime(){
                if (this.intervalPlay){
                    if (this.selectedTimeID < this.maxTimeID)
                    this.selectedTimeID ++;
                    else 
                    this.selectedTimeID = this.minTimeID;
                }
            },
            refreshInterval(){
                clearInterval(this.interval);
                this.interval = setInterval(this.incrementTime, this.selectedSpeed);
            },
            startTime(){
                this.intervalPlay = true;
            },
            pauseTime(){
                this.intervalPlay = false;
            },
        },
        computed: {
            timeElapsed(){
                var hour = (this.selectedTimeID/60 < 10 ? '0' : '') + Math.floor(this.selectedTimeID/60)
                var minutes = (this.selectedTimeID%60 < 10 ? '0' : '') + Math.floor(this.selectedTimeID%60)
                return hour + ':' + minutes
            },
            timeLeft(){
                var time = 1440 - this.selectedTimeID
                var hour = (time/60 < 10 ? '0' : '') + Math.floor(time/60)
                var minutes = (time%60 < 10 ? '0' : '') + Math.floor(time%60)
                return '-' + hour + ':' + minutes
            }
        },
        watch:{
        }
    }
</script>
