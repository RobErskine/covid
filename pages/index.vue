<template>
  <div>
    <div v-for="data in data.data" :key="data.Location">
      {{data.Location}}
    </div>
    <!-- <hero :image="data.image">
      <h1>{{data.title}}</h1>
      <div v-html="data.description"></div>
      <p>
        <cta link="work" hidden="View our " copy="Recent Work" variant="primary" arrow="true"/>
      </p>
    </hero>

    <tabs label="Front-end dev offerings">
      <tab v-for="(tab,i) in data.tabs"
        :title="tab.title"
        :key="tab.id"
        :id="tab.id"
      >
        <span v-html="tab.copy"></span>
      </tab>
    </tabs>

    <cards title="Other Capabilities">
      <card 
        v-for="(card,i) in data.cards"
        :key="card.title"
        :title="card.title"
        :lede="card.lede"
        :destination="card.link"
      >
        <span v-html="card.copy"></span>
      </card>
    </cards> -->
  </div>
</template>

<script>
export default {
  name: "Homepage",
  data(){
    return{
      data: []
    }
  },
  async fetch(){
    // pretend data is from an external source
    this.data = await fetch('https://cdc-api.netlify.app/.netlify/functions/data').then(res=>res.json())
  },
  methods:{
    stripTags(code){
      return code.replace(/<\/?[^>]+>/ig, "")
    },
    trim(string,length,ellipsis){
      if (string.length <= length) {
        return string
      }

      var string = string.slice(0,length)
      if(ellipsis){
        string = string + '...'
      }

      return string
    }
  },
  head(){
    let description = this.stripTags('Here is a demo title') // strip tags from rich text field and use for meta descriptions and truncate for the googs
    description = this.trim(description, 152, true);
    return{
      title: this.data.title + ' | Rob Erskine',
      meta: [
        {hid: 'og:title', name: 'og:title', content: this.title + ' | Rob Erskine'},
        {hid: 'twitter:title', name :'twitter:title', content: this.title},
        {hid: 'description', name :'description', content: description},
        {hid: 'og:description', name :'og:description', content: description},
        {hid: 'og:image', name :'og:image', content: this.image},
        {hid: 'twitter:image', name :'twitter:image', content: this.image}
      ]
    }
  }
}
</script>
