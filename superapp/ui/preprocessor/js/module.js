const stringify = require("csv-stringify");
const fs = require("fs");
const util = require("./util.service");
const Path = require("path");
const schema = {
  moduleid_pk: "componentid_pk",
  name: "name",
  moduleid_fk: "componentid_fk",
  description: "details",
 // modificationtime: "modificationtime",
  //creationtime: "creationtime",
  icon: "icon",
  displayname: "displayname",
 // creatorid_fk: "creatorid_fk",
 // lastmodifierid_fk: "lastmodifierid_fk",
  iconname: "iconname",
  configuration: "settings",
  enable: "enabled",
  permission: "permission",
  applicationname: "appName",
  isApplication: "isApplication",
  Api: "Api",
//  platform: "platform",
  type:"type"
};

const generateModuleExcel = (data, file) => {
  let count = 1;
  const main = [];
  let flag = false;
  let temp = [
    count,
    `${util.dasherise(data.applicationName).toUpperCase()}_APP_NAME`,
    "",
    file?.description?.toUpperCase() ||
      `${util.dasherise(data.applicationName).toUpperCase()}_APP_NAME`,
   // "",
    //"",
    file.logo || "",
    `${util.dasherise(data.applicationName).toUpperCase()}_APP_NAME`,
   // "",
    //"",
    "icomoon Profile",
    `{"id": "${util
      .dasherise(data.applicationName)
      .toUpperCase()}", "route": "${util.dasherise(data.applicationName)}"}`,
    "true",
    "",
    "BNTV",
    "true",
    "",
    "Both",
  ];
  const extraModules = [];
  console.log(file.tables);

  file.tables.forEach((item) => {
    if (!util.findIfLibShouldBeMade(file.tables, item.name)) {
      extraModules.push({
        name: item.name,
        selectedIcon: item.selectedIcon,
        entitySelected: item.entitySelected,
        type: item.type,
      });
    }
  });

  let moduleFk;
  let modulePk;
  if (extraModules.length) {
    extraModules.forEach((item) => {
      const ele = `ROLE_FEAT_${data.applicationName.toUpperCase()}_${item.name.toUpperCase()}_list`+'^Others';
      let tempx = [
        count,
        `${util.dasherise(data.applicationName).toUpperCase()}_APP_NAME`,
        "",
        `${util.dasherise(data.applicationName).toUpperCase()}_APP_NAME`,
        "",
        //"",
       // "",
        `${util.dasherise(data.applicationName).toUpperCase()}_APP_NAME`,
        //"",
       // "",
        item.selectedIcon ? `icomoon ${item.selectedIcon}` : "icomoon Profile",
        `{"id": "${util
          .dasherise(data.applicationName)
          .toUpperCase()}", "route": "${util.dasherise(
          data.applicationName
        )}"}`,
        item.entitySelected ? "true" : "false",
        ele,
        "BNTV",
        "true",
        `ROLE_API_${item.toUpperCase()}_READ#ROLE_API_${item.toUpperCase()}_WRITE`,
        item.platform ? item.platform : "Both",
      ];
      permissionObj.push(ele);
      main.push(tempx);
    });
  } else {
    main.push(temp);
  }

  console.log("data  is  ", data);
  data.libs.forEach((item) => {
    console.log("item is ", item);
    count++;

    moduleFk = item.project ? count : 1;

    modulePk = item.project ? ++count : count;

    const ele = `ROLE_FEAT_${data.applicationName.toUpperCase()}_${item.name.toUpperCase()}_LIST^Others`;

    const libsJson = [
      modulePk,
      item.name,
      moduleFk,
      util.unDasherise(item.name).toUpperCase(),
      "",
      //"",
      //"",
      item.displayName,
     // "",
   //   "",
      item.selectedIcon ? `icomoon ${item.selectedIcon}` : "icomoon Profile",
      `{"route": "${data.applicationName}/${
        data.applicationName
      }-home/home","priority": ${modulePk},"pageConfig": {"name": "${data.applicationName.toUpperCase()}_${item.entityName.toUpperCase()}_PAGE","type": "CUSTOM","status": "DRAFT"},"title": "${
        item.project
          ? item.name.toLowerCase() + `_LIST`
          : item.name.toLowerCase()
      }"}`,
      item.entitySelected ? "true" : "false",
      ele,
      "BNTV",
      "false",
      `ROLE_API_${item.entityName.toUpperCase()}_READ#ROLE_API_${item.entityName.toUpperCase()}_WRITE${
        item.enableWorkflow ? "#ROLE_API_workflowActions_updateActionTask" : ""
      }${
        item.enableComments
          ? `#ROLE_API_${item.entityName.toUpperCase()}_COMMENT_READ#ROLE_API_${item.entityName.toUpperCase()}_COMMENT_WRITE`
          : ""
      }${
        item.enableAttachments
          ? `#ROLE_API_${item.entityName.toUpperCase()}_DOCUMENT_READ#ROLE_API_${item.entityName.toUpperCase()}_DOCUMENT_WRITE`
          : ""
      }${
        item.project
          ? `#ROLE_API_${item.entityName.toUpperCase()}_PROJECT_READ#ROLE_API_${item.entityName.toUpperCase()}_PROJECT_WRITE`
          : ""
      }`,
      item.type ? item.type : "Both",
    ];

    main.push(libsJson);

    if (item.project) {
      flag = true;
    }
  });

  if (flag) {
    const workorderPermisson = `ROLE_FEAT_${data.applicationName.toUpperCase()}_workorder_dashboard^Others`;
    const taskPermisson = `ROLE_FEAT_${data.applicationName.toUpperCase()}_task_list^Others`;
    const programPermisson = `ROLE_FEAT_${data.applicationName.toUpperCase()}_program_dashboard^Others`;

    const libsJsonworkorder = [
      ++count,
      item.name + `_WORKORDER`,
      moduleFk,
      item?.name?.toUpperCase() + `_WORKORDER`,
      "",
      //"",
      //"",
      item?.displayName + `_WORKORDER`,
      //"",
    //  "",
      item.selectedIcon ? `icomoon ${item.selectedIcon}` : "icomoon Profile",
      `{"id": "${
        item.name.toUpperCase() + `_WORKORDER`
      }", "route": "${util.dasherise(data.applicationName)}/${util.dasherise(
        data.applicationName
      )}-custom-module/workorder_dashboard`,
      "true",
      workorderPermisson,
      "BNTV",
      "false",
      `ROLE_API_${item.entityName.toUpperCase()}_READ#ROLE_API_${item.entityName.toUpperCase()}_WRITE${
        item.enableWorkflow ? "#ROLE_API_workflowActions_updateActionTask" : ""
      }${
        item.enableComments
          ? `#ROLE_API_${item.entityName.toUpperCase()}_COMMENT_READ#ROLE_API_${item.entityName.toUpperCase()}_COMMENT_WRITE`
          : ""
      }${
        item.enableAttachments
          ? `#ROLE_API_${item.entityName.toUpperCase()}_DOCUMENT_READ#ROLE_API_${item.entityName.toUpperCase()}_DOCUMENT_WRITE`
          : ""
      }${
        item.project
          ? `#ROLE_API_${item.entityName.toUpperCase()}_PROJECT_READ#ROLE_API_${item.entityName.toUpperCase()}_PROJECT_WRITE`
          : ""
      }`,
      item.type ? item.type : "Both",
    ];

    const libsJsonTasks = [
      ++count,
      item.name + `_TASKS`,
      moduleFk,
      item?.name?.toUpperCase() + `_TASKS`,
      "",
     // "",
    //  "",
      item?.displayName + `_TASKS`,
     // "",
     // "",
      item.selectedIcon ? `icomoon ${item.selectedIcon}` : "icomoon Profile",
      `{"id": "${
        item.name.toUpperCase() + `_TASKS`
      }", "route": "${util.dasherise(data.applicationName)}/${util.dasherise(
        data.applicationName
      )}-custom-module/task_list`,
      "true",
      taskPermisson,
      "BNTV",
      "false",
      `ROLE_API_${item.entityName.toUpperCase()}_READ#ROLE_API_${item.entityName.toUpperCase()}_WRITE${
        item.enableWorkflow ? "#ROLE_API_workflowActions_updateActionTask" : ""
      }${
        item.enableComments
          ? `#ROLE_API_${item.entityName.toUpperCase()}_COMMENT_READ#ROLE_API_${item.entityName.toUpperCase()}_COMMENT_WRITE`
          : ""
      }${
        item.enableAttachments
          ? `#ROLE_API_${item.entityName.toUpperCase()}_DOCUMENT_READ#ROLE_API_${item.entityName.toUpperCase()}_DOCUMENT_WRITE`
          : ""
      }${
        item.project
          ? `#ROLE_API_${item.entityName.toUpperCase()}_PROJECT_READ#ROLE_API_${item.entityName.toUpperCase()}_PROJECT_WRITE`
          : ""
      }`,
      item.type ? item.type : "Both",
    ];

    const libsJsonProgram = [
      ++count,
      `${data.applicationName.toUpperCase()}_program_dashboard`,
      moduleFk,
      `${data.applicationName.toUpperCase()}_program_dashboard`,
      "",
     // "",
     // "",
      `${data.applicationName.toUpperCase()}_program_dashboard`,
     // "",
   //   "",
      item.selectedIcon ? `icomoon ${item.selectedIcon}` : "icomoon Profile",
      `{"id": "${`${data.applicationName.toUpperCase()}_program_dashboard`}", "route": "${util.dasherise(
        data.applicationName
      )}/${util.dasherise(
        data.applicationName
      )}-custom-module/program_dashboard`,
      "true",
      programPermisson,
      "BNTV",
      "false",
      // `ROLE_API_${item.entityName.toUpperCase()}_READ#ROLE_API_${item.entityName.toUpperCase()}_WRITE${item.enableWorkflow ? "#ROLE_API_workflowActions_updateActionTask" : ""}${item.enableComments ? `#ROLE_API_${item.entityName.toUpperCase()}_COMMENT_READ#ROLE_API_${item.entityName.toUpperCase()}_COMMENT_WRITE` : ""}${item.enableAttachments ? `#ROLE_API_${item.entityName.toUpperCase()}_DOCUMENT_READ#ROLE_API_${item.entityName.toUpperCase()}_DOCUMENT_WRITE` : ""}${item.project ?`#ROLE_API_${item.entityName.toUpperCase()}_PROJECT_READ#ROLE_API_${item.entityName.toUpperCase()}_PROJECT_WRITE` : ""}`,
      item.platform ? item.platform : "Both",
    ];

    main.push(libsJsonworkorder);
    main.push(libsJsonTasks);
    main.push(libsJsonProgram);
  }
  console.log("main----@@@@@@", main);
  return main;
};

function createExcelFile(newJson, file) {
  stringify.stringify(
    generateModuleExcel(newJson, file),
    { header: true, columns: schema, delimiter: ",", quoted_empty: true },
    (err, output) => {
      if (err) throw err;

      const path = Path.join(__dirname, "..", "build", "module_detail.csv");
      fs.writeFile(path, output, (err) => {
        if (err) throw err;
        console.log("module csv saved.");
      });
    }
  );
}

module.exports = {
  createExcelFile: createExcelFile,
};
