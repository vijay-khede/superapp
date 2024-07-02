const fs = require("fs");
const util = require("./util.service");
const Path = require("path");

function createViewPageJson(element, lib, schemaList) {
  let json = {
    pageType: "section",
    sectionDetails: {
      infoSection: {
        title: "heading",
        subTitle: "subheading",
        fields: [],
      },
      tabSection: [],
    },
  };
   

  element.fields.forEach((item) => {
	   let temp = {};
    if (item.type !== "Reference" && util.validateColumn(item, false)) {
		 
		    temp = {
        label: `${lib.applicationName.toUpperCase()}_APP_NAME.${util
          .dasherise(element.displayName)
          .toUpperCase()}.${util.dasherise(item.displayName).toUpperCase()}`,
        key: item.name,
        type: util.typeGenerator(item, schemaList),
      };
		  json.sectionDetails.infoSection.fields.push(temp);
		 
    } else if (
      item.properties && !item.properties.customTable && 
      (item.properties.mappedAs === "OneToOne" ||
        item.properties.mappedAs === "OneToMany" ||
        item.properties.mappedAs === "ManyToOne")
    ) {
      if (!json.sectionDetails.tabSection) {
        json.sectionDetails.tabSection = [];
      }
      const table = schemaList.find((x) => {
        return x.name === item.properties.table;
      });
      if (table) {
        let newTab = {};
        if (item.properties.mappedAs === "OneToMany") {
          newTab = {
            name: item.name,
             displayName: table.displayName,
            componentName: util.dasherise(item.name),
            selected: false,
            uiorder: 1,
            type: "grid",
            isDisable: false,
            gridName: `${item.properties.table} ${lib.applicationName}`,
            agGridConfig: {},
          };
        } else {
          newTab = {
            name: item.name,
             displayName: table.displayName,
            selected: false,
            uiorder: 1,
            type: "normal",
            isDisable: false,
            fields: [],

            // apiConfig: {
            //   url: `${item.type}/getData?query=${element.entity}.id=='$${element.entity}.id'`,
            //   context: lib.context,
            //   type: item.type,
            // },
          };
          table.fields.forEach((ele) => {
            if (
              ele.type !== "Reference" &&
              util.validateColumn(ele)
            ) {
				
              const t = {
                label: ele.displayName,
                key: `${item.name}?.${ele.name}`,
                type: util.typeGenerator(ele, schemaList),
              };
              newTab.fields.push(t);
            }
          });
        }
        json.sectionDetails.tabSection.push(newTab);
      }
    }
  });
  const temp = [];
  json.sectionDetails.tabSection = json.sectionDetails.tabSection.filter((x) => {
    if (!temp.includes(x.name)) {
      temp.push(x.name);
      return true;
    } else {
      return false
    }
  });
  if (element.enableComment) {
    json.sectionDetails.tabSection.push({
      name: "COMMENT_TEXT",
       displayName: "COMMENT_TEXT",
      type: "comment",
      selected: false,
    });
  }
  if (element.enableAttachement) {
    json.sectionDetails.tabSection.push({
      name: "ATTACHMENT_TEXT",
       displayName: "ATTACHMENT_TEXT",
      type: "attachment",
      selected: false,
    });
  }

  if (element.enableHistory) {
    json.sectionDetails.tabSection.push({
      name: "HISTORY",
       displayName: "HISTORY",
      type: "history",
      selected: false,
    });
  }

  json = JSON.stringify(json, undefined, 2);
  const path = Path.join(__dirname, "..", "build", `${element.name}_view.json`);
  fs.writeFileSync(path, json);
  return json; //meld new line
}

module.exports = {
  createViewPageJson,
};
