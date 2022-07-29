const handler = async function(event, context) {
    console.log("Received event:", event)

    var exec = require('child_process').exec;

    var cmd = exec("npm run pages && npm run generate && npm run socialImages", function(err, stdout, stderr) {
    if (err) {
        // handle error
    }
    console.log(stdout);
    });

    return {
        statusCode: 200,
    };
};

module.exports.handler = handler;