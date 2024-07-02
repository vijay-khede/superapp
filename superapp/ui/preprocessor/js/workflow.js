const fs = require("fs");
const util = require("./util.service");
const Path = require("path");

function generatePayloadForCustomActions(json, lib) {
    const temp = {
        "entityName": json.nativeName,
        "entityDisplayName": json.displayName,
        "applicationName": `${util
        .dasherise(lib.applicationName)
        .toUpperCase()}_APP_NAME`,
        "genericActionMapping": [
            {
                "actionDisplayName": "Edit",
                "actionName": "Edit",
                "viewName": `${lib.applicationName}_${json.name}_crud`,
                "roleName": `${lib.applicationName}-admin`,
                "icon": "Edit-Outline",
                "isOpenInDialog": false
            }
        ]
    };
    return temp;
}

function addCustomActionsInscript(list) {
    let shFilePath = Path.join(__dirname, "..", "build", "custom-actions.sh");
    let shFile = fs.readFileSync(shFilePath).toString();
    list.forEach((l) => {
        shFile += "\n" + `$(curl -k -v -d '${JSON.stringify(l)}' -H "Accept: application/json, text/plain, */*" -H "x-submodule: CORE" -H "x-module: CORE" -H "requestid: 09698224281518608" -H "Content-Type: application/json" -H "authorization: Bearer "$token"" -H "audience: "$gateWayContext"" -X POST $hostUrl/wfm/1.0/rest/ApplicationEntityMapping/create | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) `
    });
    fs.writeFileSync(shFilePath, shFile);
}

module.exports = {
    generatePayloadForCustomActions,
    addCustomActionsInscript
}
