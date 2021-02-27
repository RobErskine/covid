<template>
  <div>
    <h1>{{state.name}}</h1>
  </div>
</template>

<script>
export default {
  name: 'detailPage',
  layout: 'social-image',
  data: [
    'state'
  ],
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