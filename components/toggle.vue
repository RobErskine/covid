<template>
  <button v-on:click="toggle" :class="[visible ? 'active' : 'inactive', type == 'toggle' ? 'toggle' : 'sort']" class="border-2 border-gray-light rounded-xl p-2 outline-none ring-0">
    <slot></slot>
    <span v-if="visible" class="px-2 bg-gray-light rounded-2xl inline-block">
      <template v-if="type === 'toggle'">
        On
      </template>
      <template v-else>
        <svg class="inline-block w-6 h-6" width="100pt" height="100pt" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="m47.93 22.812-19 18c-1.0156 1.0117-1.3633 3.1758-0.24219 4.3594 1.1211 1.1797 3.25 1.1758 4.3672-0.015625l13.938-13.188v43.031c0 1.6562 1.3438 3 3 3s3-1.3438 3-3v-43.031l13.938 13.188c1.1133 1.1875 3.3242 1.2695 4.3672 0.015625 0.96094-1.1562 1.0039-3.3086-0.24219-4.3594l-19-18c-0.76563-0.76562-2.7852-1.3633-4.125 0z" fill="#fff"/>
        </svg>
        <hidden>Sort Ascending</hidden>
      </template>
    </span>
    <span v-else class="px-2 bg-gray-light rounded-2xl inline-block">
      <template v-if="type === 'toggle'">
        Off
      </template>
      <template v-else>
        <svg class="inline-block w-6 h-6 transform rotate-180" width="100pt" height="100pt" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="m47.93 22.812-19 18c-1.0156 1.0117-1.3633 3.1758-0.24219 4.3594 1.1211 1.1797 3.25 1.1758 4.3672-0.015625l13.938-13.188v43.031c0 1.6562 1.3438 3 3 3s3-1.3438 3-3v-43.031l13.938 13.188c1.1133 1.1875 3.3242 1.2695 4.3672 0.015625 0.96094-1.1562 1.0039-3.3086-0.24219-4.3594l-19-18c-0.76563-0.76562-2.7852-1.3633-4.125 0z"/>
        </svg>
        <hidden>Sort Ascending</hidden>
      </template>
    </span>
  </button>
</template>

<style lang="scss">
button.active span{
  @apply bg-green-700 text-white;
}

button:focus{
  @apply outline-none border-gray-dark;
}
</style>

<script>
export default {
  name: 'toggle',
  props: [
    'visible',
    'type'
  ],
  methods: {
    toggle: function(){
      this.$emit('toggle');
    }
  }
}
</script>