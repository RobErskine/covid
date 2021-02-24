<template>
  <span class="visually-hidden">
    <slot></slot>
  </span>
</template>

<style scoped lang="scss">
  .visually-hidden:not(:focus):not(:active) {
    clip: rect(0 0 0 0); 
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap; 
    width: 1px;
  }
</style>

<script>
export default {
  name: "visuallyHidden",
}
</script>