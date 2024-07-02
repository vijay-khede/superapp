package com.enttribe.superapp.test;

import org.junit.jupiter.api.Test;

import java.io.File; 
import org.junit.Assert;
import com.enttribe.commons.ssh.ShellUtils;
import com.enttribe.superapp.SpringJUnitRunner;

class SwaggerGenerationTest extends SpringJUnitRunner{
		
	@Test
	void downloadSwaggerFile() {
	  try {
	   String url=baseUrl();
	   System.out.println("download started");
       ShellUtils.execCommand("curl -v " +url+ "/superapp/rest/v3/api-docs -o " +"/data/quickboot-generatedapp-git/quickboot-generated-apps/superapp/configuration"+"/swagger.json",false,false);
       String filePath = "/data/quickboot-generatedapp-git/quickboot-generated-apps/superapp/configuration"+"/swagger.json";
       boolean fileDownloaded = new File(filePath).exists();
       Assert.assertTrue("Swagger file was not downloaded successfully", fileDownloaded);
    } catch (Exception e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
	}
	
	
	}

