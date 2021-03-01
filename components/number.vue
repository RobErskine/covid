<template>
  <span class="number font-serif">{{prettyVal}}<template v-if="percentage">%</template></span>  
</template>

<script>
export default {
  name: 'number',
  data() {
    return {
      prettyVal: 0,
    }
  },
  props: {
    'val':0,
    'percentage': false
  },
  mounted() {
    this.prettyVal = this.numberWithCommas(this.val)
  },
  methods: {
    numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
  }
}
</script>
