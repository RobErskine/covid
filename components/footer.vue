<template>
  <footer class="bg-primary-dark text-white p-4 md:pr-16 w-full flex items-center flex-end justify-end">
    <div class="flex justify-end items-center">
      <nuxt-link v-if="! updated" class="mr-4" to="/about">About</nuxt-link>
      <nuxt-link v-if="! updated" class="mr-4" to="/privacy">Privacy Policy</nuxt-link>
      <template v-if="updated">Last updated: {{updated}} — </template> &copy; {{new Date().getFullYear()}} <template v-if="! updated">All Rights Reserved.</template>
    </div>
  </footer>
</template>

<style lang="scss">
</style>

<script>
export default {
  name: "main-footer",
  props: [
    'updated'
  ]
}
</script>