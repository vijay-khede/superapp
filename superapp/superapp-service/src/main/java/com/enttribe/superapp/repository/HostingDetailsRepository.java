package com.enttribe.superapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.enttribe.superapp.model.HostingDetails;
import com.enttribe.superapp.repository.generic.GenericRepository;

/**

The HostingDetailsRepository interface is a extension of {@link GenericRepository}. It's purpose is to provide additional
methods that are specific to the {@link HostingDetails} entity.
see GenericRepository
see JpaRepository
*/
@Repository
@Transactional(readOnly = true)
public interface HostingDetailsRepository extends GenericRepository<HostingDetails> {


}
