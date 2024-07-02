package com.enttribe.superapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.enttribe.superapp.model.ReleaseDetails;
import com.enttribe.superapp.repository.generic.GenericRepository;

/**

The ReleaseDetailsRepository interface is a extension of {@link GenericRepository}. It's purpose is to provide additional
methods that are specific to the {@link ReleaseDetails} entity.
see GenericRepository
see JpaRepository
*/ 

@Repository
@Transactional(readOnly = true)
public interface ReleaseDetailsRepository extends GenericRepository<ReleaseDetails> {


}
