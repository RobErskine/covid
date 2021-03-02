<template>
  <span class="number font-serif">{{prettyVal}}<template v-if="percentage">%</template></span>  
</template>

<script>
import utilities from '~/assets/js/utilities'

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
    this.prettyVal = utilities.numberWithCommas(this.val)
  }
}
</script>
