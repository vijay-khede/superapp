package com.enttribe.superapp.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.Audited;

// @Audited
@Getter
@Setter
@NoArgsConstructor
@Entity(name = "superapp")
@Table(name = "User")
@JsonIgnoreProperties(ignoreUnknown = true, value = { "hibernateLazyInitializer", "handler" })
public class User implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
  @Column(name = "userid_pk")
  private Integer userid;

  @Column(name = "firstname", length = 50)
  private String firstName;

  @Column(name = "middlename", length = 50)
  private String middleName;

  @Column(name = "lastname", length = 50)
  private String lastName;

  @Column(name = "username", nullable = false, length = 100)
  private String userName;

  public User(Integer customerUserId) {
    super();
    this.userid = customerUserId;
  }

}
