
 show databases; 
 use PLATFORM;
 insert into DataGridSettings (applicationPackage, datagridname, gridsettings, savegridchoice, mode, view) values ('superapp', 'hosting-details superapp', '{
  "gridOptions": {
    "suppressHorizontalScroll": false,
    "rowModelType": "infinite",
    "rowSelection": "multiple",
    "pagination": true,
    "suppressRowClickSelection": true,
    "suppressCellSelection": true,
    "columnDefs": [
      {
        "headerName": "",
        "field": "checkbox",
        "headerComponent": "gxAgGridSelectAllCheckBox",
        "headerCheckboxSelection": true,
        "checkboxSelection": true,
        "width": 50
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_NAME",
        "field": "miniappDetails.name",
        "width": 160,
        "tooltipField": "miniappDetails.name",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_NAME",
          "key": "miniappDetails.name",
          "type": "autocomplete",
          "fieldType": "autocomplete",
          "filterType": "quick",
          "apiConfig": {
            "rest": "MiniappDetails/search?filter=name==''*$searchText*'';deleted==false&offset=0&size=25",
            "context": "SUPERAPP",
            "type": "GET",
            "dataKey": "name",
            "dataType": "object",
            "params": [
              {
                "key": "searchText",
                "fromSearch": true
              }
            ]
          }
        },
        "navigationConfig": {
          "applicationName": "superapp",
          "entity": "miniappDetails",
          "route": "superapp/miniapp-details/miniapp-details-view"
        },
        "cellRenderer": "hyperlinkCellRenderer",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_DESCRIPTION",
        "field": "miniappDetails.description",
        "width": 160,
        "tooltipField": "miniappDetails.description",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_DESCRIPTION",
          "key": "miniappDetails.description",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_ICONURL",
        "field": "miniappDetails.iconUrl",
        "width": 160,
        "tooltipField": "miniappDetails.iconUrl",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_ICONURL",
          "key": "miniappDetails.iconUrl",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_VERSION",
        "field": "miniappDetails.version",
        "width": 160,
        "tooltipField": "miniappDetails.version",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_VERSION",
          "key": "miniappDetails.version",
          "filterType": "quick",
          "type": "input",
          "maxlength": 15,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_APPLICATIONKEY",
        "field": "miniappDetails.applicationKey",
        "width": 160,
        "tooltipField": "miniappDetails.applicationKey",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_APPLICATIONKEY",
          "key": "miniappDetails.applicationKey",
          "filterType": "quick",
          "type": "input",
          "maxlength": 100,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_TAGGING",
        "field": "miniappDetails.tagging",
        "width": 160,
        "tooltipField": "miniappDetails.tagging",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_TAGGING",
          "key": "miniappDetails.tagging",
          "filterType": "quick",
          "type": "input",
          "maxlength": 30,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.HOSTINGDETAILS.ENVIRONMENT",
        "field": "environment",
        "width": 160,
        "sortable": true,
        "tooltipField": "environment",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.HOSTINGDETAILS.ENVIRONMENT",
          "key": "environment",
          "filterType": "quick",
          "type": "input",
          "maxlength": 50,
          "fieldType": "textfield"
        }
      },
      {
        "headerName": "SUPERAPP_APP_NAME.HOSTINGDETAILS.DOMAIN",
        "field": "domain",
        "width": 160,
        "sortable": true,
        "tooltipField": "domain",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.HOSTINGDETAILS.DOMAIN",
          "key": "domain",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        }
      },
      {
        "headerName": "SUPERAPP_APP_NAME.HOSTINGDETAILS.SSLCERTIFICATE",
        "field": "sslCertificate",
        "width": 160,
        "sortable": true,
        "tooltipField": "sslCertificate",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "hide": true,
        "cellData": {
          "label": "SUPERAPP_APP_NAME.HOSTINGDETAILS.SSLCERTIFICATE",
          "key": "sslCertificate",
          "filterType": "quick",
          "type": "input",
          "fieldType": "textarea"
        }
      },
      {
        "headerName": "",
        "field": "",
        "cellRenderer": "gxAgGridMenuButton",
        "pinned": "right",
        "width": 80,
        "suppressMenu": true
      }
    ]
  },
  "apiOptions": {
    "apiConfig": {
      "countConfig": {
        "countKey": "",
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "context": "SUPERAPP",
        "fiqlKey": "filter",
        "suppressDefaultFiqlOnApply": true,
        "queryParamsUrl": "$filter",
        "quickFilterKey": "hostingDetails.miniappDetails",
        "defaultFiql": "deleted==false;id=ge=0;",
        "url": "HostingDetails/count",
        "requestType": "GET",
        "suppressNullValues": true,
        "customFiql": "miniappDetails==$hostingDetails.miniappDetails;id==$hostingDetails.id;miniappBuildDetails.id==$miniappBuildDetails.id;miniappDetails.id==$miniappDetails.id;"
      },
      "dataConfig": {
        "context": "SUPERAPP",
        "dataKey": "data",
        "suppressDefaultFiqlOnApply": true,
        "fiqlKey": "filter",
        "quickFilterKey": "hostingDetails.miniappDetails",
        "defaultFiql": "deleted==false;id=ge=0;",
        "queryParamsUrl": "$filter&$offset&$size&$orderBy&$orderType",
        "requestType": "GET",
        "suppressNullValues": true,
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "url": "HostingDetails/search",
        "lLimitKey": "offset",
        "pageSizeKey": "size",
        "customFiql": "miniappDetails==$hostingDetails.miniappDetails;id==$hostingDetails.id;miniappBuildDetails.id==$miniappBuildDetails.id;miniappDetails.id==$miniappDetails.id;"
      }
    }
  },
  "filterOptions": {
    "enableFiqlCondition": true,
    "filterConfig": [
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_NAME",
        "key": "miniappDetails.name",
        "type": "autocomplete",
        "fieldType": "autocomplete",
        "filterType": "quick",
        "apiConfig": {
          "rest": "MiniappDetails/search?filter=name==''*$searchText*'';deleted==false&offset=0&size=25",
          "context": "SUPERAPP",
          "type": "GET",
          "dataKey": "name",
          "dataType": "object",
          "params": [
            {
              "key": "searchText",
              "fromSearch": true
            }
          ]
        }
      },
      {
        "label": "SUPERAPP_APP_NAME.HOSTINGDETAILS.ENVIRONMENT",
        "key": "environment",
        "filterType": "quick",
        "type": "input",
        "maxlength": 50,
        "fieldType": "textfield"
      },
      {
        "label": "SUPERAPP_APP_NAME.HOSTINGDETAILS.DOMAIN",
        "key": "domain",
        "filterType": "quick",
        "type": "input",
        "maxlength": 255,
        "fieldType": "textfield"
      },
      {
        "label": "SUPERAPP_APP_NAME.HOSTINGDETAILS.SSLCERTIFICATE",
        "key": "sslCertificate",
        "filterType": "quick",
        "type": "input",
        "fieldType": "textarea"
      }
    ]
  },
  "sortingOptions": {
    "sortConfig": [
      {
        "label": "environment",
        "colId": "environment",
        "orderByKey": "orderBy",
        "orderByValue": "environment",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "domain",
        "colId": "domain",
        "orderByKey": "orderBy",
        "orderByValue": "domain",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "sslCertificate",
        "colId": "sslCertificate",
        "orderByKey": "orderBy",
        "orderByValue": "sslCertificate",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      }
    ]
  },
  "componentOptions": {
    "exportOptions": {
      "fileName": "HostingDetails List"
    },
    "actionButtonsMode": "menu",
    "suppressTableOptions": true,
    "isCustomCardLayout": true,
    "defaultView": "List",
    "menuIconColumns": 2
  },
  "listActions": [
    {
      "label": "Create",
      "id": "create",
      "icon": "plus_small",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_HOSTINGDETAILS_FORM"
    },
    {
      "label": "Import",
      "icon": "Upload-Outline",
      "id": "import",
      "url": "HostingDetails/importData",
      "context": "SUPERAPP"
    },
    {
      "label": "Export",
      "icon": "Download-Outline",
      "id": "export",
      "url": "HostingDetails/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc",
      "context": "SUPERAPP"
    }
  ],
  "rowActions": [
    {
      "label": "View",
      "id": "view",
      "icon": "Eye-Outline",
      "removable": false,
      "navigateTo": "page",
      "templateName": "SUPERAPP_HOSTINGDETAILS_PAGE_VIEW"
    },
    {
      "label": "Edit",
      "id": "edit",
      "icon": "Edit-Outline",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_HOSTINGDETAILS_FORM"
    },
    {
      "label": "Delete",
      "id": "delete",
      "icon": "Delete-Outline",
      "removable": false,
      "url": "HostingDetails/deleteById?id=$id",
      "context": "SUPERAPP"
    }
  ],
  "rowClickAction": {
    "label": "View",
    "id": "view",
    "icon": "Eye-Outline",
    "removable": false,
    "navigateTo": "page",
    "templateName": "SUPERAPP_HOSTINGDETAILS_PAGE_VIEW"
  },
  "headerOptions": {
    "suppressFilterButton": false,
    "suppressQuickFilter": true,
    "suppressCountLabel": false,
    "toggleList": [
      {
        "value": "tile",
        "displayName": "tile",
        "iconName": "Big-Card",
        "icon": "Big-Card$fontset$icomoon",
        "hasIcon": true,
        "checked": false
      },
      {
        "value": "splitview",
        "displayName": "splitview",
        "iconName": "split",
        "icon": "split$fontset$icomoon",
        "hasIcon": true,
        "checked": false
      }
    ],
    "viewSwitchType": "menu-button",
    "suppressViewSwitch": false,
    "suppressTileSwitch": true
  },
  "footerOptions": {
    "suppressFooter": true
  },
  "multipleListJson": [
    {
      "type": "tile",
      "gridNames": "hosting-details superapp_tile"
    },
    {
      "type": "splitview",
      "gridNames": "hosting-details superapp_splitview"
    }
  ],
  "type": "grid",
  "entity": "HostingDetails",
  "restName": "HostingDetails",
  "context": "SUPERAPP",
  "applicationName": "SUPERAPP_APP_NAME",
  "cellFormatting": {}
}', 0, 'grid', NULL);
 insert into DataGridSettings (applicationPackage, datagridname, gridsettings, savegridchoice, mode, view) values ('superapp', 'hosting-details superapp_tile', '{
  "gridOptions": {
    "suppressHorizontalScroll": false,
    "rowModelType": "infinite",
    "rowSelection": "multiple",
    "pagination": true,
    "suppressRowClickSelection": false,
    "suppressCellSelection": true,
    "columnDefs": [
      {
        "headerName": "SUPERAPP_APP_NAME.HOSTINGDETAILS.ENVIRONMENT",
        "field": "environment",
        "sortable": true,
        "tooltipField": "environment",
        "editable": false,
        "type": "String"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.HOSTINGDETAILS.DOMAIN",
        "field": "domain",
        "sortable": true,
        "tooltipField": "domain",
        "editable": false,
        "type": "String"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.HOSTINGDETAILS.SSLCERTIFICATE",
        "field": "sslCertificate",
        "sortable": true,
        "tooltipField": "sslCertificate",
        "editable": false,
        "type": "Journal",
        "hide": true
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_NAME",
        "field": "miniapp details.name",
        "type": "String",
        "tooltipField": "name",
        "sortable": true
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_DESCRIPTION",
        "field": "miniapp details.description",
        "type": "String",
        "tooltipField": "description",
        "sortable": true
      },
      {
        "headerName": "",
        "field": "",
        "width": 80,
        "suppressMenu": true
      }
    ]
  },
  "apiOptions": {
    "apiConfig": {
      "countConfig": {
        "countKey": "",
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "context": "SUPERAPP",
        "fiqlKey": "filter",
        "suppressDefaultFiqlOnApply": true,
        "queryParamsUrl": "$filter",
        "quickFilterKey": "hostingDetails.miniappDetails",
        "defaultFiql": "deleted==false;id=ge=0;",
        "url": "HostingDetails/count",
        "requestType": "GET",
        "suppressNullValues": true,
        "customFiql": "miniappDetails==$hostingDetails.miniappDetails;id==$hostingDetails.id;miniappBuildDetails.id==$miniappBuildDetails.id;miniappDetails.id==$miniappDetails.id;"
      },
      "dataConfig": {
        "context": "SUPERAPP",
        "dataKey": "data",
        "suppressDefaultFiqlOnApply": true,
        "fiqlKey": "filter",
        "quickFilterKey": "hostingDetails.miniappDetails",
        "defaultFiql": "deleted==false;id=ge=0;",
        "queryParamsUrl": "$filter&$offset&$size&$orderBy&$orderType",
        "requestType": "GET",
        "suppressNullValues": true,
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "url": "HostingDetails/search",
        "lLimitKey": "offset",
        "uLimitKey": "size",
        "customFiql": "miniappDetails==$hostingDetails.miniappDetails;id==$hostingDetails.id;miniappBuildDetails.id==$miniappBuildDetails.id;miniappDetails.id==$miniappDetails.id;"
      }
    }
  },
  "filterOptions": {
    "suppressFilterSave": true,
    "enableFiqlCondition": true,
    "filterConfig": [
      {
        "label": "SUPERAPP_APP_NAME.HOSTINGDETAILS.ENVIRONMENT",
        "key": "environment",
        "filterType": "quick",
        "type": "input",
        "maxlength": 50
      },
      {
        "label": "SUPERAPP_APP_NAME.HOSTINGDETAILS.DOMAIN",
        "key": "domain",
        "filterType": "quick",
        "type": "input",
        "maxlength": 255
      },
      {
        "label": "SUPERAPP_APP_NAME.HOSTINGDETAILS.SSLCERTIFICATE",
        "key": "sslCertificate",
        "filterType": "quick",
        "type": "input"
      }
    ]
  },
  "sortingOptions": {
    "sortConfig": [
      {
        "label": "environment",
        "colId": "environment",
        "orderByKey": "orderBy",
        "orderByValue": "environment",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "domain",
        "colId": "domain",
        "orderByKey": "orderBy",
        "orderByValue": "domain",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "sslCertificate",
        "colId": "sslCertificate",
        "orderByKey": "orderBy",
        "orderByValue": "sslCertificate",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      }
    ]
  },
  "componentOptions": {
    "exportOptions": {
      "fileName": "HostingDetails List"
    },
    "actionButtonsMode": "menu",
    "defaultView": "Tile"
  },
  "listActions": [
    {
      "label": "Create",
      "id": "create",
      "icon": "plus_small",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_HOSTINGDETAILS_FORM"
    },
    {
      "label": "Import",
      "icon": "Upload-Outline",
      "id": "import",
      "url": "HostingDetails/importData",
      "context": "SUPERAPP"
    },
    {
      "label": "Export",
      "icon": "Download-Outline",
      "id": "export",
      "url": "HostingDetails/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc",
      "context": "SUPERAPP"
    }
  ],
  "rowActions": [
    {
      "label": "View",
      "id": "view",
      "icon": "Eye-Outline",
      "removable": false,
      "navigateTo": "page",
      "templateName": "SUPERAPP_HOSTINGDETAILS_PAGE_VIEW"
    },
    {
      "label": "Edit",
      "id": "edit",
      "icon": "Edit-Outline",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_HOSTINGDETAILS_FORM"
    },
    {
      "label": "Delete",
      "id": "delete",
      "icon": "Delete-Outline",
      "removable": false,
      "url": "HostingDetails/deleteById?id=$id",
      "context": "SUPERAPP"
    }
  ],
  "rowClickAction": {
    "label": "View",
    "id": "view",
    "icon": "Eye-Outline",
    "removable": false,
    "navigateTo": "page",
    "templateName": "SUPERAPP_HOSTINGDETAILS_PAGE_VIEW"
  },
  "headerOptions": {
    "suppressFilterButton": false,
    "suppressQuickFilter": true,
    "suppressCountLabel": false,
    "countLabelSuffix": "HostingDetails"
  },
  "footerOptions": {
    "suppressFooter": true
  },
  "cardName": "genericCard",
  "type": "tile",
  "entity": "HostingDetails",
  "restName": "HostingDetails",
  "context": "SUPERAPP",
  "applicationName": "SUPERAPP_APP_NAME",
  "cellFormatting": {}
}', 0, 'tile', NULL);
 insert into DataGridSettings (applicationPackage, datagridname, gridsettings, savegridchoice, mode, view) values ('superapp', 'hosting-details superapp_splitview', '{
  "gridOptions": {
    "suppressHorizontalScroll": false,
    "rowModelType": "infinite",
    "rowSelection": "multiple",
    "pagination": true,
    "suppressRowClickSelection": true,
    "suppressCellSelection": true,
    "columnDefs": [
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_NAME",
        "field": "miniappDetails.name",
        "width": 160,
        "tooltipField": "miniappDetails.name",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "type": "textfield",
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_NAME",
          "key": "miniappDetails.name",
          "type": "autocomplete",
          "fieldType": "autocomplete",
          "filterType": "quick",
          "apiConfig": {
            "rest": "MiniappDetails/search?filter=name==''*$searchText*'';deleted==false&offset=0&size=25",
            "context": "SUPERAPP",
            "type": "GET",
            "dataKey": "name",
            "dataType": "object",
            "params": [
              {
                "key": "searchText",
                "fromSearch": true
              }
            ]
          }
        },
        "navigationConfig": {
          "applicationName": "superapp",
          "entity": "miniappDetails",
          "route": "superapp/miniapp-details/miniapp-details-view"
        },
        "cellRenderer": "hyperlinkCellRenderer",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_DESCRIPTION",
        "field": "miniappDetails.description",
        "width": 160,
        "tooltipField": "miniappDetails.description",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "type": "textfield",
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_DESCRIPTION",
          "key": "miniappDetails.description",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_ICONURL",
        "field": "miniappDetails.iconUrl",
        "width": 160,
        "tooltipField": "miniappDetails.iconUrl",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "type": "textfield",
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_ICONURL",
          "key": "miniappDetails.iconUrl",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      }
    ]
  },
  "apiOptions": {
    "apiConfig": {
      "countConfig": {
        "countKey": "",
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "context": "SUPERAPP",
        "fiqlKey": "filter",
        "suppressDefaultFiqlOnApply": true,
        "queryParamsUrl": "$filter",
        "quickFilterKey": "hostingDetails.miniappDetails",
        "defaultFiql": "deleted==false;id=ge=0;",
        "url": "HostingDetails/count",
        "requestType": "GET",
        "suppressNullValues": true,
        "customFiql": "miniappDetails==$hostingDetails.miniappDetails;id==$hostingDetails.id;miniappBuildDetails.id==$miniappBuildDetails.id;miniappDetails.id==$miniappDetails.id;"
      },
      "dataConfig": {
        "context": "SUPERAPP",
        "dataKey": "data",
        "suppressDefaultFiqlOnApply": true,
        "fiqlKey": "filter",
        "quickFilterKey": "hostingDetails.miniappDetails",
        "defaultFiql": "deleted==false;id=ge=0;",
        "queryParamsUrl": "$filter&$offset&$size&$orderBy&$orderType",
        "requestType": "GET",
        "suppressNullValues": true,
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "url": "HostingDetails/search",
        "lLimitKey": "offset",
        "uLimitKey": "size",
        "customFiql": "miniappDetails==$hostingDetails.miniappDetails;id==$hostingDetails.id;miniappBuildDetails.id==$miniappBuildDetails.id;miniappDetails.id==$miniappDetails.id;"
      }
    }
  },
  "filterOptions": {
    "suppressFilterSave": true,
    "enableFiqlCondition": true,
    "filterConfig": []
  },
  "sortingOptions": {
    "sortConfig": [
      {
        "label": "environment",
        "colId": "environment",
        "orderByKey": "orderBy",
        "orderByValue": "environment",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "domain",
        "colId": "domain",
        "orderByKey": "orderBy",
        "orderByValue": "domain",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "sslCertificate",
        "colId": "sslCertificate",
        "orderByKey": "orderBy",
        "orderByValue": "sslCertificate",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      }
    ]
  },
  "componentOptions": {
    "actionButtonsMode": "menu",
    "isCustomCardLayout": true,
    "defaultView": "splitview",
    "tileViewOptions": {
      "noOfColumns": 1,
      "width": "100%",
      "height": "13em",
      "cacheBlockSize": 0
    },
    "splitviewLeftWidth": 30
  },
  "listActions": [
    {
      "label": "Create",
      "id": "create",
      "icon": "plus_small",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_HOSTINGDETAILS_FORM"
    },
    {
      "label": "Import",
      "icon": "Upload-Outline",
      "id": "import",
      "url": "HostingDetails/importData",
      "context": "SUPERAPP"
    },
    {
      "label": "Export",
      "icon": "Download-Outline",
      "id": "export",
      "url": "HostingDetails/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc",
      "context": "SUPERAPP"
    }
  ],
  "rowActions": [
    {
      "label": "View",
      "id": "view",
      "icon": "Eye-Outline",
      "removable": false,
      "navigateTo": "page",
      "templateName": "SUPERAPP_HOSTINGDETAILS_PAGE_VIEW"
    },
    {
      "label": "Edit",
      "id": "edit",
      "icon": "Edit-Outline",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_HOSTINGDETAILS_FORM"
    },
    {
      "label": "Delete",
      "id": "delete",
      "icon": "Delete-Outline",
      "removable": false,
      "url": "HostingDetails/deleteById?id=$id",
      "context": "SUPERAPP"
    }
  ],
  "rowClickAction": {
    "label": "View",
    "id": "view",
    "icon": "Eye-Outline",
    "removable": false,
    "navigateTo": "page",
    "templateName": "SUPERAPP_HOSTINGDETAILS_PAGE_VIEW"
  },
  "headerOptions": {
    "suppressFilterButton": false,
    "suppressQuickFilter": true,
    "suppressCountLabel": false,
    "toggleList": [
      {
        "value": "splitview",
        "displayName": "splitview",
        "hasIcon": false,
        "checked": false
      }
    ]
  },
  "footerOptions": {
    "suppressFooter": true
  },
  "cardName": "SplitViewCard",
  "type": "splitview",
  "entity": "HostingDetails",
  "restName": "HostingDetails",
  "context": "SUPERAPP",
  "applicationName": "SUPERAPP_APP_NAME",
  "splitviewType": "tile"
}', 0, 'splitview', NULL);
 insert into DataGridSettings (applicationPackage, datagridname, gridsettings, savegridchoice, mode, view) values ('superapp', 'miniapp-build-details superapp', '{
  "gridOptions": {
    "suppressHorizontalScroll": false,
    "rowModelType": "infinite",
    "rowSelection": "multiple",
    "pagination": true,
    "suppressRowClickSelection": true,
    "suppressCellSelection": true,
    "columnDefs": [
      {
        "headerName": "",
        "field": "checkbox",
        "headerComponent": "gxAgGridSelectAllCheckBox",
        "headerCheckboxSelection": true,
        "checkboxSelection": true,
        "width": 50
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_NAME",
        "field": "miniappDetails.name",
        "width": 160,
        "tooltipField": "miniappDetails.name",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_NAME",
          "key": "miniappDetails.name",
          "type": "autocomplete",
          "fieldType": "autocomplete",
          "filterType": "quick",
          "apiConfig": {
            "rest": "MiniappDetails/search?filter=name==''*$searchText*'';deleted==false&offset=0&size=25",
            "context": "SUPERAPP",
            "type": "GET",
            "dataKey": "name",
            "dataType": "object",
            "params": [
              {
                "key": "searchText",
                "fromSearch": true
              }
            ]
          }
        },
        "navigationConfig": {
          "applicationName": "superapp",
          "entity": "miniappDetails",
          "route": "superapp/miniapp-details/miniapp-details-view"
        },
        "cellRenderer": "hyperlinkCellRenderer",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_DESCRIPTION",
        "field": "miniappDetails.description",
        "width": 160,
        "tooltipField": "miniappDetails.description",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_DESCRIPTION",
          "key": "miniappDetails.description",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_ICONURL",
        "field": "miniappDetails.iconUrl",
        "width": 160,
        "tooltipField": "miniappDetails.iconUrl",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_ICONURL",
          "key": "miniappDetails.iconUrl",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_VERSION",
        "field": "miniappDetails.version",
        "width": 160,
        "tooltipField": "miniappDetails.version",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_VERSION",
          "key": "miniappDetails.version",
          "filterType": "quick",
          "type": "input",
          "maxlength": 15,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_APPLICATIONKEY",
        "field": "miniappDetails.applicationKey",
        "width": 160,
        "tooltipField": "miniappDetails.applicationKey",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_APPLICATIONKEY",
          "key": "miniappDetails.applicationKey",
          "filterType": "quick",
          "type": "input",
          "maxlength": 100,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_TAGGING",
        "field": "miniappDetails.tagging",
        "width": 160,
        "tooltipField": "miniappDetails.tagging",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_TAGGING",
          "key": "miniappDetails.tagging",
          "filterType": "quick",
          "type": "input",
          "maxlength": 30,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.SOURCECODEURL",
        "field": "sourceCodeUrl",
        "width": 160,
        "sortable": true,
        "tooltipField": "sourceCodeUrl",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.SOURCECODEURL",
          "key": "sourceCodeUrl",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        }
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.COMPILEDFILEURL",
        "field": "compiledFileUrl",
        "width": 160,
        "sortable": true,
        "tooltipField": "compiledFileUrl",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.COMPILEDFILEURL",
          "key": "compiledFileUrl",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        }
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.SOURCECODEPATH",
        "field": "sourceCodePath",
        "width": 160,
        "sortable": true,
        "tooltipField": "sourceCodePath",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.SOURCECODEPATH",
          "key": "sourceCodePath",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        }
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.STATUS",
        "field": "status",
        "width": 160,
        "sortable": true,
        "tooltipField": "status",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.STATUS",
          "key": "status",
          "filterType": "quick",
          "type": "select",
          "optionList": [
            {
              "name": "NEW",
              "value": "NEW"
            },
            {
              "name": "PASS",
              "value": "PASS"
            },
            {
              "name": "FAIL",
              "value": "FAIL"
            }
          ],
          "fieldType": "select"
        }
      },
      {
        "headerName": "",
        "field": "",
        "cellRenderer": "gxAgGridMenuButton",
        "pinned": "right",
        "width": 80,
        "suppressMenu": true
      }
    ]
  },
  "apiOptions": {
    "apiConfig": {
      "countConfig": {
        "countKey": "",
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "context": "SUPERAPP",
        "fiqlKey": "filter",
        "suppressDefaultFiqlOnApply": true,
        "queryParamsUrl": "$filter",
        "quickFilterKey": "miniappBuildDetails.miniappDetails",
        "defaultFiql": "deleted==false;id=ge=0;",
        "url": "MiniappBuildDetails/count",
        "requestType": "GET",
        "suppressNullValues": true,
        "customFiql": "hostingDetails.id==$hostingDetails.id;miniappDetails==$miniappBuildDetails.miniappDetails;id==$miniappBuildDetails.id;miniappDetails.id==$miniappDetails.id;"
      },
      "dataConfig": {
        "context": "SUPERAPP",
        "dataKey": "data",
        "suppressDefaultFiqlOnApply": true,
        "fiqlKey": "filter",
        "quickFilterKey": "miniappBuildDetails.miniappDetails",
        "defaultFiql": "deleted==false;id=ge=0;",
        "queryParamsUrl": "$filter&$offset&$size&$orderBy&$orderType",
        "requestType": "GET",
        "suppressNullValues": true,
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "url": "MiniappBuildDetails/search",
        "lLimitKey": "offset",
        "pageSizeKey": "size",
        "customFiql": "hostingDetails.id==$hostingDetails.id;miniappDetails==$miniappBuildDetails.miniappDetails;id==$miniappBuildDetails.id;miniappDetails.id==$miniappDetails.id;"
      }
    }
  },
  "filterOptions": {
    "enableFiqlCondition": true,
    "filterConfig": [
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_NAME",
        "key": "miniappDetails.name",
        "type": "autocomplete",
        "fieldType": "autocomplete",
        "filterType": "quick",
        "apiConfig": {
          "rest": "MiniappDetails/search?filter=name==''*$searchText*'';deleted==false&offset=0&size=25",
          "context": "SUPERAPP",
          "type": "GET",
          "dataKey": "name",
          "dataType": "object",
          "params": [
            {
              "key": "searchText",
              "fromSearch": true
            }
          ]
        }
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.SOURCECODEURL",
        "key": "sourceCodeUrl",
        "filterType": "quick",
        "type": "input",
        "maxlength": 255,
        "fieldType": "textfield"
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.COMPILEDFILEURL",
        "key": "compiledFileUrl",
        "filterType": "quick",
        "type": "input",
        "maxlength": 255,
        "fieldType": "textfield"
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.SOURCECODEPATH",
        "key": "sourceCodePath",
        "filterType": "quick",
        "type": "input",
        "maxlength": 255,
        "fieldType": "textfield"
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.STATUS",
        "key": "status",
        "filterType": "quick",
        "type": "select",
        "optionList": [
          {
            "name": "NEW",
            "value": "NEW"
          },
          {
            "name": "PASS",
            "value": "PASS"
          },
          {
            "name": "FAIL",
            "value": "FAIL"
          }
        ],
        "fieldType": "select"
      }
    ]
  },
  "sortingOptions": {
    "sortConfig": [
      {
        "label": "sourceCodeUrl",
        "colId": "sourceCodeUrl",
        "orderByKey": "orderBy",
        "orderByValue": "sourceCodeUrl",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "compiledFileUrl",
        "colId": "compiledFileUrl",
        "orderByKey": "orderBy",
        "orderByValue": "compiledFileUrl",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "sourceCodePath",
        "colId": "sourceCodePath",
        "orderByKey": "orderBy",
        "orderByValue": "sourceCodePath",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "status",
        "colId": "status",
        "orderByKey": "orderBy",
        "orderByValue": "status",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      }
    ]
  },
  "componentOptions": {
    "exportOptions": {
      "fileName": "MiniappBuildDetails List"
    },
    "actionButtonsMode": "menu",
    "suppressTableOptions": true,
    "isCustomCardLayout": true,
    "defaultView": "List",
    "menuIconColumns": 2
  },
  "listActions": [
    {
      "label": "Create",
      "id": "create",
      "icon": "plus_small",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_FORM"
    },
    {
      "label": "Import",
      "icon": "Upload-Outline",
      "id": "import",
      "url": "MiniappBuildDetails/importData",
      "context": "SUPERAPP"
    },
    {
      "label": "Export",
      "icon": "Download-Outline",
      "id": "export",
      "url": "MiniappBuildDetails/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc",
      "context": "SUPERAPP"
    }
  ],
  "rowActions": [
    {
      "label": "View",
      "id": "view",
      "icon": "Eye-Outline",
      "removable": false,
      "navigateTo": "page",
      "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_PAGE_VIEW"
    },
    {
      "label": "Edit",
      "id": "edit",
      "icon": "Edit-Outline",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_FORM"
    },
    {
      "label": "Delete",
      "id": "delete",
      "icon": "Delete-Outline",
      "removable": false,
      "url": "MiniappBuildDetails/deleteById?id=$id",
      "context": "SUPERAPP"
    }
  ],
  "rowClickAction": {
    "label": "View",
    "id": "view",
    "icon": "Eye-Outline",
    "removable": false,
    "navigateTo": "page",
    "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_PAGE_VIEW"
  },
  "headerOptions": {
    "suppressFilterButton": false,
    "suppressQuickFilter": true,
    "suppressCountLabel": false,
    "toggleList": [
      {
        "value": "tile",
        "displayName": "tile",
        "iconName": "Big-Card",
        "icon": "Big-Card$fontset$icomoon",
        "hasIcon": true,
        "checked": false
      },
      {
        "value": "splitview",
        "displayName": "splitview",
        "iconName": "split",
        "icon": "split$fontset$icomoon",
        "hasIcon": true,
        "checked": false
      },
      {
        "value": "kanban",
        "displayName": "kanban",
        "iconName": "Kanban",
        "icon": "Kanban$fontset$icomoon",
        "hasIcon": true,
        "checked": false
      }
    ],
    "viewSwitchType": "menu-button",
    "suppressViewSwitch": false,
    "suppressTileSwitch": true
  },
  "footerOptions": {
    "suppressFooter": true
  },
  "multipleListJson": [
    {
      "type": "tile",
      "gridNames": "miniapp-build-details superapp_tile"
    },
    {
      "type": "splitview",
      "gridNames": "miniapp-build-details superapp_splitview"
    },
    {
      "type": "kanban",
      "gridNames": "miniapp-build-details superapp_kanban"
    }
  ],
  "type": "grid",
  "entity": "MiniappBuildDetails",
  "restName": "MiniappBuildDetails",
  "context": "SUPERAPP",
  "applicationName": "SUPERAPP_APP_NAME",
  "cellFormatting": {}
}', 0, 'grid', NULL);
 insert into DataGridSettings (applicationPackage, datagridname, gridsettings, savegridchoice, mode, view) values ('superapp', 'miniapp-build-details superapp_kanban', '{
  "gridOptions": {
    "suppressHorizontalScroll": false,
    "rowModelType": "infinite",
    "rowSelection": "multiple",
    "pagination": true,
    "suppressRowClickSelection": true,
    "suppressCellSelection": true,
    "columnDefs": [
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_NAME",
        "field": "miniappDetails.name",
        "width": 160,
        "tooltipField": "miniappDetails.name",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_NAME",
          "key": "miniappDetails.name",
          "type": "autocomplete",
          "fieldType": "autocomplete",
          "filterType": "quick",
          "apiConfig": {
            "rest": "MiniappDetails/search?filter=name==''*$searchText*'';deleted==false&offset=0&size=25",
            "context": "SUPERAPP",
            "type": "GET",
            "dataKey": "name",
            "dataType": "object",
            "params": [
              {
                "key": "searchText",
                "fromSearch": true
              }
            ]
          }
        },
        "navigationConfig": {
          "applicationName": "superapp",
          "entity": "miniappDetails",
          "route": "superapp/miniapp-details/miniapp-details-view"
        },
        "cellRenderer": "hyperlinkCellRenderer",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_DESCRIPTION",
        "field": "miniappDetails.description",
        "width": 160,
        "tooltipField": "miniappDetails.description",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_DESCRIPTION",
          "key": "miniappDetails.description",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_ICONURL",
        "field": "miniappDetails.iconUrl",
        "width": 160,
        "tooltipField": "miniappDetails.iconUrl",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_ICONURL",
          "key": "miniappDetails.iconUrl",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_VERSION",
        "field": "miniappDetails.version",
        "width": 160,
        "tooltipField": "miniappDetails.version",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_VERSION",
          "key": "miniappDetails.version",
          "filterType": "quick",
          "type": "input",
          "maxlength": 15,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_APPLICATIONKEY",
        "field": "miniappDetails.applicationKey",
        "width": 160,
        "tooltipField": "miniappDetails.applicationKey",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_APPLICATIONKEY",
          "key": "miniappDetails.applicationKey",
          "filterType": "quick",
          "type": "input",
          "maxlength": 100,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      }
    ]
  },
  "apiOptions": {
    "apiConfig": {
      "countConfig": {
        "countKey": "",
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "context": "SUPERAPP",
        "fiqlKey": "filter",
        "suppressDefaultFiqlOnApply": true,
        "queryParamsUrl": "$filter",
        "quickFilterKey": "miniappBuildDetails.miniappDetails",
        "defaultFiql": "deleted==false;id=ge=0;",
        "url": "MiniappBuildDetails/count",
        "requestType": "GET",
        "suppressNullValues": true,
        "customFiql": "status==''$status'';"
      },
      "dataConfig": {
        "context": "SUPERAPP",
        "dataKey": "data",
        "suppressDefaultFiqlOnApply": true,
        "fiqlKey": "filter",
        "quickFilterKey": "miniappBuildDetails.miniappDetails",
        "defaultFiql": "deleted==false;id=ge=0;",
        "queryParamsUrl": "$filter&$offset&$size&$orderBy&$orderType",
        "requestType": "GET",
        "suppressNullValues": true,
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "url": "MiniappBuildDetails/search",
        "lLimitKey": "offset",
        "uLimitKey": "size",
        "customFiql": "status==''$status'';"
      }
    }
  },
  "filterOptions": {
    "enableFiqlCondition": true,
    "filterConfig": [
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_NAME",
        "key": "miniappDetails.name",
        "type": "autocomplete",
        "fieldType": "autocomplete",
        "filterType": "quick",
        "apiConfig": {
          "rest": "MiniappDetails/search?filter=name==''*$searchText*'';deleted==false&offset=0&size=25",
          "context": "SUPERAPP",
          "type": "GET",
          "dataKey": "name",
          "dataType": "object",
          "params": [
            {
              "key": "searchText",
              "fromSearch": true
            }
          ]
        }
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.SOURCECODEURL",
        "key": "sourceCodeUrl",
        "filterType": "quick",
        "type": "input",
        "maxlength": 255,
        "fieldType": "textfield"
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.COMPILEDFILEURL",
        "key": "compiledFileUrl",
        "filterType": "quick",
        "type": "input",
        "maxlength": 255,
        "fieldType": "textfield"
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.SOURCECODEPATH",
        "key": "sourceCodePath",
        "filterType": "quick",
        "type": "input",
        "maxlength": 255,
        "fieldType": "textfield"
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.STATUS",
        "key": "status",
        "filterType": "quick",
        "type": "select",
        "optionList": [
          {
            "name": "NEW",
            "value": "NEW"
          },
          {
            "name": "PASS",
            "value": "PASS"
          },
          {
            "name": "FAIL",
            "value": "FAIL"
          }
        ],
        "fieldType": "select"
      }
    ]
  },
  "sortingOptions": {
    "sortConfig": [
      {
        "label": "sourceCodeUrl",
        "colId": "sourceCodeUrl",
        "orderByKey": "orderBy",
        "orderByValue": "sourceCodeUrl",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "compiledFileUrl",
        "colId": "compiledFileUrl",
        "orderByKey": "orderBy",
        "orderByValue": "compiledFileUrl",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "sourceCodePath",
        "colId": "sourceCodePath",
        "orderByKey": "orderBy",
        "orderByValue": "sourceCodePath",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "status",
        "colId": "status",
        "orderByKey": "orderBy",
        "orderByValue": "status",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      }
    ]
  },
  "componentOptions": {
    "exportOptions": {
      "fileName": "MiniappBuildDetails List"
    },
    "actionButtonsMode": "menu",
    "isCustomCardLayout": true,
    "defaultView": "Tile"
  },
  "listActions": [
    {
      "label": "Create",
      "id": "create",
      "icon": "plus_small",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_FORM"
    },
    {
      "label": "Import",
      "icon": "Upload-Outline",
      "id": "import",
      "url": "MiniappBuildDetails/importData",
      "context": "SUPERAPP"
    },
    {
      "label": "Export",
      "icon": "Download-Outline",
      "id": "export",
      "url": "MiniappBuildDetails/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc",
      "context": "SUPERAPP"
    }
  ],
  "rowActions": [
    {
      "label": "View",
      "id": "view",
      "icon": "Eye-Outline",
      "removable": false,
      "navigateTo": "page",
      "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_PAGE_VIEW"
    },
    {
      "label": "Edit",
      "id": "edit",
      "icon": "Edit-Outline",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_FORM"
    },
    {
      "label": "Delete",
      "id": "delete",
      "icon": "Delete-Outline",
      "removable": false,
      "url": "MiniappBuildDetails/deleteById?id=$id",
      "context": "SUPERAPP"
    }
  ],
  "rowClickAction": {
    "label": "View",
    "id": "view",
    "icon": "Eye-Outline",
    "removable": false,
    "navigateTo": "page",
    "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_PAGE_VIEW"
  },
  "headerOptions": {
    "suppressViewSwitch": true,
    "headerInclusionList": [],
    "suppressTileSwitch": true,
    "suppressQuickFilter": true,
    "suppressCountLabel": false,
    "viewSwitchType": "toggle-button",
    "groupingKey": "status",
    "params": {},
    "headerConfig": [
      {
        "status": "NEW",
        "displayName": "NEW",
        "statusColor": "#7ed321",
        "borderColor": "#00B4E5",
        "backgroundColor": "#ccf0fa",
        "count": 0
      },
      {
        "status": "PASS",
        "displayName": "PASS",
        "statusColor": "#7ed321",
        "borderColor": "#00B4E5",
        "backgroundColor": "#ccf0fa",
        "count": 0
      },
      {
        "status": "FAIL",
        "displayName": "FAIL",
        "statusColor": "#7ed321",
        "borderColor": "#00B4E5",
        "backgroundColor": "#ccf0fa",
        "count": 0
      }
    ],
    "toggleList": [
      {
        "value": "Kanban",
        "displayName": "Kanban",
        "iconName": "Kanban",
        "icon": "Kanban$fontset$icomoon",
        "hasIcon": true
      }
    ]
  },
  "footerOptions": {
    "suppressFooter": true
  },
  "cardName": "genericCard",
  "type": "kanban",
  "entity": "MiniappBuildDetails",
  "restName": "MiniappBuildDetails",
  "context": "SUPERAPP",
  "applicationName": "SUPERAPP_APP_NAME",
  "kanbanConfig": {
    "tileHeight": "15em",
    "tileWidth": "100%",
    "tileBorder": false,
    "shuffleCards": false,
    "dragAndDrop": false,
    "suppressNonZeroData": false,
    "connectedToEachOther": false
  }
}', 0, 'kanban', NULL);
 insert into DataGridSettings (applicationPackage, datagridname, gridsettings, savegridchoice, mode, view) values ('superapp', 'miniapp-build-details superapp_tile', '{
  "gridOptions": {
    "suppressHorizontalScroll": false,
    "rowModelType": "infinite",
    "rowSelection": "multiple",
    "pagination": true,
    "suppressRowClickSelection": false,
    "suppressCellSelection": true,
    "columnDefs": [
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.SOURCECODEURL",
        "field": "sourceCodeUrl",
        "sortable": true,
        "tooltipField": "sourceCodeUrl",
        "editable": false,
        "type": "String"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.COMPILEDFILEURL",
        "field": "compiledFileUrl",
        "sortable": true,
        "tooltipField": "compiledFileUrl",
        "editable": false,
        "type": "String"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.SOURCECODEPATH",
        "field": "sourceCodePath",
        "sortable": true,
        "tooltipField": "sourceCodePath",
        "editable": false,
        "type": "String"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.STATUS",
        "field": "status",
        "sortable": true,
        "tooltipField": "status",
        "editable": false,
        "type": "Choice"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_NAME",
        "field": "miniapp details.name",
        "type": "String",
        "tooltipField": "name",
        "sortable": true
      },
      {
        "headerName": "",
        "field": "",
        "width": 80,
        "suppressMenu": true
      }
    ]
  },
  "apiOptions": {
    "apiConfig": {
      "countConfig": {
        "countKey": "",
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "context": "SUPERAPP",
        "fiqlKey": "filter",
        "suppressDefaultFiqlOnApply": true,
        "queryParamsUrl": "$filter",
        "quickFilterKey": "miniappBuildDetails.miniappDetails",
        "defaultFiql": "deleted==false;id=ge=0;",
        "url": "MiniappBuildDetails/count",
        "requestType": "GET",
        "suppressNullValues": true,
        "customFiql": "hostingDetails.id==$hostingDetails.id;miniappDetails==$miniappBuildDetails.miniappDetails;id==$miniappBuildDetails.id;miniappDetails.id==$miniappDetails.id;"
      },
      "dataConfig": {
        "context": "SUPERAPP",
        "dataKey": "data",
        "suppressDefaultFiqlOnApply": true,
        "fiqlKey": "filter",
        "quickFilterKey": "miniappBuildDetails.miniappDetails",
        "defaultFiql": "deleted==false;id=ge=0;",
        "queryParamsUrl": "$filter&$offset&$size&$orderBy&$orderType",
        "requestType": "GET",
        "suppressNullValues": true,
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "url": "MiniappBuildDetails/search",
        "lLimitKey": "offset",
        "uLimitKey": "size",
        "customFiql": "hostingDetails.id==$hostingDetails.id;miniappDetails==$miniappBuildDetails.miniappDetails;id==$miniappBuildDetails.id;miniappDetails.id==$miniappDetails.id;"
      }
    }
  },
  "filterOptions": {
    "suppressFilterSave": true,
    "enableFiqlCondition": true,
    "filterConfig": [
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.SOURCECODEURL",
        "key": "sourceCodeUrl",
        "filterType": "quick",
        "type": "input",
        "maxlength": 255
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.COMPILEDFILEURL",
        "key": "compiledFileUrl",
        "filterType": "quick",
        "type": "input",
        "maxlength": 255
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.SOURCECODEPATH",
        "key": "sourceCodePath",
        "filterType": "quick",
        "type": "input",
        "maxlength": 255
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPBUILDDETAILS.STATUS",
        "key": "status",
        "filterType": "quick",
        "type": "select",
        "optionList": [
          {
            "name": "NEW",
            "value": "NEW"
          },
          {
            "name": "PASS",
            "value": "PASS"
          },
          {
            "name": "FAIL",
            "value": "FAIL"
          }
        ]
      }
    ]
  },
  "sortingOptions": {
    "sortConfig": [
      {
        "label": "sourceCodeUrl",
        "colId": "sourceCodeUrl",
        "orderByKey": "orderBy",
        "orderByValue": "sourceCodeUrl",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "compiledFileUrl",
        "colId": "compiledFileUrl",
        "orderByKey": "orderBy",
        "orderByValue": "compiledFileUrl",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "sourceCodePath",
        "colId": "sourceCodePath",
        "orderByKey": "orderBy",
        "orderByValue": "sourceCodePath",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "status",
        "colId": "status",
        "orderByKey": "orderBy",
        "orderByValue": "status",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      }
    ]
  },
  "componentOptions": {
    "exportOptions": {
      "fileName": "MiniappBuildDetails List"
    },
    "actionButtonsMode": "menu",
    "defaultView": "Tile"
  },
  "listActions": [
    {
      "label": "Create",
      "id": "create",
      "icon": "plus_small",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_FORM"
    },
    {
      "label": "Import",
      "icon": "Upload-Outline",
      "id": "import",
      "url": "MiniappBuildDetails/importData",
      "context": "SUPERAPP"
    },
    {
      "label": "Export",
      "icon": "Download-Outline",
      "id": "export",
      "url": "MiniappBuildDetails/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc",
      "context": "SUPERAPP"
    }
  ],
  "rowActions": [
    {
      "label": "View",
      "id": "view",
      "icon": "Eye-Outline",
      "removable": false,
      "navigateTo": "page",
      "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_PAGE_VIEW"
    },
    {
      "label": "Edit",
      "id": "edit",
      "icon": "Edit-Outline",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_FORM"
    },
    {
      "label": "Delete",
      "id": "delete",
      "icon": "Delete-Outline",
      "removable": false,
      "url": "MiniappBuildDetails/deleteById?id=$id",
      "context": "SUPERAPP"
    }
  ],
  "rowClickAction": {
    "label": "View",
    "id": "view",
    "icon": "Eye-Outline",
    "removable": false,
    "navigateTo": "page",
    "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_PAGE_VIEW"
  },
  "headerOptions": {
    "suppressFilterButton": false,
    "suppressQuickFilter": true,
    "suppressCountLabel": false,
    "countLabelSuffix": "MiniappBuildDetails"
  },
  "footerOptions": {
    "suppressFooter": true
  },
  "cardName": "genericCard",
  "type": "tile",
  "entity": "MiniappBuildDetails",
  "restName": "MiniappBuildDetails",
  "context": "SUPERAPP",
  "applicationName": "SUPERAPP_APP_NAME",
  "cellFormatting": {}
}', 0, 'tile', NULL);
 insert into DataGridSettings (applicationPackage, datagridname, gridsettings, savegridchoice, mode, view) values ('superapp', 'miniapp-build-details superapp_splitview', '{
  "gridOptions": {
    "suppressHorizontalScroll": false,
    "rowModelType": "infinite",
    "rowSelection": "multiple",
    "pagination": true,
    "suppressRowClickSelection": true,
    "suppressCellSelection": true,
    "columnDefs": [
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_NAME",
        "field": "miniappDetails.name",
        "width": 160,
        "tooltipField": "miniappDetails.name",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "type": "textfield",
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_NAME",
          "key": "miniappDetails.name",
          "type": "autocomplete",
          "fieldType": "autocomplete",
          "filterType": "quick",
          "apiConfig": {
            "rest": "MiniappDetails/search?filter=name==''*$searchText*'';deleted==false&offset=0&size=25",
            "context": "SUPERAPP",
            "type": "GET",
            "dataKey": "name",
            "dataType": "object",
            "params": [
              {
                "key": "searchText",
                "fromSearch": true
              }
            ]
          }
        },
        "navigationConfig": {
          "applicationName": "superapp",
          "entity": "miniappDetails",
          "route": "superapp/miniapp-details/miniapp-details-view"
        },
        "cellRenderer": "hyperlinkCellRenderer",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_DESCRIPTION",
        "field": "miniappDetails.description",
        "width": 160,
        "tooltipField": "miniappDetails.description",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "type": "textfield",
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_DESCRIPTION",
          "key": "miniappDetails.description",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS_ICONURL",
        "field": "miniappDetails.iconUrl",
        "width": 160,
        "tooltipField": "miniappDetails.iconUrl",
        "sortable": true,
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "type": "textfield",
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS_ICONURL",
          "key": "miniappDetails.iconUrl",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        },
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor"
      }
    ]
  },
  "apiOptions": {
    "apiConfig": {
      "countConfig": {
        "countKey": "",
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "context": "SUPERAPP",
        "fiqlKey": "filter",
        "suppressDefaultFiqlOnApply": true,
        "queryParamsUrl": "$filter",
        "quickFilterKey": "miniappBuildDetails.miniappDetails",
        "defaultFiql": "deleted==false;id=ge=0;",
        "url": "MiniappBuildDetails/count",
        "requestType": "GET",
        "suppressNullValues": true,
        "customFiql": "hostingDetails.id==$hostingDetails.id;miniappDetails==$miniappBuildDetails.miniappDetails;id==$miniappBuildDetails.id;miniappDetails.id==$miniappDetails.id;"
      },
      "dataConfig": {
        "context": "SUPERAPP",
        "dataKey": "data",
        "suppressDefaultFiqlOnApply": true,
        "fiqlKey": "filter",
        "quickFilterKey": "miniappBuildDetails.miniappDetails",
        "defaultFiql": "deleted==false;id=ge=0;",
        "queryParamsUrl": "$filter&$offset&$size&$orderBy&$orderType",
        "requestType": "GET",
        "suppressNullValues": true,
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "url": "MiniappBuildDetails/search",
        "lLimitKey": "offset",
        "uLimitKey": "size",
        "customFiql": "hostingDetails.id==$hostingDetails.id;miniappDetails==$miniappBuildDetails.miniappDetails;id==$miniappBuildDetails.id;miniappDetails.id==$miniappDetails.id;"
      }
    }
  },
  "filterOptions": {
    "suppressFilterSave": true,
    "enableFiqlCondition": true,
    "filterConfig": []
  },
  "sortingOptions": {
    "sortConfig": [
      {
        "label": "sourceCodeUrl",
        "colId": "sourceCodeUrl",
        "orderByKey": "orderBy",
        "orderByValue": "sourceCodeUrl",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "compiledFileUrl",
        "colId": "compiledFileUrl",
        "orderByKey": "orderBy",
        "orderByValue": "compiledFileUrl",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "sourceCodePath",
        "colId": "sourceCodePath",
        "orderByKey": "orderBy",
        "orderByValue": "sourceCodePath",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "status",
        "colId": "status",
        "orderByKey": "orderBy",
        "orderByValue": "status",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      }
    ]
  },
  "componentOptions": {
    "actionButtonsMode": "menu",
    "isCustomCardLayout": true,
    "defaultView": "splitview",
    "tileViewOptions": {
      "noOfColumns": 1,
      "width": "100%",
      "height": "13em",
      "cacheBlockSize": 0
    },
    "splitviewLeftWidth": 30
  },
  "listActions": [
    {
      "label": "Create",
      "id": "create",
      "icon": "plus_small",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_FORM"
    },
    {
      "label": "Import",
      "icon": "Upload-Outline",
      "id": "import",
      "url": "MiniappBuildDetails/importData",
      "context": "SUPERAPP"
    },
    {
      "label": "Export",
      "icon": "Download-Outline",
      "id": "export",
      "url": "MiniappBuildDetails/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc",
      "context": "SUPERAPP"
    }
  ],
  "rowActions": [
    {
      "label": "View",
      "id": "view",
      "icon": "Eye-Outline",
      "removable": false,
      "navigateTo": "page",
      "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_PAGE_VIEW"
    },
    {
      "label": "Edit",
      "id": "edit",
      "icon": "Edit-Outline",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_FORM"
    },
    {
      "label": "Delete",
      "id": "delete",
      "icon": "Delete-Outline",
      "removable": false,
      "url": "MiniappBuildDetails/deleteById?id=$id",
      "context": "SUPERAPP"
    }
  ],
  "rowClickAction": {
    "label": "View",
    "id": "view",
    "icon": "Eye-Outline",
    "removable": false,
    "navigateTo": "page",
    "templateName": "SUPERAPP_MINIAPPBUILDDETAILS_PAGE_VIEW"
  },
  "headerOptions": {
    "suppressFilterButton": false,
    "suppressQuickFilter": true,
    "suppressCountLabel": false,
    "toggleList": [
      {
        "value": "splitview",
        "displayName": "splitview",
        "hasIcon": false,
        "checked": false
      }
    ]
  },
  "footerOptions": {
    "suppressFooter": true
  },
  "cardName": "SplitViewCard",
  "type": "splitview",
  "entity": "MiniappBuildDetails",
  "restName": "MiniappBuildDetails",
  "context": "SUPERAPP",
  "applicationName": "SUPERAPP_APP_NAME",
  "splitviewType": "tile"
}', 0, 'splitview', NULL);
 insert into DataGridSettings (applicationPackage, datagridname, gridsettings, savegridchoice, mode, view) values ('superapp', 'miniapp-details superapp', '{
  "gridOptions": {
    "suppressHorizontalScroll": false,
    "rowModelType": "infinite",
    "rowSelection": "multiple",
    "pagination": true,
    "suppressRowClickSelection": true,
    "suppressCellSelection": true,
    "columnDefs": [
      {
        "headerName": "",
        "field": "checkbox",
        "headerComponent": "gxAgGridSelectAllCheckBox",
        "headerCheckboxSelection": true,
        "checkboxSelection": true,
        "width": 50
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS.NAME",
        "field": "name",
        "width": 160,
        "sortable": true,
        "tooltipField": "name",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.NAME",
          "key": "name",
          "filterType": "quick",
          "type": "input",
          "maxlength": 50,
          "fieldType": "textfield"
        }
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS.DESCRIPTION",
        "field": "description",
        "width": 160,
        "sortable": true,
        "tooltipField": "description",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.DESCRIPTION",
          "key": "description",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        }
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS.ICONURL",
        "field": "iconUrl",
        "width": 160,
        "sortable": true,
        "tooltipField": "iconUrl",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.ICONURL",
          "key": "iconUrl",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        }
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS.VERSION",
        "field": "version",
        "width": 160,
        "sortable": true,
        "tooltipField": "version",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.VERSION",
          "key": "version",
          "filterType": "quick",
          "type": "input",
          "maxlength": 15,
          "fieldType": "textfield"
        }
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS.APPLICATIONKEY",
        "field": "applicationKey",
        "width": 160,
        "sortable": true,
        "tooltipField": "applicationKey",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.APPLICATIONKEY",
          "key": "applicationKey",
          "filterType": "quick",
          "type": "input",
          "maxlength": 100,
          "fieldType": "textfield"
        }
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS.TAGGING",
        "field": "tagging",
        "width": 160,
        "sortable": true,
        "tooltipField": "tagging",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.TAGGING",
          "key": "tagging",
          "filterType": "quick",
          "type": "input",
          "maxlength": 30,
          "fieldType": "textfield"
        }
      },
      {
        "headerName": "",
        "field": "",
        "cellRenderer": "gxAgGridMenuButton",
        "pinned": "right",
        "width": 80,
        "suppressMenu": true
      }
    ]
  },
  "apiOptions": {
    "apiConfig": {
      "countConfig": {
        "countKey": "",
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "context": "SUPERAPP",
        "fiqlKey": "filter",
        "suppressDefaultFiqlOnApply": true,
        "queryParamsUrl": "$filter",
        "quickFilterKey": "miniappDetails.name",
        "defaultFiql": "deleted==false;id=ge=0;",
        "url": "MiniappDetails/count",
        "requestType": "GET",
        "suppressNullValues": true,
        "customFiql": "hostingDetails.id==$hostingDetails.id;miniappBuildDetails.id==$miniappBuildDetails.id;name==''*$miniappDetails.name*'';id==$miniappDetails.id;"
      },
      "dataConfig": {
        "context": "SUPERAPP",
        "dataKey": "data",
        "suppressDefaultFiqlOnApply": true,
        "fiqlKey": "filter",
        "quickFilterKey": "miniappDetails.name",
        "defaultFiql": "deleted==false;id=ge=0;",
        "queryParamsUrl": "$filter&$offset&$size&$orderBy&$orderType",
        "requestType": "GET",
        "suppressNullValues": true,
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "url": "MiniappDetails/search",
        "lLimitKey": "offset",
        "pageSizeKey": "size",
        "customFiql": "hostingDetails.id==$hostingDetails.id;miniappBuildDetails.id==$miniappBuildDetails.id;name==''*$miniappDetails.name*'';id==$miniappDetails.id;"
      }
    }
  },
  "filterOptions": {
    "enableFiqlCondition": true,
    "filterConfig": [
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.DESCRIPTION",
        "key": "description",
        "filterType": "quick",
        "type": "input",
        "maxlength": 255,
        "fieldType": "textfield"
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.ICONURL",
        "key": "iconUrl",
        "filterType": "quick",
        "type": "input",
        "maxlength": 255,
        "fieldType": "textfield"
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.VERSION",
        "key": "version",
        "filterType": "quick",
        "type": "input",
        "maxlength": 15,
        "fieldType": "textfield"
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.APPLICATIONKEY",
        "key": "applicationKey",
        "filterType": "quick",
        "type": "input",
        "maxlength": 100,
        "fieldType": "textfield"
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.TAGGING",
        "key": "tagging",
        "filterType": "quick",
        "type": "input",
        "maxlength": 30,
        "fieldType": "textfield"
      }
    ]
  },
  "sortingOptions": {
    "sortConfig": [
      {
        "label": "name",
        "colId": "name",
        "orderByKey": "orderBy",
        "orderByValue": "name",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "description",
        "colId": "description",
        "orderByKey": "orderBy",
        "orderByValue": "description",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "iconUrl",
        "colId": "iconUrl",
        "orderByKey": "orderBy",
        "orderByValue": "iconUrl",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "version",
        "colId": "version",
        "orderByKey": "orderBy",
        "orderByValue": "version",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "applicationKey",
        "colId": "applicationKey",
        "orderByKey": "orderBy",
        "orderByValue": "applicationKey",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "tagging",
        "colId": "tagging",
        "orderByKey": "orderBy",
        "orderByValue": "tagging",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      }
    ]
  },
  "componentOptions": {
    "exportOptions": {
      "fileName": "MiniappDetails List"
    },
    "actionButtonsMode": "menu",
    "suppressTableOptions": true,
    "isCustomCardLayout": true,
    "defaultView": "List",
    "menuIconColumns": 2
  },
  "listActions": [
    {
      "label": "Create",
      "id": "create",
      "icon": "plus_small",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_MINIAPPDETAILS_FORM"
    },
    {
      "label": "Import",
      "icon": "Upload-Outline",
      "id": "import",
      "url": "MiniappDetails/importData",
      "context": "SUPERAPP"
    },
    {
      "label": "Export",
      "icon": "Download-Outline",
      "id": "export",
      "url": "MiniappDetails/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc",
      "context": "SUPERAPP"
    }
  ],
  "rowActions": [
    {
      "label": "View",
      "id": "view",
      "icon": "Eye-Outline",
      "removable": false,
      "navigateTo": "page",
      "templateName": "SUPERAPP_MINIAPPDETAILS_PAGE_VIEW"
    },
    {
      "label": "Edit",
      "id": "edit",
      "icon": "Edit-Outline",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_MINIAPPDETAILS_FORM"
    },
    {
      "label": "Delete",
      "id": "delete",
      "icon": "Delete-Outline",
      "removable": false,
      "url": "MiniappDetails/deleteById?id=$id",
      "context": "SUPERAPP"
    }
  ],
  "rowClickAction": {
    "label": "View",
    "id": "view",
    "icon": "Eye-Outline",
    "removable": false,
    "navigateTo": "page",
    "templateName": "SUPERAPP_MINIAPPDETAILS_PAGE_VIEW"
  },
  "headerOptions": {
    "suppressFilterButton": false,
    "suppressQuickFilter": true,
    "suppressCountLabel": false,
    "toggleList": [
      {
        "value": "tile",
        "displayName": "tile",
        "iconName": "Big-Card",
        "icon": "Big-Card$fontset$icomoon",
        "hasIcon": true,
        "checked": false
      },
      {
        "value": "splitview",
        "displayName": "splitview",
        "iconName": "split",
        "icon": "split$fontset$icomoon",
        "hasIcon": true,
        "checked": false
      }
    ],
    "viewSwitchType": "menu-button",
    "suppressViewSwitch": false,
    "suppressTileSwitch": true
  },
  "footerOptions": {
    "suppressFooter": true
  },
  "multipleListJson": [
    {
      "type": "tile",
      "gridNames": "miniapp-details superapp_tile"
    },
    {
      "type": "splitview",
      "gridNames": "miniapp-details superapp_splitview"
    }
  ],
  "type": "grid",
  "entity": "MiniappDetails",
  "restName": "MiniappDetails",
  "context": "SUPERAPP",
  "applicationName": "SUPERAPP_APP_NAME",
  "cellFormatting": {}
}', 0, 'grid', NULL);
 insert into DataGridSettings (applicationPackage, datagridname, gridsettings, savegridchoice, mode, view) values ('superapp', 'miniapp-details superapp_tile', '{
  "gridOptions": {
    "suppressHorizontalScroll": false,
    "rowModelType": "infinite",
    "rowSelection": "multiple",
    "pagination": true,
    "suppressRowClickSelection": false,
    "suppressCellSelection": true,
    "columnDefs": [
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS.NAME",
        "field": "name",
        "sortable": true,
        "tooltipField": "name",
        "editable": false,
        "type": "String"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS.DESCRIPTION",
        "field": "description",
        "sortable": true,
        "tooltipField": "description",
        "editable": false,
        "type": "String"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS.ICONURL",
        "field": "iconUrl",
        "sortable": true,
        "tooltipField": "iconUrl",
        "editable": false,
        "type": "String"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS.VERSION",
        "field": "version",
        "sortable": true,
        "tooltipField": "version",
        "editable": false,
        "type": "String"
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS.APPLICATIONKEY",
        "field": "applicationKey",
        "sortable": true,
        "tooltipField": "applicationKey",
        "editable": false,
        "type": "String"
      }
    ]
  },
  "apiOptions": {
    "apiConfig": {
      "countConfig": {
        "countKey": "",
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "context": "SUPERAPP",
        "fiqlKey": "filter",
        "suppressDefaultFiqlOnApply": true,
        "queryParamsUrl": "$filter",
        "quickFilterKey": "miniappDetails.name",
        "defaultFiql": "deleted==false;id=ge=0;",
        "url": "MiniappDetails/count",
        "requestType": "GET",
        "suppressNullValues": true,
        "customFiql": "hostingDetails.id==$hostingDetails.id;miniappBuildDetails.id==$miniappBuildDetails.id;name==''*$miniappDetails.name*'';id==$miniappDetails.id;"
      },
      "dataConfig": {
        "context": "SUPERAPP",
        "dataKey": "data",
        "suppressDefaultFiqlOnApply": true,
        "fiqlKey": "filter",
        "quickFilterKey": "miniappDetails.name",
        "defaultFiql": "deleted==false;id=ge=0;",
        "queryParamsUrl": "$filter&$offset&$size&$orderBy&$orderType",
        "requestType": "GET",
        "suppressNullValues": true,
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "url": "MiniappDetails/search",
        "lLimitKey": "offset",
        "uLimitKey": "size",
        "customFiql": "hostingDetails.id==$hostingDetails.id;miniappBuildDetails.id==$miniappBuildDetails.id;name==''*$miniappDetails.name*'';id==$miniappDetails.id;"
      }
    }
  },
  "filterOptions": {
    "suppressFilterSave": true,
    "enableFiqlCondition": true,
    "filterConfig": [
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.DESCRIPTION",
        "key": "description",
        "filterType": "quick",
        "type": "input",
        "maxlength": 255
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.ICONURL",
        "key": "iconUrl",
        "filterType": "quick",
        "type": "input",
        "maxlength": 255
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.VERSION",
        "key": "version",
        "filterType": "quick",
        "type": "input",
        "maxlength": 15
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.APPLICATIONKEY",
        "key": "applicationKey",
        "filterType": "quick",
        "type": "input",
        "maxlength": 100
      },
      {
        "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.TAGGING",
        "key": "tagging",
        "filterType": "quick",
        "type": "input",
        "maxlength": 30
      }
    ]
  },
  "sortingOptions": {
    "sortConfig": [
      {
        "label": "name",
        "colId": "name",
        "orderByKey": "orderBy",
        "orderByValue": "name",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "description",
        "colId": "description",
        "orderByKey": "orderBy",
        "orderByValue": "description",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "iconUrl",
        "colId": "iconUrl",
        "orderByKey": "orderBy",
        "orderByValue": "iconUrl",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "version",
        "colId": "version",
        "orderByKey": "orderBy",
        "orderByValue": "version",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "applicationKey",
        "colId": "applicationKey",
        "orderByKey": "orderBy",
        "orderByValue": "applicationKey",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "tagging",
        "colId": "tagging",
        "orderByKey": "orderBy",
        "orderByValue": "tagging",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      }
    ]
  },
  "componentOptions": {
    "exportOptions": {
      "fileName": "MiniappDetails List"
    },
    "actionButtonsMode": "menu",
    "defaultView": "Tile"
  },
  "listActions": [
    {
      "label": "Create",
      "id": "create",
      "icon": "plus_small",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_MINIAPPDETAILS_FORM"
    },
    {
      "label": "Import",
      "icon": "Upload-Outline",
      "id": "import",
      "url": "MiniappDetails/importData",
      "context": "SUPERAPP"
    },
    {
      "label": "Export",
      "icon": "Download-Outline",
      "id": "export",
      "url": "MiniappDetails/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc",
      "context": "SUPERAPP"
    }
  ],
  "rowActions": [
    {
      "label": "View",
      "id": "view",
      "icon": "Eye-Outline",
      "removable": false,
      "navigateTo": "page",
      "templateName": "SUPERAPP_MINIAPPDETAILS_PAGE_VIEW"
    },
    {
      "label": "Edit",
      "id": "edit",
      "icon": "Edit-Outline",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_MINIAPPDETAILS_FORM"
    },
    {
      "label": "Delete",
      "id": "delete",
      "icon": "Delete-Outline",
      "removable": false,
      "url": "MiniappDetails/deleteById?id=$id",
      "context": "SUPERAPP"
    }
  ],
  "rowClickAction": {
    "label": "View",
    "id": "view",
    "icon": "Eye-Outline",
    "removable": false,
    "navigateTo": "page",
    "templateName": "SUPERAPP_MINIAPPDETAILS_PAGE_VIEW"
  },
  "headerOptions": {
    "suppressFilterButton": false,
    "suppressQuickFilter": true,
    "suppressCountLabel": false,
    "countLabelSuffix": "MiniappDetails"
  },
  "footerOptions": {
    "suppressFooter": true
  },
  "cardName": "genericCard",
  "type": "tile",
  "entity": "MiniappDetails",
  "restName": "MiniappDetails",
  "context": "SUPERAPP",
  "applicationName": "SUPERAPP_APP_NAME",
  "cellFormatting": {}
}', 0, 'tile', NULL);
 insert into DataGridSettings (applicationPackage, datagridname, gridsettings, savegridchoice, mode, view) values ('superapp', 'miniapp-details superapp_splitview', '{
  "gridOptions": {
    "suppressHorizontalScroll": false,
    "rowModelType": "infinite",
    "rowSelection": "multiple",
    "pagination": true,
    "suppressRowClickSelection": true,
    "suppressCellSelection": true,
    "columnDefs": [
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS.NAME",
        "field": "name",
        "width": 160,
        "sortable": true,
        "tooltipField": "name",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "type": "textfield",
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.NAME",
          "key": "name",
          "filterType": "quick",
          "type": "input",
          "maxlength": 50,
          "fieldType": "textfield"
        }
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS.DESCRIPTION",
        "field": "description",
        "width": 160,
        "sortable": true,
        "tooltipField": "description",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "type": "textfield",
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.DESCRIPTION",
          "key": "description",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        }
      },
      {
        "headerName": "SUPERAPP_APP_NAME.MINIAPPDETAILS.ICONURL",
        "field": "iconUrl",
        "width": 160,
        "sortable": true,
        "tooltipField": "iconUrl",
        "editable": false,
        "onCellValueChanged": "onValueChange",
        "cellEditor": "myCustomEditor",
        "valueGetterParams": {
          "suppressTranslation": true
        },
        "cellRendererParams": {
          "suppressTranslation": true
        },
        "type": "textfield",
        "cellData": {
          "label": "SUPERAPP_APP_NAME.MINIAPPDETAILS.ICONURL",
          "key": "iconUrl",
          "filterType": "quick",
          "type": "input",
          "maxlength": 255,
          "fieldType": "textfield"
        }
      }
    ]
  },
  "apiOptions": {
    "apiConfig": {
      "countConfig": {
        "countKey": "",
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "context": "SUPERAPP",
        "fiqlKey": "filter",
        "suppressDefaultFiqlOnApply": true,
        "queryParamsUrl": "$filter",
        "quickFilterKey": "miniappDetails.name",
        "defaultFiql": "deleted==false;id=ge=0;",
        "url": "MiniappDetails/count",
        "requestType": "GET",
        "suppressNullValues": true,
        "customFiql": "hostingDetails.id==$hostingDetails.id;miniappBuildDetails.id==$miniappBuildDetails.id;name==''*$miniappDetails.name*'';id==$miniappDetails.id;"
      },
      "dataConfig": {
        "context": "SUPERAPP",
        "dataKey": "data",
        "suppressDefaultFiqlOnApply": true,
        "fiqlKey": "filter",
        "quickFilterKey": "miniappDetails.name",
        "defaultFiql": "deleted==false;id=ge=0;",
        "queryParamsUrl": "$filter&$offset&$size&$orderBy&$orderType",
        "requestType": "GET",
        "suppressNullValues": true,
        "params": {
          "orderBy": "modifiedTime",
          "orderType": "desc"
        },
        "url": "MiniappDetails/search",
        "lLimitKey": "offset",
        "uLimitKey": "size",
        "customFiql": "hostingDetails.id==$hostingDetails.id;miniappBuildDetails.id==$miniappBuildDetails.id;name==''*$miniappDetails.name*'';id==$miniappDetails.id;"
      }
    }
  },
  "filterOptions": {
    "suppressFilterSave": true,
    "enableFiqlCondition": true,
    "filterConfig": []
  },
  "sortingOptions": {
    "sortConfig": [
      {
        "label": "name",
        "colId": "name",
        "orderByKey": "orderBy",
        "orderByValue": "name",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "description",
        "colId": "description",
        "orderByKey": "orderBy",
        "orderByValue": "description",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "iconUrl",
        "colId": "iconUrl",
        "orderByKey": "orderBy",
        "orderByValue": "iconUrl",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "version",
        "colId": "version",
        "orderByKey": "orderBy",
        "orderByValue": "version",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "applicationKey",
        "colId": "applicationKey",
        "orderByKey": "orderBy",
        "orderByValue": "applicationKey",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      },
      {
        "label": "tagging",
        "colId": "tagging",
        "orderByKey": "orderBy",
        "orderByValue": "tagging",
        "orderTypeKey": "orderType",
        "asc": "asc",
        "desc": "desc"
      }
    ]
  },
  "componentOptions": {
    "actionButtonsMode": "menu",
    "isCustomCardLayout": true,
    "defaultView": "splitview",
    "tileViewOptions": {
      "noOfColumns": 1,
      "width": "100%",
      "height": "13em",
      "cacheBlockSize": 0
    },
    "splitviewLeftWidth": 30
  },
  "listActions": [
    {
      "label": "Create",
      "id": "create",
      "icon": "plus_small",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_MINIAPPDETAILS_FORM"
    },
    {
      "label": "Import",
      "icon": "Upload-Outline",
      "id": "import",
      "url": "MiniappDetails/importData",
      "context": "SUPERAPP"
    },
    {
      "label": "Export",
      "icon": "Download-Outline",
      "id": "export",
      "url": "MiniappDetails/export?filter=deleted==false&orderBy=modifiedTime&orderType=desc",
      "context": "SUPERAPP"
    }
  ],
  "rowActions": [
    {
      "label": "View",
      "id": "view",
      "icon": "Eye-Outline",
      "removable": false,
      "navigateTo": "page",
      "templateName": "SUPERAPP_MINIAPPDETAILS_PAGE_VIEW"
    },
    {
      "label": "Edit",
      "id": "edit",
      "icon": "Edit-Outline",
      "removable": false,
      "navigateTo": "form",
      "templateName": "SUPERAPP_MINIAPPDETAILS_FORM"
    },
    {
      "label": "Delete",
      "id": "delete",
      "icon": "Delete-Outline",
      "removable": false,
      "url": "MiniappDetails/deleteById?id=$id",
      "context": "SUPERAPP"
    }
  ],
  "rowClickAction": {
    "label": "View",
    "id": "view",
    "icon": "Eye-Outline",
    "removable": false,
    "navigateTo": "page",
    "templateName": "SUPERAPP_MINIAPPDETAILS_PAGE_VIEW"
  },
  "headerOptions": {
    "suppressFilterButton": false,
    "suppressQuickFilter": true,
    "suppressCountLabel": false,
    "toggleList": [
      {
        "value": "splitview",
        "displayName": "splitview",
        "hasIcon": false,
        "checked": false
      }
    ]
  },
  "footerOptions": {
    "suppressFooter": true
  },
  "cardName": "SplitViewCard",
  "type": "splitview",
  "entity": "MiniappDetails",
  "restName": "MiniappDetails",
  "context": "SUPERAPP",
  "applicationName": "SUPERAPP_APP_NAME",
  "splitviewType": "tile"
}', 0, 'splitview', NULL);
call PROC_ARRAY_APPEND('APPLICATION_DETAILS', 'routes' ,'{"name": "superapp", "path": "superapp"}');
call Proc_UPDATE_KEY_VAL_OF_IMPORTS_OBJECT('IMPORT_MAP_JSON','superapp','https://dev.visionwaves.com/superapp/main.js');
call PROC_UpdateKeyVal('APPLICATION_CONTEXTS','"SUPERAPP"','https://dev.visionwaves.com/apim/superapp/1.0/rest/');
call PROC_JSON_ARRAY_INSERT('APPLICATION_MODULES','{"name": "SUPERAPP_APP_NAME", "displayName": "SUPERAPP_APP_NAME" }');
 insert into DataGridSettings (applicationPackage, datagridname, gridsettings, savegridchoice, mode, view) values ('SUPERAPP_APP_NAME', 'SUPERAPP_APP_NAME_HISTORY_AG_GRID', '{"gridOptions":{"suppressHorizontalScroll":false,"rowModelType":"serverSide","suppressPropertyNamesCheck":true,"suppressCapitalization":true,"columnDefs":[{"headerName":"FIELD_TEXT","cellRenderer":"gxAgGridTooltip","field":"label"},{"headerName":"OLD_VALUE","cellRenderer":"gxAgGridTooltip","field":"oldValue"},{"headerName":"NEW_VALUE","cellRenderer":"gxAgGridTooltip","field":"newValue"},{"headerName":"ACTION","cellRenderer":"gxAgGridTooltip","field":"action","pinned":"left"},{"headerName":"MODIFIED_ON","cellRenderer":"gxAgGridDateAndTime","field":"modifiedTime"},{"headerName":"MODIFIED_BY","cellRenderer":"gxAgGridTooltip","field":"lastModifierName"}]},"headerOptions":{"refreshMenuConfig":{"dropdownList":["10s","30s","1m","1h"],"suppressRefreshMenu":false,"suppressDropdown":true}},"footerOptions":{},"filterOptions":{},"componentOptions":{},"sortingOptions":{},"apiOptions":{"apiConfig":{"countConfig":{"context":"SUPERAPP","url":"ResourceFieldAudit/getCount","fiqlKey":"_s","countKey":"totalCount","customFiql":"(identifier1==''$identifier1'';identifier2==''$identifier2'';identifier3==''$identifier3'')","queryParamsUrl":"$_s","suppressNullValues":true,"requestType":"GET"},"dataConfig":{"context":"SUPERAPP","lLimitKey":"llimit","uLimitKey":"ulimit","url":"ResourceFieldAudit/search","datakey":"data","queryParamsUrl":"$data&$_s&orderBy=modifiedTime&orderType=desc&$llimit&$ulimit","requestType":"GET","suppressNullValues":true,"fiqlKey":"_s","customFiql":"(identifier1==''$identifier1'';identifier2==''$identifier2'';identifier3==''$identifier3'')"}}}}', 0, NULL, NULL);
use FORM_BUILDER;
call PROC_FORM_DATA('SUPERAPP_APP_NAME');
use superapp ;
insert into User select userid_pk,firstname,lastname,middlename,username from PLATFORM.User;