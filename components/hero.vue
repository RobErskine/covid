<template>
  <div>
    <section class="w-full transform mb-0 mt-2 flex flex-wrap">
      <div class="p-2 lg:p-4 lg:pt-6 w-full lg:w-2/3 lg:pr-12">
        <h1 class="text-2xl lg:text-5xl leading-none">How many people in {{longname}} have tested positive or been vaccinated against COVID-19?</h1>
        <p class="text-lg lg:text-2xl leading-snug">Of the <strong><number :val=data.population /></strong> people who live in {{longname}}, <strong><number :val=data.total_cases /> have tested positive</strong> for COVID-19, or <number :val=data.population_infected_pct percentage=true /> of the population.</p>

        <p class="text-lg lg:text-2xl leading-snug">In the last week, there have been <number :val=data.cases_last_7d /> new cases and <number :val=data.deaths_new_7d /> deaths. <span v-if=data.cases_last_24h>In the last day, there have been <strong><number :val=data.cases_last_24h /> new cases </strong> and <strong><number :val=data.deaths_new_24h /> new deaths</strong>, <span v-if="this.trending">which thankfully, is <strong>trending downwards</strong> based on the last 7 days of data</span><span v-else>which unfortunately, is <strong>trending upwards</strong> based on the last 7 days of data</span>.</span></p>

        <p class="text-lg lg:text-2xl leading-snug">But there is some good news; <strong><number :val="data.doses_distributed" /> vaccines have been distributed</strong>, and already <strong><number :val="data.doses_administered" /> of them have been administered</strong>, with <number :val="data.doses_storage" /> vaccines still in storage.</p>

        <p class="text-lg lg:text-2xl leading-snug">Of those doses administered, <number :val="data.dose1_population_pct" percentage="true"/> received the 1st dose, and <number :val="data.dose2_population_pct" percentage="true"/> received the 2nd dose, which means <strong><number :val="data.dose2"/> people in {{longname}} have been vaccinated.</strong></p>
      
        <slot></slot>
      </div>

      <div class="p-4 rounded-2xl md:p-8 br-4 bg-gray-lightest scale-95 w-full lg:w-1/3 flex flex-wrap">
        <h2 class="text-xl lg:text-3xl w-full">{{data.location}} <br class="hidden lg:block" />COVID-19 Data</h2>
        <row topic="basic" class="mb-4 pb-4 md:mb-0 border-gray-light border-b-2 w-full self-center">
          <item v-if="data.population" sortKey="" label="Population" :value="data.population" />
          <item v-if="data.total_cases" sortKey="" label="Total Cases" :value="data.total_cases"/>
          <item v-if="data.population_infected_pct" sortKey="" label="Cases / Population" :value="data.population_infected_pct" percentage="true"/>
        </row>

        <row topic="last7" class="border-gray-light-border-b-2 w-full self-center">
          <item v-if="data.cases_last_7d" sortKey="" label="New Cases Last 24 hours" :value="data.cases_last_7d"/>
          <item v-if="data.deaths_new_7d" sortKey="" label="Deaths Last Week" :value="data.deaths_new_7d"/>
          <item v-if="data.deaths_new_24h" sortKey="" label="Deaths Last Day" :value="data.deaths_new_24h"/>
        </row>

        <row topic="Deaths" v-if="(data.deaths_total || data.deaths_per_100k || data.deaths_new_7d)" class="mb-4 pb-4 md:mb-0 border-gray-light border-b-2 w-full self-center">
          <item v-if="data.deaths_total" sortKey="" label="Total Deaths" :value="data.deaths_total" />
          <item v-if="data.deaths_per_100k" sortKey="" label="Deaths/100k" :value="data.deaths_per_100k"/>
          <item v-if="data.incidence" sortKey="" label="Incidence" :value="data.incidence"/>
        </row>

        <row topic="Vaccines" class="w-full self-center">
          <item class="pb-4" v-if="data.doses_distributed" sortKey="" label="Doses Distributed" :value="data.doses_distributed"/>
          <item v-if="data.doses_administered" sortKey="" label="Administered" :value="data.doses_administered"/>
          <item v-if="data.doses_storage" sortKey="" label="Stored" :value="data.doses_storage"/>
          <hr>
          <item v-if="data.dose1_population_pct" sortKey="" label="1st Dose%" :value="data.dose1_population_pct" percentage="true"/>
          <item v-if="data.dose2_population_pct" sortKey="" label="2nd Dose%" :value="data.dose2_population_pct" percentage="true"/>
          <item v-if="data.dose2" label="Fully Vaccinated" sortKey="" :value="data.dose2" />
        </row>
      </div>
    </section>

    <p class="text-sm p-2 text-center italic text-gray-DEFAULT mt-4">{{data.disclaimer}} EST.</p>
  </div>
</template>

<script>
export default {
  name: 'hero',
  props: [
    'data',
    'shortname',
    'longname'
  ],
  mounted() {
    this.trending = this.getTrending();
  },
  methods: {
    getTrending() {
      let lastDay = this.data.deaths_new_24h;
      if((this.data.deaths_new_7d / 7) > lastDay) {
        return true;
      }
      else{
        return false;
      }
    }
  },
  data(){
    return{
      trending: this.trending
    }
  }
}

</script>