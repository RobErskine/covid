<template>
  <span class="text-center w-1/3 mb-2 text-base leading-none text-base font-bold" v-bind:class="getClass(sortKey, this.$parent.$parent.sortby)">
    {{label}}
    <number class="relative text-lg font-normal block w-full mt-2" :percentage="percentage" :val="value"/>
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