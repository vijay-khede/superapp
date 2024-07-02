package com.enttribe.superapp;

import java.util.Optional;

import com.enttribe.superapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;

import com.enttribe.product.security.spring.userdetails.CustomerInfo;

/**
 * This class implements the {@link AuditorAware} interface, providing the current auditor (user) information to be used
 * by Spring Data JPA for auditing purposes. It retrieves the user information from the {@link CustomerInfo} bean and
 * constructs a {@link User} object with the relevant data to represent the current auditor.
 *
 * <p>The auditor (user) information is used for automatically populating audit fields like "createdBy" and "lastModifiedBy"
 * when entities annotated with {@link javax.persistence.EntityListeners} and {@link javax.persistence.Entity}
 * are inserted or updated in the database.
 */
@Configuration
public class SpringAuditorAware implements AuditorAware<User> {

  @Autowired
  private CustomerInfo customerInfo;

	/**
   * Retrieves the current auditor (user) information to be used for auditing purposes.
   *
   * @return An {@link Optional} containing the {@link User} object representing the current auditor, if available.
   *         If not available, an empty {@link Optional} is returned.
   */
  @Override
  public Optional<User> getCurrentAuditor() {
    User user = new User();
    user.setUserid(customerInfo.getUserId());
    user.setFirstName(customerInfo.getCustomerInfo().getFirstname());
    user.setLastName(customerInfo.getCustomerInfo().getLastname());
    user.setUserName(customerInfo.getUsername());
    return Optional.of(user);
  }

}
