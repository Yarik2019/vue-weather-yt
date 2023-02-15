<template>
  <main class="container text-[#fff]">

    <div class="pt-4 mb-8 relative">
      <input type="text" 
             placeholder="Search for a city or state" 
             v-model="querySerach"
             @keypress="getSearchResults(querySerach)" 
             @input="getSearchResults(querySerach)"
             class="py-2 px-1 w-full bg-[transparent] border-b  focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">
      <ul class="absolute bg-weather-secondary text-[#fff] w-full shadow-md py-2 px-1 top-[66px]"
          v-if="mapboxSearchReuslts">

        <p v-if="searchError">Sorry, something went wrong, please try again.</p>

        <p class="py-2" v-else-if="!searchError && mapboxSearchReuslts.length === 0">
          No results match your query, try a different term.
        </p>

        <template v-else>
          <li v-for="searchResult in mapboxSearchReuslts" :key="searchResult.id" @click="previewCity(searchResult)"
            class="py-2 cursor-pointer">
            {{ searchResult.place_name }}
          </li>
        </template>

      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <CityList />
    </div>
  </main>
</template>

<script>
import CityList from '@/components/CityList.vue';
export default {
  name: 'HomeView',
  components: {
    CityList,
  },
  data() {
    return {
      querySerach: '',
      mapboxSearchReuslts: null,
      queryTimeout: null,
      searchError: null,
    }
  },
  methods: {
    getSearchResults(city) {
      const mapboxAPIKey =
        "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";
      this.queryTimeout = setTimeout(async () => {
        if (this.querySerach !== '') {
          try {
            const result = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${mapboxAPIKey}&types=place`);
            const data = await result.json();
            this.mapboxSearchReuslts = data.features;
            return;
          } catch {
            this.searchError = true;
          }
          this.mapboxSearchReuslts = null
        }
      }, 300)
    },
    previewCity(searchResult) {
      const [city, state] = searchResult.place_name.split(",");
      this.$router.push({
        name: 'CityView',
        params: { state: state.replaceAll(" ", " "), city: city },
        query: {
          lat: searchResult.geometry.coordinates[0],
          lon: searchResult.geometry.coordinates[1],
          preview: true,

        },
      })
    }
  }
}
</script>
