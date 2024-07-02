package com.enttribe.superapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.enttribe.superapp.model.BuildLogInfo;
import com.enttribe.superapp.repository.generic.GenericRepository;

/**

The BuildLogInfoRepository interface is a extension of {@link GenericRepository}. It's purpose is to provide additional
methods that are specific to the {@link BuildLogInfo} entity.
see GenericRepository
see JpaRepository
*/
@Repository
@Transactional(readOnly = true)
public interface BuildLogInfoRepository extends GenericRepository<BuildLogInfo> {

}

