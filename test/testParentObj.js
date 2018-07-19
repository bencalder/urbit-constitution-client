'use strict';
var parentObj = function() {}
parentObj.request = null;
parentObj.globalFuncs = null;

parentObj.rawPost = function(data, callback) {

  const options = {
    json: true,
    uri: 'http://localhost:8545',
    body: data,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  };

  var rawData = '';

  request.post(options, function(error, response, body) {

    if (!error && response.statusCode == 200) {
      callback(body);
    } else return console.error('Call failed:', body[0].error)
  }).on('data', (chunk) => { 
    rawData += chunk;
  }).on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
    } catch (e) {
      console.error(e.message);
    }
  });
}

parentObj.getRandomID = function() {
    return this.globalFuncs.getRandomBytes(16).toString('hex');
}

parentObj.type = "ETH";

module.exports = parentObj;



// 'use strict';

// var request = require('request');
// var globalFuncs = require('../scripts/globalFuncs');

// function rawPost(data, callback) {

//   const options = {
//     json: true,
//     uri: 'http://localhost:8545',
//     body: data,
//     headers: {
//       'Accept': 'application/json, text/plain, */*',
//       'Content-Type': 'application/json; charset=UTF-8'
//     }
//   };

//   var rawData = '';

//   request.post(options, function(error, response, body) {

//     if (!error && response.statusCode == 200) {
//       // console.log('ERROR: ' + error);
//       // console.log('RESPONSE: ' + JSON.stringify(response));
//       // console.log('BODY: ' + JSON.stringify(body));
//       // delete data[0]['method'];
//       // delete data[0]['params'];
//       // delete data[0]['pending'];
//       // data[0]['result'] = body[0]['result'];
//       callback(body);
//     } else return console.error('Call failed:', body[0].error)
//   }).on('data', (chunk) => { 
//     rawData += chunk;
//   }).on('end', () => {
//     try {
//       const parsedData = JSON.parse(rawData);
//     } catch (e) {
//       console.error(e.message);
//     }
//   });
// }

// function getRandomID() {
//     return globalFuncs.getRandomBytes(16).toString('hex');
// }

// var type = "ETH";

// module.exports = {
//   type: type,
//   getRandomID: getRandomID,
//   rawPost: rawPost
// }