<template>
  <div class="row flex flex-wrap justify-between" :class="topic">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  div.row:last-of-type{
    border-bottom:none;
    margin-bottom:0px;
  }
</style>

<script>
export default {
  name: 'row',
  props: [
    'topic'
  ]
}
</script>