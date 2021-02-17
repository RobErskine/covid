<template>
  <section class="o_cards">
    <h2 class="h5 p-2 pt-16 pb-8 text-center">{{title}}</h2>
    <div class="block">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped lang="scss">
  section.o_cards{
    display:flex;
    flex-direction:column;
    margin-bottom:3rem;
    & > h2{
      width:100%;
      display:block;
    }
  }

  @media all and (min-width: 600px){
    section.o_cards{
      div.block{
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        justify-content:space-between;
        & > div{
          width:48.5%;
          margin-left:auto;
          margin-right:auto;
        }
      }
    }
  }

  @media all and (min-width: 1100px){
    section.o_cards{
      div.block > div{
        width:29%
      }
    }
  }
</style>

<script>
export default {
  name:"Cards",
  props:[
    'title'
  ]
}
</script>