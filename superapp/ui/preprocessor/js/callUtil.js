const { exec } = require('child_process');

username='dev'
password='boot@123'
requestUrl='localhost:8088/quickboot/AoaConfig/findAllByName?appName='
tokenUrl='http://ae49d9cafb125433cbc8c890ed343431-1101089723.ap-south-1.elb.amazonaws.com/auth/realms/BNTV/protocol/openid-connect/token'
audience = 'apim'
xModule = 'CORE'

function getTokenAndMakeRequest( appName) {
  try {
    // Step 1: Get the access token
    const getTokenCommand = `curl -k -d "grant_type=password&username=${username}&password=${password}&client_id=bootnext" -H "Accept: application/json" -H "Content-Type: application/x-www-form-urlencoded" -X POST ${tokenUrl}`;

    const tokenResponse = new Promise((resolve, reject) => {
      exec(getTokenCommand, (error, stdout, stderr) => {
        if (error) {
          console.error('Error:', error);
          reject(error);
          return;
        }
        
        // Parse the JSON response from stdout
        const jsonResponse = JSON.parse(stdout);
        resolve(jsonResponse);
      });
    });

    const accessToken = tokenResponse.access_token;

    // Step 2: Make the authenticated HTTP request
    const  callUrls=`${requestUrl}`+appName
    const makeRequestCommand = `curl ${callUrls} \
      -H 'Accept: application/json, text/plain, */*' \
      -H 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8' \
      -H 'Authorization: Bearer ${accessToken}' \
      -H 'Connection: keep-alive' \
      -H 'Content-Type: application/json' \
      -H 'audience: ${audience}' \
      -H 'x-module: ${xModule}' \
      --compressed \
      --insecure`;

    const response =  new Promise((resolve, reject) => {
      exec(makeRequestCommand, (error, stdout, stderr) => {
        if (error) {
          console.error('Error:', error);
          reject(error);
          return;
        }

        // Process the response as needed
       // console.log('Response:', stdout);

        resolve(stdout);
      });
    });

    // You can further process the response from the second cURL command as needed

    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = {
  getTokenAndMakeRequest,
};
