<template>
    <div>
        <div v-if="loading">
            <CityCardSkeleton />
        </div>

        <div class="flex py-6 px-3 justify-center bg-weather-secondary rounded-md shadow-md" v-else-if="errorMessage">
           <p> Sorry, something went wrong, please try again.</p>
        </div>

        <div v-else>
            <div v-for="city in requests" :key="city.id">
                <CityCard :city="city" @click="goToCityView(city)" />
            </div>
            <div v-if="savedCities.length === 0">
                No locations added. To start tracking a location, search in
                the field above.
            </div>
        </div>
    </div>

</template>
<script>
import CityCard from './CityCard.vue'
import CityCardSkeleton from '@/components/CityCardSkeleton.vue';
export default {
    data() {
        return {
            savedCities: [],
            requests: [],
            loading: false,
            errorMessage: null
        }
    },
    components: {
        CityCard,
        CityCardSkeleton
    },
    methods: {
        getCities() {
            setTimeout(async () => {
                if (localStorage.getItem("sevedCities")) {
                    this.savedCities = JSON.parse(
                        localStorage.getItem("sevedCities")
                    )
                }
                this.savedCities.forEach((city) => {
                    setTimeout(async () => {
                        try {
                            // this.loading = true;
                            const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`);
                            const data = await result.json();
                            
                            this.loading = true;
                            console.log(data)
                            this.requests.push(
                                {
                                    id: city.id,
                                    city: city.city,
                                    state: city.state,
                                    coords: {
                                        lat: city.coords.lat,
                                        lon: city.coords.lon
                                    },
                                    main: data.main
                                }
                            );
                            setTimeout(()=>{
                                this.loading = false;
                            },1000)
                        } catch {
                            this.errorMessage = true;
                        }
                    }, 300);
                });
            }, 300)
        },  
        goToCityView(city) {
            this.$router.push({
                name: "CityView",
                params: { state: city.state, city: city.city },
                query: { id: city.id, lat: city.coords.lat, lon: city.coords.lon },
            })
        }
    },
    mounted() {
        this.getCities();
    }
}
</script>
<style>

</style>
