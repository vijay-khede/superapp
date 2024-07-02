#!/bin/bash

export username=dev
export password=Boot@123


checkVersionLimit()
{
	export token_json=$(curl -k -v -d "grant_type=password&username="$username"&password="$password"&client_id=bootnext" -H "Accept: application/json" -H "Content-Type: application/x-www-form-urlencoded" -X POST $hostName/auth/realms/$realm/protocol/openid-connect/token | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) 
	export token=$(echo $token_json | jq -r ".access_token // empty")
	echo $token;
}


export IMPORT_JSON=$(jq -nf metadata.json)
export hostName=$(echo $IMPORT_JSON |jq -r ".hostName // empty")
export realm=$(echo $IMPORT_JSON |jq -r ".realm // empty")
export gateWayContext=$(echo $IMPORT_JSON |jq -r ".gatewayContext // empty")
export hostUrl=$hostName/$gateWayContext
checkVersionLimit


$(curl -k -v -d '{"entityName":"APIRESOURCE","entityDisplayName":"APIRESOURCE","applicationName":"ANDROIDCHECK_APP_NAME","genericActionMapping":[{"actionDisplayName":"Edit","actionName":"Edit","viewName":"androidcheck_Apiresource_crud","roleName":"androidcheck-admin","icon":"Edit-Outline","isOpenInDialog":false}]}' -H "Accept: application/json, text/plain, */*" -H "x-submodule: CORE" -H "x-module: CORE" -H "requestid: 09698224281518608" -H "Content-Type: application/json" -H "authorization: Bearer "$token"" -H "audience: "$gateWayContext"" -X POST $hostUrl/wfm/1.0/rest/ApplicationEntityMapping/create | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) 

$(curl -k -v -d '{"entityName":"HOSTING_DETAILS","entityDisplayName":"HOSTING DETAILS","applicationName":"SUPERAPP_APP_NAME","genericActionMapping":[{"actionDisplayName":"Edit","actionName":"Edit","viewName":"superapp_HostingDetails_crud","roleName":"superapp-admin","icon":"Edit-Outline","isOpenInDialog":false}]}' -H "Accept: application/json, text/plain, */*" -H "x-submodule: CORE" -H "x-module: CORE" -H "requestid: 09698224281518608" -H "Content-Type: application/json" -H "authorization: Bearer "$token"" -H "audience: "$gateWayContext"" -X POST $hostUrl/wfm/1.0/rest/ApplicationEntityMapping/create | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) 
$(curl -k -v -d '{"entityName":"MINIAPP_BUILD_DETAILS","entityDisplayName":"MINIAPP BUILD DETAILS","applicationName":"SUPERAPP_APP_NAME","genericActionMapping":[{"actionDisplayName":"Edit","actionName":"Edit","viewName":"superapp_MiniappBuildDetails_crud","roleName":"superapp-admin","icon":"Edit-Outline","isOpenInDialog":false}]}' -H "Accept: application/json, text/plain, */*" -H "x-submodule: CORE" -H "x-module: CORE" -H "requestid: 09698224281518608" -H "Content-Type: application/json" -H "authorization: Bearer "$token"" -H "audience: "$gateWayContext"" -X POST $hostUrl/wfm/1.0/rest/ApplicationEntityMapping/create | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) 
$(curl -k -v -d '{"entityName":"MINIAPP_DETAILS","entityDisplayName":"MINIAPP DETAILS","applicationName":"SUPERAPP_APP_NAME","genericActionMapping":[{"actionDisplayName":"Edit","actionName":"Edit","viewName":"superapp_MiniappDetails_crud","roleName":"superapp-admin","icon":"Edit-Outline","isOpenInDialog":false}]}' -H "Accept: application/json, text/plain, */*" -H "x-submodule: CORE" -H "x-module: CORE" -H "requestid: 09698224281518608" -H "Content-Type: application/json" -H "authorization: Bearer "$token"" -H "audience: "$gateWayContext"" -X POST $hostUrl/wfm/1.0/rest/ApplicationEntityMapping/create | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) 