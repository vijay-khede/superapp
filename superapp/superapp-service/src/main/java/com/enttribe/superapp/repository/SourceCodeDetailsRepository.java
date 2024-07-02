package com.enttribe.superapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.enttribe.superapp.model.SourceCodeDetails;
import com.enttribe.superapp.repository.generic.GenericRepository;

/**

The SourceCodeDetailsRepository interface is a extension of {@link GenericRepository}. It's purpose is to provide additional
methods that are specific to the {@link SourceCodeDetails} entity.
see GenericRepository
see JpaRepository
*/
@Repository
@Transactional(readOnly = true)
public interface SourceCodeDetailsRepository extends GenericRepository<SourceCodeDetails> {


}
