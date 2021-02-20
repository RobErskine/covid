<template>
  <span class="text-center w-1/3 mb-2 text-base leading-tight">
    <span class="leading-none font-bold">{{label}}</span>
    <span class="block text-xl pt-0"><number class="relative " :percentage="percentage" :val="value"/></span>
  </span>
</template>

<script>
export default {
  name: 'item',
  props: [
    'label',
    'value',
    'percentage'
  ]
}
</script>