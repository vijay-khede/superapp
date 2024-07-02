const fs = require("fs");
const jsModule = require("./module");
const crud = require("./crud");
const util = require("./util.service");
const viewPage = require("./view-page");
const systemConfig = require("./systemConfig");
const localization = require("./localization");
const Path = require("path");
const workflowjs = require("./workflow");

async function generateApplication(file, regenValue, allJsonFilePath) {
  console.log("regenValue ----->" + regenValue);
  console.log("going to generate application json");
  let newJson = {
    applicationName: util.dasherise(file.applicationName),
    prefix: "app",
    context: file.context,
    libs: [],
    isHS: true,
  };
  const path = Path.join(__dirname, "..", "build", "metadata.json");
  const metaData = JSON.parse(fs.readFileSync(path));
  const applicationJson = JSON.stringify({
    name: `${util.dasherise(file.applicationName).toUpperCase()}_APP_NAME`,
    displayName: `${util
      .dasherise(file.applicationName)
      .toUpperCase()}_APP_NAME`,
    iconName: util.dasherise(file.applicationName),
    parentBNTVApplication: null,
    active: true,
  });
  const resourceJson = [];
  const viewJsonList = [];
  const customTableList = [];
  const customActionsList = [];
  const pageJsonList = [];
  const aoaJson = [];
  const aoaFinal = [];
  const internalSchema = [];
  const PageConfigurationJson = [];
  let resourceMapCurl = [];

  systemConfig.writeUseDatabase();
  const entityList = ["Home"];
  file.tables.forEach((element, index) => {
    console.log("table number is ", index);
    const temp = {
      name: util.dasherise(element.name),
      displayName: `${util
        .dasherise(file.applicationName)
        .toUpperCase()}_APP_NAME.${util
        .dasherise(element.displayName)
        .toUpperCase()}`,
      prefix: "app",
      directory: `modules/${util.dasherise(file.applicationName)}`,
      isHS: true,
      enableComments: element.enableComment || false,
      enableAttachments: element.enableAttachement || false,
      enableHistory: element.enableHistory || false,
      entityName: element.name,
      nativeName: element.nativeName,
      enableWorkflow: element.enableWorkflow || false,
      context: file.context.toUpperCase(),
      applicationName: util.dasherise(newJson.applicationName),
      crudDataFilePath: `./preprocessor/build/${util.dasherise(
        newJson.applicationName
      )}_${element.name}_crud.json`,
      viewFilePath: `./preprocessor/build/${element.name}_view.json`,
      gridViewsFilePath: `./preprocessor/build/${element.name}_grid_views.json`,
      selectedIcon: element.selectedIcon,
      entitySelected: element.entitySelected,
      platform: element.platform,
    };
    if (!element.customTable) {
      customActionsList.push(
        workflowjs.generatePayloadForCustomActions(element, temp)
      );
      entityList.push(temp.name);
    }
    if (util.findIfLibShouldBeMade(file.tables, element.name)) {
      if (!element.customTable) {
        crud.generateGridViews(element, temp, file.tables);
        viewJsonList.push({
          viewJson: crud.generateCrudNew(element, temp, file.tables, file),
          application: {
            name: `${util
              .dasherise(file.applicationName)
              .toUpperCase()}_APP_NAME`,
          },
          subApplication: null,
          displayViewName: `${file.applicationName.toUpperCase()}_${temp.entityName.toUpperCase()}_FORM`,
          applicationSubtypeName: "All",
        });

        // listing page json
        const listPageJson = crud.generatePage(element, temp, file.tables);
        pageJsonList.push({
          name: listPageJson.name,
          application: listPageJson.application,
          metaJson: listPageJson.metaJson,
          // moduleidfk: 14064,
          description: "",
          type: "CUSTOM",
          status: "DRAFT",
          pageSetting: JSON.stringify({
            // permission: `ROLE_FEAT_PAGE_${util
            //   .dasherise(file.applicationName)
            //   .toUpperCase()}`
            permission: "",
          }),
        });

        const viewPageTabs = JSON.parse(
          viewPage.createViewPageJson(element, temp, file.tables)
        );

        //view page json
        const viewPageJson = crud.generateViewPage(
          element,
          temp,
          file.tables,
          viewPageTabs
        );
        pageJsonList.push({
          // listViewJson : crud.generateViewPage(element, temp, file.tables,viewPageTabs)
          name: viewPageJson.name,
          application: listPageJson.application,
          metaJson: viewPageJson.metaJson,
          // moduleidfk: 14064,
          description: "",
          type: "CUSTOM",
          status: "DRAFT",
          pageSetting: JSON.stringify({
            // permission: `ROLE_FEAT_PAGE_${util
            //   .dasherise(file.applicationName)
            //   .toUpperCase()}`
            permission: "",
          }),
          pageContext: JSON.stringify(viewPageJson.pageContext),
        });
      }
      resourceJson.push(
        systemConfig.writeviewAndResourceCreationQuery(
          element,
          temp,
          file.tables,
          file,
          temp.entityName,
          element.customTable
        )
      );

      if (!element.customTable) {
        delete temp["context"];
        newJson.libs.push(JSON.parse(JSON.stringify(temp)));
        temp.context = file.context.toUpperCase();
      }
    } else {
      const wrapper = util.findParentEntity(file.tables, element.name);
      resourceJson.push(
        systemConfig.writeviewAndResourceCreationQuery(
          element,
          temp,
          file.tables,
          file,
          wrapper?.name,
          element.customTable
        )
      );
    }
    if (!element.customTable) {
      crud.generateGridAndFilterNew(element, temp, file.tables, file);
      crud.generateGridAndFilterKanban(element, temp, file.tables, file);
      crud.generateGridAndFilterTile(element, temp, file.tables, file);
      crud.generateGridAndFilterCalendar(element, temp, file.tables, file);
      crud.generateGridAndFilterTimeline(element, temp, file.tables, file);
      crud.generateGridAndFilterSplitview(element, temp, file.tables, file);
      crud.generateGridAndFilterGps(element, temp, file.tables, file);
      crud.generatePage(element, temp, file.tables);
    }
    if (element.customTable) {
      customTableList.push(
        systemConfig.generateCustomTableJson(
          element,
          temp,
          file.tables,
          file,
          element?.name
        )
      );
    }
    if (element.globalSearch) {
      PageConfigurationJson.push(
        crud.generatePageConfigurationJson(
          element,
          `${util.dasherise(file.applicationName).toUpperCase()}_APP_NAME`
        )
      );

      PageConfigurationJson.forEach((l) => {
        console.log(l.appName);
        console.log(l.entityName);
        console.log(l.columnIndexFields);
      });
    }
  });

  if (regenValue) {
    file.tables.forEach((element) => {
      const temp = {
        
        entityName: "com.enttribe."+file.applicationName.replace(/[-\s]/g, "")+".model."+element.name,
        entityAndCoulmnRestriction:true,
        columns: this.columnJson(element, file.tables, element.name),
        appliedFor: "ALL",
        sqlTableName: util.dasheriseUnderScore(
          element.displayName.toUpperCase()
        ),
      };
      if (element.enableComment === true && element.aoa === true) {
        temp.appliedFor = "ALL";
      } else if (element.aoa === true) {
        temp.appliedFor = "AOA";
      } else if (element.sla === true) {
        temp.appliedFor = "SLA";
      }
      aoaJson.push(temp);
      console.log(temp + " <----------");
    });
  } else {
    console.log("Inside Else");
    console.log("allJsonFilePath  " + allJsonFilePath);
    allJsonFilePath.tables.forEach((element) => {
      const temp = {
        entityName: element.name,
        columns: this.columnJson(element, allJsonFilePath.tables, element.name),
        appliedFor: "ALL",
        sqlTableName: util.dasheriseUnderScore(
          element.displayName.toUpperCase()
        ),
      };
      if (element.enableComment === true && element.aoa === true) {
        temp.appliedFor = "ALL";
      } else if (element.aoa === true) {
        temp.appliedFor = "AOA";
      } else if (element.sla === true) {
        temp.appliedFor = "SLA";
      }
      aoaJson.push(temp);
      console.log(temp + " <-------+++++++++---");
    });
  }

  console.log("item item: final aoa json", aoaJson);

  intScObj = {
    schemaName: file.applicationName,
    entities: aoaJson,
  };
  internalSchema.push(intScObj);
  obj = {
  //  applicationName: util.dasherise(`${util.dasherise(file.applicationName)}`),
    applicationName: `${util
    .dasherise(file.applicationName)
    .toUpperCase()}_APP_NAME`,
    // entities : aoaJson,
    internalSchema: internalSchema,
  };
  aoaFinal.push(obj);

  console.log("aoa JSON" + JSON.stringify(aoaJson));
  console.log("\n\n\n");
  console.log("aoa FINAL   ---- >>> JSON" + JSON.stringify(aoaFinal));
  let aoaShFilePath = Path.join(__dirname, "..", "build", "aoa-import.sh");
  let aoaShFile = fs.readFileSync(aoaShFilePath).toString();
  aoaShFile = aoaShFile.replace("aoaJson", JSON.stringify(aoaFinal));
  fs.writeFileSync(aoaShFilePath, aoaShFile);

  metaData.entityList = entityList;
  metaData.applicationName = `${util
    .dasherise(file.applicationName)
    .toUpperCase()}_APP_NAME`;
  metaData.internalHostName = file.internalHostName;
  metaData.hostName = file.hostName;
  fs.writeFileSync(path, JSON.stringify(metaData, undefined, 2));
  let shFilePath = Path.join(__dirname, "..", "build", "view-builder.sh");
  let shFile = fs.readFileSync(shFilePath).toString();
  shFile = shFile.replace("putApplicationJson", applicationJson);
  // shFile = shFile.replace("putResourceInfoList", JSON.stringify(resourceJson));

  resourceMapCurl?.forEach((l) => {
    shFile +=
      "\n" +
      `$(curl -k -v -d '${JSON.stringify(
        l
      )}' -H "Accept: application/json, text/plain, */*" -H "x-submodule: VB_VIEWS_TEXT" -H "x-module: DWS_APP_NAME" -H "requestid: 09698224281518608" -H "Content-Type: application/json" -H "authorization: Bearer "$token"" -H "audience: "$gateWayContext"" -X POST $hostUrl/fb/1.0/rest/ApplicationResourceMapping/createInBatch | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) `;
  });

  resourceJson.forEach((l) => {
    l = [l];
    if (!l[0].isCustomField) {
      shFile +=
        "\n" +
        `$(curl -k -v -d '${JSON.stringify(
          l
        )}' -H "Accept: application/json, text/plain, */*" -H "x-submodule: VB_VIEWS_TEXT" -H "x-module: DWS_APP_NAME" -H "requestid: 09698224281518608" -H "Content-Type: application/json" -H "authorization: Bearer "$token"" -H "audience: "$gateWayContext"" -X POST $hostUrl/fb/1.0/rest/ResourceInfo/createResource | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) `;
    }
  });

  viewJsonList.forEach((l) => {
    shFile +=
      "\n" +
      `$(curl -k -v -d '${JSON.stringify(
        l
      )}' -H "Accept: application/json, text/plain, */*" -H "x-submodule: VB_VIEWS_TEXT" -H "x-module: DWS_APP_NAME" -H "requestid: 09698224281518608" -H "Content-Type: application/json" -H "authorization: Bearer "$token"" -H "audience: "$gateWayContext"" -X POST $hostUrl/fb/1.0/rest/ViewInfo/createView | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) `;
  });

  fs.writeFileSync(path, JSON.stringify(metaData, undefined, 2));
  let shFilePathForPageBuilder = Path.join(
    __dirname,
    "..",
    "build",
    "page-builder.sh"
  );
  let shFileForPageBuilder = fs
    .readFileSync(shFilePathForPageBuilder)
    .toString();
  shFileForPageBuilder = shFileForPageBuilder.replace(
    "putApplicationJson",
    applicationJson
  );

  pageJsonList.forEach((l) => {
    shFileForPageBuilder +=
      "\n" +
      `$(curl -k -v -d '${JSON.stringify(
        l
      )}' -H "Accept: application/json, text/plain, */*" -H "ngsw-bypass: bypass-service-worker" -H "x-module: CORE" -H "requestid: 09698224281518608" -H "Content-Type: application/json" -H "authorization: Bearer "$token"" -H "audience: "$gateWayContext"" -X POST $hostUrl/fb/1.0/rest/Template/saveTemplates | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) `;
  });

  shFileForPageBuilder +=
    "\n" +
    `$(curl -k -v -d '${JSON.stringify(
      PageConfigurationJson
    )}' -H "Accept: application/json, text/plain, */*" -H "ngsw-bypass: bypass-service-worker" -H "x-module: CORE" -H "requestid: 09698224281518608" -H "Content-Type: application/json" -H "authorization: Bearer "$token"" -H "audience: "$gateWayContext"" -X POST $hostUrl/fb/1.0/rest/PageConfiguration/createPageConfig | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) `;

  // listViewJsonList.forEach((l) => {
  //   shFileForPageBuilder += "\n\n" + `$(curl -k -v -d '${JSON.stringify(l)}' -H "Accept: application/json, text/plain, */*" -H "ngsw-bypass: bypass-service-worker" -H "x-module: CORE" -H "requestid: 09698224281518608" -H "Content-Type: application/json" -H "authorization: Bearer "$token"" -H "audience: "$gateWayContext"" -X POST $hostUrl/platform/1.0/rest/Template/upsertTemplates | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) `;
  // });

  //esa loop chalana

  if (customTableList.length) {
    shFile +=
      "\n" +
      ` export customTable = $(curl -k -v -d '${JSON.stringify(
        customTableList
      )}' -H "Accept: application/json, text/plain, */*" -H "x-submodule: VB_VIEWS_TEXT" -H "x-module: DWS_APP_NAME" -H "requestid: 09698224281518608" -H "Content-Type: application/json" -H "authorization: Bearer "$token"" -H "audience: "$gateWayContext"" -X POST $hostUrl/fb/1.0/rest/CustomFieldDefinition/createCustomField | { read -r body;read -r code;echo "Response Code for token > "$code >> wso2carbon.log ;if [[ $code -ne 200 ]]; then echo "body"$body >> wso2carbon.log;  fi; echo $body; }) ` +
      "\n" +
      "echo $customTable";
  }
  fs.writeFileSync(shFilePath, shFile);

  fs.writeFileSync(shFilePathForPageBuilder, shFileForPageBuilder);
  const applicationPath = Path.join(
    __dirname,
    "..",
    "build",
    "application.json"
  );
  fs.writeFileSync(applicationPath, JSON.stringify(newJson, undefined, 2));
  await jsModule.createExcelFile(newJson, file);
  systemConfig.writeSystemConfigSql(newJson, file);
  localization.generateDataForLocalization(file);
  workflowjs.addCustomActionsInscript(customActionsList);
}

function generateFilterForString(columnName) {
  tempj = [];

  i = columnName + `NInFilter`;
  tempj.push(i);
  j = columnName + `EqFilter`;
  tempj.push(j);
  k = columnName + `NEqFilter`;
  tempj.push(k);
  l = columnName + `InFilter`;
  tempj.push(l);
  return tempj;
}

function generateFilterForInt(columnName) {
  tempj = [];
  i = columnName + `NInFilter`;
  tempj.push(i);
  j = columnName + `EqFilter`;
  tempj.push(j);
  k = columnName + `NEqFilter`;
  tempj.push(k);
  l = columnName + `InFilter`;
  tempj.push(l);
  m = columnName + `GtFilter`;
  tempj.push(m);
  n = columnName + `LtFilter`;
  tempj.push(n);
  return tempj;
}

function generateFilter(columnName) {
  tempj = [];
  i = columnName + `EqFilter`;
  tempj.push(i);
  return tempj;
}

function columnJson(element, tables, tableName) {
  console.log("element json");
  console.log(element);
  temps = [];
  filter = [];
  element.fields.forEach((fil) => {
    let obj = {};
    obj = {
      columnName: fil.name,
      type: fil.type,
      hide:true,
      encryption:true,
      sqlColumnName: util.dasheriseUnderScore(fil.displayName.toUpperCase()),
    };
    if (
      fil.type == "String" ||
      fil.type == "Email" ||
      fil.type == "Journal" ||
      fil.type == "URL" ||
      fil.type == "Naming" ||
      fil.type == "Barcode" ||
      fil.type == "GPS"
    ) {
      var name = obj.columnName;
      cName =
        tableName.replace(tableName[0], tableName[0].toLowerCase()) +
        name.replace(name[0], name[0].toUpperCase());
      obj.filters = generateFilterForString(cName);
    } else if (
      fil.type == "Integer" ||
      fil.type == "Phone Number" ||
      fil.type == "Double" ||
      fil.type == "Float" ||
      fil.type == "Currency" ||
      fil.type == "Decimal" ||
      fil.type == "Percentage" ||
      fil.type == "Duration"
    ) {
      var name = obj.columnName;
      cName =
        tableName.replace(tableName[0], tableName[0].toLowerCase()) +
        name.replace(name[0], name[0].toUpperCase());
      obj.filters = generateFilterForInt(cName);
    } else if (fil.type == "DateTime" || fil.type == "Date") {
      var name = obj.columnName;
      cName =
        tableName.replace(tableName[0], tableName[0].toLowerCase()) +
        name.replace(name[0], name[0].toUpperCase());
      obj.filters = generateFilter(cName);
    } else if (fil.type == "Choice") {
      let choice = [];
      obj.type = "enum";
      choice = fil?.properties?.choice;
      obj.values = choice;
      var name = obj.columnName;
      cName =
        tableName.replace(tableName[0], tableName[0].toLowerCase()) +
        name.replace(name[0], name[0].toUpperCase());
      obj.filters = generateFilterForString(cName);
    } else if (fil.type.includes("Yes/No")) {
      console.log("Inside IF KKKKKKKKKKKKKKKKKKKKk");
      obj.type = "Boolean";
      console.log("jjjjjjjjjjjjjjjj " + obj.type);
    }
    if (fil.type === "Reference") {
      console.log("Reference json");
      console.log(fil);
      obj.columnName = fil.name;
      //      obj.columnName=fil.name?fil.nativeName:fil.displayName?fil.displayName:fil.name;
      obj.type = "object";
      obj.name = fil.name;
      if (fil?.properties?.table) {
        let tablelist = tables.filter(
          (table) => table.name == fil?.properties?.table
        );
        let properyies = columnChildJson(tablelist[0], tableName, fil.name);
        obj.properties = properyies;
      }
    }
    temps.push(obj);
  });

  return temps;
}

function columnChildJson(element, tableName, filName) {
  tempJS = [];

  element.fields.forEach((fild) => {
    obj = {
      columnName: fild.name,
      type: fild.type,
      sqlColumnName: util.dasheriseUnderScore(fild.displayName.toUpperCase()),
    };
    if (
      fild.type == "String" ||
      fild.type == "Email" ||
      fild.type == "Journal" ||
      fild.type == "URL" ||
      fild.type == "Naming" ||
      fild.type == "Barcode" ||
      fild.type == "GPS"
    ) {
      var name = obj.columnName;
      cName =
        tableName.replace(tableName[0], tableName[0].toLowerCase()) +
        filName.replace(filName[0], filName[0].toUpperCase()) +
        name.replace(name[0], name[0].toUpperCase());
      obj.filters = generateFilterForString(cName);
    } else if (
      fild.type == "Integer" ||
      fild.type == "Phone Number" ||
      fild.type == "Double" ||
      fild.type == "Float" ||
      fild.type == "Currency" ||
      fild.type == "Decimal" ||
      fild.type == "Percentage" ||
      fild.type == "Duration"
    ) {
      var name = obj.columnName;
      cName =
        tableName.replace(tableName[0], tableName[0].toLowerCase()) +
        filName.replace(filName[0], filName[0].toUpperCase()) +
        name.replace(name[0], name[0].toUpperCase());
      obj.filters = generateFilterForInt(cName);
    } else if (fild.type == "DateTime" || fild.type == "Date") {
      var name = obj.columnName;
      cName =
        tableName.replace(tableName[0], tableName[0].toLowerCase()) +
        filName.replace(filName[0], filName[0].toUpperCase()) +
        name.replace(name[0], name[0].toUpperCase());
      obj.filters = generateFilter(cName);
    } else if (fild.type == "Choice") {
      let choice = [];
      obj.type = "enum";
      choice = fild?.properties?.choice;
      obj.values = choice;
      var name = obj.columnName;
      cName =
        tableName.replace(tableName[0], tableName[0].toLowerCase()) +
        filName.replace(filName[0], filName[0].toUpperCase()) +
        name.replace(name[0], name[0].toUpperCase());
      obj.filters = generateFilterForString(cName);
    } else if (fild.type.includes("Yes/No")) {
      obj.type = "Boolean";
    }
    tempJS.push(obj);
  });

  return tempJS;
}

module.exports = {
  generateApplication,
  columnJson,
};
