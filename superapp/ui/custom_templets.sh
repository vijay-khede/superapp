#!/bin/bash

APPNAME="$1"


node custom-template-constants-replace.js "$APPNAME"
node custom-template-module-replace.js "$APPNAME"
node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build modules-custom-templates;
cd dist;
mkdir packed_files;
cd ../;


cd dist/libs/modules/custom-templates;
npm pack;
cp *.tgz ../../../../libs-enttribe;
cd ../../../../;


rm -rf node_modules/@enttribe/modules-custom-templates
rm -rf package-lock.json
npm install --legacy-peer-deps
