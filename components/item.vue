<template>
  <span class="text-center w-1/3 mb-2 text-base leading-tight text-xl" v-bind:class="getClass(sortKey, this.$parent.$parent.sortby)">
    <span class="leading-none font-bold block text-base">{{label}}</span>
    <number class="relative " :percentage="percentage" :val="value"/>
  </span>
</template>

<script>
export default {
  name: 'item',
  props: [
    'label',
    'value',
    'percentage',
    'sortKey'
  ],
  methods: {
    getClass(sortKey, sortby){
      if(sortKey === sortby){
        return 'text-primary-DEFAULT'
      }
    }
  }
}
</script>