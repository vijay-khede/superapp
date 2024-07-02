package com.enttribe.superapp;
import com.enttribe.superapp.model.User;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.reflections.Reflections;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignClient;	
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;		
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.enttribe.commons.configuration.ConfigUtils;
import com.enttribe.product.pii.filter.PropertyFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.OAuthFlow;
import io.swagger.v3.oas.models.security.OAuthFlows;
import io.swagger.v3.oas.models.security.Scopes;
import io.swagger.v3.oas.models.security.SecurityScheme;

/**
 * The Application class is the entry point of the application.
 * It contains the main method that starts the application.
 */
@EnableAsync
@SpringBootApplication(exclude = CassandraAutoConfiguration.class)
@ServletComponentScan({ "com.enttribe" })
@EnableScheduling
@EnableCaching
@EnableAspectJAutoProxy(proxyTargetClass = true)
@ComponentScan(basePackages = {"com.enttribe.superapp", "com.enttribe", "com.enttribe.orchestrator.utility"})
@EntityScan({ "com.enttribe.platform.vbhelper","com.enttribe.superapp","com.enttribe.orchestrator.utility"})
@EnableJpaRepositories(basePackages = { "com.enttribe.platform.vbhelper", "com.enttribe.superapp", "com.enttribe.orchestrator.utility" })
@ComponentScan(basePackages = { "com.enttribe" , "com.enttribe.commons.spring.boot.autoconfigure.storage"})
@EnableFeignClients(basePackages = {"com.enttribe.superapp", "com.enttribe.workflow" , "com.enttribe.orchestrator","com.enttribe"})
public class Application implements WebMvcConfigurer {
	
	/**
     * The main entry point of the application.
     * This method sets up the properties file paths, starts the Spring application, and registers the application node in JavaMelody
     * if the JavaMelody status is enabled in the configuration.
     *
     * @param args The command-line arguments.
     */
     	private Logger logger = LogManager.getLogger(Application.class);
     
  public static void main(String[] args) {
    ConfigUtils.setPropertiesFilePath("application.properties", "config.properties");
    SpringApplication.run(Application.class, args);
  }
  
  /**
   * Creates an instance of the AuditorAware interface with the SpringAuditorAware implementation.
   * This bean is used for auditing purposes in Spring Data JPA.
   *
   * @return An instance of the AuditorAware interface.
   */  
  @Bean
  public AuditorAware<User> auditorAware(){
      return new SpringAuditorAware();
  }
  
   @Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
		registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
		 registry.addResourceHandler("/lib/**")
       .addResourceLocations("classpath:/BOOT-INF/lib/");
	}
  
  private List<String> packagesToScan = List.of("com.enttribe.superapp");
	
  @Bean
  public ObjectMapper objectMapper() {
	  logger.info("Custom Object Mapper initialised ");
	    ObjectMapper objectMapper = new ObjectMapper();
	    objectMapper.registerModule(new Jdk8Module());
	    SimpleFilterProvider filterProvider = new SimpleFilterProvider();
	    filterProvider.setFailOnUnknownId(false);
	    FilterProvider filters = filterProvider.addFilter("propertyFilter", new PropertyFilter());
	    objectMapper.setFilterProvider(filters);
	    return objectMapper;
	}
  
  @Bean
  public OpenAPI customOpenAPI() {
      return new OpenAPI().info(new Info().title("com.enttribe.superapp").version("1.0.0"))
              .components(new Components().addSecuritySchemes("default", createOAuthSecurityScheme()));
  }
  
  SecurityScheme createOAuthSecurityScheme() {
      Scopes scopesArray = new Scopes();
      OAuthFlow oAuthFlow = new OAuthFlow().authorizationUrl("http://localhost/auth");
      try {
          logger.debug("Permission SCopes Size is {}", scopesArray.size());
          oAuthFlow.scopes(scopesArray);
          Scopes scopes = readAuthorizationScopes(packagesToScan, new Scopes());
          logger.info("Authorization Scopes  is {}", scopes.values());
          oAuthFlow.scopes(scopes);
      } catch (Exception e) {
          logger.error("error while getting permission {}", e.getMessage(), e);
      } 
      return new SecurityScheme()
              .type(SecurityScheme.Type.OAUTH2)
              .description("Oauth2 flow")
              .flows(new OAuthFlows().implicit(oAuthFlow));
  }

  	  private static Scopes readAuthorizationScopes(List<String> packageNames, Scopes scopesArray) {
	      List<String> scopes = new ArrayList<>();
	      for (String packageName : packageNames) {
	          Reflections reflections = new Reflections(packageName);
	          Set<Class<?>> classes = reflections.getTypesAnnotatedWith(FeignClient.class);
	          for (Class<?> clazz : classes) {
	              processAuth(scopesArray, scopes, clazz);
	          }
	      }
	      return scopesArray;
	  }

	private static void processAuth(Scopes scopesArray, List<String> scopes, Class<?> clazz) { 
	
		for (java.lang.reflect.Method method : clazz.getDeclaredMethods()) {
		      if (method.isAnnotationPresent(Operation.class)) {
		          Operation apiOperation = method.getAnnotation(Operation.class);
		          if (apiOperation.security().length > 0) {
		              io.swagger.v3.oas.annotations.security.SecurityRequirement[] authorizations = apiOperation.security();
		              processAuthScop(scopesArray, scopes, authorizations);
		          }
		      }
		  }
	}

	private static void processAuthScop(Scopes scopesArray, List<String> scopes,
			io.swagger.v3.oas.annotations.security.SecurityRequirement[] authorizations) {
		for (io.swagger.v3.oas.annotations.security.SecurityRequirement authorization : authorizations) {
		      if (authorization.scopes().length > 0) {
		          String[] authorizationScopes = authorization.scopes();
		          for (String scope : authorizationScopes) {
		              scopesArray.addString(scope, scope);
		              scopes.add(scope);
		          }
		      }
		  }
	}

}
