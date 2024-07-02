function camelize(str) {
  if(str!=null){
console.log("STRRR"+str);
return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}
return "";
}

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function dasherise(input, removeSpace = false) {
  let temp = input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  // if (removeSpace) {
  temp = temp.replace(/ /g, "");
  // }
  return temp.replace("--", "-");
}
function dasheriseUnderScore(input) {
  let temp = input.replace(/([a-z])([A-Z])/g, "$1-$2").toUpperCase();
  // if (removeSpace) {
  //temp = temp.replace(/ /g, "");
  // }
  return temp.replace(" ", "_");
}


function getTablePropsByNativeName(schemaList, name) {
	 console.log("getTablePropsByNativeName name "+name);
  let tempTable = {};
   let tempColumn = {};
  schemaList.forEach((ele) => {
    if (ele.nativeName === name) {
      tempTable = ele;
    }
  });
  console.log(tempTable);
  if(tempTable!=null && tempTable.length>0){
	  console.log(tempTable);
  console.log("tempTable  "+camelize(tempTable.displayName),tempTable.name,tempTable.displayName,tempTable.key);
   tempTable.fields.forEach((el) => {
				 console.log("table reference identityColumn"+el.type,el.identityColumn,el.name,el.key);
				if(el.identityColumn==true){
					if(el.type==='String'){
						 console.log("inside if column"+el);
						tempColumn=el;
						if(!tempColumn.tableName ){
							 console.log("inside if tableName");
							tempColumn.tableName=camelize(tempTable.displayName);
						}
						if(!tempColumn.nativeKey ){
							 console.log("inside if nativeKey");
			            tempColumn.nativeKey=camelize(tempTable.displayName)+"."+tempColumn.name;
						}
						 console.log(tempColumn);
						return;
					}else if(el.type=='Reference'){
						 console.log("inside else column"+el);
						tempColumn=getTablePropsByNativeName(schemaList,el.name.toUpperCase());
					}
					
				}
				
			});
			console.log("tempColumn final");
			 console.log(tempColumn);
			 if(!tempColumn.nativeKey){
			tempColumn.tableName=camelize(tempTable.displayName);
			tempColumn.nativeKey=camelize(tempTable.displayName)+"."+tempColumn.name;
		}
	}
			console.log("return final");
  return tempColumn;
}







const typeGenerator = (element, schemaList) => {
  switch (element.type) {
    case "String":
    case "URL":
      return "textfield";
      break;
    case "Integer":
    case "Decimal":
    case "Currency":
    case "Duration":
    case "Percentage":
    case "Phone Number":
      return "number";
      break;
    case "Email":
      return "email";
      break;
    case "Reference":
      return "textfield";
      break;
    case "Choice":
      return "select";
      break;
    case "Date":
    case "DateTime":
      return "date";
      break;
    case "Yes/No":
      return "checkbox";
      break;
    case "Journal":
      return "textarea";
      break; 
    case "GPS":
      return "gps";
      break;
    case "Barcode":
      return "barcode";
      break;    	      
    default:
      let ret = "textfield";
      // schemaList.forEach((item) => {
      //   if (item.entity === element.type) {
      //     item.fields.forEach((ele) => {
      //       if (ele.name === element.apiConfig?.displayKey) {
      //         ret = typeGenerator(ele, schemaList);
      //       }
      //     });
      //   }
      // });
      return ret;
      break;
  }
};



function lowerFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function getPrimaryKey(schema) {
  const column = schema.fields.find((item) => {
    return item.isPrimary;
  });
  return column ? column.name : null;
}

function getPrimaryKeyBySchemaListAndEntity(schemaList, entity) {
  let column = null;
  schemaList.forEach((item) => {
    if (item.name === entity) {
      item.fields.forEach((ele) => {
        if (ele.isPrimary) {
          column = ele;
        }
      });
    }
  });
  return column ? column : null;
}

function findIfLibShouldBeMade(list, entity) {
  let flag = true;
  list.forEach((item) => {
    item.fields.forEach((ele) => {
      if (
        ele.type === entity &&
        ele.relationship == "inclusive" &&
        !ele.properties?.suppress
      ) {
        flag = false;
      }
    });
  });
  return flag;
}

function findParentEntity(list, entity) {
  let wrapper = null;
  list.forEach((item) => {
    item.fields.forEach((ele) => {
      if (
        ele.type === entity &&
        ele.relationship == "inclusive" &&
        !ele.properties?.suppress
      ) {
        wrapper = item;
      }
    });
  });
  return wrapper;
}

function getIdentityColumn(schemaList, item) {
  let temp = null;
  schemaList.forEach((ele) => {
    if (ele.name === item.properties.table) {
      ele.fields.forEach((x) => {
        if (x.identityColumn) {
          temp = x;
        }
      });
      if (!temp) {
        temp = ele.fields[0];
      }
    }
  });
  return temp;
}

function getTablePropsByPojoName(schemaList, name) {
  let temp = {};
  schemaList.forEach((ele) => {
    if (ele.name === name) {
      temp = ele;
    }
  });
  return temp;
}

function getIdentityColumnFromTable(element){
  const temp = element.fields.find((item) => {
    if (item.identityColumn) {
      return true;
    }
  });
  return temp;
}

function updateViewJsonAsPerTypes(json, item, lib, schemaList, element) {
  if (item.hasOwnProperty("defaultValue")) {
    json.defaultValue = item.defaultValue;
  }
  switch (item.type) {
    case "String":
      json.inputType = "text";
      break;
    case "Integer":
      json.selectedTypeForNumber = "INTEGER";
      break;
    case "Decimal":
      json.selectedTypeForNumber = "DECIMAL";
      break;
    case "Email":
      break;
    case "Currency":
      json.selectedTypeForNumber = "DECIMAL";
      break;
    case "Duration":
      break;
    case "Percentage":
      json.selectedTypeForNumber = "DECIMAL";
      break;
    case "URL":
      json.inputType = "text";
      break;
    case "Naming":
      json.isReadOnly = true;
      break;
    case "Phone Number":
      json.selectedTypeForNumber = "INTEGER";
      break;     
    case "GPS":
      json.locationType = "Lat-Long";
      json.location = true;
      json.placeholderlatitude = "LATITUDE_TEXT";
      json.placeholderlongitude = "LONGITUDE_TEXT";
      break;   
    case "Reference":
      json.autocomplete = true;
      json.placeholder = `Please search ${getIdentityColumn(schemaList, item)?.name}`;
      const table = getTablePropsByPojoName(schemaList, item.properties.table);
      const identityColumn = getIdentityColumn(
        schemaList,
        item
      );
      json.autoConfigData = {
        url: `${item?.properties?.table}/search?filter=${identityColumn?.name}==${["Integer","Duration","Decimal","Currency", "Percentage", "Phone Number"].includes(identityColumn?.type) ? "" : "*"}$data.${json.source}.${json.key}${["Integer","Duration","Decimal","Currency", "Percentage", "Phone Number"].includes(identityColumn?.type) ? "" : "*"}${
          table.softDelete ? ";deleted==false" : ""
        }&offset=0&size=25`, //ele.apiConfig.url.indexOf("$$") > -1 ? ele.apiConfig.url.replace("$$", `$data.${temp1.source}.${temp1.key}`) : ele.apiConfig.url,
        context: lib.context.toUpperCase(),
        urlType: "INTERNAL_TEXT",
        requestType: "GET",
        apiSourceType: "UI",
        displayExpression: identityColumn?.name,
        // value: getPrimaryKeyBySchemaListAndEntity(
        //   schemaList,
        //   item.properties.table
        // ),
      };
      break;
    case "Choice":
       json.dataSrc='values';
      json.placeholder = `Please select ${item.name}`;
      const temp = [];
      if (item.properties?.choice) {
        item.properties.choice.forEach((x) => {
          temp.push({
            label: x,
            value: x,
          });
        });
      }
      if (item.properties?.choices) {
        item.properties.choices.forEach((x) => {
          temp.push({
            label: x,
            value: x,
          });
        });
      }
      json.data = {
        values: temp,
      };
      break;
    case "Date":
    case "DateTime":
      json.isTimeStamp = true;
      json.allowpastdate = true;
      json.enableTime = true;
      if (item.defaultValue === "CURRENT_TIMESTAMP") {
        json.currentDate = true;
        delete json['defaultValue'];
      }
      break;
    case "Yes/No":
      json.checkboxAsToggle = true;
      break;
    case "Journal":
      json.editor=true;
      json.textAreaRow = 2;
      json.inputType = "area";
      break;
  }
  if (item.properties?.maxLength) {
    json.validate.maxLength = item.properties.maxLength;
  }
  if (item.properties?.minLength) {
    json.validate.minLength = item.properties.minLength;
  }
  if (item.required) {
    json.validate.required = item.required;
  }
  if (item.properties?.size) {
    json.validate.maxLength = item.properties.size;
    // json.validate.minLength = item.properties.size;
  }
  if (item.properties?.min) {
    json.validate.min = item.properties.min;
  }
  if (item.properties?.max) {
    json.validate.max = item.properties.max;
  }
  return json;
}

function getFilterConfigByType(element, json) {
  switch (element.type) {
    case "String":
    case "URL":
      json.type = "input";
      break;
    case "Integer":
    case "Decimal":
    case "Currency":
    case "Duration":
    case "Percentage":
    case "Phone Number":
      json.type = "input";
      json.isSuffixDropDownList= true,
      json.suffixDropDownList= [
        "=",
        ">",
        "<",
        "<=",
        ">="
      ];
      break;
    case "Email":
      json.type = "input";
      break;
    case "Choice":
      json.type = "select";
      const temp = [];
      if (element.properties?.choices) {
        element.properties.choices.forEach((x) => {
          temp.push({
            name: x,
            value: x,
          });
        });
      }
      if (element.properties?.choice) {
        element.properties.choice.forEach((x) => {
          temp.push({
            name: x,
            value: x,
          });
        });
      }
      json.optionList = temp;
      break;
    case "Date":
    case "DateTime":
      json.type = "daterangepicker";
      json.format = "YYYY-MM-DDTHH:MM:SS";
      json.hour = 23;
      json.minute = 59;
      json.second = 59;
      json.enableFutureDate=true;
      json.enableAdvanceCalender= true;
      break;
    case "Yes/No":
      json.type = "boxSingle";
      json.optionList = [
        {
          name: "True",
          value: true,
        },
        {
          name: "false",
          value: false,
        },
      ];
      break;
    case "Journal":
      json.type = "input";
      break;
    default:
      json.type = "input";
      break;
  }

  if (element.properties?.maxLength) {
    json.maxlength = element.properties.maxLength;
  }
  if (element.properties?.size) {
    json.maxlength = element.properties.size;
  }
  return json;
}

function getColumnType(element, json)
{
  if(element.type==="String" || element.type==="URL" || element.type==="Currency" || element.type==="Duration" || element.type==="Percentage" || element.type==="Phone Number" )
 {
  return "textfield";
 }else if(element.type==="Reference" ||element.type==="Reference")
 {
  return "select";
 }else if(element.type==="Integer" ||element.type==="Decimal")
 {
  return "number";
 }else if(element.type==="Yes/No")
 {
  return "checkbox";
 }else if(element.type==="Journal")
 {
  return "textarea";
 }else if(element.type==="Email")
 {
  return "email";
 }else if(element.type==="gps")
 {
  return "gps";
 }else if(element.type==="Date")
 {
    return "date";
 }else if(element.type==="DateTime")
 {
    return "DateTime";
 }

}

function validateColumn(item, enableSuppress = true) {
  let flag = true;
  if (item.isPrimary || (enableSuppress && (item.properties && item.properties.suppress)) || ["workflowStage", "processInstanceId"].includes(item.name) || (item.properties && item.properties.customTable)) {
    flag = false;
  }
  return flag;
}

function unDasherise(input) {
  let temp = input.split('-').join('_');
  return temp;
}

function spacedText(input) {
  let temp = input.replace(/([a-z])([A-Z])/g, function(match, $1, $2) {
    return $1 + ' ' + $2.toLowerCase();
  });
  // if (removeSpace) {
  // temp = temp.replace(/ /g, "");
  // }
  return temp;
}


function arrayToCommaSeparatedString(arr) {
  // Use the Array.join() method to join the array elements with a comma and space
  return arr.join(', ');
}

function isPushSortTemp(temp){
  let flag = false;
  if(temp.colId.includes(".")){
    flag = false;
  }
  else{
    flag = true;
  }
  return flag;
}


module.exports = {
  dasherise,
  camelize,
  titleCase,
  typeGenerator,
  lowerFirstLetter,
  getPrimaryKey,
  findParentEntity,
  findIfLibShouldBeMade,
  getTablePropsByNativeName,
  getPrimaryKeyBySchemaListAndEntity,
  getIdentityColumn,
  getTablePropsByPojoName,
  updateViewJsonAsPerTypes,
  getFilterConfigByType,
  getIdentityColumnFromTable,
  validateColumn,
  unDasherise,
  dasheriseUnderScore,
  spacedText,
  arrayToCommaSeparatedString,
  isPushSortTemp
};
