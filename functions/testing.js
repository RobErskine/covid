const fetch = require('node-fetch') // add in the node fetch library

exports.handler = async (event, context) => {
	// hit out endpoint
	var vaccineData = await fetch('https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=vaccination_data')
  // if the response came back okay, we're good to go!
	if(vaccineData.ok){
		// convert our response to JSON
    var json = await vaccineData.json();
    json = json['vaccination_data'];
		
		// set out return object
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: json
      })
    }
	// if for whatever reason it failed, return a 404
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'cant hit sry'
      })
    }
  }
}