const scanner = require("sonarqube-scanner");
const args = require("args");
const _ = require("lodash");

const sonarServerUrl = "http://localhost:4200/sonar";
const sonarServerToken = "2e30877d099c3cb1f1b43577415e52533181b485";

/**
Sample App Config properties
"sonar.projectKey": Uniq Application key,
"sonar.projectName": Uniq Application name,
"sonar.projectDescription": Application description,
"sonar.sources": path of folders which needs to be scanned
"sonar.exclusions": path to exclude
"sonar.tests": specify test case path
*/

let defaultProjectProperty = {
  "sonar.projectKey": "visionwaves-app:visionwaves",
  "sonar.projectName": "visionwaves-app:visionwaves",
  "sonar.projectDescription": 'Description for "My App" project...',
  "sonar.projectVersion": "1.0",
  "sonar.sourceEncoding": "UTF-8",
  "sonar.language": "js",
  "sonar.exclusions": "**/*.spec.ts",
  "sonar.typescript.tsconfigPath": "tsconfig.sonar.json",
  "sonar.sources": "apps/visionwaves/,libs/",
};

let appMapping = require("./sonar-app.property.json");

args.option(
  "projectKeys",
  "Comma separated List of application projectKeys for which we need to execute sonar"
);
const flags = args.parse(process.argv);
let apps = [];
let appToExecute = [];
/***
 *
 * By default sonar will executes for all the applciations which are defined in sonar-app.property.json
 * file, To execute sonar for specific applications, please specify list of application projectKey in
 * command line
 */

if (flags.projectKeys) {
  apps = flags.projectKeys.split(",");
  if (apps.length > 0) {
    appToExecute = _.filter(appMapping, (item) => {
      return apps.includes(item["sonar.projectKey"]);
    });
  }
} else {
  appToExecute = appMapping;
}

for (let i = 0; i < appToExecute.length; i++) {
  // TODO: steps to fork process
  const appConfig = Object.assign({}, defaultProjectProperty, appToExecute[i]);
  product.log(
    `Sonar is executing for :${
      appConfig["sonar.projectName"]
    }, started at ${new Date()} `
  );
  scanner(
    {
      serverUrl: sonarServerUrl,
      token: sonarServerToken,
      options: appConfig,
    },
    () => {
      product.log("Sonar scan done for:", appConfig["sonar.projectName"]);
    }
  );
}
process.exit();
