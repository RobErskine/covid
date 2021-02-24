<template>
  <button v-on:click="toggle" :class="visible ? 'active' : 'inactive'" class="border-2 border-gray-light rounded-xl p-2 outline-none ring-0">
    <slot></slot>
    <span v-if="visible" class="px-2 bg-gray-light rounded-2xl">
      On
    </span>
    <span v-else class="px-2 bg-gray-light rounded-2xl">
      Off
    </span>
  </button>
</template>

<style lang="scss">
button.active span{
  @apply bg-green-600 text-white;
}

button:focus{
  @apply outline-none;
}
</style>

<script>
export default {
  name: 'toggle',
  props: [
    'visible'
  ],
  methods: {
    toggle: function(){
      this.$emit('toggle');
    }
  }
}
</script>