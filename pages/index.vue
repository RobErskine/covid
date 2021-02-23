<template>
  <div class="p-2 container max-w-screen-2xl m-auto">
    <hero :data="usa.data"/>
    <nav>
      <div>
        <button @click="toggleDeaths()">Toggle Death Info</button>
        <button @click="toggleVaccines()">Toggle Vaccine Info</button>
      </div>
    </nav>
    <ul class="flex flex-wrap justify-between lg:p-2">
      <li v-for="data in states.data" :key="data.Location"
        class="p-2 pt-4 lg:pt-3 lg:pb-2 rounded-2xl md:p-4 br-4 bg-gray-lightest w-full md:w-1/2 lg:w-1/3 xl:w-1/4 transform scale-95 mb-0"
      >
        <h2 class="text-center">{{data.location}}</h2>
        <!-- todo: convert each of these <p>s into a component -->
        <!-- total pop --> 
        <row topic="basic" class="mb-2 border-gray-light border-b-2">
          <item v-if="data.population" label="Population" :value="data.population" />
          <item v-if="data.total_cases" label="Total Cases" :value="data.total_cases"/>
          <item v-if="data.population_infected_pct" label="Cases / Population" :value="data.population_infected_pct" percentage="true"/>
        </row>

        <row topic="Deaths" v-if="(data.deaths_total || data.deaths_per_100k || data.deaths_new_7d) && deaths" class="mb-2 border-gray-light border-b-2">
          <item v-if="data.deaths_total" label="Total Deaths" :value="data.deaths_total" />
          <item v-if="data.deaths_per_100k" label="Deaths/100k" :value="data.deaths_per_100k"/>
          <item v-if="data.deaths_new_7d" label="Deaths Last Week" :value="data.deaths_new_7d"/>
        </row>

        <row topic="Vaccines" v-if="vaccines">
          <item class="pb-4" v-if="data.doses_distributed" label="Doses Distributed" :value="data.doses_distributed"/>
          <item v-if="data.doses_administered" label="Administered" :value="data.doses_administered"/>
          <item v-if="data.doses_storage" label="Storage" :value="data.doses_storage"/>
          <hr>
          <item v-if="data.dose1_population_pct" label="1st Dose %" :value="data.dose1_population_pct" percentage="true"/>
          <item v-if="data.dose2_population_pct" label="2nd Dose %" :value="data.dose2_population_pct" percentage="true"/>
          <item v-if="data.dose2" label="Fully Vaccinated" :value="data.dose2" />
        </row>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Homepage",
  data(){
    return{
      usa: [],
      states: [],
      deaths: true,
      vaccines: true 
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
    }
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
