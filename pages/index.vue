<template>
  <div class="p-2 container max-w-screen-2xl m-auto">
    <hero :data="usa.data" shortname="the U.S." longname="the United States"/>
    <nav class="flex flex-wrap items-center justify-content">
      <div class="flex justify-between w-full mt-2 lg:w-1/2">
        <div class="flex items-center ">
          <label for="sortby">Sort By</label>
          <select id="sortby" value="sortby" @change="orderBy($event.target.value, order)" v-model="sortby" class="border-2 border-gray-light rounded-xl p-2 pr-4 ml-2 outline-none ring-0">
            <option value="location">State/Territory</option>
            <option value="population">Population</option>
            <option value="total_cases">Total Cases</option>
            <option value="population_infected_pct">Cases / Population</option>
            <option value="deaths_total">Deaths</option>
            <option value="deaths_per_100k">Deaths per 100k</option>
            <option value="deaths_new_7d">Deaths in the last week</option>
            <option value="doses_distributed">Doses distributed</option>
            <option value="doses_administered">Doses administered</option>
            <option value="doses_storage">Doses in storage</option>
            <option value="dose1_population_pct">1st Dose Administered %</option>
            <option value="dose2_population_pct">2nd Dose Administered %</option>
            <option value="dose2">Population Vaccinated</option>
          </select>
          <!-- todo: come back to add in sort asc/desc -->
          <toggle v-on:toggle="toggleOrder()" :visible="order">Sort</toggle>
        </div>
      </div>
      <div class="flex justify-between w-full mt-2 lg:w-1/2 lg:justify-end">
        <toggle v-on:toggle="toggleDeaths()" :visible="deaths">Death Info</toggle>
        <toggle v-on:toggle="toggleVaccines()" :visible="vaccines" class="lg:ml-2">Vaccine Info</toggle>
      </div>
    </nav>
    <ul class="flex flex-wrap justify-between lg:p-2">
      <li v-for="data in states.data" :key="data.location"
        class="p-2 pt-4 lg:pt-3 lg:pb-2 rounded-2xl md:p-4 br-4 bg-gray-lightest w-full md:w-1/2 lg:w-1/3 xl:w-1/4 transform scale-95 mb-0"
      >
        <h2 class="text-center"><nuxt-link :to="`/` + (data.location).toLowerCase().replace(' ','_')"><hidden>Learn more about COVID-19 stats for </hidden>{{data.location}}</nuxt-link></h2>
        <!-- todo: convert each of these <p>s into a component -->
        <!-- total pop --> 
        <row topic="basic" class="mb-2 border-gray-light border-b-2">
          <item v-if="data.population" label="Population" :value="data.population" />
          <item v-if="data.total_cases" label="Total Cases" :value="data.total_cases"/>
          <item v-if="data.population_infected_pct" label="Cases / Population" :value="data.population_infected_pct" percentage="true"/>
        </row>

        <row topic="Deaths" v-if="(data.deaths_total || data.deaths_per_100k || data.deaths_new_7d) && deaths" class="mb-2 border-gray-light border-b-2">
          <item v-if="data.deaths_total" label="Deaths" :value="data.deaths_total" />
          <item v-if="data.deaths_per_100k" label="Deaths per 100k" :value="data.deaths_per_100k"/>
          <item v-if="data.deaths_new_7d" label="Deaths Last Week" :value="data.deaths_new_7d"/>
        </row>

        <row topic="Vaccines" v-if="vaccines">
          <item class="pb-4" v-if="data.doses_distributed" label="Doses Distributed" :value="data.doses_distributed"/>
          <item v-if="data.doses_administered" label="Administered" :value="data.doses_administered"/>
          <item v-if="data.doses_storage" label="Stored" :value="data.doses_storage"/>
          <hr>
          <item v-if="data.dose1_population_pct" label="1st Dose%" :value="data.dose1_population_pct" percentage="true"/>
          <item v-if="data.dose2_population_pct" label="2nd Dose%" :value="data.dose2_population_pct" percentage="true"/>
          <item v-if="data.dose2" label="Fully Vaccinated" :value="data.dose2" />
        </row>
      </li>
    </ul>
  </div>
</template>

<script>
var arraySort = require('array-sort');

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
    // pretend data is from an external source
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
    orderBy(key,order){
      
      // todo: get array sort to work?
      this.states.data = arraySort(this.states.data, key, {reverse: this.order});

      this.$forceUpdate();
    }
  },
  mounted(){
    this.orderBy('location', this.order);
  },
  head(){
    let description = this.stripTags('Here is a demo title') // strip tags from rich text field and use for meta descriptions and truncate for the googs
    description = this.trim(description, 152, true);
    return{
      title: 'COVID Dashboard | Rob Erskine',
      meta: [
        {hid: 'og:title', name: 'og:title', content: this.title + ' | Rob Erskine'},
        {hid: 'twitter:title', name :'twitter:title', content: this.title},
        {hid: 'description', name :'description', content: description},
        {hid: 'og:description', name :'og:description', content: description},
        {hid: 'og:image', name :'og:image', content: this.image},
        {hid: 'twitter:image', name :'twitter:image', content: this.image}
      ]
    }
  }
}
</script>
