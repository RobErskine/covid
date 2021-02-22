<template>
  <div>
    <section class="p-4 rounded-2xl md:p-8 br-4 bg-gray-lightest w-full transform mb-0">
      <h1>{{data.location}} COVID-19 Data</h1>
      <h2>How many people in the U.S. have tested positive or been vaccinated against COVID-19?</h2>

      <div>
        <p>Of the <number :val=data.population /> people who live in the United States, <number :val=data.total_cases /> have tested positive for COVID-19, or <number :val=data.population_infected_pct percentage=true /> of the population.</p>
        <p>In the last week, there have been <number :val=data.cases_last_7d /> new cases and <number :val=data.deaths_new_7d /> deaths. In the last day, there have been <number :val=data.cases_last_24h /> new cases and <number :val=data.deaths_new_24h /> new deaths.</p>
        <p>But there is some good news; <number :val="data.doses_distributed" /> vaccines have been distributed, and already <number :val="data.doses_administered" /> of them have been administered, with <number :val="data.doses_storage" /> vaccines still in storage.</p>
        <p>Of those doses administered, <number :val="data.dose1_population_pct" percentage="true"/> received the 1st dose, and <number :val="data.dose2_population_pct" percentage="true"/> received the 2nd dose, meaning <number :val="data.dose2"/> Americans have been vaccinated.</p>
      </div>

      <div>
        <row topic="basic" class="mb-2 border-gray-light border-b-2">
          <item v-if="data.population" label="Population" :value="data.population" />
          <item v-if="data.total_cases" label="Total Cases" :value="data.total_cases"/>
          <item v-if="data.population_infected_pct" label="Cases / Population" :value="data.population_infected_pct" percentage="true"/>
        </row>

        <row topic="last7" class="mb-2 border-gray-light-border-b-2">
          <item v-if="data.cases_last_7d" label="New Cases Last 24 hours" :value="data.cases_last_7d"/>
          <item v-if="data.deaths_new_7d" label="Deaths Last Week" :value="data.deaths_new_7d"/>
          <item v-if="data.deaths_new_24h" label="Deaths Last Day" :value="data.deaths_new_24h"/>
        </row>

        <row topic="Deaths" v-if="(data.deaths_total || data.deaths_per_100k || data.deaths_new_7d)" class="mb-2 border-gray-light border-b-2">
          <item v-if="data.deaths_total" label="Total Deaths" :value="data.deaths_total" />
          <item v-if="data.deaths_per_100k" label="Deaths/100k" :value="data.deaths_per_100k"/>
          <item v-if="data.deaths_new_7d" label="Deaths Last Week" :value="data.deaths_new_7d"/>
        </row>

        <row topic="Vaccines">
          <item class="pb-4" v-if="data.doses_distributed" label="Doses Distributed" :value="data.doses_distributed"/>
          <item v-if="data.doses_administered" label="Administered" :value="data.doses_administered"/>
          <item v-if="data.doses_storage" label="Storage" :value="data.doses_storage"/>
          <hr>
          <item v-if="data.dose1_population_pct" label="1st Dose %" :value="data.dose1_population_pct" percentage="true"/>
          <item v-if="data.dose2_population_pct" label="2nd Dose %" :value="data.dose2_population_pct" percentage="true"/>
          <item v-if="data.dose2" label="Fully Vaccinated" :value="data.dose2" />
        </row>
      </div>
    </section>
    <div>
      <p>Data presented has been collected and distributed through the Centers for Disease Control and Prevention. Each state, district, and territory is listed below.</p>
    </div>
    <p class="text-sm p-2 text-center italic text-gray-DEFAULT">{{data.disclaimer}} EST.</p>
  </div>
</template>

<script>
export default {
  name: 'hero',
  props: [
    'data'
  ]
}
</script>