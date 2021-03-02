<template>
  <div class="p-2 m-auto">
    <hero class="container max-w-screen-2xl mx-auto" :data="usa.data" shortname="the U.S." longname="the United States">
      <p class="text-gray-DEFAULT text-sm mb-0">This website is for informational purposes only. It relies on external data sources from the Centers for Disease control and does not represent medical advice. Data and information relevant to each state and territory is included below.</p>
    </hero>
    <nav class="flex flex-wrap items-center justify-content px-2">
      <div class="flex justify-between w-full mt-2 lg:w-1/2">
        <div class="flex items-center flex-wrap justify-between md:justify-start">
          <label class="block md:inline-block w-full md:w-auto md:mr-2" for="sortby">Sort</label>
          <select id="sortby" value="sortby" @change="orderBy($event.target.value, order)" v-model="sortby" class="border-2 border-gray-light rounded-xl p-2 pr-4outline-none ring-0 lg:mr-2">
            <option value="location">State/Territory</option>
            <option value="population">Population</option>
            <option value="total_cases">Total Cases</option>
            <option value="population_infected_pct">Cases/Population</option>
            <option value="deaths_total">Deaths</option>
            <option value="deaths_per_100k">Deaths per 100k</option>
            <option value="deaths_new_7d">Deaths in the last week</option>
            <option value="doses_distributed">Doses distributed</option>
            <option value="doses_administered">Doses administered</option>
            <option value="doses_storage">Doses in storage</option>
            <option value="dose1_population_pct">1st Dose Administered%</option>
            <option value="dose2_population_pct">2nd Dose Administered%</option>
            <option value="dose2">Population Vaccinated</option>
          </select>
          <!-- todo: come back to add in sort asc/desc -->
          <toggle @click="orderBy(sortby, order)" v-on:toggle="toggleOrder()" :visible="order" type="sort">Order</toggle>
        </div>
      </div>
      <div class="flex justify-between w-full mt-2 lg:w-1/2 lg:justify-end">
        <toggle v-on:toggle="toggleDeaths()" :visible="deaths" type="toggle">Death Info</toggle>
        <toggle v-on:toggle="toggleVaccines()" :visible="vaccines" class="lg:ml-2" type="toggle">Vaccine Info</toggle>
      </div>
    </nav>
    <ul class="grid md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 lg:p-2">
      <li v-for="data in states.data" :key="data.location"
        class="p-2 pt-4 lg:pt-3 lg:pb-2 rounded-2xl md:p-4 br-4 bg-gray-lightest w-full mb-0"
      >
        <h2 class="text-center"><nuxt-link :to="`/` + (data.location).toLowerCase().replace(/ /g,'_')"><hidden>Learn more about COVID-19 stats for </hidden>{{data.location}}</nuxt-link></h2>
        <!-- todo: convert each of these <p>s into a component -->
        <!-- total pop --> 
        <row topic="basic" class="mb-2 border-gray-light border-b-2">
          <item v-if="data.population" label="Population" sortKey="population" :value="data.population" />
          <item v-if="data.total_cases" label="Total Cases" sortKey="total_cases" :value="data.total_cases"/>
          <item v-if="data.population_infected_pct" label="Cases / Population" sortKey="population_infected_pct" :value="data.population_infected_pct" percentage="true"/>
        </row>

        <row topic="Deaths" v-if="(data.deaths_total || data.deaths_per_100k || data.deaths_new_7d) && deaths" class="mb-2 border-gray-light border-b-2">
          <item v-if="data.deaths_total" label="Deaths" sortKey="deaths_total" :value="data.deaths_total" />
          <item v-if="data.deaths_per_100k" label="Deaths per 100k" sortKey="deaths_per_100k" :value="data.deaths_per_100k"/>
          <item v-if="data.deaths_new_7d" label="Deaths Last Week" sortKey="deaths_new_7d" :value="data.deaths_new_7d"/>
        </row>

        <row topic="Vaccines" v-if="vaccines">
          <item class="pb-4" v-if="data.doses_distributed" label="Doses Distributed" sortKey="doses_distributed" :value="data.doses_distributed"/>
          <item v-if="data.doses_administered" label="Administered" sortKey="doses_administered" :value="data.doses_administered"/>
          <item v-if="data.doses_storage" label="Stored" sortKey="doses_storage" :value="data.doses_storage"/>
          <hr>
          <item v-if="data.dose1_population_pct" label="1st Dose%" sortKey="dose1_population_pct" :value="data.dose1_population_pct" percentage="true"/>
          <item v-if="data.dose2_population_pct" label="2nd Dose%" sortKey="dose2_population_pct" :value="data.dose2_population_pct" percentage="true"/>
          <item v-if="data.dose2" label="Fully Vaccinated" sortKey="dose2" :value="data.dose2" />
        </row>
      </li>
    </ul>
  </div>
</template>

<script>
import utilities from '~/assets/js/utilities'
var arraySort = require('array-sort')

export default {
  name: "Homepage",
  data(){
    return{
      usa: [],
      states: [],
      deaths: true,
      vaccines: true,
      sortby: 'location',
      order: false // false = asc, true = desc
    }
  },
  async fetch(){
    this.states = await fetch('https://elastic-jennings-901335.netlify.app/.netlify/functions/states',{mode:'no-cors'}).then(res=>res.json())
    this.usa = await fetch('https://elastic-jennings-901335.netlify.app/.netlify/functions/usa',{mode:'no-cors'}).then(res=>res.json())
  },
  methods:{
    toggleDeaths(){
      if(this.deaths == true){
        this.deaths = false
      } else {
        this.deaths = true
      }
    },
    toggleVaccines(){
      if(this.vaccines == true){
        this.vaccines = false
      } else {
        this.vaccines = true
      }
    },
    toggleOrder(){
      if(this.order == true){
        this.order = false
      } else {
        this.order = true
      }

      this.orderBy(this.sortby, this.order)
    },
    stripTags(code){
      return code.replace(/<\/?[^>]+>/ig, "")
    },
    trim(string,length,ellipsis){
      if (string.length <= length) {
        return string
      }

      var string = string.slice(0,length)
      if(ellipsis){
        string = string + '...'
      }

      return string
    },
    orderBy(key){
      this.states.data = arraySort(this.states.data, key, {reverse: this.order});
      this.$forceUpdate();
    }
  },
  mounted(){
    //todo: hook up to vue cookies to remember what a user selected
    this.orderBy('location', this.order);
  },
  head(){
    let usa = this.usa.data;
    let uri = 'united_states',
        title = usa.location + ' COVID-19 Information | COVID Cases by the Numbers',
        description = usa.location + ' COVID-19 Stats: Total Population: ' + utilities.numberWithCommas(usa.population) + ', Total Deaths: ' + utilities.numberWithCommas(usa.deaths_total) + ', and Total Vaccinations: ' + utilities.numberWithCommas(usa.dose2),
        image = 'https://covidcasesbythenumbers.com/img/' + uri + '.png';
    return{
      title: title,
      meta: [
        {hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image'},
        {hid: 'description', name: 'description', content: description },
        {hid: 'og:title', name: 'og:title', content: title},
        {hid: 'twitter:title', name: 'twitter:title', content: title},
        {hid: 'og:description', name: 'og:description', content: description},
        {hid: 'og:image', name: 'og:image', content: image},
        {hid: 'twitter:image', name: 'og:image', content: image }
      ]
    }
  }
}
</script>
