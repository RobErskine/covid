<template>
  <section class="max-w-screen-md mx-auto p-4 pt-16 pb-24 copy">
    <p>CovidCasesByTheNumbers.com is a website for finding information about state/territory instances of the COVID-19 disease, how many people it has infected, killed, and the population that has been vaccinated against it. It pulls from the Centers for Disease Control and prevention. The <a href="https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=vaccination_data" target="_blank">API can be found here</a> along with <a href="https://covid.cdc.gov/covid-data-tracker/" target="_blank">information directly from the CDC</a>.</p>
    <p>This website is for informational purposes only. It depends on external data sources and does not represent medical advice. Currently, only state-level resolution is available for the US.</p>
    <p>This website was built by <a href="https://roberskine.com">Rob Erskine</a>. All code is open-source and <a href="https://github.com/RobErskine/covid" target="_blank">available on my github here</a>. Go ahead and give this project a star if you found it useful. I've also written two blog articles about some of the features of this site: "Dynamically Generating Share Images with Node, Nuxt, and Netlify" (still writing this article!) and "<a href="https://roberskine.com/blog/leveraging-netlify-serverless-functions-to-replicate-cors-enabled-endpoints/" target="_blank">Leveraging Netlify Serverless Functions to replicate CORS-enabled Endpoints</a>".</p>
    <p>Questions or concerns? Please <a href="mailto:rob@roberskine.com?subject=Covid Cases by the Numbers">reach out to me over email</a> or <a href="https://twitter.com/erskinerob">message me on Twitter</a>.</p>
  </section>
</template>

<style lang="scss">
.copy{
  a{
    @apply text-primary-DEFAULT underline;
  }
}
</style>

<script>
export default {
  name: 'about'
}
</script>