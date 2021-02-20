<template>
  <footer class="bg-primary-dark text-white p-4 md:pr-16">
    <div class="flex justify-end">
      <nuxt-link class="mr-4" to="/about">About</nuxt-link>
      <nuxt-link class="mr-4" to="/privacy">Privacy Policy</nuxt-link>
      <a class="text-white">&copy; {{new Date().getFullYear()}} All Rights Reserved.</a>
    </div>
  </footer>
</template>

<style lang="scss">
</style>

<script>
export default {
  name: "MainFooter"
}
</script>