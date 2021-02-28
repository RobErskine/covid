<template>
  <div class="print flex flex-wrap">
    <Header />
    <div class="print-content w-full flex flex-wrap justify-content p-24 px-6 align-center">
      <h1 class="w-full text-center text-9xl text-primary-DEFAULT">{{state.location}}</h1>
      <row topic="basic" class="mb-2 border-gray-light border-b-2 w-full text-2xl">
        <item v-if="state.population" label="Population" sortKey="population" :value="state.population" />
        <item v-if="state.deaths_total" label="Total Deaths" sortKey="deaths_total" :value="state.deaths_total"/>
        <item v-if="state.dose2" label="People Vaccinated" sortKey="dose2" :value="state.dose2" percentage=""/>
      </row>
    </div>
    <Footer :updated="state.update" />
  </div>
</template>

<style lang="scss">
  .print-content h1{
    font-size:6rem;
    font-weight:700;
  }
  .print-content div.row{
    span{
      font-size:6rem;
    }
    span.leading-none{
      font-size:2rem;
      margin-bottom:-1rem;
    }
    span span{
      font-size:4rem;
    }
  }
  .print{
    height:630px;
    width:1200px;
  }
</style>

<script>
export default {
  name: 'detailPage',
  layout: 'social-image',
  data: [
    'state'
  ],
  mounted(){
    console.log(this.state);
  },
  async asyncData ({ params, error, payload }) {
    if (payload) return { state: payload }
    else return { state: // else load in test data
      {
        "id": 2,
        "name": "AK",
        "location": "Alaska",
        "updated": "2021-02-23",
        "population_infected_pct": 7.59,
        "total_cases": 55507,
        "cases_last_24h": 0,
        "cases_last_7d": 1225,
        "deaths_new_7d": 7,
        "deaths_new_24h": 0,
        "deaths_total": 287,
        "deaths_per_100k": 39,
        "7day_avg_cases_per_100k": 23.9,
        "7day_avg_deaths_per_100k": 0.1,
        "population": 731545,
        "doses_distributed": 304875,
        "doses_administered": 239927,
        "doses_storage": 64948,
        "dose1": 154392,
        "dose2": 84984,
        "dose1_population_pct": 21.1,
        "dose2_population_pct": 11.6,
        "disclaimer": 'Case and Death data updated as of Feb 22 2021 12:24PM.  Testing data updated as of Feb 22 2021  4:56PM',
        "update": 'Feb 22 2021 12:24PM',
        "incidence": 11100
      }
    }
  },
  head() {
    return{
      title: this.state.location + ' Social Image',
      meta: [
        {hid: 'robots', name: 'robots', content : 'nofollow'}
      ]

    }
  }
}
</script>