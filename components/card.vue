<template>
  <div>
    <h2 class="h6">{{title}}</h2>
    <h3>{{lede}}</h3>
    <slot></slot>
    <cta :link="destination" :hidden="`Learn more about ` + title" variant="primary" arrow="true" copy=""/>
  </div>
</template>

<style scoped lang="scss">
  div{
    padding: 2rem 2rem 5rem;
    margin-bottom:1rem;
    background-color:theme('colors.gray.lightest');
    position:relative;
    .a_button{
      margin:0 auto;
      position:absolute;
      bottom:2rem;
      left:50%;
      transform:translateX(-50%);
    }
  }

  @media all and (min-width: 600px){
    div{
      padding:2.33rem 2.33rem 6rem;
    }
  }
</style>

<script>
export default {
  name: 'Card',
  props: [
    'title',
    'lede',
    'destination'
  ]

}
</script>