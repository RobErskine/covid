<template>
  <div class="p-2">
    <ul class="flex flex-wrap justify-between">
      <li v-for="data in states.data" :key="data.Location"
        class="p-2 md:p-8 br-4 bg-gray-lightest max-w-md w-full"
      >
        <h2>{{data.location}}</h2>
        <!-- todo: convert each of these <p>s into a component -->
        <!-- total pop --> 
        <row topic="basic" class="mb-2 border-gray-light border-b-2">
          <item v-if="data.population" label="Population" :value="data.population" />
          <item v-if="data.total_cases" label="Total Cases" :value="data.total_cases"/>
          <item v-if="data.population_infected_pct" label="Population Infected" :value="data.population_infected_pct" percentage="true"/>
        </row>

        <row topic="Deaths" v-if="data.deaths_total || data.deaths_per_100k || data.deaths_new_7d" class="mb-2 border-gray-light border-b-2">
          <item v-if="data.deaths_total" label="Total Deaths" :value="data.deaths_total" />
          <item v-if="data.deaths_per_100k" label="Deaths/100k" :value="data.deaths_per_100k"/>
          <item v-if="data.deaths_new_7d" label="Deaths last 7 days" :value="data.deaths_new_7d"/>
        </row>

        <row topic="Vaccines">
          <item v-if="data.doses_distributed" label="Doses Distributed:" :value="data.doses_distributed"/>
          <item v-if="data.doses_administered" label="Administered:" :value="data.doses_administered"/>
          <item v-if="data.doses_administered" label="In Storage:" :value="data.doses_administered"/>
          <hr>
          <item v-if="data.doses_administered" label="Dos:" :value="data.doses_administered"/>
          <item v-if="data.doses_administered" label="In Storage:" :value="data.doses_administered"/>
          <item v-if="data.doses_administered" label="In Storage:" :value="data.doses_administered"/>
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
      states: []
    }
  },
  async fetch(){
    // pretend data is from an external source
    this.states = await fetch('https://elastic-jennings-901335.netlify.app/.netlify/functions/data',{mode:'no-cors'}).then(res=>res.json())
  },
  methods:{
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
