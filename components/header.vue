<template>
  <header class="bg-primary-dark text-white p-4 flex flex-between justify-between">
    <div class="flex justify-between w-full">
      <div>
        <nuxt-link class="font-bold" to="/">COVID-19 Cases by the Numbers</nuxt-link>
      </div>
      <div class="flex justify-between">
        <nuxt-link to="/about">About</nuxt-link>
        <!-- <nuxt-link class="mr-4" to="/privacy">Privacy Policy</nuxt-link> -->
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "main-header"
}
</script>