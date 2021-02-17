<template>
  <div class="image" :class="{grayscale:grayscale}"> 
    <img 
      :loading="loading" 
      :srcset="src + `?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80 400x`" 
      :alt="alt"
      :src="src + `?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`"  
    />
  </div>
</template>

<style scoped lang="scss">
  div.image{
  object-fit: cover;
  overflow:hidden;
  position:relative;
  &:after{
    content:"";
    display:block;
    padding-top:100%;
  }
  &.grayscale{
    filter:grayscale(1);
  }
}

@supports(aspect-ratio: 1/1){
  div.image{
    aspect-ratio: 1/1; // new! https://css-tricks.com/aspect-ratio-boxes/
    &:after{ content: none }
    img{
      max-width:none;
      height:100%;
      position:absolute;
      top:50%;
      left:50%;
      transform:translateX(-50%) translateY(-50%);
    }
  }
}
</style>

<script>
export default {
  name:"Img",
  props:[
    'src',
    'alt',
    'grayscale',
    'loading'
  ]
}
</script>