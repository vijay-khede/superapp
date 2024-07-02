	#!/bin/bash

	checkVersionLimit()
	{
		export token_json=$(curl -k -v -d "grant_type=password&username="$username"&password="$password"&client_id=bootnext" -H "Accept: application/json" -H "Content-Type: application/x-www-form-urlencoded" -X POST $hostName/auth/realms/$realm/protocol/openid-connect/token | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) 
		export token=$(echo $token_json | jq -r ".access_token // empty")
	}
export username=dev
export password=Boot@123
	export IMPORT_JSON=$(jq -nf metadata.json)
	export hostName=$(echo $IMPORT_JSON | jq -r ".hostName // empty")
	export realm=$(echo $IMPORT_JSON |jq -r ".realm // empty")
	export gateWayContext=$(echo $IMPORT_JSON |jq -r ".gatewayContext // empty")
	export hostUrl=$hostName/$gateWayContext
	export appName=$(echo $IMPORT_JSON |jq -r ".applicationName // empty")
	export displayName=$(echo $IMPORT_JSON |jq -r ".applicationName // empty")

	jsonData=$(jq --null-input \
	  --arg appName "$appName" \
	  --arg displayName "$displayName" \
	  '{"application":{"name":$appName,"displayName":$displayName,"icon":"","documentIntegrationEnabled":false},"connectors":["Mail Task","WorkOrder Stage Connector","Http Connector","Push Notification Connector"]}')

	echo $jsonData

	checkVersionLimit

	 export application= $(curl -k -v -d "$jsonData" -H "Accept: application/json, text/plain, */*" -H "x-submodule: WORKORDERS" -H "x-module: DWS_APP_NAME" -H "requestid: 09698224281518608" -H "Content-Type: application/json" -H "authorization: Bearer "$token"" -H "Connection: close" -H "audience: "$gateWayContext"" -X POST $hostUrl/wfm/1.0/rest/Application/create | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) 
	 echo $application
