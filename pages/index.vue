<template>
  <div class="p-2">
    <ul class="flex flex-wrap justify-between">
      <li v-for="data in data.data" :key="data.Location"
        class="p-8 br-4 bg-blue-50"
      >
        <h2>{{data.LongName}}</h2>
        <!-- todo: convert each of these <p>s into a component -->
        <!-- total pop -->
        <p v-if="data.Census2019">Total People*: <number :val="data.Census2019"/></p>
        <p v-if="data.Doses_Distributed">Total Doses Distributed: <number :val="data.Doses_Distributed"/></p>
        <br/>

        <!-- dose 1-->
        <p v-if="data.Administered_Dose1">People with 1st dose: <number :val="data.Administered_Dose1"/></p>
        <p v-if="data.Administered_Dose1_Pop_Pct">% with 1st dose: {{data.Administered_Dose1_Pop_Pct}}%</p>
        <br/>

        <!-- dose 2 -->
        <p v-if="data.Administered_Dose2">People with 2nd dose: <number :val="data.Administered_Dose2"/></p>
        <p v-if="data.Administered_Dose2_Pop_Pct">% with 2nd dose: {{data.Administered_Dose2_Pop_Pct}}%</p>

        <!-- Total cases -->
        <p v-if="data.tot_cases_last_24_hours"> <number :val="data.tot_cases_last_24_hours"/></p>
      </li>
    </ul>
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
    this.data = await fetch('https://elastic-jennings-901335.netlify.app/.netlify/functions/data',{mode:'no-cors'}).then(res=>res.json())
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
