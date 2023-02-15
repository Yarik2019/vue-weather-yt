<template>
    <header class="sticky z-10 top-0 bg-weather-primary shadow-lg">
        <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
            <router-link :to="{ name: 'home' }">
                <div class="flex items-center text-white gap-3">
                    <i class="fa-solid fa-sun text-2xl text-[#fff]"></i>
                    <p class="text-2xl text-[#fff]">The Local Weather</p>
                </div>
            </router-link>
            <div class="flex gap-3 flex-1  justify-end">
                <i  @click="toggleModal" 
                    class="fa-solid fa-circle-info text-2xl text-[#fff] hover:text-weather-secondary duration-150 cursor-pointer"></i>
                <i @click="addCity" 
                    class="fa-soild fa-plus text-2xl text-[#fff] hover:text-weather-secondary duration-150 cursor-pointer"></i>
            </div>
            <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
                <div class="text-black text-left    ">
                    <h1 class="text-2xl mb-1">About:</h1>
                    <p class="mb-4">
                        The Local Weather allows you to track the current and
                        future weather of cities of your choosing.
                    </p>
                    <h2 class="text-2xl">How it works:</h2>
                    <ol class="list-decimal list-inside mb-4">
                        <li>
                            Search for your city by entering the name into the
                            search bar.
                        </li>
                        <li>
                            Select a city within the results, this will take
                            you to the current weather for your selection.
                        </li>
                        <li>
                            Track the city by clicking on the "+" icon in the
                            top right. This will save the city to view at a
                            later time on the home page.
                        </li>
                    </ol>

                    <h2 class="text-2xl">Removing a city</h2>
                    <p>
                        If you no longer wish to track a city, simply select
                        the city within the home page. At the bottom of the
                        page, there will be am option to delete the city.
                    </p>
                </div>
            </BaseModal>
        </nav>
    </header>
</template>
<script>
import BaseModal from '@/components/BaseModal';
import { uid } from 'uid';
export default {
    data() {
        return {
            modalActive: false,
            savedCities: [],
            // addButton: false
        }
    },
    components: {
        BaseModal
    },
    methods: {
        addCity() {
            if (localStorage.getItem("sevedCities")) {
                this.savedCities = JSON.parse(
                    localStorage.getItem("sevedCities")
                )
            }

            const locationObj = {
                id: uid(),
                state: this.$route.params.state,
                city: this.$route.params.city,
                coords: {
                    lat: this.$route.query.lat,
                    lon: this.$route.query.lon
                },

            };

            this.savedCities.push(locationObj);
            localStorage.setItem("sevedCities", JSON.stringify(this.savedCities));

            let query = Object.assign({}, this.$route.query);
            delete query.preview;
            query.id = locationObj.id;
            this.$router.replace({ query });

        },
        toggleModal() {
            this.modalActive = !this.modalActive
        }
    }
}
</script>
