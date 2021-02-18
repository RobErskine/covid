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
        console.log(array1[i]);

        mergedArray.push({
          'name': array1[i]['Location']
        })

        for(var j = 0; j < mergedArray.length; j++){
          if(mergedArray[j]['name'] == array2['abbr']){
            console.log('wow')
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