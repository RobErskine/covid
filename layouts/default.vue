<template>
  <main class="w-full">
    <Header/>
      <Nuxt />
    <Footer/>
  </main>
</template>

<script>
export default {
  name: 'default'
}
</script>

<style lang="scss">
html {
  font-size: 16px;
  font-family:theme('fonts.sans');
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color:theme('colors.gray.dark');
}

[hidden]{
  display:block; // overwriting default tailwind hidden
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

h1,h2,h3,h4,h5,h6{
  line-height:1.1;
  font-weight:700;
  color: theme('colors.primary.DEFAULT');
}

h1,h2,h3,h4,h5,h6,li,p{
  margin-bottom:1rem;
}

p{
  font-size:1.1em;
  line-height:1.375;
}

h1,.h1{
  font-size:2.2em;
  line-height:0.9;
}

h2,.h2{
  font-size:2em;
}

h3,.h3{
  font-size:1.6em;
}

h4,.h4{
  font-size:1.4em;
}

h5,.h5{
  font-size: 1.2em;
  text-transform:uppercase;
  letter-spacing:0.1em;
}

h6,.h6{
  font-size:1.0em;
  border-bottom:1px solid theme('colors.gray.light');
  padding-bottom:0.5em;
}

h5,.h5,h6,.h6{
  color:theme('colors.gray.DEFAULT');
}

@media all and (min-width: 700px){
  h1{
    font-size:2.75em;
  }
}

a.nuxt-link-active{
  @apply font-bold;
}

</style>
