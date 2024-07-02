const fs = require("fs");
const Path = require("path");
const util = require("./util.service");

function writeSystemConfigSql(applicationData, jsonfile) {
  const path = Path.join(__dirname, "..", "build", "finalSql.sql");
  const file = fs.readFileSync(path).toString();
  const domain = jsonfile.hostName || "";
  let sqlQ =
    "\n" +
    `call PROC_ARRAY_APPEND('APPLICATION_DETAILS', 'routes' ,'{"name": "${util.dasherise(
      applicationData.applicationName
    )}", "path": "${util.dasherise(applicationData.applicationName)}"}');`;
  sqlQ +=
    "\n" +
    `call Proc_UPDATE_KEY_VAL_OF_IMPORTS_OBJECT('IMPORT_MAP_JSON','${util.dasherise(
      applicationData.applicationName
    )}','${domain}/${util.dasherise(
      applicationData.applicationName
    )}/main.js');`;
  sqlQ +=
    "\n" +
    `call PROC_UpdateKeyVal('APPLICATION_CONTEXTS','"${applicationData.context.toUpperCase()}"','${domain}/apim/${
      applicationData.context
    }/1.0/rest/');`;
  sqlQ +=
    "\n" +
    `call PROC_JSON_ARRAY_INSERT('APPLICATION_MODULES','{"name": "${`${util
      .dasherise(applicationData.applicationName)
      .toUpperCase()}_APP_NAME`}", "displayName": "${`${util
      .dasherise(applicationData.applicationName)
      .toUpperCase()}_APP_NAME`}" }');`;

  let gridConfiguration = `{"gridOptions":{"suppressHorizontalScroll":false,"rowModelType":"serverSide","suppressPropertyNamesCheck":true,"suppressCapitalization":true,"columnDefs":[{"headerName":"FIELD_TEXT","cellRenderer":"gxAgGridTooltip","field":"label"},{"headerName":"OLD_VALUE","cellRenderer":"gxAgGridTooltip","field":"oldValue"},{"headerName":"NEW_VALUE","cellRenderer":"gxAgGridTooltip","field":"newValue"},{"headerName":"ACTION","cellRenderer":"gxAgGridTooltip","field":"action","pinned":"left"},{"headerName":"MODIFIED_ON","cellRenderer":"gxAgGridDateAndTime","field":"modifiedTime"},{"headerName":"MODIFIED_BY","cellRenderer":"gxAgGridTooltip","field":"lastModifierName"}]},"headerOptions":{"refreshMenuConfig":{"dropdownList":["10s","30s","1m","1h"],"suppressRefreshMenu":false,"suppressDropdown":true}},"footerOptions":{},"filterOptions":{},"componentOptions":{},"sortingOptions":{},"apiOptions":{"apiConfig":{"countConfig":{"context":"${applicationData.context.toUpperCase()}","url":"ResourceFieldAudit/getCount","fiqlKey":"_s","countKey":"totalCount","customFiql":"(identifier1==''$identifier1'';identifier2==''$identifier2'';identifier3==''$identifier3'')","queryParamsUrl":"$_s","suppressNullValues":true,"requestType":"GET"},"dataConfig":{"context":"${applicationData.context.toUpperCase()}","lLimitKey":"llimit","uLimitKey":"ulimit","url":"ResourceFieldAudit/search","datakey":"data","queryParamsUrl":"$data&$_s&orderBy=modifiedTime&orderType=desc&$llimit&$ulimit","requestType":"GET","suppressNullValues":true,"fiqlKey":"_s","customFiql":"(identifier1==''$identifier1'';identifier2==''$identifier2'';identifier3==''$identifier3'')"}}}}`;
  let gridName =
    `${util
      .dasherise(applicationData.applicationName)
      .toUpperCase()}_APP_NAME` + "_HISTORY_AG_GRID";
  sqlQ +=
    "\n" +
    ` insert into DataGridSettings (applicationPackage, datagridname, gridsettings, savegridchoice, mode, view) values ('${util
      .dasherise(applicationData.applicationName)
      .toUpperCase()}_APP_NAME', '${gridName}', '${gridConfiguration}', 0, NULL, NULL);`;

  sqlQ += "\n" + `use FORM_BUILDER;`;

  sqlQ +=
    "\n" +
    `call PROC_FORM_DATA('${util
      .dasherise(applicationData.applicationName)
      .toUpperCase()}_APP_NAME');`;
  sqlQ += "\n" + `use ` + applicationData.applicationName + ` ;`;

  sqlQ +=
    "\n" +
    `insert into User select userid_pk,firstname,lastname,middlename,username from PLATFORM.User;`;
  console.log("before writing sql file");

  fs.writeFileSync(path, file + sqlQ);
}

function writeUseDatabase() {
  let file = "";
  const path = Path.join(__dirname, "..", "build", "finalSql.sql");
  const useDatabase = `\n show databases; \n use PLATFORM;`;
  fs.writeFileSync(path, useDatabase);
}

function writeRoleCreateQuery(obj) {
  let file = "";
  const path = Path.join(__dirname, "..", "build", "finalSql.sql");
  if (fs.existsSync(path)) {
    file = fs.readFileSync(path).toString();
  }
  const quotes = "'";
  let createRoleQuery = `\n insert into Role(name,description,leveltype,moduleid_fk,enabled,deleted,workspaceid_fk) values('${obj.applicationName}-admin','${obj.applicationName} description','NHQ',null,1,0,9);`;
  createRoleQuery += `\n insert into UserRole(userid_fk,roleid_fk,dominant,workspaceid_fk) values (24359,(select roleid_pk from Role where name='${obj.applicationName}-admin'),0,9);`;
  fs.writeFileSync(path, file + createRoleQuery);
}

function writeRolePermission(pObj, obj) {
  let file = "";
  const path = Path.join(__dirname, "..", "build", "finalSql.sql");
  if (fs.existsSync(path)) {
    file = fs.readFileSync(path).toString();
  }
  const quotes = "'";
  const rolePermissionQuery = `\n  insert into RolePermission (roleid_fk,permissionid_fk)  select (select roleid_pk from Role where name='${obj.applicationName}-admin'),permissionid_pk from Permission where name in (${pObj});`;
  fs.writeFileSync(path, file + rolePermissionQuery);
}

function writeGridCreationQuery(obj) {
  const path = Path.join(__dirname, "..", "build", "finalSql.sql");
  const file = fs.readFileSync(path).toString();
  const grid = `\n insert into DataGridSettings (applicationPackage, datagridname, gridsettings, savegridchoice, mode, view) values ('${obj.applicationName}', '${obj.gridName}', '${obj.gridConfiguration}', 0, '${obj.mode}', NULL);`;
  fs.writeFileSync(path, file + grid);
}

function writeviewAndResourceCreationQuery(
  json,
  lib,
  schemaList,
  file,
  entityType,
  isCustomTable = false
) {
  const resource = createResource(
    json,
    lib,
    schemaList,
    file,
    entityType,
    isCustomTable
  );
  return resource;
}

function getResourceJson(json, lib, schemaList) {
  const arr = [
    {
      key: "id",
      type: "number",
      input: true,
      label: "ID",
      validate: { required: false },
      inputType: "number",
      tableView: true,
      description: "ID",
      placeholder: "ID",
      defaultValue: null,
    },
  ];
  json.fields.forEach((ele) => {
    let flag = true;
    if (
      (ele.hasOwnProperty("relationship") &&
        ele.relationship == "independent") ||
      !util.validateColumn(ele)
    ) {
      flag = false;
    }
    if (flag) {
      const temp = {
        key: ele.name,
        type: util.typeGenerator(ele, schemaList),
        input: true,
        label: ele.name,
        validate: {
          required: true,
        },
        inputType: util.typeGenerator(ele, schemaList),
        tableView: true,
        description: ele.name,
        placeholder: ele.name,
        defaultValue: null,
        columnName: ele.nativeName,
      };
      if (ele.type === "Choice") {
        console.log("Choice :");
        console.log(ele);
        temp.dataSrc = "values";
        temp.data = { values: [] };

        ele.properties.choice.forEach((ch) => {
          temp.data.values.push({ label: ch, value: ch });
        });
      }
      if (ele.type === "Reference") {
        console.log("elemnet type" + ele.nativeName);
        temp.keyColumnName = ele.nativeName;
        const relationTable = schemaList.find((x) => {
          return x.name === ele.properties.table;
        });
        let relationColumn = null;
        if (relationTable) {
          relationColumn = relationTable.fields.find((x) => {
            if (x.name === util.getIdentityColumn(schemaList, ele)?.name) {
              return true;
            }
          });
        } else {
          console.log("there is some problem in the relation");
        }
        temp.dataSrc = "resource";
        temp.type = "select";
        if (relationColumn) {
          temp.data = {
            label: {
              key: relationColumn.name,
              type: util.typeGenerator(relationColumn, schemaList),
              placeholder: relationColumn.name,
              inputType: util.typeGenerator(relationColumn, schemaList),
              label: relationColumn.name,
            },
            resource: ele.properties.table,
            masterData: false,
            primaryKeyName: util.getPrimaryKey(relationTable),
          };
        } else {
          console.log("there is some problem in the relation");
        }
      }
      arr.push(temp);
    }
  });
  var obj = {
    display: "form",
    components: arr,
  };
  return obj;
}

function createResource(
  json,
  lib,
  schemaList,
  file,
  entityType,
  isCustomTable
) {
  //  const domain = file.hostName || "";
  let domain = "";
  if (file.internalHostName) {
    domain = `${file.internalHostName}`;
  } else {
    domain = `${file.hostName}/apim/${file.context}/1.0/rest`;
  }
  const obj = {
    resource: {
      resourceJson: isCustomTable
        ? null
        : JSON.stringify(getResourceJson(json, lib, schemaList)),
      name: isCustomTable ? json.nativeName : lib.entityName,
      displayName: lib.entityName,
      entityType: isCustomTable
        ? json.nativeName.replace("_CUSTOM_FIELD", "")
        : entityType.toUpperCase(),
      uniqueIdentifier: JSON.stringify({
        key: util.getPrimaryKeyBySchemaListAndEntity(schemaList, entityType)
          ?.name,
        columnName: util.getPrimaryKeyBySchemaListAndEntity(
          schemaList,
          entityType
        )?.nativeName,
      }),
      className: lib.entityName,
      tableName: json.nativeName,
      contextId: `{"${
        isCustomTable
          ? json.nativeName.replace("_CUSTOM_FIELD", "")
          : entityType.toUpperCase()
      }": "${
        isCustomTable
          ? "ENTITY_ID"
          : util.getPrimaryKeyBySchemaListAndEntity(schemaList, entityType)
              ?.name
      }"}`,
      //      contextInfo: `${domain}/apim/${file.context}/${
      //        lib.name
      //      }/search?filter=${util.lowerFirstLetter(entityType)}.id==$entityId`,
      contextInfo: isCustomTable
        ? null
        : `${domain}/${lib.entityName}/search?filter=${
            util.getPrimaryKeyBySchemaListAndEntity(schemaList, entityType)
              ?.name
          }==$${
            isCustomTable
              ? json.nativeName.replace("_CUSTOM_FIELD", "")
              : entityType.toUpperCase()
          }${json.softDelete ? ";deleted==false" : ""}&offset=0&size=25`,
      restName: lib.entityName,
      urlContextName: lib.context,
      entityRelation: "OneToMany",
      entityIdRequired: false,

      methodIdentifier: JSON.stringify({
        CLASSLEVEL: "CONTROLLER",
        CLASSTYPE: "INTERFACE",
        CLASS_NAME: `${lib.entityName}Controller`,
        PACKAGE_PATH: file.packaging,
        CREATE: "create",
        UPDATE: "update",
        FIND: "findById",
        REMOVE: "deleteById",
      }),
      servicePath: `${domain}/VBHelper`,
      enabledKeys: generateEnabledKeyJson(json),
      application: {
        name: `${util.dasherise(file.applicationName).toUpperCase()}_APP_NAME`,
      },
    },
    applicationName: `${util
      .dasherise(file.applicationName)
      .toUpperCase()}_APP_NAME`,
    isCustomField: isCustomTable || false,
  };

  function generateEnabledKeyJson(json) {
    objTmp = {
      enableWorkflow: json.enableWorkflow,
      enableComment: json.enableComment,
      enableAttachement: json.enableAttachement,
      extendable: json.extendable,
      softDelete: json.softDelete,
      project: json.project,
      aoa: json.aoa,
      geography: json.geography,
    };
    return JSON.stringify(objTmp);
  }
  if (isCustomTable) {
    obj.resource.contextIdSetter = `{"${json.nativeName.replace(
      "_CUSTOM_FIELD",
      ""
    )}": "setEntityId"}`;
  }
  return obj;
}

function generateCustomTableJson(
  json,
  lib,
  schemaList,
  file,
  entityType,
  isCustomTable = true
) {
  //  const domain = file.hostName || "";
  let domain = "";
  if (file.internalHostName) {
    domain = `${file.internalHostName}`;
  } else {
    domain = `${file.hostName}/apim/${file.context}/1.0/rest`;
  }
  const obj = {
    resourceInfo: {
      resource: {
        resourceJson: isCustomTable
          ? null
          : JSON.stringify(getResourceJson(json, lib, schemaList)),
        name: isCustomTable ? json.nativeName : lib.entityName,
        displayName: lib.entityName,
        entityType: isCustomTable
          ? json.nativeName
              .replace("_CUSTOM_FIELD", "")
              .replace("_SPECIAL_COMPONENT", "")
          : entityType.toUpperCase(),
        uniqueIdentifier: JSON.stringify({
          key: util.getPrimaryKeyBySchemaListAndEntity(schemaList, entityType)
            ?.name,
          columnName: util.getPrimaryKeyBySchemaListAndEntity(
            schemaList,
            entityType
          )?.nativeName,
        }),
        className: lib.entityName,
        contextId: `{"${
          isCustomTable
            ? json.nativeName
                .replace("_CUSTOM_FIELD", "")
                .replace("_SPECIAL_COMPONENT", "")
            : entityType.toUpperCase()
        }": "${
          isCustomTable
            ? "ENTITY_ID"
            : util.getPrimaryKeyBySchemaListAndEntity(schemaList, entityType)
                ?.name
        }"}`,
        //      contextInfo: `${domain}/apim/${file.context}/${
        //        lib.name
        //      }/search?filter=${util.lowerFirstLetter(entityType)}.id==$entityId`,
        contextInfo: isCustomTable
          ? null
          : `${domain}/${lib.entityName}/search?filter=${
              util.getPrimaryKeyBySchemaListAndEntity(schemaList, entityType)
                ?.name
            }==$${
              isCustomTable
                ? json.nativeName
                    .replace("_CUSTOM_FIELD", "")
                    .replace("_SPECIAL_COMPONENT", "")
                : entityType.toUpperCase()
            }${json.softDelete ? ";deleted==false" : ""}&offset=0&size=25`,
        restName: lib.entityName,
        urlContextName: lib.context,
        entityRelation: "OneToMany",
        entityIdRequired: false,

        parentResource: JSON.stringify({
          mapping: true,
          mappingKey: "entityId",
          resourceName: lib.entityName
            .replace("CustomField", "")
            .replace("SpecialComponent", ""),
          parentMappingKey: "id",
        }),

        methodIdentifier: JSON.stringify({
          CLASSLEVEL: "CONTROLLER",
          CLASSTYPE: "INTERFACE",
          CLASS_NAME: `${lib.entityName}Controller`,
          PACKAGE_PATH: file.packaging,
          CREATE: "create",
          UPDATE: "update",
          FIND: "findById",
          REMOVE: "deleteById",
        }),
        servicePath: `${domain}/VBHelper`,
        application: {
          name: `${util
            .dasherise(file.applicationName)
            .toUpperCase()}_APP_NAME`,
        },
      },
      applicationName: `${util
        .dasherise(file.applicationName)
        .toUpperCase()}_APP_NAME`,
      isCustomField: isCustomTable || false,
    },
    customField: {
      json: "[]",
      type: json.nativeName.includes("_CUSTOM_FIELD")
        ? "CUSTOM_FIELD"
        : "SPECIAL_COMPONENT",
      name: isCustomTable ? json.nativeName : lib.entityName,
      category: json.nativeName
        .replace("_CUSTOM_FIELD", "")
        .replace("_SPECIAL_COMPONENT", ""),
      bntvApplication: {
        name: `${util.dasherise(file.applicationName).toUpperCase()}_APP_NAME`,
      },
      visible: true,
      className: lib.entityName,
      keyPrefix: `${util.camelize(
        json.nativeName
          .replace("_CUSTOM_FIELD", "")
          .replace("_SPECIAL_COMPONENT", "")
          .toLowerCase()
      )}`,
    },
  };
  if (isCustomTable) {
    obj.resourceInfo.resource.contextIdSetter = `{"${json.nativeName
      .replace("_CUSTOM_FIELD", "")
      .replace("_SPECIAL_COMPONENT", "")}": "setEntityId"}`;
  }
  return obj;
}

module.exports = {
  writeSystemConfigSql,
  writeGridCreationQuery,
  writeviewAndResourceCreationQuery,
  writeUseDatabase,
  writeRolePermission,
  writeRoleCreateQuery,
  generateCustomTableJson,
};
