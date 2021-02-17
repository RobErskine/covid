<template>
  <a :href="link" class="a_button" :class="variant">
    <!-- Accessible support text -->
    <hidden v-if="hidden" :hidden="hidden"></hidden>

    <!-- Actual contents of button --> 
    <span v-if="copy">{{copy}}</span> 

    <!-- Optional Arrow -->
    <span v-if="arrow" v-bind:class="{together: copy}">
      <svg width="100pt" height="100pt" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="m36.52 15.98 25.371 25.359h-59.391v17.32h59.391l-25.371 25.359 13.48 13.48 47.5-47.5-47.5-47.5z"/>
      </svg>
    </span>
  </a>
</template>

<style lang="scss">
  .a_button{
    display:flex;
    align-items:center;
    width:fit-content;
    background-color:theme('colors.gray.DEFAULT');
    font-weight:700;
    border-radius:2rem;
    padding:0.7em 1em;
    font-size:16px;
    transition:all 0.5s ease-in-out;
    cursor:pointer;
    span.together{
      padding-left:0.5rem;
    }
    svg{
      display:inline-block;
      width:0.8rem;
      height:0.8rem;
      position:relative;
      top:-0.1em;
      transition: all 0.7s cubic-bezier(0.175, 0.9, 0.35, 1.35);
      path{
        fill: currentColor;
      }
    }
    &.primary{
      color: #fff;
      background-color:theme('colors.primary.DEFAULT');
    }
    &:hover,
    &:focus{
      background-color:theme('colors.secondary.DEFAULT');
      outline:none;
      svg{
        transform:rotate(-33deg) scale(1.1);
        filter: drop-shadow( 0px 0px 2px rgba(0, 0, 0, .2));
      }
    }
  }
</style>

<script>

export default {
  name: "CallToActionButton",
  props: [
    'copy',
    'link',
    'arrow',
    'variant',
    'hidden'
  ]
}
</script>