const fs = require('fs');
const application = require("./js/application");



const init = async () => {
// const path = '/data/console//UI-Generation-Schema.json';
  const path = process.argv[2];
  const file = JSON.parse(fs.readFileSync(path));




//new 
	 const arg1 = process.argv[3]; 
 	 const arg2 = process.argv[4]; 
         const isArg1True = arg1 === 'true' || arg1 === '1';

	if (isArg1True) {
		 console.log("arg1 is true ");
		 await application.generateApplication(file,arg1 === 'true',arg2);
    		console.log("arg1 is true "+arg2);
 	 }
	
	 else {
	 const path = arg2;
 	 const fileAllJson = JSON.parse(fs.readFileSync(path));
	console.log("arg1 is false");
	 await application.generateApplication(file,false,fileAllJson);
    	 console.log("arg1 is false");
	 }


//new

//  await application.generateApplication(file);
};

init();
