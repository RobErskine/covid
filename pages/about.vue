<template>
  <section class="max-w-screen-md mx-auto p-4 pt-16 pb-24 copy">
    <p>CovidCasesByTheNumbers.com is a website for finding information about state/territory instances of the COVID-19 disease, how many people it has infected, killed, and the population that has been vaccinated against it. It pulls from the Centers for Disease Control and prevention. The <a href="https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=vaccination_data" target="_blank">API can be found here</a> along with <a href="https://covid.cdc.gov/covid-data-tracker/" target="_blank">information directly from the CDC</a>.</p>
    <p>This website is for informational purposes only. It depends on external data sources and does not represent medical advice. Currently, only state-level resolution is available for the US.</p>
    <p>All code is open-source and <a href="https://github.com/RobErskine/covid" target="_blank">available on my github here</a>. Give this project a Star if you found it to be helpful! If you have any questions or concerns, please <a href="mailto:rob@roberskine.com?subject=Covid Cases by the Numbers">reach out to me over email</a> or <a href="https://twitter.com/erskinerob">message me on Twitter</a>.</p>
  </section>
</template>

<style lang="scss">
.copy{
  a{
    @apply text-primary-DEFAULT underline;
  }
}
</style>