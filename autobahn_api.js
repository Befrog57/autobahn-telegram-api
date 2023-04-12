//Creator: befrog
//Mail: befrog@devtal.de
//Usage: Saving API-Events (Warnings) for the German Autobahn in a file
//Loading node.js modules...
const axios = require('axios');
require('dotenv').config();
const fs = require('fs');
const { readLastLines, readLastLinesEnc } = require("read-last-lines-ts")
var stringSimilarity = require("string-similarity");

//Importing .env file...
const autobahnen = process.env.AUTOBAHNEN;

//Reading output file
const lastOutputRaw = readLastLines('out.txt', 1);

var config = {
    responseType: 'text'
};

(async () => {

  try {
    await abfrage();
  } catch(err) {
    console.error(err)
    process.exit(1)
  }

})()

async function abfrage() {
  //Api request with url and token
  axios.get('https://verkehr.autobahn.de/o/autobahn/' + autobahnen + '/services/warning')
    .then((response) => {
      //Put recieved data in variable
      var daten = response;

      // Terminate
      try {
      const outStr = JSON.stringify(daten.data.warning[0].description);
      } catch (err) {
        process.exit();
      }

      var similarity = stringSimilarity.compareTwoStrings(outStr, lastOutputRaw.toString("utf8"));

      if (similarity >= 0.9) {
        process.exit();
      }

      var lat = daten.data.warning[0].coordinate.lat;
      var long = daten.data.warning[0].coordinate.long;

      //Write output to file
      try {
        fs.appendFileSync('./out.txt', '\r\nlatitude=' + lat + '&longitude=' + long + '\r\n');
        fs.appendFileSync('./out.txt', '\r' + outStr);
        // file written successfully
      } catch (err) {
        console.error(err);
      }
    });
}
