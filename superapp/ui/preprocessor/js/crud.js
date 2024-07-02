const fs = require("fs");
const systemConfig = require("./systemConfig");
const util = require("./util.service");
const Path = require("path");

// Page, form and grid generation
const generateCrudNew = (element, lib, schemaList, file) => {
  const primaryId = util.getPrimaryKey(element);
  const identityColumn = util.getIdentityColumnFromTable(element);
  const selectiveProperties = {};
  let json = {
    gridName: `${lib.name} ${lib.applicationName}`, //"USER-MANAGEMENT_USER_AG_GRID",
    host: "component",
    crudApi: {
      create: {
        url: `${lib.entityName}/create`,
        context: `${lib.context.toUpperCase()}`,
        method: "post",
      },
      view: {
        url: `${lib.entityName}/findById?${primaryId}=$${primaryId}`,
        context: `${lib.context.toUpperCase()}`,
        method: "get",
      },
      edit: {
        url: `${lib.entityName}/update`,
        context: `${lib.context.toUpperCase()}`,
        method: "post",
      },
      delete: {
        url: `${lib.entityName}/deleteById?${primaryId}=$${primaryId}`,
        context: `${lib.context.toUpperCase()}`,
        method: "get",
      },
      bulk_delete: {
        url: `${lib.entityName}/deleteAll`,
        context: `${lib.context.toUpperCase()}`,
        method: "post",
      },
      workflow: {
        url: `WorkflowActions/updateActionTask`,
        context: `${lib.context.toUpperCase()}`,
        method: "post",
      },
      search: {
        url: `${lib.entityName}/search?${
          element.softDelete ? "filter=deleted==false&" : ""
        }offset=0&size=1000&orderBy=modifiedTime&orderType=desc`,
        context: `${lib.context.toUpperCase()}`,
        method: "get",
      },
      export: {
        url: `${lib.entityName}/export?${
          element.softDelete ? "filter=deleted==false&" : ""
        }orderBy=modifiedTime&orderType=desc`,
        context: `${lib.context.toUpperCase()}`,
        method: "get",
      },
      import: {
        url: `${lib.entityName}/importData`,
        context: `${lib.context.toUpperCase()}`,
        method: "post",
      },
      template: {
        url: `${lib.entityName}/downloadTemplate?fileName=${lib.entityName}.xlsx`,
        context: `${lib.context.toUpperCase()}`,
        method: "get",
      },
    },

    commentApi: {
      create: {
        url: `${lib.entityName}/createComment`,
        context: `${lib.context.toUpperCase()}`,
        method: "post",
      },
      delete: {
        url: `${lib.entityName}/deleteCommentByReferenceId`,
        context: `${lib.context.toUpperCase()}`,
        method: "post",
      },
      searchComment: {
        url: `${lib.entityName}/searchComment`,
        context: `${lib.context.toUpperCase()}`,
        method: "post",
      },
      updateComment: {
        url: `${lib.entityName}/updateComment`,
        context: `${lib.context.toUpperCase()}`,
        method: "get",
      },
    },
    attachmentApi: {
      upload: {
        url: `${lib.entityName}/uploadDocument`,
        context: `${lib.context.toUpperCase()}`,
        method: "post",
      },

      getFiles: {
        url: `${lib.entityName}/getMyDocuments`,
        context: `${lib.context.toUpperCase()}`,
        method: "post",
      },

      delete: {
        url: `${lib.entityName}/deleteFromUploadWindow`,
        context: `${lib.context.toUpperCase()}`,
        method: "post",
      },

      subFolder: {
        url: `${lib.entityName}/getSubFolderByReferenceValueAndType`,
        context: `${lib.context.toUpperCase()}`,
        method: "get",
      },
    },

    id: `${lib.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}`,
    page: 0,
    title: lib.displayName,
    identityColumn: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
      .dasherise(element.displayName)
      .toUpperCase()}${
      identityColumn
        ? "." + util.dasherise(identityColumn.displayName).toUpperCase()
        : ""
    }`,
    display: "form",
    formName: `${lib.name.toUpperCase()}`,
    numPages: 0,
    selected: true,
    components: [
      {
        id: `section_${Math.random().toPrecision(4)}`,
        type: "panel",
        hover: false,
        input: false,
        title: "",
        main: true,
        hideHeader: true,
        columns: 2,
        category: "layout",
        isHidden: false,
        parentId: "page_2705",
        components: [],
        isReadOnly: false,
        tooltipdata: null,
        startNewPage: true,
        buttonProperties: {
          type: null,
        },
      },
    ],
    footerConfig: {
      hover: false,
      buttonAlignment: "default",
      pageCount: 0,
      isFooterReq: true,
      buttonList: {
        middleList: [],
        leftList: [],
        rightList: [
          {
            allowDelete: false,
            hover: false,
            buttonType: "stroked",
            showOnlyInLastPage: false,
            isFooterButton: true,
            toolTipContent: "",
            label: "CANCEL_TEXT",
            type: "button",
            showOnLastPage: false,
            footerButtonType: "cancel",
          },
          {
            configureCommentReason: false,
            themeoption: ["ACCENT", "PRIMARY", "WARNING"],
            checklistComplete: true,
            checkValidation: true,
            type: "button",
            showLabel: true,
            disableOnInvalid: false,
            checkValidationOnButtonClick: true,
            rulesData: {
              visible: {
                when: [
                  {
                    condition: "",
                    other: [],
                    secondCondition: null,
                    firstCondition: null,
                  },
                ],
                validation: "",
              },
              editable: {
                when: [
                  {
                    condition: "",
                    other: [],
                    secondCondition: null,
                    firstCondition: null,
                  },
                ],
                validation: "",
              },
              background: {
                when: [
                  {
                    condition: "",
                    other: [],
                    secondCondition: null,
                    firstCondition: null,
                  },
                ],
              },
              mandatory: {
                when: [
                  {
                    condition: "",
                    other: [],
                    secondCondition: null,
                    firstCondition: null,
                  },
                ],
              },
            },
            checklistComplete: false,
            action: null,
            block: false,
            id: "footer_button_1157",
            group: "submit",
            sourceTable: null,
            btnPositionKey: "left",
            $$hashKey: null,
            showSaveSuccessMsg: "",
            size: null,
            isTranslate: false,
            saveOnly: true,
            rightIcon: null,
            hideOrDisable: "show",
            buttonValue: "submit",
            roleslist: ["All Roles"],
            leftIcon: null,
            values: [
              {
                text: "YES_TEXT",
                value: "default",
              },
              {
                text: "NO_TEXT",
                value: "custom",
              },
            ],
            icon: "button",
            description: null,
            title: "BUTTON",
            hover: false,
            isReadOnly: false,
            configMsg: null,
            inputTypeForTooltip: "LANGUAGE_KEY",
            msgDescription: null,
            theme: "accent",
            disabled: false,
            placeholder: "",
            key: "submittext",
            isMsgConfigured: "custom",
            validate: {
              required: false,
            },
            showSaveFailureMsg: "",
            buttonProperties: {
              type: null,
            },
            label: "SUBMIT_TEXT",
            footerButtonType: "submit",
            isHidden: false,
            buttonLabel: null,
            selectedthems: "accent",
            showOnlyInLastPage: false,
            isFooterButton: true,
            category: "fields",
          },
        ],
      },
      type: "footer",
    },
    application: 1,
    description: "Sample Form",
    openInDialog: false,
    isOpenInDialog: false,
    displayFormName: "Sample Form",
    sourcesToBeSaved: [],
    subApplicationName: "All",
    context: lib.context.toUpperCase(),
    applicationName: `${lib.applicationName.toUpperCase()}_APP_NAME`,
    tableName: lib.entityName,
    primaryKeyName: primaryId,
    nativeName: lib.nativeName,
    wrapperName: `${util.camelize(element.name)}`,
  };
  let isGps = 0;

  // check for undefined by narayan
  if (
    !(typeof element === "undefined") &&
    !(typeof element.fields === "undefined")
  ) {
    element.fields.forEach((item) => {
      if (util.validateColumn(item)) {
        let key1 = item.name ? item.name : item.nativeName;
        let label1 = `${lib.displayName}.${util
          .dasherise(item.displayName)
          .toUpperCase()}`;

        if (item.type === "GPS") {
          isGps++;
          key1 = key1
            .replace("Latitude", "")
            .replace("Longitude", "")
            .replace("latitude", "")
            .replace("longitude", "")
            .replace("LATITUDE", "")
            .replace("LONGITUDE", "");
          label1 = label1
            .replace("Latitude", "")
            .replace("Longitude", "")
            .replace("latitude", "")
            .replace("longitude", "")
            .replace("LATITUDE", "")
            .replace("LONGITUDE", "");
        }

        let temp1 = {
          id: `${util.typeGenerator(
            item,
            schemaList
          )}_${Math.random().toPrecision(4)}`,
          type: util.typeGenerator(item, schemaList),
          key: key1,
          icon: "text",
          text: "",
          email: false,
          hover: false,
          label: label1,
          title: label1,
          prefix: null,
          source: lib.entityName,
          suffix: null,
          apiCall: null,
          context: null,
          category: "fields",
          disabled: false,
          isHidden: false,
          parentid: "section_8914",
          redrawOn: "submit",
          validate: {},
          dependent: false,
          hideLabel: false,
          inputType: util.typeGenerator(item, schemaList),
          conditional: {
            eq: "",
            show: "",
            when: "",
            disable: "",
          },
          description: null,
          placeholder: `Please enter ${item.displayName}`,
          sourceTable: element.nativeName,
          autocomplete: false,
          defaultValue: null,
          isdependence: false,
          queryBuilder: {
            table: null,
            database: null,
            selectQuery: null,
          },
          buttonProperties: {
            type: null,
          },
          displayExpression: null,
        };
        temp1 = util.updateViewJsonAsPerTypes(
          temp1,
          item,
          lib,
          schemaList,
          element
        );
        if (item.type == "Reference") {
          selectiveProperties[temp1.key] =
            util.getPrimaryKeyBySchemaListAndEntity(
              schemaList,
              item.properties.table
            )?.name;
        }
        if (!json.sourcesToBeSaved.includes(lib.entityName)) {
          json.sourcesToBeSaved.push(lib.entityName);
        }

        if (isGps <= 1) {
          json.components[0].components.push(temp1);
          if (isGps > 1) {
            isGps = 0;
          }
        }
      }
    });
  }

  json.fileName = `${lib.applicationName}_${element.name}_crud`;
  json.viewName = `${lib.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`;
  json.moduleName = lib.applicationName;
  const tempJSON = JSON.stringify(json);
  json = JSON.stringify(json, undefined, 2);
  const path = Path.join(
    __dirname,
    "..",
    "build",
    `${lib.applicationName}_${element.name}_crud.json`
  );
  fs.writeFileSync(path, json);
  return tempJSON;
};

const generatePageConfigurationJson = (element, appNameD) => {
  if (element.globalSearch) {
    let json = {
      appName: appNameD,
      entityName: element.nativeName,
      columnIndexFields: util.arrayToCommaSeparatedString(
        element.globalSearchData
      ),
    };
    return json;
  }
};

const generateGridViews = (element, lib, schemaList) => {
  const identityColumn = util.getIdentityColumnFromTable(element);
  let json = {};
  if (element?.tileConfig) {
    json.tileConfig = {};
  } else if (element?.kanbanConfig) {
    json.kanbanConfig = {};
  } else if (element?.splitViewConfig) {
    json.splitViewConfig = {};
  }
  if (element && element.tileConfig) {
    element.tileConfig.fields.forEach((item) => {
      if (util.validateColumn(item)) {
        if (item.type === "Reference") {
          const table = util.getTablePropsByPojoName(
            schemaList,
            item.entityName
          );
          table.fields.forEach((el) => {
            if (el.type != "Reference" && util.validateColumn(el)) {
              item.key = `${item.entityName.toLowerCase()}.${el.name}`;
              item.displayName = `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                .dasherise(table.displayName)
                .toUpperCase()}_${util
                .dasherise(el.displayName)
                .toUpperCase()}`;
            }
            if (util.getIdentityColumnFromTable(table).name === el.name) {
              item.navigationConfig = {
                applicationName: lib.applicationName,
                entity: item.entityName.toLowerCase(),
                route: `${util.dasherise(
                  lib.applicationName
                )}/${item.entityName.toLowerCase()}/${item.entityName.toLowerCase()}-view`,
              };
            }
          });
        } else {
          if (util.typeGenerator(item, schemaList) == "date") {
          }
        }
      }
    });
    json = {
      tileConfig: element.tileConfig,
    };
  } else {
    json = {
      tileConfig: {
        title: {},
        subTitle: {},
        fields: [],
      },
    };

    let mapJson = {};
    mapJson.label = identityColumn.name;
    if (identityColumn.type == "Reference") {
      console.log("tile config identityColumn Reference");
      console.log(identityColumn);
      let temp = util.getTablePropsByNativeName(
        schemaList,
        identityColumn.name.toUpperCase()
      );

      console.log("tile config identityColumn Reference temp");
      console.log(temp);

      if (temp) {
        if (temp.nativeKey) {
          json.tileConfig.title.key =
            identityColumn.name + "." + temp.nativeKey;
        } else {
          json.tileConfig.title.key = identityColumn.name + "." + temp.name;
        }
        json.tileConfig.title.displayName = temp.displayName;
      } else {
        json.tileConfig.title.key =
          identityColumn.name + "." + util.camelize(identityColumn.displayName);
        json.tileConfig.title.displayName = identityColumn.displayName;
      }
      console.log("tile config identityColumn Reference json.tileConfig");
      console.log(json.tileConfig);
    } else {
      json.tileConfig.title.key = identityColumn.name;
      json.tileConfig.title.displayName = identityColumn.displayName;
    }

    json.tileConfig.title.type = identityColumn.type; //"text";
    json.tileConfig.title.columnType =
      util.typeGenerator(identityColumn, schemaList) || "text";
    json.tileConfig.title.entityName = element.name;
    for (let item of element.fields) {
      if (
        util.validateColumn(item) &&
        item.type !== "Reference" &&
        !item.identityColumn
      ) {
        json.tileConfig.subTitle.key = item.name;
        json.tileConfig.subTitle.displayName = item.displayName;
        json.tileConfig.subTitle.type = item.type; //"text";
        json.tileConfig.subTitle.columnType =
          util.typeGenerator(item, schemaList) || "text";
        json.tileConfig.subTitle.entityName = element.name;
        break;
      }
    }

    for (let item of element.fields) {
      if (
        json.tileConfig.title.key !== item.name &&
        json.tileConfig.subTitle.key !== item.name &&
        util.validateColumn(item)
      ) {
        if (
          !(item.properties && item.properties.mappedAs == "OneToMany") &&
          util.validateColumn(item)
        ) {
          if (item.type === "Reference") {
            const table = util.getTablePropsByPojoName(
              schemaList,
              item.properties.table
            );

            // check for undefined by narayan
            if (
              !(typeof table === "undefined") &&
              !(typeof table.fields === "undefined")
            ) {
              table.fields.forEach((el) => {
                let identity = util.getIdentityColumnFromTable(table);
                if (
                  el.type != "Reference" &&
                  util.validateColumn(el) &&
                  identity.name === el.name
                ) {
                  let field = {
                    key: el.name,
                    displayName: el.displayName,
                    type: "text",
                    entityName: item.properties.table,
                  };
                  field.key = `${item.name}.${el.name}`;
                  field.displayName = `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                    .dasherise(table.displayName) //.dasherise(item.name)
                    .toUpperCase()}_${util
                    .dasherise(el.displayName)
                    .toUpperCase()}`;
                  field.type = "Reference";
                  field.columnType = "text";
                  if (util.typeGenerator(el, schemaList) == "date") {
                    field.columnType = "date";
                  }
                  field.navigationConfig = {
                    applicationName: lib.applicationName,
                    entity: item.name,
                    route: `${util.dasherise(
                      lib.applicationName
                    )}/${item.name.toLowerCase()}/${item.name.toLowerCase()}-view`,
                  };
                  if (
                    json.tileConfig.fields.length < 4 &&
                    field.columnType != "textarea"
                  ) {
                    json.tileConfig.fields.push(field);
                  }
                }
              });
            }
          } else {
            let field = {
              key: item.name,
              displayName: item.displayName,
              type: item.type, //"text",
              columnType: util.typeGenerator(item, schemaList) || "text",
              entityName: element.name,
            };
            if (
              json.tileConfig.fields.length < 4 &&
              field.columnType != "textarea"
            ) {
              json.tileConfig.fields.push(field);
            }
          }
        }
      }

      if (item.type === "GPS") {
        if (
          item.name?.includes("latitude") ||
          item.name?.includes("Latitude") ||
          item.name?.includes("LATITUDE") ||
          item.nativeName?.includes("latitude") ||
          item.nativeName?.includes("Latitude") ||
          item.nativeName?.includes("LATITUDE")
        ) {
          mapJson.latitude = item.name ? item.name : item.nativeName;
        }
        if (
          item.name?.includes("longitude") ||
          item.name?.includes("Longitude") ||
          item.name?.includes("LONGITUDE") ||
          item.nativeName?.includes("longitude") ||
          item.nativeName?.includes("Longitude") ||
          item.nativeName?.includes("LONGITUDE")
        ) {
          mapJson.longitude = item.name ? item.name : item.nativeName;
        }
      }
    }

    json.splitViewConfig = {
      title: json.tileConfig.title,
      subTitle: json.tileConfig.subTitle,
      countUrl: null,
      dataUrl: null,
      apiOptions: null,
    };

    if (mapJson && mapJson["latitude"] && mapJson["longitude"]) {
      json.mapViewConfig = mapJson;
    }
  }

  const tempJSON = JSON.stringify(json);
  json = JSON.stringify(json, undefined, 2);
  const path = Path.join(
    __dirname,
    "..",
    "build",
    `${element.name}_grid_views.json`
  );
  fs.writeFileSync(path, json);
  return tempJSON;
};

const generateGridAndFilterNew = (element, lib, schemaList, file) => {
  const identityColumn = util.getIdentityColumnFromTable(element);
  let toggleKanbanPushed = false;
  let toggleDateTimePushed = false;
  let toggleGpsPushed = false;

  let json = {
    gridOptions: {
      suppressHorizontalScroll: false,
      rowModelType: "infinite",
      rowSelection: "multiple",
      pagination: true,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      columnDefs: [
        {
          headerName: "",
          field: "checkbox",
          headerComponent: "gxAgGridSelectAllCheckBox",
          headerCheckboxSelection: true,
          checkboxSelection: true,
          width: 50,
        },
      ],
    },
    apiOptions: {
      apiConfig: {
        countConfig: {
          countKey: "",
          params: {
            orderBy: "modifiedTime",
            orderType: "desc",
          },
          context: `${lib.context.toUpperCase()}`,
          fiqlKey: "filter",
          suppressDefaultFiqlOnApply: true,
          queryParamsUrl: "$filter",
          quickFilterKey: identityColumn
            ? `${util.lowerFirstLetter(element.name)}.${identityColumn.name}`
            : null,
          defaultFiql: element.softDelete
            ? "deleted==false;id=ge=0;"
            : "id=ge=0;",
          url: `${lib.entityName}/count`,
          requestType: "GET",
          suppressNullValues: true,
        },
        dataConfig: {
          context: `${lib.context.toUpperCase()}`,
          dataKey: "data",
          suppressDefaultFiqlOnApply: true,
          fiqlKey: "filter",
          quickFilterKey: identityColumn
            ? `${util.lowerFirstLetter(element.name)}.${identityColumn.name}`
            : null,
          defaultFiql: element.softDelete
            ? "deleted==false;id=ge=0;"
            : "id=ge=0;",
          queryParamsUrl: "$filter&$offset&$size&$orderBy&$orderType",
          requestType: "GET",
          suppressNullValues: true,
          params: {
            orderBy: "modifiedTime",
            orderType: "desc",
          },
          url: `${lib.entityName}/search`,
          lLimitKey: "offset",
          pageSizeKey: "size",
        },
      },
    },
    filterOptions: {
      enableFiqlCondition: true,
      filterConfig: [],
    },
    sortingOptions: {
      sortConfig: [],
    },
    componentOptions: {
      exportOptions: {
        fileName: `${lib.entityName} List`,
      },
      actionButtonsMode: "menu",
      suppressTableOptions: true,
      isCustomCardLayout: true,
      defaultView: "List",
      menuIconColumns: 2,
    },
    listActions: [
      {
        label: "Create",
        id: "create",
        icon: "plus_small",
        removable: false,
        navigateTo: "form",
        templateName: element.isCustomTable
          ? `${file.applicationName.toUpperCase()}_${element.nativeName.toUpperCase()}_FORM`
          : `${file.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
      },
      {
        label: "Import",
        icon: "Upload-Outline",
        id: "import",
        url: `${lib.entityName}/importData`,
        context: `${lib.context.toUpperCase()}`,
      },
      {
        label: "Export",
        icon: "Download-Outline",
        id: "export",
        url: `${lib.entityName}/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc`,
        context: `${lib.context.toUpperCase()}`,
      },
    ],
    rowActions: [
      {
        label: "View",
        id: "view",
        icon: "Eye-Outline",
        removable: false,
        navigateTo: "page",
        templateName: `${lib.context.toUpperCase()}_${lib.entityName.toUpperCase()}_PAGE_VIEW`,
      },
      {
        label: "Edit",
        id: "edit",
        icon: "Edit-Outline",
        removable: false,
        navigateTo: "form",
        templateName: element.isCustomTable
          ? `${file.applicationName.toUpperCase()}_${element.nativeName.toUpperCase()}_FORM`
          : `${file.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
      },
      {
        label: "Delete",
        id: "delete",
        icon: "Delete-Outline",
        removable: false,
        url: `${lib.entityName}/deleteById?id=$id`,
        context: `${lib.context.toUpperCase()}`,
      },
    ],
    rowClickAction: {
      label: "View",
      id: "view",
      icon: "Eye-Outline",
      removable: false,
      navigateTo: "page",
      templateName: `${lib.context.toUpperCase()}_${lib.entityName.toUpperCase()}_PAGE_VIEW`,
    },
    headerOptions: {
      suppressFilterButton: false,
      suppressQuickFilter: true,
      suppressCountLabel: false,
      toggleList: [
        {
          value: "tile",
          displayName: "tile",
          iconName: "Big-Card",
          icon: "Big-Card$fontset$icomoon",
          hasIcon: true,
          checked: false,
        },
        {
          value: "splitview",
          displayName: "splitview",
          iconName: "split",
          icon: "split$fontset$icomoon",
          hasIcon: true,
          checked: false,
        },
      ],
      viewSwitchType: "menu-button",
      suppressViewSwitch: false,
      suppressTileSwitch: true,
    },
    footerOptions: {
      suppressFooter: true,
    },
    multipleListJson: [
      {
        type: "tile",
        gridNames: `${lib.name} ${lib.applicationName}_tile`,
      },
      {
        type: "splitview",
        gridNames: `${lib.name} ${lib.applicationName}_splitview`,
      },
    ],
    type: "grid",
    entity: `${lib.entityName}`,
    restName: `${lib.entityName}`,
    context: `${lib.context.toUpperCase()}`,
    applicationName: `${lib.applicationName.toUpperCase()}_APP_NAME`,
    cellFormatting: {},
  };
  if (element.extendable) {
    json.componentOptions = {
      actionButtonsMode: "menu",
      exportOptions: {
        fileName: `${lib.entityName} List`,
      },
      customFieldsConfig: {
        category: element.nativeName,
        tableConfig: [
          {
            tableName: `${element.name}CustomField`,
            wrapperKey: `${util.camelize(element.name)}CustomField`,
          },
        ],
      },
    };
  }

  element.fields.forEach((item) => {
    if (
      !(item.properties && item.properties.mappedAs == "OneToMany") &&
      util.validateColumn(item)
    ) {
      if (item.type === "Reference") {
        const table = util.getTablePropsByPojoName(
          schemaList,
          item.properties.table
        );
        if (
          !(typeof table === "undefined") &&
          !(typeof table.fields === "undefined")
        ) {
          table.fields.forEach((el) => {
            if (el.type != "Reference" && util.validateColumn(el)) {
              const temp = {
                headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                  .dasherise(table.displayName)
                  .toUpperCase()}_${util
                  .dasherise(el.displayName)
                  .toUpperCase()}`,
                field: `${item.name}.${el.name}`,
                width: 160,
                tooltipField: `${item.name}.${el.name}`,
                sortable: true,
                valueGetterParams: {
                  suppressTranslation: true,
                },
                cellRendererParams: { suppressTranslation: true },
              };
              let cellItem = {
                label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                  .dasherise(table.displayName)
                  .toUpperCase()}_${util
                  .dasherise(el.displayName)
                  .toUpperCase()}`,
                key: `${util.lowerFirstLetter(item.name)}.${el.name}`,
                filterType: "quick",
                type: "",
              };
              cellItem = util.getFilterConfigByType(el, cellItem);

              if (temp && cellItem) {
                let fieldType = cellItem.type;
                if (item?.type == "DateTime") {
                  fieldType = "dateTime";
                } else {
                  fieldType = util.typeGenerator(el, schemaList);
                }
                cellItem.fieldType = fieldType;
              }

              temp.cellData = cellItem;
              const sortTemp = {
                label: `${item.name}.${el.name}`,
                colId: `${item.name}.${el.name}`,
                orderByKey: "orderBy",
                orderByValue: `${item.name}.${el.name}`,
                orderTypeKey: "orderType",
                asc: "asc",
                desc: "desc",
              };
              if (util.typeGenerator(el, schemaList) == "date") {
                temp.cellRenderer = "gxAgGridDateAndTime";
                delete temp["tooltipField"];
              }
              if (util.getIdentityColumn(schemaList, item)?.name === el.name) {
                temp.navigationConfig = {
                  applicationName: lib.applicationName,
                  entity: item.name,
                  route: `${util.dasherise(
                    lib.applicationName
                  )}/${util.dasherise(item.properties.table)}/${util.dasherise(
                    item.properties.table
                  )}-view`,
                };
                temp.cellRenderer = "hyperlinkCellRenderer";
                const quotes = [
                  "Journal",
                  "String",
                  "Choice",
                  "Email",
                ].includes(el.type)
                  ? "''"
                  : "";
                const filterItem = {
                  label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                    .dasherise(table.displayName)
                    .toUpperCase()}_${util
                    .dasherise(el.displayName)
                    .toUpperCase()}`,
                  key: `${util.lowerFirstLetter(item.name)}.${el.name}`,
                  type: "autocomplete",
                  fieldType: "autocomplete",
                  filterType: "quick",
                  // disableFiql: true,
                  apiConfig: {
                    rest: `${table.name}/search?filter=${
                      el.name
                    }==${quotes}*$searchText*${quotes}${
                      table.softDelete ? ";deleted==false" : ""
                    }&offset=0&size=25`,
                    context: `${lib.context.toUpperCase()}`,
                    type: "GET",
                    dataKey: el.name,
                    dataType: "object",
                    params: [
                      {
                        key: "searchText",
                        fromSearch: true,
                      },
                    ],
                  },
                };
                json.filterOptions.filterConfig.push(filterItem);
                temp.cellData = filterItem;
              }
              temp.editable = false;
              temp.onCellValueChanged = "onValueChange";
              temp.cellEditor = "myCustomEditor";
              json.gridOptions.columnDefs.push(temp);
              util.isPushSortTemp(sortTemp) &&
                json.sortingOptions.sortConfig.push(sortTemp);
            }
          });
        }
      } else {
        let type = "";
        const temp = {
          headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
          field: item.name,
          width: 160,
          sortable: true,
          tooltipField: item.name,
          editable: false,
          onCellValueChanged: "onValueChange",
          cellEditor: "myCustomEditor",
          valueGetterParams: {
            suppressTranslation: true,
          },
          cellRendererParams: { suppressTranslation: true },
        };
        const sortTemp = {
          label: item.name,
          colId: item.name,
          orderByKey: "orderBy",
          orderByValue: item.name,
          orderTypeKey: "orderType",
          asc: "asc",
          desc: "desc",
        };
        util.isPushSortTemp(sortTemp) &&
          json.sortingOptions.sortConfig.push(sortTemp);
        if (util.typeGenerator(item, schemaList) == "date") {
          temp.cellRenderer = "gxAgGridDateAndTime";
          delete temp["tooltipField"];
        }
        if (util.typeGenerator(item, schemaList) == "textarea") {
          temp.hide = true;
        }

        let filterItem = {
          label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
          key: `${item.name}`,
          filterType: "quick",
        };

        if (item.type != "GPS") {
          filterItem = util.getFilterConfigByType(item, filterItem);
          if (!item.apiConfig && !item.identityColumn) {
            json.filterOptions.filterConfig.push(filterItem);
          }

          temp.cellData = filterItem;
        }

        if (temp && temp.cellData) {
          let fieldType = temp.type;
          if (item?.type == "DateTime") {
            fieldType = "dateTime";
          } else {
            fieldType = util.typeGenerator(item, schemaList);
          }
          temp.cellData.fieldType = fieldType;
        }

        json.gridOptions.columnDefs.push(temp);
      }
    }
    if (
      (item.type == "Choice" || item.type == "Select") &&
      !toggleKanbanPushed
    ) {
      toggleKanbanPushed = true;
      json.headerOptions.toggleList.push({
        value: "kanban",
        displayName: "kanban",
        iconName: "Kanban",
        icon: "Kanban$fontset$icomoon",
        hasIcon: true,
        checked: false,
      });

      json.multipleListJson.push({
        type: "kanban",
        gridNames: `${lib.name} ${lib.applicationName}_kanban`,
      });
    }

    if (item.type == "DateTime" && !toggleDateTimePushed) {
      toggleDateTimePushed = true;
      json.headerOptions.toggleList.push(
        {
          value: "timeline",
          displayName: "timeline",
          iconName: "timeline",
          icon: "timeline$fontset$icomoon",
          hasIcon: true,
          checked: false,
        },
        {
          value: "calendar",
          displayName: "calendar",
          iconName: "Calendar",
          icon: "Calendar$fontset$icomoon",
          hasIcon: true,
          checked: false,
        }
      );

      json.multipleListJson.push(
        {
          type: "timeline",
          gridNames: `${lib.name} ${lib.applicationName}_timeline`,
        },
        {
          type: "calendar",
          gridNames: `${lib.name} ${lib.applicationName}_calendar`,
        }
      );
    }

    if (item.type == "GPS" && !toggleGpsPushed) {
      toggleGpsPushed = true;
      json.headerOptions.toggleList.push({
        value: "map",
        displayName: "map",
        iconName: "map",
        icon: "map$fontset$icomoon",
        hasIcon: true,
        checked: false,
      });

      json.multipleListJson.push({
        type: "map",
        gridNames: `${lib.name} ${lib.applicationName}_map`,
      });
    }
  });
  if (element.enableWorkflow) {
    json.gridOptions.columnDefs.push({
      headerName: "WORKFLOW_STAGE",
      field: "workflowStage",
      tooltipField: "workflowStage",
      sortable: true,
      width: 160,
    });
    json.filterOptions.filterConfig.push({
      label: "WORKFLOW_STAGE",
      key: "workflowStage",
      type: "input",
      filterType: "quick",
    });
    json.sortingOptions.sortConfig.push({
      label: "workflowStage",
      colId: "workflowStage",
      orderByKey: "orderBy",
      orderByValue: "workflowStage",
      orderTypeKey: "orderType",
      asc: "asc",
      desc: "desc",
    });
  }

  json.gridOptions.columnDefs.push({
    headerName: "",
    field: "",
    cellRenderer: "gxAgGridMenuButton",
    pinned: "right",
    width: 80,
    suppressMenu: true,
  });
  let fiql = "";
  schemaList.forEach((item) => {
    const filtered = item.fields.filter((f) => {
      return f.isPrimary || (item.name === element.name && f.identityColumn);
    });
    fiql += filtered.reduce((pre, current) => {
      const quotes = ["Journal", "String", "Choice", "Email"].includes(
        current.type
      )
        ? "''"
        : "";
      return (
        pre +
        `${
          item.name === lib.entityName
            ? ""
            : util.lowerFirstLetter(item.name) + "."
        }${current.name}==${quotes}${quotes ? "*" : ""}$${util.lowerFirstLetter(
          item.name
        )}.${current.name}${quotes ? "*" : ""}${quotes};`
      );
    }, "");
  });

  // menu icon number of columns
  json.headerOptions.toggleList.length >= 6
    ? (json.componentOptions.menuIconColumns = 4)
    : json.headerOptions.toggleList.length >= 4
    ? (json.componentOptions.menuIconColumns = 3)
    : (json.componentOptions.menuIconColumns = 2);

  json.apiOptions.apiConfig.countConfig.customFiql = fiql;
  json.apiOptions.apiConfig.dataConfig.customFiql = fiql;
  json = JSON.stringify(json, undefined, 2);
  systemConfig.writeGridCreationQuery({
    applicationName: lib.applicationName,
    gridName: `${lib.name} ${lib.applicationName}`,
    gridConfiguration: json,
    mode: "grid",
  });
};

const generateGridAndFilterKanban = (element, lib, schemaList, file) => {
  const identityColumn = util.getIdentityColumnFromTable(element);
  let kanbanFlag = false;
  let countKanbanCol = 0;
  let isPushKanbanJson = false;

  let json = {
    gridOptions: {
      suppressHorizontalScroll: false,
      rowModelType: "infinite",
      rowSelection: "multiple",
      pagination: true,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      columnDefs: [],
    },
    apiOptions: {
      apiConfig: {
        countConfig: {
          countKey: "",
          params: {
            orderBy: "modifiedTime",
            orderType: "desc",
          },
          context: `${lib.context.toUpperCase()}`,
          fiqlKey: "filter",
          suppressDefaultFiqlOnApply: true,
          queryParamsUrl: "$filter",
          quickFilterKey: identityColumn
            ? `${util.lowerFirstLetter(element.name)}.${identityColumn.name}`
            : null,
          defaultFiql: element.softDelete
            ? "deleted==false;id=ge=0;"
            : "id=ge=0;",
          url: `${lib.entityName}/count`,
          requestType: "GET",
          suppressNullValues: true,
          customFiql: "",
        },
        dataConfig: {
          context: `${lib.context.toUpperCase()}`,
          dataKey: "data",
          suppressDefaultFiqlOnApply: true,
          fiqlKey: "filter",
          quickFilterKey: identityColumn
            ? `${util.lowerFirstLetter(element.name)}.${identityColumn.name}`
            : null,
          defaultFiql: element.softDelete
            ? "deleted==false;id=ge=0;"
            : "id=ge=0;",
          queryParamsUrl: "$filter&$offset&$size&$orderBy&$orderType",
          requestType: "GET",
          suppressNullValues: true,
          params: {
            orderBy: "modifiedTime",
            orderType: "desc",
          },
          url: `${lib.entityName}/search`,
          lLimitKey: "offset",
          uLimitKey: "size",
          customFiql: "",
        },
      },
    },
    filterOptions: {
      enableFiqlCondition: true,
      filterConfig: [],
    },
    sortingOptions: {
      sortConfig: [],
    },
    componentOptions: {
      exportOptions: {
        fileName: `${lib.entityName} List`,
      },
      actionButtonsMode: "menu",
      isCustomCardLayout: true,
      defaultView: "Tile",
    },
    listActions: [
      {
        label: "Create",
        id: "create",
        icon: "plus_small",
        removable: false,
        navigateTo: "form",
        templateName: element.isCustomTable
          ? `${file.applicationName.toUpperCase()}_${element.nativeName.toUpperCase()}_FORM`
          : `${file.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
      },
      {
        label: "Import",
        icon: "Upload-Outline",
        id: "import",
        url: `${lib.entityName}/importData`,
        context: `${lib.context.toUpperCase()}`,
      },
      {
        label: "Export",
        icon: "Download-Outline",
        id: "export",
        url: `${lib.entityName}/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc`,
        context: `${lib.context.toUpperCase()}`,
      },
    ],
    rowActions: [
      {
        label: "View",
        id: "view",
        icon: "Eye-Outline",
        removable: false,
        navigateTo: "page",
        templateName: `${lib.context.toUpperCase()}_${lib.entityName.toUpperCase()}_PAGE_VIEW`,
      },
      {
        label: "Edit",
        id: "edit",
        icon: "Edit-Outline",
        removable: false,
        navigateTo: "form",
        templateName: element.isCustomTable
          ? `${file.applicationName.toUpperCase()}_${element.nativeName.toUpperCase()}_FORM`
          : `${file.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
      },
      {
        label: "Delete",
        id: "delete",
        icon: "Delete-Outline",
        removable: false,
        url: `${lib.entityName}/deleteById?id=$id`,
        context: `${lib.context.toUpperCase()}`,
      },
    ],
    rowClickAction: {
      label: "View",
      id: "view",
      icon: "Eye-Outline",
      removable: false,
      navigateTo: "page",
      templateName: `${lib.context.toUpperCase()}_${lib.entityName.toUpperCase()}_PAGE_VIEW`,
    },
    headerOptions: {
      suppressViewSwitch: true,
      headerInclusionList: [],
      suppressTileSwitch: true,
      suppressQuickFilter: true,
      suppressCountLabel: false,
      viewSwitchType: "toggle-button",
      groupingKey: "",
      params: {},
      headerConfig: [],
      toggleList: [
        {
          value: "Kanban",
          displayName: "Kanban",
          iconName: "Kanban",
          icon: "Kanban$fontset$icomoon",
          hasIcon: true,
        },
      ],
    },
    footerOptions: {
      suppressFooter: true,
    },
    cardName: "genericCard",
    type: "kanban",
    entity: `${lib.entityName}`,
    restName: `${lib.entityName}`,
    context: `${lib.context.toUpperCase()}`,
    applicationName: `${lib.applicationName.toUpperCase()}_APP_NAME`,
    kanbanConfig: {
      tileHeight: "15em",
      tileWidth: "100%",
      tileBorder: false,
      shuffleCards: false,
      dragAndDrop: false,
      suppressNonZeroData: false,
      connectedToEachOther: false,
    },
    // cellFormatting: {}
  };
  // ******** component options ********
  if (element.extendable) {
    json.componentOptions = {
      actionButtonsMode: "menu",
      exportOptions: {
        fileName: `${lib.entityName} List`,
      },
      customFieldsConfig: {
        category: element.nativeName,
        tableConfig: [
          {
            tableName: `${element.name}CustomField`,
            wrapperKey: `${util.camelize(element.name)}CustomField`,
          },
        ],
      },
    };
  }
  // ******** columnDefs ********
  element.fields.forEach((item) => {
    if (
      !(item.properties && item.properties.mappedAs == "OneToMany") &&
      util.validateColumn(item)
    ) {
      if (item.type === "Reference") {
        const table = util.getTablePropsByPojoName(
          schemaList,
          item.properties.table
        );
        if (
          !(typeof table === "undefined") &&
          !(typeof table.fields === "undefined")
        ) {
          table.fields.forEach((el) => {
            if (el.type != "Reference" && util.validateColumn(el)) {
              const temp = {
                headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                  .dasherise(table.displayName)
                  .toUpperCase()}_${util
                  .dasherise(el.displayName)
                  .toUpperCase()}`,
                field: `${item.name}.${el.name}`,
                width: 160,
                tooltipField: `${item.name}.${el.name}`,
                sortable: true,
                valueGetterParams: {
                  suppressTranslation: true,
                },
                cellRendererParams: { suppressTranslation: true },
              };
              let cellItem = {
                label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                  .dasherise(table.displayName)
                  .toUpperCase()}_${util
                  .dasherise(el.displayName)
                  .toUpperCase()}`,
                key: `${util.lowerFirstLetter(item.name)}.${el.name}`,
                filterType: "quick",
                type: "",
              };
              cellItem = util.getFilterConfigByType(el, cellItem);

              if (temp && cellItem) {
                let fieldType = cellItem.type;
                if (item?.type == "DateTime") {
                  fieldType = "dateTime";
                } else {
                  fieldType = util.typeGenerator(el, schemaList);
                }
                cellItem.fieldType = fieldType;
              }

              temp.cellData = cellItem;
              const sortTemp = {
                label: `${item.name}.${el.name}`,
                colId: `${item.name}.${el.name}`,
                orderByKey: "orderBy",
                orderByValue: `${item.name}.${el.name}`,
                orderTypeKey: "orderType",
                asc: "asc",
                desc: "desc",
              };
              if (util.typeGenerator(el, schemaList) == "date") {
                temp.cellRenderer = "gxAgGridDateAndTime";
                delete temp["tooltipField"];
              }
              if (util.getIdentityColumn(schemaList, item)?.name === el.name) {
                temp.navigationConfig = {
                  applicationName: lib.applicationName,
                  entity: item.name,
                  route: `${util.dasherise(
                    lib.applicationName
                  )}/${util.dasherise(item.properties.table)}/${util.dasherise(
                    item.properties.table
                  )}-view`,
                };
                temp.cellRenderer = "hyperlinkCellRenderer";
                const quotes = [
                  "Journal",
                  "String",
                  "Choice",
                  "Email",
                ].includes(el.type)
                  ? "''"
                  : "";
                const filterItem = {
                  label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                    .dasherise(table.displayName)
                    .toUpperCase()}_${util
                    .dasherise(el.displayName)
                    .toUpperCase()}`,
                  key: `${util.lowerFirstLetter(item.name)}.${el.name}`,
                  type: "autocomplete",
                  fieldType: "autocomplete",
                  filterType: "quick",
                  apiConfig: {
                    rest: `${table.name}/search?filter=${
                      el.name
                    }==${quotes}*$searchText*${quotes}${
                      table.softDelete ? ";deleted==false" : ""
                    }&offset=0&size=25`,
                    context: `${lib.context.toUpperCase()}`,
                    type: "GET",
                    dataKey: el.name,
                    dataType: "object",
                    params: [
                      {
                        key: "searchText",
                        fromSearch: true,
                      },
                    ],
                  },
                };
                json.filterOptions.filterConfig.push(filterItem);
                temp.cellData = filterItem;
              }
              temp.editable = false;
              temp.onCellValueChanged = "onValueChange";
              temp.cellEditor = "myCustomEditor";
              countKanbanCol += 1;
              if (countKanbanCol <= 5) json.gridOptions.columnDefs.push(temp);
              util.isPushSortTemp(sortTemp) &&
                json.sortingOptions.sortConfig.push(sortTemp);
            }
          });
        }
      } else {
        let type = "";
        const temp = {
          headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
          field: item.name,
          width: 160,
          sortable: true,
          tooltipField: item.name,
          editable: false,
          onCellValueChanged: "onValueChange",
          cellEditor: "myCustomEditor",
          valueGetterParams: {
            suppressTranslation: true,
          },
          cellRendererParams: { suppressTranslation: true },
        };
        const sortTemp = {
          label: item.name,
          colId: item.name,
          orderByKey: "orderBy",
          orderByValue: item.name,
          orderTypeKey: "orderType",
          asc: "asc",
          desc: "desc",
        };
        util.isPushSortTemp(sortTemp) &&
          json.sortingOptions.sortConfig.push(sortTemp);
        if (util.typeGenerator(item, schemaList) == "date") {
          temp.cellRenderer = "gxAgGridDateAndTime";
          delete temp["tooltipField"];
        }
        if (util.typeGenerator(item, schemaList) == "textarea") {
          temp.hide = true;
        }

        let filterItem = {
          label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
          key: `${item.name}`,
          filterType: "quick",
        };

        if (item.type != "GPS") {
          filterItem = util.getFilterConfigByType(item, filterItem);
          if (!item.apiConfig && !item.identityColumn) {
            json.filterOptions.filterConfig.push(filterItem);
          }

          temp.cellData = filterItem;
        }

        if (temp && temp.cellData) {
          let fieldType = temp.type;
          if (item?.type == "DateTime") {
            fieldType = "dateTime";
          } else {
            fieldType = util.typeGenerator(item, schemaList);
          }
          temp.cellData.fieldType = fieldType;
        }
        countKanbanCol += 1;
        if (countKanbanCol <= 5) json.gridOptions.columnDefs.push(temp);
      }
    }
    // ******** header config ********
    if ((item.type == "Choice" || item.type == "Select") && !kanbanFlag) {
      item.properties.choice.forEach((eachChoice) => {
        json.headerOptions.headerConfig.push({
          status: `${eachChoice}`,
          displayName: `${util.spacedText(eachChoice)}`,
          statusColor: "#7ed321",
          borderColor: "#00B4E5",
          backgroundColor: "#ccf0fa",
          count: 0,
        });
        json.headerOptions.groupingKey = item.name;
        json.apiOptions.apiConfig.countConfig.customFiql = `${item.name}==''$${item.name}'';`;
        json.apiOptions.apiConfig.dataConfig.customFiql = `${item.name}==''$${item.name}'';`;
        kanbanFlag = true;
      });
    }
  });
  if (element.enableWorkflow) {
    countKanbanCol += 1;
    if (countKanbanCol <= 5) {
      json.gridOptions.columnDefs.push({
        headerName: "WORKFLOW_STAGE",
        field: "workflowStage",
        tooltipField: "workflowStage",
        sortable: true,
        width: 160,
      });
    }
    json.filterOptions.filterConfig.push({
      label: "WORKFLOW_STAGE",
      key: "workflowStage",
      type: "input",
      filterType: "quick",
    });
    json.sortingOptions.sortConfig.push({
      label: "workflowStage",
      colId: "workflowStage",
      orderByKey: "orderBy",
      orderByValue: "workflowStage",
      orderTypeKey: "orderType",
      asc: "asc",
      desc: "desc",
    });
  }

  if (countKanbanCol <= 5) {
    json.gridOptions.columnDefs.push({
      headerName: "",
      field: "",
      cellRenderer: "gxAgGridMenuButton",
      pinned: "right",
      width: 80,
      suppressMenu: true,
    });
  }

  element.fields.forEach((field) => {
    if (field.type == "Choice" || field.type == "Select")
      isPushKanbanJson = true;
  });
  if (isPushKanbanJson) {
    json = JSON.stringify(json, undefined, 2);
    systemConfig.writeGridCreationQuery({
      applicationName: lib.applicationName,
      gridName: `${lib.name} ${lib.applicationName}_kanban`,
      gridConfiguration: json,
      mode: "kanban",
    });
  }
};

const generateGridAndFilterCalendar = (element, lib, schemaList, file) => {
  const identityColumn = util.getIdentityColumnFromTable(element);
  let countCalendarCol = 0;
  let countDateFields = 0;
  let isPushCalendarJson = false;

  let json = {
    gridOptions: {
      suppressHorizontalScroll: false,
      rowModelType: "infinite",
      rowSelection: "multiple",
      pagination: true,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      columnDefs: [],
    },
    apiOptions: {
      apiConfig: {
        countConfig: {
          countKey: "",
          params: {
            orderBy: "modifiedTime",
            orderType: "desc",
          },
          context: `${lib.context.toUpperCase()}`,
          fiqlKey: "filter",
          suppressDefaultFiqlOnApply: true,
          queryParamsUrl: "$filter",
          quickFilterKey: identityColumn
            ? `${util.lowerFirstLetter(element.name)}.${identityColumn.name}`
            : null,
          defaultFiql: element.softDelete
            ? "deleted==false;id=ge=0;"
            : "id=ge=0;",
          url: `${lib.entityName}/count`,
          requestType: "GET",
          suppressNullValues: true,
        },
        dataConfig: {
          context: `${lib.context.toUpperCase()}`,
          dataKey: "data",
          suppressDefaultFiqlOnApply: true,
          fiqlKey: "filter",
          quickFilterKey: identityColumn
            ? `${util.lowerFirstLetter(element.name)}.${identityColumn.name}`
            : null,
          defaultFiql: element.softDelete
            ? "deleted==false;id=ge=0;"
            : "id=ge=0;",
          queryParamsUrl: "$filter&$offset&$size&$orderBy&$orderType",
          requestType: "GET",
          suppressNullValues: true,
          params: {
            orderBy: "modifiedTime",
            orderType: "desc",
          },
          url: `${lib.entityName}/search`,
          lLimitKey: "offset",
          uLimitKey: "size",
        },
      },
    },
    filterOptions: {
      enableFiqlCondition: true,
      filterConfig: [],
    },
    sortingOptions: {
      sortConfig: [],
    },
    componentOptions: {
      actionButtonsMode: "menu",
    },
    listActions: [
      {
        label: "Create",
        id: "create",
        icon: "plus_small",
        removable: false,
        navigateTo: "form",
        templateName: element.isCustomTable
          ? `${file.applicationName.toUpperCase()}_${element.nativeName.toUpperCase()}_FORM`
          : `${file.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
      },
      {
        label: "Import",
        icon: "Upload-Outline",
        id: "import",
        url: `${lib.entityName}/importData`,
        context: `${lib.context.toUpperCase()}`,
      },
      {
        label: "Export",
        icon: "Download-Outline",
        id: "export",
        url: `${lib.entityName}/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc`,
        context: `${lib.context.toUpperCase()}`,
      },
    ],
    rowActions: [
      {
        label: "View",
        id: "view",
        icon: "Eye-Outline",
        removable: false,
        navigateTo: "page",
        templateName: `${lib.context.toUpperCase()}_${lib.entityName.toUpperCase()}_PAGE_VIEW`,
      },
      {
        label: "Edit",
        id: "edit",
        icon: "Edit-Outline",
        removable: false,
        navigateTo: "form",
        templateName: element.isCustomTable
          ? `${file.applicationName.toUpperCase()}_${element.nativeName.toUpperCase()}_FORM`
          : `${file.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
      },
      {
        label: "Delete",
        id: "delete",
        icon: "Delete-Outline",
        removable: false,
        url: `${lib.entityName}/deleteById?id=$id`,
        context: `${lib.context.toUpperCase()}`,
      },
    ],
    rowClickAction: {
      label: "View",
      id: "view",
      icon: "Eye-Outline",
      removable: false,
      navigateTo: "page",
      templateName: `${lib.context.toUpperCase()}_${lib.entityName.toUpperCase()}_PAGE_VIEW`,
    },
    headerOptions: {
      suppressFilterButton: false,
      suppressQuickFilter: true,
      suppressCountLabel: false,
    },
    footerOptions: {
      suppressFooter: true,
    },
    type: "calendar",
    entity: `${lib.entityName}`,
    restName: `${lib.entityName}`,
    context: `${lib.context.toUpperCase()}`,
    applicationName: `${lib.applicationName.toUpperCase()}_APP_NAME`,
    calendarView: "month",
    viewMonth: true,
    viewWeek: true,
    viewDay: true,
    cardName: "cardTemplate1",
    displayOptions: {},
    eventStartDate: {
      field: "",
      label: "",
    },
    eventEndDate: {
      field: "",
      label: "",
    },
    eventTitle: `${lib.entityName}`,
    eventConfig: {
      fontColor: "#50e3c2",
    },
    customEventConfig: [],
    // cellFormatting: {}
  };
  // ******** component options ********
  if (element.extendable) {
    json.componentOptions = {
      actionButtonsMode: "menu",
      exportOptions: {
        fileName: `${lib.entityName} List`,
      },
      customFieldsConfig: {
        category: element.nativeName,
        tableConfig: [
          {
            tableName: `${element.name}CustomField`,
            wrapperKey: `${util.camelize(element.name)}CustomField`,
          },
        ],
      },
    };
  }
  // ******** columnDefs ********
  element.fields.forEach((item) => {
    if (
      !(item.properties && item.properties.mappedAs == "OneToMany") &&
      util.validateColumn(item)
    ) {
      if (item.type === "Reference") {
        const table = util.getTablePropsByPojoName(
          schemaList,
          item.properties.table
        );
        //narayan
        if (
          !(typeof table === "undefined") &&
          !(typeof table.fields === "undefined")
        ) {
          table.fields.forEach((el) => {
            if (el.type != "Reference" && util.validateColumn(el)) {
              const temp = {
                headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                  .dasherise(table.displayName)
                  .toUpperCase()}_${util
                  .dasherise(el.displayName)
                  .toUpperCase()}`,
                field: `${item.name}.${el.name}`,
                width: 160,
                tooltipField: `${item.name}.${el.name}`,
                sortable: true,
                valueGetterParams: {
                  suppressTranslation: true,
                },
                cellRendererParams: { suppressTranslation: true },
              };
              let cellItem = {
                label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                  .dasherise(table.displayName)
                  .toUpperCase()}_${util
                  .dasherise(el.displayName)
                  .toUpperCase()}`,
                key: `${util.lowerFirstLetter(item.name)}.${el.name}`,
                filterType: "quick",
                type: "",
              };
              cellItem = util.getFilterConfigByType(el, cellItem);

              if (temp && cellItem) {
                let fieldType = cellItem.type;
                if (item?.type == "DateTime") {
                  fieldType = "dateTime";
                } else {
                  fieldType = util.typeGenerator(el, schemaList);
                }
                cellItem.fieldType = fieldType;
              }

              temp.cellData = cellItem;
              const sortTemp = {
                label: `${item.name}.${el.name}`,
                colId: `${item.name}.${el.name}`,
                orderByKey: "orderBy",
                orderByValue: `${item.name}.${el.name}`,
                orderTypeKey: "orderType",
                asc: "asc",
                desc: "desc",
              };
              if (util.typeGenerator(el, schemaList) == "date") {
                temp.cellRenderer = "gxAgGridDateAndTime";
                delete temp["tooltipField"];
              }
              if (util.getIdentityColumn(schemaList, item)?.name === el.name) {
                temp.navigationConfig = {
                  applicationName: lib.applicationName,
                  entity: item.name,
                  route: `${util.dasherise(
                    lib.applicationName
                  )}/${util.dasherise(item.properties.table)}/${util.dasherise(
                    item.properties.table
                  )}-view`,
                };
                temp.cellRenderer = "hyperlinkCellRenderer";
                const quotes = [
                  "Journal",
                  "String",
                  "Choice",
                  "Email",
                ].includes(el.type)
                  ? "''"
                  : "";
                const filterItem = {
                  label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                    .dasherise(table.displayName)
                    .toUpperCase()}_${util
                    .dasherise(el.displayName)
                    .toUpperCase()}`,
                  key: `${util.lowerFirstLetter(item.name)}.${el.name}`,
                  type: "autocomplete",
                  fieldType: "autocomplete",
                  filterType: "quick",
                  apiConfig: {
                    rest: `${table.name}/search?filter=${
                      el.name
                    }==${quotes}*$searchText*${quotes}${
                      table.softDelete ? ";deleted==false" : ""
                    }&offset=0&size=25`,
                    context: `${lib.context.toUpperCase()}`,
                    type: "GET",
                    dataKey: el.name,
                    dataType: "object",
                    params: [
                      {
                        key: "searchText",
                        fromSearch: true,
                      },
                    ],
                  },
                };
                json.filterOptions.filterConfig.push(filterItem);
                temp.cellData = filterItem;
              }
              temp.editable = false;
              temp.onCellValueChanged = "onValueChange";
              temp.cellEditor = "myCustomEditor";
              countCalendarCol += 1;
              if (countCalendarCol <= 5) json.gridOptions.columnDefs.push(temp);
              util.isPushSortTemp(sortTemp) &&
                json.sortingOptions.sortConfig.push(sortTemp);
            }
          });
        }
      } else {
        let type = "";
        const temp = {
          headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
          field: item.name,
          width: 160,
          sortable: true,
          tooltipField: item.name,
          editable: false,
          onCellValueChanged: "onValueChange",
          cellEditor: "myCustomEditor",
          valueGetterParams: {
            suppressTranslation: true,
          },
          cellRendererParams: { suppressTranslation: true },
        };
        const sortTemp = {
          label: item.name,
          colId: item.name,
          orderByKey: "orderBy",
          orderByValue: item.name,
          orderTypeKey: "orderType",
          asc: "asc",
          desc: "desc",
        };
        util.isPushSortTemp(sortTemp) &&
          json.sortingOptions.sortConfig.push(sortTemp);
        if (util.typeGenerator(item, schemaList) == "date") {
          temp.cellRenderer = "gxAgGridDateAndTime";
          delete temp["tooltipField"];
        }
        if (util.typeGenerator(item, schemaList) == "textarea") {
          temp.hide = true;
        }

        let filterItem = {
          label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
          key: `${item.name}`,
          filterType: "quick",
        };

        if (item.type != "GPS") {
          filterItem = util.getFilterConfigByType(item, filterItem);
          if (!item.apiConfig && !item.identityColumn) {
            json.filterOptions.filterConfig.push(filterItem);
          }

          temp.cellData = filterItem;
        }

        if (temp && temp.cellData) {
          let fieldType = temp.type;
          if (item?.type == "DateTime") {
            fieldType = "dateTime";
          } else {
            fieldType = util.typeGenerator(item, schemaList);
          }
          temp.cellData.fieldType = fieldType;
        }
        countCalendarCol += 1;
        if (countCalendarCol <= 5) json.gridOptions.columnDefs.push(temp);
      }
    }
    // ******** event start and end date ********
    if (item.type == "DateTime") {
      if (countDateFields == 0) {
        json.eventStartDate.field = item.name;
        json.eventStartDate.label = item.name;
        countDateFields += 1;
      } else if (countDateFields == 1) {
        json.eventEndDate.field = item.name;
        json.eventEndDate.label = item.name;
        countDateFields += 1;
      }
    }
  });
  if (element.enableWorkflow) {
    countCalendarCol += 1;
    if (countCalendarCol <= 5) {
      json.gridOptions.columnDefs.push({
        headerName: "WORKFLOW_STAGE",
        field: "workflowStage",
        tooltipField: "workflowStage",
        sortable: true,
        width: 160,
      });
    }
    json.filterOptions.filterConfig.push({
      label: "WORKFLOW_STAGE",
      key: "workflowStage",
      type: "input",
      filterType: "quick",
    });
    json.sortingOptions.sortConfig.push({
      label: "workflowStage",
      colId: "workflowStage",
      orderByKey: "orderBy",
      orderByValue: "workflowStage",
      orderTypeKey: "orderType",
      asc: "asc",
      desc: "desc",
    });
  }

  if (countCalendarCol <= 5) {
    json.gridOptions.columnDefs.push({
      headerName: "",
      field: "",
      cellRenderer: "gxAgGridMenuButton",
      pinned: "right",
      width: 80,
      suppressMenu: true,
    });
  }
  let fiql = "";
  schemaList.forEach((item) => {
    const filtered = item.fields.filter((f) => {
      return f.isPrimary || (item.name === element.name && f.identityColumn);
    });
    fiql += filtered.reduce((pre, current) => {
      const quotes = ["Journal", "String", "Choice", "Email"].includes(
        current.type
      )
        ? "''"
        : "";
      return (
        pre +
        `${
          item.name === lib.entityName
            ? ""
            : util.lowerFirstLetter(item.name) + "."
        }${current.name}==${quotes}${quotes ? "*" : ""}$${util.lowerFirstLetter(
          item.name
        )}.${current.name}${quotes ? "*" : ""}${quotes};`
      );
    }, "");
  });
  json.apiOptions.apiConfig.countConfig.customFiql = fiql;
  json.apiOptions.apiConfig.dataConfig.customFiql = fiql;

  element.fields.forEach((field) => {
    if (field.type == "DateTime") isPushCalendarJson = true;
  });
  if (isPushCalendarJson) {
    json = JSON.stringify(json, undefined, 2);
    systemConfig.writeGridCreationQuery({
      applicationName: lib.applicationName,
      gridName: `${lib.name} ${lib.applicationName}_calendar`,
      gridConfiguration: json,
      mode: "calendar",
    });
  }
};

const generateGridAndFilterTile = (element, lib, schemaList, file) => {
  let countTileCol = 0;
  const identityColumn = util.getIdentityColumnFromTable(element);
  let json = {
    gridOptions: {
      suppressHorizontalScroll: false,
      rowModelType: "infinite",
      rowSelection: "multiple",
      pagination: true,
      suppressRowClickSelection: false,
      suppressCellSelection: true,
      columnDefs: [],
    },
    apiOptions: {
      apiConfig: {
        countConfig: {
          countKey: "",
          params: {
            orderBy: "modifiedTime",
            orderType: "desc",
          },
          context: `${lib.context.toUpperCase()}`,
          fiqlKey: "filter",
          suppressDefaultFiqlOnApply: true,
          queryParamsUrl: "$filter",
          quickFilterKey: identityColumn
            ? `${util.lowerFirstLetter(element.name)}.${identityColumn.name}`
            : null,
          defaultFiql: element.softDelete
            ? "deleted==false;id=ge=0;"
            : "id=ge=0;",
          url: `${lib.entityName}/count`,
          requestType: "GET",
          suppressNullValues: true,
        },
        dataConfig: {
          context: `${lib.context.toUpperCase()}`,
          dataKey: "data",
          suppressDefaultFiqlOnApply: true,
          fiqlKey: "filter",
          quickFilterKey: identityColumn
            ? `${util.lowerFirstLetter(element.name)}.${identityColumn.name}`
            : null,
          defaultFiql: element.softDelete
            ? "deleted==false;id=ge=0;"
            : "id=ge=0;",
          queryParamsUrl: "$filter&$offset&$size&$orderBy&$orderType",
          requestType: "GET",
          suppressNullValues: true,
          params: {
            orderBy: "modifiedTime",
            orderType: "desc",
          },
          url: `${lib.entityName}/search`,
          lLimitKey: "offset",
          uLimitKey: "size",
        },
      },
    },
    filterOptions: {
      suppressFilterSave: true,
      enableFiqlCondition: true,
      filterConfig: [],
    },
    sortingOptions: {
      sortConfig: [],
    },
    componentOptions: {
      exportOptions: {
        fileName: `${lib.entityName} List`,
      },
      actionButtonsMode: "menu",
      defaultView: "Tile",
    },
    listActions: [
      {
        label: "Create",
        id: "create",
        icon: "plus_small",
        removable: false,
        navigateTo: "form",
        templateName: element.isCustomTable
          ? `${file.applicationName.toUpperCase()}_${element.nativeName.toUpperCase()}_FORM`
          : `${file.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
      },
      {
        label: "Import",
        icon: "Upload-Outline",
        id: "import",
        url: `${lib.entityName}/importData`,
        context: `${lib.context.toUpperCase()}`,
      },
      {
        label: "Export",
        icon: "Download-Outline",
        id: "export",
        url: `${lib.entityName}/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc`,
        context: `${lib.context.toUpperCase()}`,
      },
    ],
    rowActions: [
      {
        label: "View",
        id: "view",
        icon: "Eye-Outline",
        removable: false,
        navigateTo: "page",
        templateName: `${lib.context.toUpperCase()}_${lib.entityName.toUpperCase()}_PAGE_VIEW`,
      },
      {
        label: "Edit",
        id: "edit",
        icon: "Edit-Outline",
        removable: false,
        navigateTo: "form",
        templateName: element.isCustomTable
          ? `${file.applicationName.toUpperCase()}_${element.nativeName.toUpperCase()}_FORM`
          : `${file.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
      },
      {
        label: "Delete",
        id: "delete",
        icon: "Delete-Outline",
        removable: false,
        url: `${lib.entityName}/deleteById?id=$id`,
        context: `${lib.context.toUpperCase()}`,
      },
    ],
    rowClickAction: {
      label: "View",
      id: "view",
      icon: "Eye-Outline",
      removable: false,
      navigateTo: "page",
      templateName: `${lib.context.toUpperCase()}_${lib.entityName.toUpperCase()}_PAGE_VIEW`,
    },
    headerOptions: {
      suppressFilterButton: false,
      suppressQuickFilter: true,
      suppressCountLabel: false,
      countLabelSuffix: `${lib.entityName}`,
    },
    footerOptions: {
      suppressFooter: true,
    },
    cardName: "genericCard",
    type: "tile",
    entity: `${lib.entityName}`,
    restName: `${lib.entityName}`,
    context: `${lib.context.toUpperCase()}`,
    applicationName: `${lib.applicationName.toUpperCase()}_APP_NAME`,
    cellFormatting: {},
  };
  if (element.extendable) {
    json.componentOptions = {
      actionButtonsMode: "menu",
      exportOptions: {
        fileName: `${lib.entityName} List`,
      },
      customFieldsConfig: {
        category: element.nativeName,
        tableConfig: [
          {
            tableName: `${element.name}CustomField`,
            wrapperKey: `${util.camelize(element.name)}CustomField`,
          },
        ],
      },
      defaultView: "Tile",
    };
  }

  let firstRefAdded = false;
  let firstRefTable;

  element.fields.forEach((item) => {
    if (
      !(item.properties && item.properties.mappedAs == "OneToMany") &&
      util.validateColumn(item)
    ) {
      if (item.type === "Reference") {
        const table = util.getTablePropsByPojoName(
          schemaList,
          item.properties.table
        );
        if (
          !(typeof table === "undefined") &&
          !(typeof table.fields === "undefined")
        ) {
          if (firstRefAdded === false) {
            firstRefTable = table;
            firstRefAdded = true;
          }
          table.fields.forEach((el) => {
            if (el.type != "Reference" && util.validateColumn(el)) {
              const temp = {
                headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                  .dasherise(table.displayName)
                  .toUpperCase()}_${util
                  .dasherise(el.displayName)
                  .toUpperCase()}`,
                field: `${el.name}`,
                type: `${el.type}`,
                tooltipField: `${el.name}`,
                sortable: true,
              };
              const sortTemp = {
                label: `${item.name}.${el.name}`,
                colId: `${item.name}.${el.name}`,
                orderByKey: "orderBy",
                orderByValue: `${item.name}.${el.name}`,
                orderTypeKey: "orderType",
                asc: "asc",
                desc: "desc",
              };
              if (util.typeGenerator(el, schemaList) == "date") {
                temp.cellRenderer = "gxAgGridDateAndTime";
                delete temp["tooltipField"];
              }
              util.isPushSortTemp(sortTemp) &&
                json.sortingOptions.sortConfig.push(sortTemp);
            }
          });
        }
      } else {
        let type = "";
        const temp = {
          headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
          field: `${item.name}`,
          sortable: true,
          tooltipField: `${item.name}`,
          editable: false,
          type: `${item.type}`,
        };
        const sortTemp = {
          label: item.name,
          colId: item.name,
          orderByKey: "orderBy",
          orderByValue: item.name,
          orderTypeKey: "orderType",
          asc: "asc",
          desc: "desc",
        };
        util.isPushSortTemp(sortTemp) &&
          json.sortingOptions.sortConfig.push(sortTemp);
        if (util.typeGenerator(item, schemaList) == "date") {
          temp.cellRenderer = "gxAgGridDateAndTime";
          delete temp["tooltipField"];
        }
        if (util.typeGenerator(item, schemaList) == "textarea") {
          temp.hide = true;
        }

        let filterItem = {
          label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
          key: `${item.name}`,
          filterType: "quick",
        };

        if (item.type != "GPS") {
          filterItem = util.getFilterConfigByType(item, filterItem);
          if (!item.apiConfig && !item.identityColumn) {
            json.filterOptions.filterConfig.push(filterItem);
          }
        }
        countTileCol += 1;
        if (countTileCol <= 5) {
          json.gridOptions.columnDefs.push(temp);
        }
      }
    }
  });
  if (json.gridOptions.columnDefs.length < 5 && firstRefTable) {
    firstRefTable.fields.forEach((el) => {
      if (el.type != "Reference" && util.validateColumn(el)) {
        const temp = {
          headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(firstRefTable.displayName)
            .toUpperCase()}_${util.dasherise(el.displayName).toUpperCase()}`,
          field: `${firstRefTable.displayName.toLowerCase()}.${el.name}`,
          type: `${el.type}`,
          tooltipField: `${el.name}`,
          sortable: true,
        };
        if (json.gridOptions.columnDefs.length < 5) {
          json.gridOptions.columnDefs.push(temp);
        }
      }
    });
  }
  if (element.enableWorkflow) {
    countTileCol += 1;
    if (countTileCol <= 5) {
      json.gridOptions.columnDefs.push({
        headerName: "WORKFLOW_STAGE",
        field: "workflowStage",
        tooltipField: "workflowStage",
        sortable: true,
        width: 160,
      });
    }
    json.filterOptions.filterConfig.push({
      label: "WORKFLOW_STAGE",
      key: "workflowStage",
      type: "input",
      filterType: "quick",
    });
    json.sortingOptions.sortConfig.push({
      label: "workflowStage",
      colId: "workflowStage",
      orderByKey: "orderBy",
      orderByValue: "workflowStage",
      orderTypeKey: "orderType",
      asc: "asc",
      desc: "desc",
    });
  }

  countTileCol += 1;
  if (countTileCol <= 5) {
    json.gridOptions.columnDefs.push({
      headerName: "",
      field: "",
      width: 80,
      suppressMenu: true,
    });
  }

  let fiql = "";
  schemaList.forEach((item) => {
    const filtered = item.fields.filter((f) => {
      return f.isPrimary || (item.name === element.name && f.identityColumn);
    });
    fiql += filtered.reduce((pre, current) => {
      const quotes = ["Journal", "String", "Choice", "Email"].includes(
        current.type
      )
        ? "''"
        : "";
      return (
        pre +
        `${
          item.name === lib.entityName
            ? ""
            : util.lowerFirstLetter(item.name) + "."
        }${current.name}==${quotes}${quotes ? "*" : ""}$${util.lowerFirstLetter(
          item.name
        )}.${current.name}${quotes ? "*" : ""}${quotes};`
      );
    }, "");
  });
  json.apiOptions.apiConfig.countConfig.customFiql = fiql;
  json.apiOptions.apiConfig.dataConfig.customFiql = fiql;

  json = JSON.stringify(json, undefined, 2);
  systemConfig.writeGridCreationQuery({
    applicationName: lib.applicationName,
    gridName: `${lib.name} ${lib.applicationName}_tile`,
    gridConfiguration: json,
    mode: "tile",
  });
};

const generateGridAndFilterTimeline = (element, lib, schemaList, file) => {
  let countTimelineCol = 0;
  const identityColumn = util.getIdentityColumnFromTable(element);
  let json = {
    gridOptions: {
      suppressHorizontalScroll: false,
      rowModelType: "infinite",
      rowSelection: "multiple",
      pagination: true,
      suppressRowClickSelection: false,
      suppressCellSelection: true,
      columnDefs: [],
    },
    apiOptions: {
      apiConfig: {
        countConfig: {
          countKey: "",
          params: {
            orderBy: "modifiedTime",
            orderType: "desc",
          },
          context: `${lib.context.toUpperCase()}`,
          fiqlKey: "filter",
          suppressDefaultFiqlOnApply: true,
          queryParamsUrl: "$filter",
          quickFilterKey: identityColumn
            ? `${util.lowerFirstLetter(element.name)}.${identityColumn.name}`
            : null,
          defaultFiql: element.softDelete
            ? "deleted==false;id=ge=0;"
            : "id=ge=0;",
          url: `${lib.entityName}/count`,
          requestType: "GET",
          suppressNullValues: true,
        },
        dataConfig: {
          context: `${lib.context.toUpperCase()}`,
          dataKey: "data",
          suppressDefaultFiqlOnApply: true,
          fiqlKey: "filter",
          quickFilterKey: identityColumn
            ? `${util.lowerFirstLetter(element.name)}.${identityColumn.name}`
            : null,
          defaultFiql: element.softDelete
            ? "deleted==false;id=ge=0;"
            : "id=ge=0;",
          queryParamsUrl: "$filter&$offset&$size&$orderBy&$orderType",
          requestType: "GET",
          suppressNullValues: true,
          params: {
            orderBy: "modifiedTime",
            orderType: "desc",
          },
          url: `${lib.entityName}/search`,
          lLimitKey: "offset",
          uLimitKey: "size",
        },
      },
    },
    filterOptions: {
      suppressFilterSave: true,
      enableFiqlCondition: true,
      filterConfig: [],
    },
    sortingOptions: {
      sortConfig: [],
    },
    componentOptions: {
      actionButtonsMode: "menu",
    },
    listActions: [
      {
        label: "Create",
        id: "create",
        icon: "plus_small",
        removable: false,
        navigateTo: "form",
        templateName: element.isCustomTable
          ? `${file.applicationName.toUpperCase()}_${element.nativeName.toUpperCase()}_FORM`
          : `${file.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
      },
      {
        label: "Import",
        icon: "Upload-Outline",
        id: "import",
        url: `${lib.entityName}/importData`,
        context: `${lib.context.toUpperCase()}`,
      },
      {
        label: "Export",
        icon: "Download-Outline",
        id: "export",
        url: `${lib.entityName}/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc`,
        context: `${lib.context.toUpperCase()}`,
      },
    ],
    rowActions: [
      {
        label: "View",
        id: "view",
        icon: "Eye-Outline",
        removable: false,
        navigateTo: "page",
        templateName: `${lib.context.toUpperCase()}_${lib.entityName.toUpperCase()}_PAGE_VIEW`,
      },
      {
        label: "Edit",
        id: "edit",
        icon: "Edit-Outline",
        removable: false,
        navigateTo: "form",
        templateName: element.isCustomTable
          ? `${file.applicationName.toUpperCase()}_${element.nativeName.toUpperCase()}_FORM`
          : `${file.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
      },
      {
        label: "Delete",
        id: "delete",
        icon: "Delete-Outline",
        removable: false,
        url: `${lib.entityName}/deleteById?id=$id`,
        context: `${lib.context.toUpperCase()}`,
      },
    ],
    rowClickAction: {
      label: "View",
      id: "view",
      icon: "Eye-Outline",
      removable: false,
      navigateTo: "page",
      templateName: `${lib.context.toUpperCase()}_${lib.entityName.toUpperCase()}_PAGE_VIEW`,
    },
    headerOptions: {
      suppressFilterButton: false,
      suppressQuickFilter: true,
      suppressCountLabel: false,
    },
    footerOptions: {
      suppressFooter: true,
    },
    type: "timeline",
    entity: `${lib.entityName}`,
    restName: `${lib.entityName}`,
    context: `${lib.context.toUpperCase()}`,
    applicationName: `${lib.applicationName.toUpperCase()}_APP_NAME`,
    cellFormatting: {},
    timelineConfigJson: {
      column: {},
      customIconConfig: [],
      defaultIcon: "history-info",
      sorting: "desc",
      type: "grouped",
    },
  };
  if (element.extendable) {
    json.componentOptions = {
      actionButtonsMode: "menu",
      exportOptions: {
        fileName: `${lib.entityName} List`,
      },
      customFieldsConfig: {
        category: element.nativeName,
        tableConfig: [
          {
            tableName: `${element.name}CustomField`,
            wrapperKey: `${util.camelize(element.name)}CustomField`,
          },
        ],
      },
    };
  }

  element.fields.forEach((item) => {
    if (
      !(item.properties && item.properties.mappedAs == "OneToMany") &&
      util.validateColumn(item)
    ) {
      if (item.type === "Reference") {
        const table = util.getTablePropsByPojoName(
          schemaList,
          item.properties.table
        );
        if (
          !(typeof table === "undefined") &&
          !(typeof table.fields === "undefined")
        ) {
          table.fields.forEach((el) => {
            if (el.type != "Reference" && util.validateColumn(el)) {
              const temp = {
                headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                  .dasherise(table.displayName)
                  .toUpperCase()}_${util
                  .dasherise(el.displayName)
                  .toUpperCase()}`,
                field: `${el.name}`,
                type: `${util.typeGenerator(el)}`,
                id: `${el.name}`,
                sortable: false,
              };
              const sortTemp = {
                label: `${item.name}.${el.name}`,
                colId: `${item.name}.${el.name}`,
                orderByKey: "orderBy",
                orderByValue: `${item.name}.${el.name}`,
                orderTypeKey: "orderType",
                asc: "asc",
                desc: "desc",
              };
              if (util.typeGenerator(el, schemaList) == "date") {
                temp.cellRenderer = "gxAgGridDateAndTime";
                delete temp["tooltipField"];
              }
              // countTimelineCol += 1;
              // if (countTimelineCol <= 5) {
              //   json.gridOptions.columnDefs.push(temp);
              // }
              util.isPushSortTemp(sortTemp) &&
                json.sortingOptions.sortConfig.push(sortTemp);
            }
            console.log("table---------", table);
          });
        }
      } else {
        let type = "";
        const temp = {
          headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
          field: `${item.name}`,
          type: `${item.type}`,
          id: `${item.name}`,
          sortable: false,
        };
        const sortTemp = {
          label: item.name,
          colId: item.name,
          orderByKey: "orderBy",
          orderByValue: item.name,
          orderTypeKey: "orderType",
          asc: "asc",
          desc: "desc",
        };
        util.isPushSortTemp(sortTemp) &&
          json.sortingOptions.sortConfig.push(sortTemp);
        if (util.typeGenerator(item, schemaList) == "date") {
          temp.cellRenderer = "gxAgGridDateAndTime";
          delete temp["tooltipField"];
        }
        if (util.typeGenerator(item, schemaList) == "textarea") {
          temp.hide = true;
        }

        let filterItem = {
          label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
          key: `${item.name}`,
          filterType: "quick",
        };

        if (item.type != "GPS") {
          filterItem = util.getFilterConfigByType(item, filterItem);
          if (!item.apiConfig && !item.identityColumn) {
            json.filterOptions.filterConfig.push(filterItem);
          }
        }
        // countTimelineCol += 1;
        // if (countTimelineCol <= 5) {
        //   json.gridOptions.columnDefs.push(temp);
        // }
      }
    }
  });
  if (element.enableWorkflow) {
    countTimelineCol += 1;
    if (countTimelineCol <= 5) {
      json.gridOptions.columnDefs.push({
        headerName: "WORKFLOW_STAGE",
        field: "workflowStage",
        tooltipField: "workflowStage",
        sortable: true,
        width: 160,
      });
    }
    json.filterOptions.filterConfig.push({
      label: "WORKFLOW_STAGE",
      key: "workflowStage",
      type: "input",
      filterType: "quick",
    });
    json.sortingOptions.sortConfig.push({
      label: "workflowStage",
      colId: "workflowStage",
      orderByKey: "orderBy",
      orderByValue: "workflowStage",
      orderTypeKey: "orderType",
      asc: "asc",
      desc: "desc",
    });
  }

  countTimelineCol += 1;
  if (countTimelineCol <= 5) {
    json.gridOptions.columnDefs.push({
      headerName: "",
      field: "",
      cellRenderer: "gxAgGridCellFormatting",
      width: 80,
      suppressMenu: true,
    });
  }

  let fiql = "";
  schemaList.forEach((item) => {
    const filtered = item.fields.filter((f) => {
      return f.isPrimary || (item.name === element.name && f.identityColumn);
    });
    fiql += filtered.reduce((pre, current) => {
      const quotes = ["Journal", "String", "Choice", "Email"].includes(
        current.type
      )
        ? "''"
        : "";
      return (
        pre +
        `${
          item.name === lib.entityName
            ? ""
            : util.lowerFirstLetter(item.name) + "."
        }${current.name}==${quotes}${quotes ? "*" : ""}$${util.lowerFirstLetter(
          item.name
        )}.${current.name}${quotes ? "*" : ""}${quotes};`
      );
    }, "");
  });
  json.apiOptions.apiConfig.countConfig.customFiql = fiql;
  json.apiOptions.apiConfig.dataConfig.customFiql = fiql;
  let isPushTimelineJson = false;
  let isGenerateTimelineCol = true;
  element.fields.some((field, index) => {
    if (field.type == "DateTime") {
      isPushTimelineJson = true;
      dateFieldIndex = index;
      return true;
    }
    if (index == element.fields.length - 1 && isPushTimelineJson == false) {
      isGenerateTimelineCol = false;
    }
  });
  // element.fields.forEach((field,index) => {
  //   if (field.type == "DateTime"){
  //     isPushTimelineJson = true;
  //     dateFieldIndex = index;
  //   }
  // });
  if (isGenerateTimelineCol) {
    json.gridOptions.columnDefs = generateTimelineColDefs(
      element.fields,
      dateFieldIndex,
      lib,
      element.displayName
    );
  }
  if (isPushTimelineJson) {
    json = JSON.stringify(json, undefined, 2);
    systemConfig.writeGridCreationQuery({
      applicationName: lib.applicationName,
      gridName: `${lib.name} ${lib.applicationName}_timeline`,
      gridConfiguration: json,
      mode: "timeline",
    });
  }
};

const generateTimelineColDefs = (fields, dateIndex, lib, displayName) => {
  let columnArray = [];
  const temp = {
    headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
      .dasherise(displayName)
      .toUpperCase()}.${util
      .dasherise(fields[dateIndex].displayName)
      .toUpperCase()}`,
    field: `${fields[dateIndex].name}`,
    type: `${fields[dateIndex].type}`,
    id: `${fields[dateIndex].name}`,
    sortable: false,
  };
  columnArray.push(temp);
  let countArray = 0;
  fields.forEach((field, idx) => {
    if (idx != dateIndex && countArray < 4) {
      if (field.type != "Reference") {
        const temp = {
          headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(displayName)
            .toUpperCase()}.${util.dasherise(field.displayName).toUpperCase()}`,
          field: `${field.name}`,
          type: `${field.type}`,
          id: `${field.name}`,
          sortable: false,
        };
        columnArray.push(temp);
        countArray++;
      }
    }
  });
  return columnArray;
};

const generateGridAndFilterSplitview = (element, lib, schemaList, file) => {
  const identityColumn = util.getIdentityColumnFromTable(element);
  let json = {
    gridOptions: {
      suppressHorizontalScroll: false,
      rowModelType: "infinite",
      rowSelection: "multiple",
      pagination: true,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      columnDefs: [],
    },
    apiOptions: {
      apiConfig: {
        countConfig: {
          countKey: "",
          params: {
            orderBy: "modifiedTime",
            orderType: "desc",
          },
          context: `${lib.context.toUpperCase()}`,
          fiqlKey: "filter",
          suppressDefaultFiqlOnApply: true,
          queryParamsUrl: "$filter",
          quickFilterKey: identityColumn
            ? `${util.lowerFirstLetter(element.name)}.${identityColumn.name}`
            : null,
          defaultFiql: element.softDelete
            ? "deleted==false;id=ge=0;"
            : "id=ge=0;",
          url: `${lib.entityName}/count`,
          requestType: "GET",
          suppressNullValues: true,
        },
        dataConfig: {
          context: `${lib.context.toUpperCase()}`,
          dataKey: "data",
          suppressDefaultFiqlOnApply: true,
          fiqlKey: "filter",
          quickFilterKey: identityColumn
            ? `${util.lowerFirstLetter(element.name)}.${identityColumn.name}`
            : null,
          defaultFiql: element.softDelete
            ? "deleted==false;id=ge=0;"
            : "id=ge=0;",
          queryParamsUrl: "$filter&$offset&$size&$orderBy&$orderType",
          requestType: "GET",
          suppressNullValues: true,
          params: {
            orderBy: "modifiedTime",
            orderType: "desc",
          },
          url: `${lib.entityName}/search`,
          lLimitKey: "offset",
          uLimitKey: "size",
        },
      },
    },
    filterOptions: {
      suppressFilterSave: true,
      enableFiqlCondition: true,
      filterConfig: [],
    },
    sortingOptions: {
      sortConfig: [],
    },
    componentOptions: {
      actionButtonsMode: "menu",
      isCustomCardLayout: true,
      defaultView: "splitview",
      tileViewOptions: {
        noOfColumns: 1,
        width: "100%",
        height: "13em",
        cacheBlockSize: 0,
      },
      splitviewLeftWidth: 30,
    },
    listActions: [
      {
        label: "Create",
        id: "create",
        icon: "plus_small",
        removable: false,
        navigateTo: "form",
        templateName: element.isCustomTable
          ? `${file.applicationName.toUpperCase()}_${element.nativeName.toUpperCase()}_FORM`
          : `${file.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
      },
      {
        label: "Import",
        icon: "Upload-Outline",
        id: "import",
        url: `${lib.entityName}/importData`,
        context: `${lib.context.toUpperCase()}`,
      },
      {
        label: "Export",
        icon: "Download-Outline",
        id: "export",
        url: `${lib.entityName}/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc`,
        context: `${lib.context.toUpperCase()}`,
      },
    ],
    rowActions: [
      {
        label: "View",
        id: "view",
        icon: "Eye-Outline",
        removable: false,
        navigateTo: "page",
        templateName: `${lib.context.toUpperCase()}_${lib.entityName.toUpperCase()}_PAGE_VIEW`,
      },
      {
        label: "Edit",
        id: "edit",
        icon: "Edit-Outline",
        removable: false,
        navigateTo: "form",
        templateName: element.isCustomTable
          ? `${file.applicationName.toUpperCase()}_${element.nativeName.toUpperCase()}_FORM`
          : `${file.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
      },
      {
        label: "Delete",
        id: "delete",
        icon: "Delete-Outline",
        removable: false,
        url: `${lib.entityName}/deleteById?id=$id`,
        context: `${lib.context.toUpperCase()}`,
      },
    ],
    rowClickAction: {
      label: "View",
      id: "view",
      icon: "Eye-Outline",
      removable: false,
      navigateTo: "page",
      templateName: `${lib.context.toUpperCase()}_${lib.entityName.toUpperCase()}_PAGE_VIEW`,
    },
    headerOptions: {
      suppressFilterButton: false,
      suppressQuickFilter: true,
      suppressCountLabel: false,
      suppressFilterButton: false,
      suppressQuickFilter: true,
      suppressCountLabel: false,
      toggleList: [
        {
          value: "splitview",
          displayName: "splitview",
          hasIcon: false,
          checked: false,
        },
      ],
    },
    footerOptions: {
      suppressFooter: true,
    },
    cardName: "SplitViewCard",
    type: "splitview",
    entity: `${lib.entityName}`,
    restName: `${lib.entityName}`,
    context: `${lib.context.toUpperCase()}`,
    applicationName: `${lib.applicationName.toUpperCase()}_APP_NAME`,
    splitviewType: "tile",
    // cellFormatting: {}
  };
  // ******** component options ********
  if (element.extendable) {
    json.componentOptions = {
      actionButtonsMode: "menu",
      exportOptions: {
        fileName: `${lib.entityName} List`,
      },
      customFieldsConfig: {
        category: element.nativeName,
        tableConfig: [
          {
            tableName: `${element.name}CustomField`,
            wrapperKey: `${util.camelize(element.name)}CustomField`,
          },
        ],
      },
      isCustomCardLayout: true,
      defaultView: "splitview",
      tileViewOptions: {
        noOfColumns: 1,
        width: "100%",
        height: "13em",
        cacheBlockSize: 0,
      },
    };
  }
  // ******** columnDefs ********
  let countSplitviewCol = 0;
  element.fields.forEach((item) => {
    if (
      !(item.properties && item.properties.mappedAs == "OneToMany") &&
      util.validateColumn(item)
    ) {
      if (item.type === "Reference") {
        const table = util.getTablePropsByPojoName(
          schemaList,
          item.properties.table
        );
        if (
          !(typeof table === "undefined") &&
          !(typeof table.fields === "undefined")
        ) {
          table.fields.forEach((el) => {
            if (el.type != "Reference" && util.validateColumn(el)) {
              const temp = {
                headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                  .dasherise(table.displayName)
                  .toUpperCase()}_${util
                  .dasherise(el.displayName)
                  .toUpperCase()}`,
                field: `${item.name}.${el.name}`,
                width: 160,
                tooltipField: `${item.name}.${el.name}`,
                sortable: true,
                valueGetterParams: {
                  suppressTranslation: true,
                },
                cellRendererParams: { suppressTranslation: true },
                type: "",
              };
              let cellItem = {
                label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                  .dasherise(table.displayName)
                  .toUpperCase()}_${util
                  .dasherise(el.displayName)
                  .toUpperCase()}`,
                key: `${util.lowerFirstLetter(item.name)}.${el.name}`,
                filterType: "quick",
                type: "",
              };
              cellItem = util.getFilterConfigByType(el, cellItem);

              if (temp && cellItem) {
                let fieldType = cellItem.type;
                if (item?.type == "DateTime") {
                  fieldType = "dateTime";
                } else {
                  fieldType = util.typeGenerator(el, schemaList);
                }
                cellItem.fieldType = fieldType;
                temp.type = fieldType;
              }

              temp.cellData = cellItem;
              const sortTemp = {
                label: `${item.name}.${el.name}`,
                colId: `${item.name}.${el.name}`,
                orderByKey: "orderBy",
                orderByValue: `${item.name}.${el.name}`,
                orderTypeKey: "orderType",
                asc: "asc",
                desc: "desc",
              };
              if (util.typeGenerator(el, schemaList) == "date") {
                temp.cellRenderer = "gxAgGridDateAndTime";
                delete temp["tooltipField"];
              }
              if (util.getIdentityColumn(schemaList, item)?.name === el.name) {
                temp.navigationConfig = {
                  applicationName: lib.applicationName,
                  entity: item.name,
                  route: `${util.dasherise(
                    lib.applicationName
                  )}/${util.dasherise(item.properties.table)}/${util.dasherise(
                    item.properties.table
                  )}-view`,
                };
                temp.cellRenderer = "hyperlinkCellRenderer";
                const quotes = [
                  "Journal",
                  "String",
                  "Choice",
                  "Email",
                ].includes(el.type)
                  ? "''"
                  : "";
                const filterItem = {
                  label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                    .dasherise(table.displayName)
                    .toUpperCase()}_${util
                    .dasherise(el.displayName)
                    .toUpperCase()}`,
                  key: `${util.lowerFirstLetter(item.name)}.${el.name}`,
                  type: "autocomplete",
                  fieldType: "autocomplete",
                  filterType: "quick",
                  apiConfig: {
                    rest: `${table.name}/search?filter=${
                      el.name
                    }==${quotes}*$searchText*${quotes}${
                      table.softDelete ? ";deleted==false" : ""
                    }&offset=0&size=25`,
                    context: `${lib.context.toUpperCase()}`,
                    type: "GET",
                    dataKey: el.name,
                    dataType: "object",
                    params: [
                      {
                        key: "searchText",
                        fromSearch: true,
                      },
                    ],
                  },
                };
                temp.cellData = filterItem;
              }
              temp.editable = false;
              temp.onCellValueChanged = "onValueChange";
              temp.cellEditor = "myCustomEditor";
              countSplitviewCol += 1;
              if (countSplitviewCol <= 3)
                json.gridOptions.columnDefs.push(temp);
              util.isPushSortTemp(sortTemp) &&
                json.sortingOptions.sortConfig.push(sortTemp);
            }
          });
        }
      } else {
        let type = "";
        const temp = {
          headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
          field: item.name,
          width: 160,
          sortable: true,
          tooltipField: item.name,
          editable: false,
          onCellValueChanged: "onValueChange",
          cellEditor: "myCustomEditor",
          valueGetterParams: {
            suppressTranslation: true,
          },
          cellRendererParams: { suppressTranslation: true },
          type: "",
        };
        const sortTemp = {
          label: item.name,
          colId: item.name,
          orderByKey: "orderBy",
          orderByValue: item.name,
          orderTypeKey: "orderType",
          asc: "asc",
          desc: "desc",
        };
        util.isPushSortTemp(sortTemp) &&
          json.sortingOptions.sortConfig.push(sortTemp);
        if (util.typeGenerator(item, schemaList) == "date") {
          temp.cellRenderer = "gxAgGridDateAndTime";
          delete temp["tooltipField"];
        }
        if (util.typeGenerator(item, schemaList) == "textarea") {
          temp.hide = true;
        }

        let filterItem = {
          label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
          key: `${item.name}`,
          filterType: "quick",
        };

        if (item.type != "GPS") {
          filterItem = util.getFilterConfigByType(item, filterItem);
          if (!item.apiConfig && !item.identityColumn) {
            // json.filterOptions.filterConfig.push(filterItem);
          }

          temp.cellData = filterItem;
        }

        if (temp && temp.cellData) {
          let fieldType = temp.type;
          if (item?.type == "DateTime") {
            fieldType = "dateTime";
          } else {
            fieldType = util.typeGenerator(item, schemaList);
          }
          temp.cellData.fieldType = fieldType;
          temp.type = fieldType;
        }
        countSplitviewCol += 1;
        if (countSplitviewCol <= 3) json.gridOptions.columnDefs.push(temp);
      }
    }
  });
  if (element.enableWorkflow) {
    countSplitviewCol += 1;
    if (countSplitviewCol <= 3) {
      json.gridOptions.columnDefs.push({
        headerName: "WORKFLOW_STAGE",
        field: "workflowStage",
        tooltipField: "workflowStage",
        sortable: true,
        width: 160,
      });
    }
    // json.filterOptions.filterConfig.push({
    //   label: "WORKFLOW_STAGE",
    //   key: "workflowStage",
    //   type: "input",
    //   filterType: "quick",
    // });
    json.sortingOptions.sortConfig.push({
      label: "workflowStage",
      colId: "workflowStage",
      orderByKey: "orderBy",
      orderByValue: "workflowStage",
      orderTypeKey: "orderType",
      asc: "asc",
      desc: "desc",
    });
  }

  if (countSplitviewCol <= 3) {
    json.gridOptions.columnDefs.push({
      headerName: "",
      field: "",
      cellRenderer: "gxAgGridMenuButton",
      pinned: "right",
      width: 80,
      suppressMenu: true,
    });
  }
  let fiql = "";
  schemaList.forEach((item) => {
    const filtered = item.fields.filter((f) => {
      return f.isPrimary || (item.name === element.name && f.identityColumn);
    });
    fiql += filtered.reduce((pre, current) => {
      const quotes = ["Journal", "String", "Choice", "Email"].includes(
        current.type
      )
        ? "''"
        : "";
      return (
        pre +
        `${
          item.name === lib.entityName
            ? ""
            : util.lowerFirstLetter(item.name) + "."
        }${current.name}==${quotes}${quotes ? "*" : ""}$${util.lowerFirstLetter(
          item.name
        )}.${current.name}${quotes ? "*" : ""}${quotes};`
      );
    }, "");
  });
  json.apiOptions.apiConfig.countConfig.customFiql = fiql;
  json.apiOptions.apiConfig.dataConfig.customFiql = fiql;

  json = JSON.stringify(json, undefined, 2);
  systemConfig.writeGridCreationQuery({
    applicationName: lib.applicationName,
    gridName: `${lib.name} ${lib.applicationName}_splitview`,
    gridConfiguration: json,
    mode: "splitview",
  });
};

const generateGridAndFilterGps = (element, lib, schemaList, file) => {
  const identityColumn = util.getIdentityColumnFromTable(element);
  let gpsCount = 1;
  let gpsFlag = true;
  let gpsLatLong = true;

  let json = {
    gridOptions: {
      suppressHorizontalScroll: false,
      rowModelType: "serverSide",
      rowSelection: "multiple",
      pagination: false,
      suppressRowClickSelection: false,
      suppressCellSelection: true,
      columnDefs: [],
    },
    apiOptions: {
      apiConfig: {
        countConfig: {
          countKey: "",
          params: {
            orderBy: "modifiedTime",
            orderType: "desc",
          },
          context: `${lib.context.toUpperCase()}`,
          fiqlKey: "filter",
          suppressDefaultFiqlOnApply: true,
          queryParamsUrl: "$filter",
          quickFilterKey: identityColumn
            ? `${util.lowerFirstLetter(element.name)}.${identityColumn.name}`
            : null,
          defaultFiql: element.softDelete
            ? "deleted==false;id=ge=0;"
            : "id=ge=0;",
          url: `${lib.entityName}/count`,
          requestType: "GET",
          suppressNullValues: true,
        },
        dataConfig: {
          context: `${lib.context.toUpperCase()}`,
          dataKey: "data",
          suppressDefaultFiqlOnApply: true,
          fiqlKey: "filter",
          quickFilterKey: identityColumn
            ? `${util.lowerFirstLetter(element.name)}.${identityColumn.name}`
            : null,
          defaultFiql: element.softDelete
            ? "deleted==false;id=ge=0;"
            : "id=ge=0;",
          queryParamsUrl: "$filter&$offset&$size&$orderBy&$orderType",
          requestType: "GET",
          suppressNullValues: true,
          params: {
            orderBy: "modifiedTime",
            orderType: "desc",
          },
          // url: `${lib.entityName}/search`,
          url: `${lib.entityName}/search`,
          lLimitKey: "offset",
          uLimitKey: "size",
        },
      },
    },
    filterOptions: {
      suppressFilterSave: true,
      enableFiqlCondition: true,
      filterConfig: [],
      filterApplyMode: "client",
    },
    sortingOptions: {
      sortConfig: [],
    },
    componentOptions: {
      actionButtonsMode: "menu",
    },
    listActions: [
      {
        label: "Create",
        id: "create",
        icon: "plus_small",
        removable: false,
        navigateTo: "form",
        templateName: element.isCustomTable
          ? `${file.applicationName.toUpperCase()}_${element.nativeName.toUpperCase()}_FORM`
          : `${file.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
      },
      {
        label: "Import",
        icon: "Upload-Outline",
        id: "import",
        url: `${lib.entityName}/importData`,
        context: `${lib.context.toUpperCase()}`,
      },
      {
        label: "Export",
        icon: "Download-Outline",
        id: "export",
        url: `${lib.entityName}/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc`,
        context: `${lib.context.toUpperCase()}`,
      },
    ],
    rowActions: [
      {
        label: "View",
        id: "view",
        icon: "Eye-Outline",
        removable: false,
        navigateTo: "page",
        templateName: `${lib.context.toUpperCase()}_${lib.entityName.toUpperCase()}_PAGE_VIEW`,
      },
      {
        label: "Edit",
        id: "edit",
        icon: "Edit-Outline",
        removable: false,
        navigateTo: "form",
        templateName: element.isCustomTable
          ? `${file.applicationName.toUpperCase()}_${element.nativeName.toUpperCase()}_FORM`
          : `${file.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
      },
      {
        label: "Delete",
        id: "delete",
        icon: "Delete-Outline",
        removable: false,
        url: `${lib.entityName}/deleteById?id=$id`,
        context: `${lib.context.toUpperCase()}`,
      },
    ],
    rowClickAction: {
      label: "View",
      id: "view",
      icon: "Eye-Outline",
      removable: false,
      navigateTo: "page",
      templateName: `${lib.context.toUpperCase()}_${lib.entityName.toUpperCase()}_PAGE_VIEW`,
    },
    headerOptions: {
      suppressFilterButton: true,
      suppressQuickFilter: true,
      suppressCountLabel: false,
      suppressTableOptions: true,
    },
    markerConfig: [],
    footerOptions: {
      legendConfig: [],
      suppressFooter: true,
    },
    displayOptions: {
      mapViewMode: "fullMap",
      minZoom: 5,
      maxZoom: 15,
      defaultZoom: 6,
      defaultLocation: "IN",
      baseMapView: "roadmap",
      iconConfig: {
        key: "",
        rule: [],
      },
    },
    cardName: "genericCard",
    type: "map",
    entity: `${lib.entityName}`,
    restName: `${lib.entityName}`,
    context: `${lib.context.toUpperCase()}`,
    applicationName: `${lib.applicationName.toUpperCase()}_APP_NAME`,
    latLong: {
      latitude: {},
      longitude: {},
    },
    // cellFormatting: {}
  };
  // ******** component options ********
  if (element.extendable) {
    json.componentOptions = {
      actionButtonsMode: "menu",
      exportOptions: {
        fileName: `${lib.entityName} List`,
      },
      customFieldsConfig: {
        category: element.nativeName,
        tableConfig: [
          {
            tableName: `${element.name}CustomField`,
            wrapperKey: `${util.camelize(element.name)}CustomField`,
          },
        ],
      },
    };
  }
  // ******** columnDefs ********
  let countSplitviewCol = 0;
  element.fields.forEach((item) => {
    if (
      !(item.properties && item.properties.mappedAs == "OneToMany") &&
      util.validateColumn(item)
    ) {
      if (item.type === "Reference") {
        const table = util.getTablePropsByPojoName(
          schemaList,
          item.properties.table
        );
        if (
          !(typeof table === "undefined") &&
          !(typeof table.fields === "undefined")
        ) {
          table.fields.forEach((el) => {
            if (el.type != "Reference" && util.validateColumn(el)) {
              const temp = {
                headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                  .dasherise(table.displayName)
                  .toUpperCase()}_${util
                  .dasherise(el.displayName)
                  .toUpperCase()}`,
                field: `${item.name}.${el.name}`,
                width: 160,
                sortable: false,
                valueGetterParams: {
                  suppressTranslation: true,
                },
                cellRendererParams: { suppressTranslation: true },
              };
              let cellItem = {
                label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                  .dasherise(table.displayName)
                  .toUpperCase()}_${util
                  .dasherise(el.displayName)
                  .toUpperCase()}`,
                key: `${util.lowerFirstLetter(item.name)}.${el.name}`,
                filterType: "quick",
                type: "",
              };
              cellItem = util.getFilterConfigByType(el, cellItem);

              if (temp && cellItem) {
                let fieldType = cellItem.type;
                if (item?.type == "DateTime") {
                  fieldType = "dateTime";
                } else {
                  fieldType = util.typeGenerator(el, schemaList);
                }
                cellItem.fieldType = fieldType;
              }

              temp.cellData = cellItem;
              const sortTemp = {
                label: `${item.name}.${el.name}`,
                colId: `${item.name}.${el.name}`,
                orderByKey: "orderBy",
                orderByValue: `${item.name}.${el.name}`,
                orderTypeKey: "orderType",
                asc: "asc",
                desc: "desc",
              };
              if (util.typeGenerator(el, schemaList) == "date") {
                temp.cellRenderer = "gxAgGridDateAndTime";
                delete temp["tooltipField"];
              }
              if (util.getIdentityColumn(schemaList, item)?.name === el.name) {
                temp.navigationConfig = {
                  applicationName: lib.applicationName,
                  entity: item.name,
                  route: `${util.dasherise(
                    lib.applicationName
                  )}/${util.dasherise(item.properties.table)}/${util.dasherise(
                    item.properties.table
                  )}-view`,
                };
                temp.cellRenderer = "hyperlinkCellRenderer";
                const quotes = [
                  "Journal",
                  "String",
                  "Choice",
                  "Email",
                ].includes(el.type)
                  ? "''"
                  : "";
                const filterItem = {
                  label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
                    .dasherise(table.displayName)
                    .toUpperCase()}_${util
                    .dasherise(el.displayName)
                    .toUpperCase()}`,
                  key: `${util.lowerFirstLetter(item.name)}.${el.name}`,
                  type: "autocomplete",
                  fieldType: "autocomplete",
                  filterType: "quick",
                  apiConfig: {
                    rest: `${table.name}/search?filter=${
                      el.name
                    }==${quotes}*$searchText*${quotes}${
                      table.softDelete ? ";deleted==false" : ""
                    }&offset=0&size=25`,
                    context: `${lib.context.toUpperCase()}`,
                    type: "GET",
                    dataKey: el.name,
                    dataType: "object",
                    params: [
                      {
                        key: "searchText",
                        fromSearch: true,
                      },
                    ],
                  },
                };
                temp.cellData = filterItem;
              }
              temp.editable = false;
              temp.onCellValueChanged = "onValueChange";
              temp.cellEditor = "myCustomEditor";
              countSplitviewCol += 1;
              if (countSplitviewCol <= 3)
                json.gridOptions.columnDefs.push(temp);
              // util.isPushSortTemp(sortTemp)  && json.sortingOptions.sortConfig.push(sortTemp);
            }
          });
        }
      } else {
        let type = "";
        const temp = {
          headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
          field: item.name,
          width: 160,
          sortable: true,
          cellRendererParams: { suppressTranslation: true },
        };
        const sortTemp = {
          label: item.name,
          colId: item.name,
          orderByKey: "orderBy",
          orderByValue: item.name,
          orderTypeKey: "orderType",
          asc: "asc",
          desc: "desc",
        };
        // util.isPushSortTemp(sortTemp)  && json.sortingOptions.sortConfig.push(sortTemp);
        if (util.typeGenerator(item, schemaList) == "date") {
          temp.cellRenderer = "gxAgGridDateAndTime";
          delete temp["tooltipField"];
        }
        if (util.typeGenerator(item, schemaList) == "textarea") {
          temp.hide = true;
        }

        let filterItem = {
          label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
          key: `${item.name}`,
          filterType: "quick",
        };

        if (item.type != "GPS") {
          filterItem = util.getFilterConfigByType(item, filterItem);
          if (!item.apiConfig && !item.identityColumn) {
            // json.filterOptions.filterConfig.push(filterItem);
          }

          // temp.cellData = filterItem;
        }

        if (temp && temp.cellData) {
          let fieldType = temp.type;
          if (item?.type == "DateTime") {
            fieldType = "dateTime";
          } else {
            fieldType = util.typeGenerator(item, schemaList);
          }
          temp.cellData.fieldType = fieldType;
        }
        json.gridOptions.columnDefs.push(temp);
      }
    }

    if (item) {
      let tempGps = {
        headerName: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
          .dasherise(element.displayName)
          .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
        field: item.name,
        id: `${item.name}`,
        type: `${item.type}`,
      };
      if (json.markerConfig && gpsCount <= 5) {
        gpsCount++;
        json.markerConfig.push(tempGps);
      }
    }
    if (item.type == "GPS" && gpsLatLong) {
      let templatitude = {
        input: true,
        parentFormId: 793,
        defaultValue: null,
        tableView: true,
        description: `${util.dasherise(item.displayName) + "Latitude"}`,
        inputType: "number",
        label: `${util.dasherise(item.displayName) + "Latitude"}`,
        placeholder: `${util.dasherise(item.displayName) + "Latitude"}`,
        type: `${item.type}`,
        primaryKeyName: "id",
        key: `${util.dasherise(item.displayName) + "Latitude"}`,
        validate: { required: true },
      };
      let templongitude = {
        input: true,
        parentFormId: 793,
        defaultValue: null,
        tableView: true,
        description: `${util.dasherise(item.displayName) + "Longitude"}`,
        inputType: "number",
        label: `${util.dasherise(item.displayName) + "Longitude"}`,
        placeholder: `${util.dasherise(item.displayName) + "Longitude"}`,
        type: `${item.type}`,
        primaryKeyName: "id",
        key: `${util.dasherise(item.displayName) + "Longitude"}`,
        validate: {
          required: true,
        },
      };

      json.latLong.latitude = templatitude;
      json.latLong.longitude = templongitude;
      gpsLatLong = false;
    }
  });
  if (element.enableWorkflow) {
    json.gridOptions.columnDefs.push({
      headerName: "WORKFLOW_STAGE",
      field: "workflowStage",
      tooltipField: "workflowStage",
      sortable: true,
      width: 160,
    });
    // json.filterOptions.filterConfig.push({
    //   label: "WORKFLOW_STAGE",
    //   key: "workflowStage",
    //   type: "input",
    //   filterType: "quick",
    // });
    json.sortingOptions.sortConfig.push({
      label: "workflowStage",
      colId: "workflowStage",
      orderByKey: "orderBy",
      orderByValue: "workflowStage",
      orderTypeKey: "orderType",
      asc: "asc",
      desc: "desc",
    });
  }

  let fiql = "";
  schemaList.forEach((item) => {
    const filtered = item.fields.filter((f) => {
      return f.isPrimary || (item.name === element.name && f.identityColumn);
    });
    fiql += filtered.reduce((pre, current) => {
      const quotes = ["Journal", "String", "Choice", "Email"].includes(
        current.type
      )
        ? "''"
        : "";
      return (
        pre +
        `${
          item.name === lib.entityName
            ? ""
            : util.lowerFirstLetter(item.name) + "."
        }${current.name}==${quotes}${quotes ? "*" : ""}$${util.lowerFirstLetter(
          item.name
        )}.${current.name}${quotes ? "*" : ""}${quotes};`
      );
    }, "");
  });
  json.apiOptions.apiConfig.countConfig.customFiql = fiql;
  json.apiOptions.apiConfig.dataConfig.customFiql = fiql;
  json = JSON.stringify(json, undefined, 2);

  element.fields.forEach((field) => {
    if (field.type == "GPS" && gpsFlag) {
      gpsFlag = false;
      systemConfig.writeGridCreationQuery({
        applicationName: lib.applicationName,
        gridName: `${lib.name} ${lib.applicationName}_map`,
        gridConfiguration: json,
        mode: "map",
      });
    }
  });
};

const generatePage = (element, lib, schemaList) => {
  const identityColumn = util.getIdentityColumnFromTable(element);
  let pageWidgetId = getRandomId("grid-config-create");
  let sectionId = getRandomId("section");
  let json = {
    dataList: [
      {
        id: 0,
        cols: 12,
        version:3,
        name: "",
        root: true,
        type: "Section",
        depth: 1,
        children: [
          {
            type: "Section",
            name:"Section",
            children: [
              {
                x: 0,
                y: 0,
                cols: 30,
                rows: 32,
                data: {
                  name: "List",
                  hover: false,
                  widgetId: pageWidgetId,
                  gridConfig: {
                    gridName: lib.name + " " + lib.applicationName,
                  },
                  templateId: "grid-config-create",
                  widgetJson: {
                    name: "List",
                    type: "widget",
                    widgetType: "widget",
                  },
                  actionButton: {
                    customActionButtons: [],
                  },
                  liveTemplate: false,
                },
                type: "template",
                template: null,
                id: pageWidgetId,
                draggable: true,
                resizable: true,
                noBoxShadow: false,
                noBackground: false,
                noBorderRadius: false,
              },
            ],
            id:sectionId,
            actionButtons: {
              drag: false,
              edit: false,
              delete: false,
            }
          },
        ],
        actionButtons: {
          drag: false,
          edit: false,
          delete: false,
        },
      },
    ],
    fieldMapping: {},
  };

  const tempJSON = JSON.stringify(json);
  json = JSON.stringify(json, undefined, 2);
  return {
    metaJson: tempJSON,
    name: `${lib.applicationName.toUpperCase()}_${element.name.toUpperCase()}_PAGE`,
    application: { name: `${lib.applicationName.toUpperCase()}_APP_NAME` },
  };
};

const generateViewPage = (element, lib, schemaList, tabs) => {
  const identityColumn = util.getIdentityColumnFromTable(element);
  const tabItem = getTabsJson(tabs?.sectionDetails?.tabSection, lib, element);
  const eleObject = { eleName: element.name.toUpperCase() };
  let viewPageWidgetId = getRandomId("view-builder");
  let tabId = getRandomId("tabs");
  let sectionId = getRandomId("section");

  let json = {
    dataList: [
      {
        id: 0,
        cols: 30,
        version:3,
        name: "",
        root: true,
        type: "Section",
        depth: 1,
        children: [
          {
            type: "Section",
            name:"Section",
            children: [
              {
                x: 0,
                y: 0,
                cols: 30,
                rows: tabItem.length > 0 ? 9 : 32,
                data: {
                  name: "Form",
                  hover: false,
                  widgetId: viewPageWidgetId,
                  templateId: "view-builder",
                  widgetJson: {
                    name: "Form",
                    type: "widget",
                    widgetType: "widget",
                  },
                  actionButton: {
                    customActionButtons: [],
                  },
                  liveTemplate: false,
                  viewBuilderConfig: {
                    mode: "label-wrap",
                    viewId: "",
                    viewName: `${lib.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
                    labelWrap: true,
                    hideFooter: true,
                    moduleName:
                      `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                    viewConfig: {
                      mode: "label-wrap",
                      viewId: "",
                      viewName: `${lib.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
                      entityMap: {
                        identifier1: "",
                        identifier2: "tablenName",
                        identifier3: "$data.tableName.id",
                        SERVICE_DIR_KEY: "SM_DOC_BASE_DIR",
                        SERVICE_URL_KEY: "SM_DOCUMENT_HTTP_URL",
                        applicationName: "",
                        GENERATE_TEMP_ID: true,
                        CHILD_FOLDER_TYPE: "ENTITY",
                        disableGetDataApi: false,
                        CHILD_FOLDER_VALUE: "tablenName",
                        PARENT_FOLDER_TYPE: "APPLICATIONNAME",
                        CHECKLIST_ENTITY_ID: "$tablenName.id",
                        PARENT_FOLDER_VALUE: "",
                        CHECKLIST_ENTITY_TYPE: "tablenName",
                      },
                      applicationName:
                        `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                    },
                    pageContext: generatePageContextJson(element),
                    // [
                    //   {
                    //     title: `${element.name}` + ".ID",
                    //     entity: `${element.name}`,
                    //     key: "id",
                    //   },
                    // ],
                    entityKeyMap: {
                      [eleObject.eleName]: {
                        key: "ID",
                        title: `${element.name}` + ".ID",
                        entity: `${element.name}`,
                      },
                    },
                    advanceConfig: true,
                    applicationName:
                      `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                    advanceConfigJson: '{"disableGetDataApi":false}',
                    viewBuilderConfig: {
                      mode: "label-wrap",
                      viewId: "",
                      viewName: `${lib.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
                      labelWrap: true,
                      hideFooter: true,
                      moduleName:
                        `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                      viewConfig: {
                        mode: "label-wrap",
                        viewId: "",
                        viewName: `${lib.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
                        entityMap: {
                          identifier1: "",
                          identifier2: "tablenName",
                          identifier3: "$data.tableName.id",
                          SERVICE_DIR_KEY: "SM_DOC_BASE_DIR",
                          SERVICE_URL_KEY: "SM_DOCUMENT_HTTP_URL",
                          applicationName: "",
                          GENERATE_TEMP_ID: true,
                          CHILD_FOLDER_TYPE: "ENTITY",
                          disableGetDataApi: false,
                          CHILD_FOLDER_VALUE: "tablenName",
                          PARENT_FOLDER_TYPE: "APPLICATIONNAME",
                          CHECKLIST_ENTITY_ID: "$tablenName.id",
                          PARENT_FOLDER_VALUE: "",
                          CHECKLIST_ENTITY_TYPE: "tablenName",
                        },
                        applicationName:
                          `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                      },
                      pageContext: [
                        {
                          title: `${element.name}` + ".ID",
                          entity: `${element.name}`,
                          key: "id",
                        },
                      ],
                      entityKeyMap: {
                        [eleObject.eleName]: {
                          key: "ID",
                          title: `${element.name}` + ".ID",
                          entity: `${element.name}`,
                        },
                      },
                      advanceConfig: true,
                      applicationName:
                        `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                      advanceConfigJson: '{"disableGetDataApi":false}',
                      viewBuilderConfig: {
                        mode: "label-wrap",
                        viewId: "",
                        viewName: `${lib.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
                        labelWrap: true,
                        moduleName:
                          `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                        viewConfig: {
                          mode: "label-wrap",
                          viewId: "",
                          viewName: `${lib.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
                          entityMap: {
                            identifier1: "",
                            identifier2: "tablenName",
                            identifier3: "$data.tableName.id",
                            SERVICE_DIR_KEY: "SM_DOC_BASE_DIR",
                            SERVICE_URL_KEY: "SM_DOCUMENT_HTTP_URL",
                            applicationName: "",
                            GENERATE_TEMP_ID: true,
                            CHILD_FOLDER_TYPE: "ENTITY",
                            disableGetDataApi: false,
                            CHILD_FOLDER_VALUE: "tablenName",
                            PARENT_FOLDER_TYPE: "APPLICATIONNAME",
                            CHECKLIST_ENTITY_ID: "$tablenName.id",
                            PARENT_FOLDER_VALUE: "",
                            CHECKLIST_ENTITY_TYPE: "tablenName",
                          },
                          applicationName:
                            `${lib.applicationName}`.toUpperCase() +
                            "_APP_NAME",
                        },
                        pageContext: [
                          {
                            title: `${element.name}` + ".ID",
                            entity: `${element.name}`,
                            key: "id",
                          },
                        ],
                        entityKeyMap: {
                          [eleObject.eleName]: {
                            key: "ID",
                            title: `${element.name}` + ".ID",
                            entity: `${element.name}`,
                          },
                        },
                        advanceConfig: true,
                        applicationName:
                          `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                        advanceConfigJson: '{"disableGetDataApi":false}',
                        viewBuilderConfig: {
                          mode: "label-wrap",
                          viewId: "",
                          viewName: `${lib.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
                          labelWrap: true,
                          moduleName:
                            `${lib.applicationName}`.toUpperCase() +
                            "_APP_NAME",
                          viewConfig: {
                            mode: "label-wrap",
                            viewId: "",
                            viewName: `${lib.applicationName.toUpperCase()}_${lib.entityName.toUpperCase()}_FORM`,
                            entityMap: {
                              identifier1: "",
                              identifier2: "tablenName",
                              identifier3: "$data.tableName.id",
                              SERVICE_DIR_KEY: "SM_DOC_BASE_DIR",
                              SERVICE_URL_KEY: "SM_DOCUMENT_HTTP_URL",
                              applicationName: "",
                              GENERATE_TEMP_ID: true,
                              CHILD_FOLDER_TYPE: "ENTITY",
                              CHILD_FOLDER_VALUE: "tablenName",
                              PARENT_FOLDER_TYPE: "APPLICATIONNAME",
                              CHECKLIST_ENTITY_ID: "$tablenName.id",
                              PARENT_FOLDER_VALUE: "",
                              CHECKLIST_ENTITY_TYPE: "tablenName",
                            },
                            applicationName:
                              `${lib.applicationName}`.toUpperCase() +
                              "_APP_NAME",
                          },
                          entityKeyMap: {},
                          applicationName:
                            `${lib.applicationName}`.toUpperCase() +
                            "_APP_NAME",
                          viewBuilderConfig: "",
                        },
                      },
                    },
                  },
                },
                type: "template",
                template: null,
                id: viewPageWidgetId,
                draggable: true,
                resizable: true,
                minItemCols: 0,
                noBoxShadow: false,
                noBackground: false,
                noBorderRadius: false,
              }
            ],
            id:sectionId,
            actionButtons: {
              drag: false,
              edit: false,
              delete: false,
            }
          }
        ],
        actionButtons: {
          drag: false,
          edit: false,
          delete: false,
        },
      },
    ],
    fieldMapping: {},
  };
  let tabJson={
    x: 0,
    y: 9,
    cols: 30,
    rows: 23,
    type: "Tabs",
    selectedTab: 0,
    id: tabId
  }
  if(JSON.parse(tabItem).length > 0){
    tabJson.children = JSON.parse(tabItem);
    json.dataList[0].children[0].children.push(tabJson);
  }else {
    json.dataList[0].children[0].children[0].rows = 32
  }
  const tempJSON = JSON.stringify(json);
  json = JSON.stringify(json, undefined, 2);

  return {
    metaJson: tempJSON,
    name: `${lib.applicationName.toUpperCase()}_${element.name.toUpperCase()}_PAGE_VIEW`,
    application: { name: `${lib.applicationName.toUpperCase()}_APP_NAME` },
    pageContext: generatePageContextJson(element),
  };
};

const getTabsJson = (tabs, lib, element) => {
  const eleObject = { eleName: element.name.toUpperCase() };
  console.log("tab--", tabs);
  let tempTabs = [];
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].type === "grid") {
      let gridWidgetId = getRandomId("grid-config-create");
      const tmpGridJson = {
        id: i + 1,
        icon: "Tabs",
        name: tabs[i].displayName,
        hover: false,
        children: [
          {
            x: 0,
            y: 0,
            cols: 30,
            rows: 20,
            data: {
              name: "List",
              hover: false,
              widgetId: gridWidgetId,
              gridConfig: {
                gridName:
                  util.dasherise(tabs[i].name) + " " + lib.applicationName,
              },
              templateId: "grid-config-create",
              widgetJson: {
                name: "List",
                type: "widget",
                widgetType: "widget",
              },
              actionButton: {
                customActionButtons: [],
              },
              liveTemplate: false,
            },
            type: "template",
            template: null,
            widgetId: gridWidgetId,
            draggable: true,
            resizable: true,
            noBoxShadow: false,
            noBackground: false,
            noBorderRadius: false,
          }
        ],
        selected: false,
      };
      tempTabs.push(tmpGridJson);
    } else if (tabs[i].type === "normal") {
      let normalWidgetId = getRandomId("view-builder");
      let normalJson = {
        id: i + 1,
        name: tabs[i].displayName,
        hover: false,
        children: [
           {
                x: 0,
                y: 0,
                cols: 30,
                rows: 20,
                data: {
                  name: "Form",
                  hover: false,
                  widgetId: normalWidgetId,
                  templateId: "view-builder",
                  widgetJson: {
                    name: "Form",
                    type: "widget",
                    widgetType: "widget",
                  },
                  actionButton: {
                    customActionButtons: [],
                  },
                  liveTemplate: false,
                  viewBuilderConfig: {
                    mode: "label-wrap",
                    viewId: "",
                    viewName: `${lib.applicationName.toUpperCase()}_${tabs[
                      i
                    ].name.toUpperCase()}_FORM`,
                    labelWrap: true,
                    hideFooter: true,
                    moduleName:
                      `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                    viewConfig: {
                      mode: "label-wrap",
                      viewId: "",
                      viewName: `${lib.applicationName.toUpperCase()}_${tabs[
                        i
                      ].name.toUpperCase()}_FORM`,
                      entityMap: {
                        identifier1: "",
                        identifier2: "tablenName",
                        identifier3: "$data.tableName.id",
                        SERVICE_DIR_KEY: "SM_DOC_BASE_DIR",
                        SERVICE_URL_KEY: "SM_DOCUMENT_HTTP_URL",
                        applicationName: "",
                        GENERATE_TEMP_ID: true,
                        CHILD_FOLDER_TYPE: "ENTITY",
                        disableGetDataApi: false,
                        CHILD_FOLDER_VALUE: "tablenName",
                        PARENT_FOLDER_TYPE: "APPLICATIONNAME",
                        CHECKLIST_ENTITY_ID: "$tablenName.id",
                        PARENT_FOLDER_VALUE: "",
                        CHECKLIST_ENTITY_TYPE: "tablenName",
                      },
                      applicationName:
                        `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                    },
                    pageContext: generatePageContextJson(element),
                    entityKeyMap: {
                      [tabs[i].name.toUpperCase()]: {
                        key: "ID",
                        title: `${tabs[i].name}` + ".ID",
                        entity: `${tabs[i].name}`,
                      },
                    },
                    advanceConfig: true,
                    applicationName:
                      `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                    advanceConfigJson: '{"disableGetDataApi":false}',
                    viewBuilderConfig: {
                      mode: "label-wrap",
                      viewId: "",
                      viewName: `${lib.applicationName.toUpperCase()}_${tabs[
                        i
                      ].name.toUpperCase()}_FORM`,
                      labelWrap: true,
                      hideFooter: true,
                      moduleName:
                        `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                      viewConfig: {
                        mode: "label-wrap",
                        viewId: "",
                        viewName: `${lib.applicationName.toUpperCase()}_${tabs[
                          i
                        ].name.toUpperCase()}_FORM`,
                        entityMap: {
                          identifier1: "",
                          identifier2: "tablenName",
                          identifier3: "$data.tableName.id",
                          SERVICE_DIR_KEY: "SM_DOC_BASE_DIR",
                          SERVICE_URL_KEY: "SM_DOCUMENT_HTTP_URL",
                          applicationName: "",
                          GENERATE_TEMP_ID: true,
                          CHILD_FOLDER_TYPE: "ENTITY",
                          disableGetDataApi: false,
                          CHILD_FOLDER_VALUE: "tablenName",
                          PARENT_FOLDER_TYPE: "APPLICATIONNAME",
                          CHECKLIST_ENTITY_ID: "$tablenName.id",
                          PARENT_FOLDER_VALUE: "",
                          CHECKLIST_ENTITY_TYPE: "tablenName",
                        },
                        applicationName:
                          `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                      },
                      pageContext: [
                        {
                          title: `${tabs[i].name}` + ".ID",
                          entity: `${tabs[i].name}`,
                          key: "id",
                        },
                      ],
                      entityKeyMap: {
                        [tabs[i].name.toUpperCase()]: {
                          key: "ID",
                          title: `${tabs[i].name}` + ".ID",
                          entity: `${tabs[i].name}`,
                        },
                      },
                      advanceConfig: true,
                      applicationName:
                        `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                      advanceConfigJson: '{"disableGetDataApi":false}',
                      viewBuilderConfig: {
                        mode: "label-wrap",
                        viewId: "",
                        viewName: `${lib.applicationName.toUpperCase()}_${tabs[
                          i
                        ].name.toUpperCase()}_FORM`,
                        labelWrap: true,
                        moduleName:
                          `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                        viewConfig: {
                          mode: "label-wrap",
                          viewId: "",
                          viewName: `${lib.applicationName.toUpperCase()}_${tabs[
                            i
                          ].name.toUpperCase()}_FORM`,
                          entityMap: {
                            identifier1: "",
                            identifier2: "tablenName",
                            identifier3: "$data.tableName.id",
                            SERVICE_DIR_KEY: "SM_DOC_BASE_DIR",
                            SERVICE_URL_KEY: "SM_DOCUMENT_HTTP_URL",
                            applicationName: "",
                            GENERATE_TEMP_ID: true,
                            CHILD_FOLDER_TYPE: "ENTITY",
                            disableGetDataApi: false,
                            CHILD_FOLDER_VALUE: "tablenName",
                            PARENT_FOLDER_TYPE: "APPLICATIONNAME",
                            CHECKLIST_ENTITY_ID: "$tablenName.id",
                            PARENT_FOLDER_VALUE: "",
                            CHECKLIST_ENTITY_TYPE: "tablenName",
                          },
                          applicationName:
                            `${lib.applicationName}`.toUpperCase() +
                            "_APP_NAME",
                        },
                        pageContext: [
                          {
                            title: `${tabs[i].name}` + ".ID",
                            entity: `${tabs[i].name}`,
                            key: "id",
                          },
                        ],
                        entityKeyMap: {
                          [tabs[i].name.toUpperCase()]: {
                            key: "ID",
                            title: `${tabs[i].name}` + ".ID",
                            entity: `${tabs[i].name}`,
                          },
                        },
                        advanceConfig: true,
                        applicationName:
                          `${lib.applicationName}`.toUpperCase() + "_APP_NAME",
                        advanceConfigJson: '{"disableGetDataApi":false}',
                        viewBuilderConfig: {
                          mode: "label-wrap",
                          viewId: "",
                          viewName: `${lib.applicationName.toUpperCase()}_${tabs[
                            i
                          ].name.toUpperCase()}_FORM`,
                          labelWrap: true,
                          moduleName:
                            `${lib.applicationName}`.toUpperCase() +
                            "_APP_NAME",
                          viewConfig: {
                            mode: "label-wrap",
                            viewId: "",
                            viewName: `${lib.applicationName.toUpperCase()}_${tabs[
                              i
                            ].name.toUpperCase()}_FORM`,
                            entityMap: {
                              identifier1: "",
                              identifier2: "tablenName",
                              identifier3: "$data.tableName.id",
                              SERVICE_DIR_KEY: "SM_DOC_BASE_DIR",
                              SERVICE_URL_KEY: "SM_DOCUMENT_HTTP_URL",
                              applicationName: "",
                              GENERATE_TEMP_ID: true,
                              CHILD_FOLDER_TYPE: "ENTITY",
                              disableGetDataApi: false,
                              CHILD_FOLDER_VALUE: "tablenName",
                              PARENT_FOLDER_TYPE: "APPLICATIONNAME",
                              CHECKLIST_ENTITY_ID: "$tablenName.id",
                              PARENT_FOLDER_VALUE: "",
                              CHECKLIST_ENTITY_TYPE: "tablenName",
                            },
                            applicationName:
                              `${lib.applicationName}`.toUpperCase() +
                              "_APP_NAME",
                          },
                          pageContext: [
                            {
                              title: `${tabs[i].name}` + ".ID",
                              entity: `${tabs[i].name}`,
                              key: "id",
                            },
                          ],
                          entityKeyMap: {
                            [tabs[i].name.toUpperCase()]: {
                              key: "ID",
                              title: `${tabs[i].name}` + ".ID",
                              entity: `${tabs[i].name}`,
                            },
                          },
                          advanceConfig: true,
                          applicationName:
                            `${lib.applicationName}`.toUpperCase() +
                            "_APP_NAME",
                          advanceConfigJson: '{"disableGetDataApi":false}',
                          viewBuilderConfig: {
                            mode: "label-wrap",
                            viewId: "",
                            viewName: `${lib.applicationName.toUpperCase()}_${tabs[
                              i
                            ].name.toUpperCase()}_FORM`,
                            labelWrap: true,
                            moduleName:
                              `${lib.applicationName}`.toUpperCase() +
                              "_APP_NAME",
                            viewConfig: {
                              mode: "label-wrap",
                              viewId: "",
                              viewName: `${lib.applicationName.toUpperCase()}_${tabs[
                                i
                              ].name.toUpperCase()}_FORM`,
                              entityMap: {
                                identifier1: "",
                                identifier2: "tablenName",
                                identifier3: "$data.tableName.id",
                                SERVICE_DIR_KEY: "SM_DOC_BASE_DIR",
                                SERVICE_URL_KEY: "SM_DOCUMENT_HTTP_URL",
                                applicationName: "",
                                GENERATE_TEMP_ID: true,
                                CHILD_FOLDER_TYPE: "ENTITY",
                                CHILD_FOLDER_VALUE: "tablenName",
                                PARENT_FOLDER_TYPE: "APPLICATIONNAME",
                                CHECKLIST_ENTITY_ID: "$tablenName.id",
                                PARENT_FOLDER_VALUE: "",
                                CHECKLIST_ENTITY_TYPE: "tablenName",
                              },
                              applicationName:
                                `${lib.applicationName}`.toUpperCase() +
                                "_APP_NAME",
                            },
                            entityKeyMap: {},
                            applicationName:
                              `${lib.applicationName}`.toUpperCase() +
                              "_APP_NAME",
                            viewBuilderConfig: {
                              mode: "perform",
                              viewId: "",
                              viewName: `${lib.applicationName.toUpperCase()}_${tabs[
                                i
                              ].name.toUpperCase()}_FORM`,
                              moduleName:
                                `${lib.applicationName}`.toUpperCase() +
                                "_APP_NAME",
                              viewConfig: {
                                mode: "perform",
                                viewId: "",
                                viewName: `${lib.applicationName.toUpperCase()}_${tabs[
                                  i
                                ].name.toUpperCase()}_FORM`,
                                entityMap: {
                                  identifier1: "",
                                  identifier2: "tablenName",
                                  identifier3: "$data.tableName.id",
                                  SERVICE_DIR_KEY: "SM_DOC_BASE_DIR",
                                  SERVICE_URL_KEY: "SM_DOCUMENT_HTTP_URL",
                                  applicationName: "",
                                  GENERATE_TEMP_ID: true,
                                  CHILD_FOLDER_TYPE: "ENTITY",
                                  CHILD_FOLDER_VALUE: "tablenName",
                                  PARENT_FOLDER_TYPE: "APPLICATIONNAME",
                                  CHECKLIST_ENTITY_ID: "$tablenName.id",
                                  PARENT_FOLDER_VALUE: "",
                                  CHECKLIST_ENTITY_TYPE: "tablenName",
                                },
                                applicationName:
                                  `${lib.applicationName}`.toUpperCase() +
                                  "_APP_NAME",
                              },
                              entityKeyMap: {},
                              applicationName:
                                `${lib.applicationName}`.toUpperCase() +
                                "_APP_NAME",
                              viewBuilderConfig: "",
                            },
                          },
                        },
                      },
                    },
                  },
                },
                type: "template",
                template: null,
                widgetId: normalWidgetId,
                draggable: true,
                resizable: true,
                noBoxShadow: false,
                noBackground: false,
                noBorderRadius: false,
              },
        ],
        selected: true,
      };
      tempTabs.push(normalJson);
    } else if (tabs[i].type === "comment") {
      let commentWidgetId = getRandomId("gxtb-comment");
      let commentJson = {
        id: i + 1,
        icon: "Tabs",
        name: tabs[i].displayName,
        hover: false,
        children: [
          {
            x: 0,
            y: 0,
            cols: 30,
            rows : 20,
            data: {
              name: tabs[i].displayName,
              hover: false,
              widgetId: commentWidgetId,
              templateId: "gxtb-comment",
              widgetJson: {
                name: tabs[i].displayName,
                type: "widget",
                widgetType: "widget",
              },
              actionButton: {
                customActionButtons: [],
              },
              customConfig: {
                contextUrl: `${lib.applicationName}`.toUpperCase(),
              },
              liveTemplate: false,
            },
            type: "template",
            template: null,
            widgetId: commentWidgetId,
            draggable: true,
            resizable: true,
            minItemCols: 0,
            noBoxShadow: false,
            noBackground: false,
            noBorderRadius: false,
          }
        ],
        selected: false,
      };
      tempTabs.push(commentJson);
    } else if (tabs[i].type === "attachment") {
      let attachmentWidgetId = getRandomId("gxtb-attachment");
      let attachmentJson = {
        id: i + 1,
        icon: "Tabs",
        name: tabs[i].displayName,
        hover: false,
        children: [
          {
            x: 0,
            y: 0,
            cols: 30,
            rows: 20,
            data: {
              name: tabs[i].displayName,
              hover: false,
              widgetId: attachmentWidgetId,
              templateId: "gxtb-attachment",
              widgetJson: {
                name: tabs[i].displayName,
                type: "widget",
                widgetType: "widget",
              },
              actionButton: {
                customActionButtons: [],
              },
              customConfig: {
                contextUrl: `${lib.applicationName}`.toUpperCase(),
              },
              liveTemplate: false,
            },
            type: "template",
            template: null,
            widgetId: attachmentWidgetId,
            draggable: true,
            resizable: true,
            minItemCols: 0,
            noBoxShadow: false,
            noBackground: false,
            noBorderRadius: false,
          }
        ],
        selected: false,
      };
      tempTabs.push(attachmentJson);
    } else if (tabs[i].type === "history") {
      let historyWidgetId = getRandomId("grid-config-create");
      let histroyJson = {
        id: i + 1,
        icon: "Tabs",
        name: tabs[i].displayName,
        hover: false,
        children: [
          {
            x: 0,
            y: 0,
            cols: 30,
            rows : 20,
            data: {
              name: "List",
              hover: false,
              widgetId: historyWidgetId,
              gridConfig: {
                gridName:
                  `${lib.applicationName}`.toUpperCase() +
                  "_APP_NAME_HISTORY_AG_GRID",
              },
              templateId: "grid-config-create",
              widgetJson: {
                name: "List",
                type: "widget",
                widgetType: "widget",
              },
              actionButton: {
                customActionButtons: [],
              },
              liveTemplate: false,
            },
            type: "template",
            template: null,
            widgetId: historyWidgetId,
            draggable: true,
            resizable: true,
            noBoxShadow: false,
            noBackground: false,
            noBorderRadius: false,
          }
        ],
        selected: false,
      };
      tempTabs.push(histroyJson);
    }
  }
  return JSON.stringify(tempTabs);
};

const getRandomId = (params) => {
  const val = Math.floor(1000 + Math.random() * 9000);
  return params + "_" + val;
};

const generatePageContextJson = (element) => {
  let temp = [
    { title: `${element.name}` + ".ID", entity: `${element.name}`, key: "id" },
  ];
  element.fields.forEach((field) => {
    if (
      field.properties?.mappedAs === "ManyToOne" ||
      field.properties?.mappedAs === "OneToOne"
    ) {
      temp.push({
        title: `${field.name}` + ".ID",
        entity: `${field.name}`,
        key: "id",
      });
    }
  });
  return temp;
};

module.exports = {
  generateCrudNew,
  generateGridAndFilterNew,
  generateGridViews,
  generatePage,
  generateViewPage,
  generatePageContextJson,
  generateGridAndFilterKanban,
  generateGridAndFilterTile,
  generateGridAndFilterCalendar,
  generateGridAndFilterTimeline,
  generateGridAndFilterSplitview,
  generatePageConfigurationJson,
  generateGridAndFilterGps,
  getRandomId
};
