exports.handler = async (event, context) => {
  var response = await fetch('https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=vaccination_data');
  if(response.ok){
    var json = await response.json();

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