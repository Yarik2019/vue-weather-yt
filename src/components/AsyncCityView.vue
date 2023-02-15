<template>
    <div>
        <CityViewSkeleton v-if="loading" />
        <div class="flex flex-col flex-1 items-center" v-else>
            <!-- Banner -->
            <div v-if="$route.query.preview" class="text-[#fff] p-4 bg-weather-secondary w-full text-center">
                <p>You are currently previewing this city, click the "+"
                    icon to start tracking this city.</p>
            </div>
            <!-- Weather Overview -->
            <div class="flex flex-col items-center text-[#fff] py-12" v-if="weatherData">
                <h1 class="text-4xl mb-2">{{ $route.params.city }}</h1>
                <p class="text-sm mb-12">
                    {{
                        new Date(weatherData.currentTime).toLocaleDateString(
                            "en-us",
                            {
                                weekday: "short",
                                day: "2-digit",
                                month: "long",
                            }
                        )
                    }}
                    {{
                        new Date(weatherData.currentTime).toLocaleTimeString(
                            "en-us",
                            {
                                timeStyle: "short",
                            }
                        )
                    }}
                </p>
                <p class="text-8xl mb-8">
                    {{ Math.round(weatherData.current.temp) }}&deg;
                </p>
                <div class="text-center">
                    <p>
                        Feels like
                        {{ Math.round(weatherData.current.feels_like) }} &deg;
                    </p>
                    <p class="capitalize">
                        {{ weatherData.current.weather[0].description }}
                    </p>
                    <img class="w-[150px] h-auto"
                        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`" alt="">
                </div>

            </div>

            <hr class="border-[#fff] border-opacity-10 border w-full">
            <!-- Hourly Weather -->
            <div class="max-w-screen-md w-full py-12">
                <div class="mx-8 text-[#fff]">
                    <h2 class="mb-4">Hourly Weather</h2>
                    <div class="flex gap-10 overflow-x-scroll">
                        <div class="flex flex-col gap-4 items-center" v-for="hourData in weatherData?.hourly"
                            :key="hourData.dt">
                            <p class="whitespace-nowrap text-md">
                                {{
                                    new Date(
                                        hourData.currentTime
                                    ).toLocaleTimeString("en-us", {
                                        hour: "numeric",
                                    })
                                }}
                            </p>
                            <img class="w-auto h-[50px] object-cover"
                                :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`" alt="">
                            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Weekly Weather -->
            <div class="max-w-screen-md w-full py-12">
                <div class="mx-8 text-[#fff]">
                    <h2 class="mb-4">7 Day Forecast</h2>
                    <div class="flex items-center" v-for="day in weatherData?.daily" :key="day.dt">
                        <p class="flex-1">
                            {{
                                new Date(day.dt * 1000).toLocaleDateString(
                                    "en-us",
                                    {
                                        weekday: "long",
                                    }
                                )
                            }}
                        </p>
                        <img class="w-auto h-[50px] object-cover"
                            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt="">
                        <div class="flex gap-2 flex-1 justify-end">
                            <p>H: {{ Math.round(day.temp.max) }}</p>
                            <p>L: {{ Math.round(day.temp.min) }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-2 py-12 text-[#fff] cursor-pointer duration-150 hover:text-[red] "
                @click="removeCity">
                <i class="fa-solid fa-trash"></i>
                <p>Remove City</p>
            </div>
        </div>
    </div>
</template>
<script>
import CityViewSkeleton from './CityViewSkeleton.vue';
export default {
    data() {
        return {
            loading: false,
            weatherData: null,
        }
    },
    components: {
        CityViewSkeleton
    },
    methods: {
        getWeahterData() {
            setTimeout(async () => {
                try {
                    this.loading = true;    
                    const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.$route.query.lat}&lon=${this.$route.query.lon}&exclude={part}&appid=49cc8c821cd2aff9af04c9f98c36eb74&units=metric`);
                    const data = await weatherData.json();
                    // this.loading = true;
                    // cal current date & time
                    const localOffset = new Date().getTimezoneOffset() * 60000;
                    const utc = data.current.dt * 1000 + localOffset;

                    data.currentTime =
                        utc + 1000 * data.timezone_offset;
                    // cal hourly weather offset
                    data.hourly.forEach((hour) => {
                        const utc = hour.dt * 1000 + localOffset;
                        hour.currentTime =
                            utc + 1000 * data.timezone_offset;
                    });
                    this.weatherData = data;
                    setTimeout(() => {
                        this.loading = false;
                    }, 1000)
                } catch (err) {
                    console.log(err);
                }
            }, 300)
        },

        removeCity() {
            const cities = JSON.parse(localStorage.getItem("sevedCities"));
            const updatedCities = cities.filter((city) => city.id !== this.$route.query.id);
            // localStorage.clear();   
            localStorage.setItem("sevedCities", JSON.stringify(updatedCities));
            this.$router.push({ name: 'home' });
        }
    },
    mounted() {
        this.getWeahterData();
    },
}
</script>
<style>

</style>
