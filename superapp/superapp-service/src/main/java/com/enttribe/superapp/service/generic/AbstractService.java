package com.enttribe.superapp.service.generic;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.extern.slf4j.Slf4j;
import com.enttribe.core.generic.dao.impl.HibernateGenericDao;
import com.enttribe.core.generic.dao.impl.CustomRsqlVisitor;
import com.enttribe.core.generic.utils.ApplicationContextProvider;
import com.enttribe.product.security.spring.userdetails.CustomerInfo;
import com.enttribe.core.generic.utils.ApplicationContextProvider;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.enttribe.superapp.repository.generic.GenericRepository;
import cz.jirutka.rsql.parser.RSQLParser;
import cz.jirutka.rsql.parser.ast.Node;
import org.springframework.data.jpa.domain.Specification;

/**
 * The AbstractService class is an abstract implementation of the GenericService interface.
 * This class provides a base implementation for common service functionalities.
 *
 * @param <T> The type parameter representing the entity that this service manages.
 */
@Slf4j
public abstract class AbstractService<T> implements GenericService<T> {

/**
* Generic repository for the entity being audited.
*/
	private GenericRepository<T> repository;

/**
* EntityManager for interacting with the persistence layer.
*/
	@PersistenceContext
	private EntityManager entityManager;
	
/**
* Class type of the entity being audited.
*/
	private Class<T> entityType;
	
/**
 * Constructor for AbstractService.
 * @param repository GenericRepository for the entity being managed by the service.
 * @param entityType Class type of the entity being managed by the service.
 */
	protected AbstractService(GenericRepository<T> repository, Class<T> entityType) {
		this.repository = repository;
			this.entityType = entityType;
	}
	
/**
 * Creates a new entity and saves it to the repository.
 * @param entity The entity to be created and saved.
 * @return The created entity, with any auto-generated fields (such as ID) populated.
 */
	@Override
 	public T create(T entity) {
    	return repository.saveAndFlush(entity);
	}

 /**
 * Updates an existing entity and saves the changes to the repository.
 * @param entity The updated entity to be saved.
 * @return The updated entity with any changes made by the repository (such as auto-generated fields)
 */
 	@Override
	public T update(T entity) {
  	   return repository.saveAndFlush(entity);
	}

/**
 * Finds and retrieves an entity by its ID.
 * @param id The ID of the entity to be retrieved.
 * @return An Optional containing the found entity, or empty if no entity with the given ID is found.
 */
	@Override
	public Optional<T> findById(Integer id) {
		return repository.findById(id);
	}

/**
 * Retrieves a list of entities by their IDs.
 * @param id A List of IDs of entities to be retrieved.
 * @return A List of found entities, empty list if no entities with the given IDs are found.
 */
	@Override
	public List<T> findAllById(List<Integer> id) {
		return repository.findAllById(id);
	}

 /**
 * Deletes an entity by its ID.
 * @param id The ID of the entity to be deleted.
 */
	@Override
	public void deleteById(Integer id) {
		repository.deleteById(id);
	}

/**
 * Deletes a list of entities.
 * @param entities A List of entities to be deleted.
 */
	@Override
	public void deleteAll(List<T> entities) {
		repository.deleteAll(entities);
	}

/**
 * Retrieves the audit history for a specific entity.
 * @param id The ID of the entity to retrieve the audit history for.
 * @param limit The maximum number of history records to retrieve.
 * @param skip Number of records to skip.
 * @return A JSON string containing the audit history of the entity
 */
	@Override
	public String auditHistory(int id, Integer limit, Integer skip) {
	HibernateGenericDao hibernateGenericDao = new HibernateGenericDao(entityType, entityManager);
	try {
		List list = hibernateGenericDao.findAudit(id);
	    return list.toString();
	 } catch (Exception e) {
		log.error("Error Inside @class: " + this.getClass().getName() + " @Method: auditHistory()" + e.getMessage());
	    return null;
	 }
	}
  
 /**
 * Search for entities that match the given query.
 * @param query The RSQL query to use for searching entities.
 * @param offset The starting position for the search results.
 * @param size The maximum number of search results to return.
 * @param orderby The field to use for ordering the search results.
 * @param orderType Order direction. Valid values are 'asc' and 'desc'.
 * @return List of entities that match the given query.
 */
	@Override
	@SuppressWarnings("unchecked")
	public List<T> search(String query, Integer offset, Integer size, String orderby, String orderType) {
		if(query==null)
		{
			return Collections.emptyList();
		}
		return searchByFilter(entityType,query,orderby,orderType,offset,size);
	}
    
	@SuppressWarnings("unchecked")
	private List<T> searchByFilter(Class<?> type, String query, String orderBy, String orderType, Integer offset, Integer size) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<?> criteria = builder.createQuery(type);
		Root<?> root = criteria.from(type);
		Node rootNode = new RSQLParser().parse(query);
		Specification<T> specification = rootNode.accept(new CustomRsqlVisitor<T>());
		Predicate predicate = specification.toPredicate((Root<T>)root, criteria, builder);
		criteria.where(predicate);
		if (orderBy != null && orderType != null) {
		if ("desc".equalsIgnoreCase(orderType)) {
			criteria.orderBy(entityManager.getCriteriaBuilder().desc(root.get(orderBy)));
		} else {
			criteria.orderBy(entityManager.getCriteriaBuilder().asc(root.get(orderBy)));
		}
		}
		TypedQuery<?> typedQuery = entityManager.createQuery(criteria);
		if (offset >= 0 && size >= 0) {
		typedQuery.setMaxResults(size);
		typedQuery.setFirstResult(offset);
		}
		return (List<T>) typedQuery.getResultList();
	}
    
	@Override
	@SuppressWarnings("unchecked")
	public Long count(String query) {
		if(query==null)
		{
			return null;
		}
		return countByFilter(entityType ,query);
	}
	
	@SuppressWarnings("unchecked")
	private Long countByFilter(Class<?> t, String query) {
		CriteriaBuilder builder =entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<?> root = criteria.from(t);
		Node rootNode = new RSQLParser().parse(query);
		Specification<T> specification = rootNode.accept(new CustomRsqlVisitor<T>());
		Predicate predicate = specification.toPredicate((Root<T>)root, criteria, builder);
		criteria.where(predicate);
		criteria.select(entityManager.getCriteriaBuilder().countDistinct(root));
		return entityManager.createQuery(criteria).getSingleResult();
	}

}
