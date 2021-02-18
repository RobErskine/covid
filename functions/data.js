const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  var vaccinaData = await fetch('https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=vaccination_data')
  if(vaccinaData.ok){
    var json = await vaccinaData.json();

    json = json['vaccination_data'];

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: json
      })
    }
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'cant hit sry'
      })
    }
  }
}