<template>
  <section class="o_tabs">
    <nav class="border-t-2 border-b-2 border-gray-light" role="tablist" :aria-label="label">
      <ul>
        <li 
          v-for="(tab, i) in tabs" 
          :key="tab.title" 
          :class='{"selected": (i == selected)}'
        >
          <button 
            role="tab"
            :aria-selected='(i==selected) ? true : false'
            :aria-controls="`tabpanel-` + tab.id"
            :id="`tab-` + tab.id"
            @click="select(i,true)"
          >
            {{tab.title}}
          </button>
        </li>
      </ul>
    </nav>
    <slot></slot>
  </section>
</template>

<style scoped lang="scss">
  section.o_tabs{
    ul{
        padding-top:2rem;
    }
    li{
      margin-bottom:0px;
      display:inline-block;
      &.selected{
        button{
          color:theme('colors.secondary.DEFAULT');
          border-color:theme('colors.secondary.DEFAULT');
        }
      }
    }
    button{
      color: theme('colors.primary.DEFAULT');
      font-weight:700;
      font-size:1.2em;
      padding:0px 1.5em 0.25em;
      margin-bottom:0.5em;
      border-bottom:2px solid transparent;
      position:relative;
      top:2px;
      transition: all 0.3s ease-in-out;
      &:hover,
      &:focus{
        border-color: theme('colors.primary.DEFAULT');
      }
      &:focus{
        outline:none;
      }
    }
  }

  @media all and (min-width: 600px){
    section.o_tabs{
      ul{
        display:flex;
        align-items:center;
        justify-content:center;
      }
      button{
        padding-bottom:1.5em;
        margin-bottom:0px;
      }
    }
  }

  @media all and (min-width:900px){
    section.o_tabs{
      button{
        padding-left:2.5em;
        padding-right:2.5em;
      }
    }
  }

  @media all and (min-width: 1250px){
    section.o_tabs{
      li{
        display:inline-block;
        margin:0 2rem;
      }
    }
  }

  @media all and (min-width: 890px){
    section.o_hero ~ section.o_tabs{ // hide border under hero image if they are next to each other
      position:relative;
      top:-2px;
      z-index:1;
    }
  }
</style>

<script>
export default {
  name: "Tabs",
  props: [
    'label',
    'id'
  ],
  data() {
    return{
      selected: 0,
      tabs: []
    }
  },
  created(){
    this.tabs = this.$children
  },
  mounted(){
    let selected = this.$route.query.selected // preselect active tab if query param exists 
    if(selected){ 
      this.select(selected.toString(), false)
      this.tabs[selected].isActive = true;
    } else {
      this.select(0,false)
    }
  },
  methods: {
    select(x,replaceState){
      if(replaceState == true){ // add query param to url so users can share that tab directly
        window.history.replaceState('','','?selected=' + x);
      }
      
      this.selected = x
      this.tabs.forEach((tab,index) => {  // loop over each panel to hide and only show the selected panel     
        if(index === x){
          tab.isActive = true
        } else {
          tab.isActive = false
        }
      })
    }
  }
}
</script>