package com.enttribe.superapp.model; 
import jakarta.persistence.*;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotNull;

@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "RELEASE_DETAILS")    
public class ReleaseDetails  extends BaseEntity { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", columnDefinition = "INT")
    private Integer id;
    
    @Size(max = 50)
    @Column(name = "ENVIRONMENT", length = 50)
    private String environment;
 
    @Size(max = 255)
    @Column(name = "HOST_PATH", length = 255)
    private String hostPath;
    
    @Size(max = 15)
    @Column(name = "VERSION", length = 15)
    private String version;

    @Column(name = "RELEASE_NOTE", columnDefinition = "TEXT")
    private String releaseNote;

    
    @Column(name = "REMARK", columnDefinition = "TEXT")
    private String remark;
    
    @Column(name = "PIPELINE_BUILD_ID", columnDefinition = "INT")
    private Integer pipelineBuildId;
    
    @Size(max = 255)
    @Column(name = "BUILD_URL", length = 255)
    private String buildUrl;

    @Size(max = 30)
    @Column(name = "RELEASE_TYPE", length = 30)
    private String releasetype;
    
    @Column(name = "STATUS", columnDefinition = "ENUM('PENDING','RELEASED','ROLLED_BACK')")
    private String status = "PENDING";

    @Column(name = "RELEASE_DATE", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date releaseDate;
    
    @NotNull
    @Column(name = "DELETED", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean deleted = false;

    @Column(name = "CUSTOMER_ID", columnDefinition = "INT")
    private Integer customerId;

    @ManyToOne
    @JoinColumn(name = "APP_ID", referencedColumnName = "ID")
    private MiniappDetails miniAppDetails;
 
    @NotNull
    @ManyToOne  
    @JoinColumn(name = "BUILD_NUMBER", referencedColumnName = "BUILD_NUMBER", columnDefinition = "INT")
    private BuildInfo buildInfo; 

}


