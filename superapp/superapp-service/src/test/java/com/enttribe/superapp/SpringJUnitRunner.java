package com.enttribe.superapp;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

import com.enttribe.commons.configuration.ConfigUtils;

@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
public class SpringJUnitRunner {

	private int port=8081;

	private static final String PATH = "http://localhost:";

	static {
		ConfigUtils.setPropertiesFilePath("application.properties", "config.properties");
	}

	protected String baseUrl() {
		String contextPath = ConfigUtils.getString("server.servlet.context-path", "");
		String servletPath = ConfigUtils.getString("spring.mvc.servlet.path", "");

		System.out.println("SpringJUnitRunner baseUrl is " + (PATH + port + contextPath + servletPath));
		return PATH + port + contextPath + servletPath;
	}

}
