const fetch = require('node-fetch')
const request = require('request');

exports.handler = async (event, context) => {

  var requestAsync = function(url) {
    return new Promise((resolve, reject) => {
        var req = request(url, (err, response, body) => {
            if (err) return reject(err, response, body);
            resolve(JSON.parse(body));
        });
    });
  };

  const urls = [
      'https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=vaccination_data',
      'https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=US_MAP_DATA'
  ];

  /* Works as of Node 7.6 */
  var getParallel = async function() {
      //transform requests into Promises, await all
      try {
          var data = await Promise.all(urls.map(requestAsync));
      } catch (err) {
          console.error(err);
      }
      
      //instead of returning merge into one
      array1 = data[0]['vaccination_data'];
      array2 = data[1]['US_MAP_DATA'];

      mergedArray = [];

      for(var i = 0; i < array1.length; i++){

        for(var j = 0; j < array2.length; j++){

          if(array1[i]['Location'] == array2[j]['abbr']){
            let populationInfected = parseFloat(((array2[j]['tot_cases'] / array1[i]['Census2019']) * 100).toFixed(2));

            mergedArray.push({
              'id' : array2[j]['id'],
              'name': array1[i]['Location'],
              'location': array1[i]['LongName'],
              'updated': array1[i]['Date'],
              'population_infected_pct': populationInfected,
              
              // loop over all of array 2
              'total_cases': array2[j]['tot_cases'],
              'cases_last_24h': array2[j]['tot_cases_last_24_hours'],
              'cases_last_24h': array2[j]['tot_cases_last_24_hours'],
              'cases_last_7d': array2[j]['new_cases07'],
              'deaths_new_7d': array2[j]['new_deaths07'],
              'deaths_new_24h': array2[j]['tot_death_last_24_hours'],
              'deaths_total': array2[j]['tot_death'],
              'deaths_per_100k': array2[j]['death_100k'],
              '7day_avg_cases_per_100k': array2[j]['Seven_day_avg_new_cases_per_100k'],
              '7day_avg_deaths_per_100k': array2[j]['Seven_day_avg_new_deaths_per_100k'],

              // loop over all of array 1
              'population': array1[i]['Census2019'],
              'doses_distributed': array1[i]['Doses_Distributed'],
              'doses_administered': array1[i]['Doses_Administered'],
              'doses_storage': (array1[i]['Doses_Distributed'] - array1[i]['Doses_Administered']),
              'dose1': array1[i]['Administered_Dose1'],
              'dose2': array1[i]['Administered_Dose2'],
              'dose1_population_pct': array1[i]['Administered_Dose1_Pop_Pct'],
              'dose2_population_pct': array1[i]['Administered_Dose2_Pop_Pct'],
            })
          }
        }
      }

      return mergedArray;
  }

  data = await getParallel()

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: data
    })
  }
}