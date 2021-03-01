const fetch = require('node-fetch');
const fs = require('fs');

fetch('https://elastic-jennings-901335.netlify.app/.netlify/functions/states', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
})
.then(result => result.json())
    .then(res => {
        let result = res;
        var entries = [];
        for(i = 0; i < result.data.length; i++ ){
            entries.push(result.data[i])
        }

        fetch('https://elastic-jennings-901335.netlify.app/.netlify/functions/usa', {
            method: 'GET',
            headers: {'Content-Type': 'application/json' },
        })
        .then(result => result.json())
            .then(res =>{
                entries.push(res.data);

                fs.writeFile('./dynamicpages.json', JSON.stringify(entries), err => {
                    if (err) {
                        console.error('Error writing dynamic pages file', err);
                    } else {
                        console.log('Dynamic pages successfully written!');
                    }
                });
            }
        )
    }
)