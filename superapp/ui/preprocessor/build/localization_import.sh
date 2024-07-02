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
export applicationName=$(echo $IMPORT_JSON |jq -r ".applicationName // empty")
export hostUrl=$hostName/$gateWayContext
checkVersionLimit
echo $PWD
export localization_file=$PWD/en_upload.xlsx
export localizationcore_file=$PWD/en_core_upload.xlsx


export localizationCore= $(curl -k -v -F file=@"$localizationcore_file"  -H "x-submodule: CORE" -H "x-module: CORE" -H "requestid: 09698224281518609"  -H "authorization: Bearer "$token"" -H "audience: "$gateWayContext"" -X POST "$hostUrl/base/1.0/base/util/rest/MultiLingualConfiguration/bulkUploadMultiLingualFile?file=en_core_upload.xlsx&fileName=en_core_upload.xlsx&type=en&appName=CORE" | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; })
echo $localizationCore

sleep 30s;

export localization= $(curl -k -v -F file=@"$localization_file"  -H "x-submodule: CORE" -H "x-module: CORE" -H "requestid: 09698224281518609"  -H "authorization: Bearer "$token"" -H "audience: "$gateWayContext"" -X POST "$hostUrl/base/1.0/base/util/rest/MultiLingualConfiguration/bulkUploadMultiLingualFile?file=en_upload.xlsx&fileName=en_upload.xlsx&type=en&appName=$applicationName" | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; })
echo $localization
