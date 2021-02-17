<template>
  <section class="o_hero">
    <div class="block">
      <div class="copy bg-white">
        <slot></slot>
      </div>
      <Img grayscale loading="lazy" alt="" :src=image />
    </div>
  </section>
</template>

<style lang="scss"> // no-scoped. Dynamically generated content from v-html are not affected by scoped styles. who knew?? https://vue-loader.vuejs.org/guide/scoped-css.html#dynamically-generated-content
section.o_hero{
  width:100%;
  position:relative;
  z-index:2;
  & > div{
    display:flex;
    flex-direction:column-reverse;
  }
  div.copy{
    margin:-6rem 1rem 0px;
    position:relative;
    z-index:2;
    padding:1rem;
  }
}

@media all and (min-width: 890px){ // breakpoint for where this specific component breaks
  section.o_hero{
    & > div{
      flex-direction: row;
      justify-content:space-between;
      & > div{
        width:48%;
      }
    }
    div.copy{
      margin:0px;
      display:flex;
      flex-direction:column;
      justify-content:center;
      background-color:transparent;
    }
    p{
      font-size:1.5em;
    }
  }
}
</style>

<script>
export default {
  name: "Hero",
  props: [
    'image'
  ]
}
</script>