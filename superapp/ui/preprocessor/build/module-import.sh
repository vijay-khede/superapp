#!/bin/bash

export username=dev
export password=Boot@123

checkVersionLimit()
{
	export token_json=$(curl -k -v -d "grant_type=password&username="$username"&password="$password"&client_id=bootnext" -H "Accept: application/json" -H "Content-Type: application/x-www-form-urlencoded" -X POST $hostName/auth/realms/$realm/protocol/openid-connect/token | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) 
	export token=$(echo $token_json | jq -r ".access_token // empty")
	}


export IMPORT_JSON=$(jq -nf metadata.json)
export hostName=$(echo $IMPORT_JSON |jq -r ".hostName // empty")
export realm=$(echo $IMPORT_JSON |jq -r ".realm // empty")
export gateWayContext=$(echo $IMPORT_JSON |jq -r ".gatewayContext // empty")
export hostUrl=$hostName/$gateWayContext
checkVersionLimit
echo $PWD
export module_file=$PWD/module_detail.csv



export module= $(curl -k -v -F file=@"$module_file"  -H "x-submodule: CORE" -H "x-module: CORE" -H "requestid: 09698224281518609"  -H "authorization: Bearer "$token"" -H "audience: "$gateWayContext"" -X POST $hostUrl/base/1.0/base/util/rest/Component/importComponentFile | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; })
echo $module
