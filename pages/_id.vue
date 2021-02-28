<template>
  <div>
    <hero class="container max-w-screen-2xl mx-auto" :data="state" :shortname="state.name" :longname="state.location">
      <p class="text-gray-DEFAULT text-sm mb-0">This website is for informational purposes only. It relies on external data sources from the Centers for Disease control and does not represent medical advice.</p>
    </hero>``
  </div>
</template>

<script>
export default {
  name: 'detail-page',
  layout: 'default',
  data: [
    'state',
    'state_uri'
  ],
  mounted(){
    let uri = (this.state.location).toLowerCase()
        uri = uri.replace(/ /g, '_');

    this.state_uri = uri;
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
    let uri = (this.state.location).toLowerCase().replace(/ /g, '_'),
        title = this.state.location + ' COVID-19 Information | COVID Cases by the Numbers',
        description = this.state.location + ' COVID-19 Stats: Total Population: ' + this.state.population + ', Total Deaths: ' + this.state.deaths_total + ', Total Vaccinations: ' + this.state.dose2,
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