<template>
  <div v-show="isActive" role="tabpanel" :hidden="isActive ? false : true" :id="`tabpanel-`+id" :labelledby="`tab-`+id">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  div{ // scoped, will only affect this div
    max-width: 720px;
    max-width: 90ch;
    margin: 2rem auto 3rem;
    padding:0 2rem;
    line-height:1.75;
  }
</style>

<script>
export default {
  name: "Tab",
  props: [
    'title',
    'id'
  ],
  data(){
    return{
      isActive: false
    }
  }
}
</script>