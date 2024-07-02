const util = require("./util.service");
const writeXlsxFile = require("write-excel-file/node");
const schema = [
  {
    column: "Message Key",
    type: String,
    value: (student) => student["Message Key"],
    width: 30,
  },
  {
    column: "English Value",
    type: String,
    value: (student) => student["English Value"],
    width: 30,
  },
  {
    column: "en",
    type: String,
    value: (student) => student["en"],
    width: 30,
  },
  {
    column: "Remark",
    type: String,
    value: (student) => student["Remark"],
    width: 30,
  },
];
function generateDataForLocalization(file) {
  const temp = [
    {
      "Message Key": `${util
        .dasherise(file.applicationName)
        .toUpperCase()}_APP_NAME`,
      "English Value": file.applicationName,
      en: file.applicationName,
      Remark: "GENERAL",
    },
  ];
  const temp1 = [];
  file.tables.forEach((element) => {
    const x = {
      "Message Key": `${util
        .dasherise(file.applicationName)
        .toUpperCase()}_APP_NAME.${util
        .dasherise(element.displayName)
        .toUpperCase()}`,
      "English Value": element.displayName,
      en: element.displayName,
      Remark: "GENERAL",
    };
    temp.push(x);
    element.fields.forEach((ele) => {
      if (util.validateColumn(ele)) {
        const y = {
          "Message Key": `${util
            .dasherise(file.applicationName)
            .toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}.${util.dasherise(ele.displayName).toUpperCase()}`,
          "English Value": ele.displayName,
          en: ele.displayName,
          Remark: "GENERAL",
        };
        const z = {
          "Message Key": `${util
            .dasherise(file.applicationName)
            .toUpperCase()}_APP_NAME.${util
            .dasherise(element.displayName)
            .toUpperCase()}_${util.dasherise(ele.displayName).toUpperCase()}`,
          "English Value": `${element.displayName} ${ele.displayName}`,
          en: `${element.displayName} ${ele.displayName}`,
          Remark: "GENERAL",
        };
        temp1.push(y);
        temp1.push(z);
      }
    });
  });
  writeXlsxFile(temp, {
    schema,
    filePath: "./build/en_core_upload.xlsx",
  });
  writeXlsxFile(temp1, {
    schema,
    filePath: "./build/en_upload.xlsx",
  });
}

module.exports = {
  generateDataForLocalization,
};
